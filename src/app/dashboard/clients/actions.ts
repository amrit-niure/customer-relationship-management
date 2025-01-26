"use server"
import { authenticatedAction } from "@/lib/safe-action";
import { clientSchemaFull } from "./schema";
import { rateLimitByKey } from "@/lib/limiter";
import { sendEmail } from "@/lib/email";
import { revalidatePath } from "next/cache";
import { createClientUseCase } from "@/use-cases/clients/create-client.use-case";
import { getCurrentUser } from "@/lib/session";
import { ClientWelcomeEmail } from "@/components/emails/welcome-client";
import { getAllClientsUseCase, getClientUseCase } from "@/use-cases/clients/get-clients.use-case";
import * as z from "zod";
import { deleteClientUseCase } from "@/use-cases/clients/delete-client.use-case";
import { AuthenticationError } from "@/use-cases/errors";
import { updateClientUseCase } from "@/use-cases/clients/update-client.use-case";
import { createClientFilesUseCase } from "@/use-cases/files/create-files.use-case";
import { uploadToOneDrive } from '@/lib/onedrive/upload';
import { uploadFileUseCase } from "@/use-cases/files/upload-file.use-case";
import { getExtension } from "@/lib/utils";

// File upload action with proper typing
export async function uploadFileAction(
    fileData: string,
    fileName: string,
    folderPath = "root"
) {
    try {
        const buffer = Buffer.from(fileData.split(',')[1], 'base64');

        const result = await uploadToOneDrive({
            fileName,
            folderPath,
            buffer,
            onProgress: (progress) => {
                console.log(`Upload progress: ${progress}%`);
            }
        });

        return result;
    } catch (error) {
        console.error('Error in upload action:', error);
        throw error;
    }
}

// Create client action with file handling
export const createClientAction = authenticatedAction
    .createServerAction()
    .input(clientSchemaFull)
    .handler(async ({ input }) => {
        try {
            await rateLimitByKey({
                key: input.clientBasicInfo.email,
                
                window: 10000
            });

            const currentUser = await getCurrentUser();
            if (!currentUser) {
                throw new AuthenticationError();
            }
            const payload = { ...input.clientBasicInfo, ...input.clientVisaInfo, createdBy: currentUser?.id, image: null };

            const client = await createClientUseCase(payload);

            // upload profile pic to onedrive 
            const profilePic = input.clientBasicInfo.image;
            if (profilePic) {
                const imageName = `profile-image${getExtension(profilePic.name)}`;
                const uploadedFile = await uploadFileUseCase(profilePic, imageName, `Apply World CRM/Clients/${input?.clientBasicInfo?.firstName} ${input?.clientBasicInfo?.lastName}`);

                const filePayload = {
                    ...uploadedFile.data,
                    uploadedAt: new Date(uploadedFile.data.uploadedAt),
                };

                // Update client image with web URL
                await updateClientUseCase({ image: filePayload.webUrl }, client.id);
                // create the file record in database 
                const payload = [filePayload];
                await createClientFilesUseCase(payload, client.id);
            }


            const files = input.clientDocuments?.files || [];
            if (files.length > 0) {
                // Upload files
                const uploadedFiles = await Promise.all(files.map((file) => uploadFileUseCase(file, file.name, `Apply World CRM/Clients/${input?.clientBasicInfo?.firstName} ${input?.clientBasicInfo?.lastName}`)));

                const filePayload = uploadedFiles.map(result => ({
                    ...result.data,
                    uploadedAt: new Date(result.data.uploadedAt),
                }));

                // create files upload record
                await createClientFilesUseCase(filePayload, client.id);
            }
            await sendEmail({
                to: client.email,
                subject: "Thank you for trusting us - Apply World Group",
                body: ClientWelcomeEmail({ userFirstname: client.firstName })
            });

            revalidatePath("/dashboard/client");
            return client;
        } catch (error) {
            throw error;
        }
    });
export const updateClientAction = authenticatedAction
    .createServerAction()
    .input(clientSchemaFull)
    .handler(async ({ input }) => {
        await rateLimitByKey({
            key: "update",
            
            window: 10000
        });
        const currentUser = await getCurrentUser();
        if (!currentUser) {
            throw new AuthenticationError()
        }
        const payload = {
            ...input.clientBasicInfo,
            ...input.clientVisaInfo,
            updatedBy: currentUser?.id,
            image: input.clientBasicInfo.image ? input.clientBasicInfo.image.toString() : null
        };
        const updated = updateClientUseCase(payload, input.clientBasicInfo.id!);
        revalidatePath("/dashboard/client");
        return updated;
    })

export const getAllClientsAction = authenticatedAction.createServerAction().handler(async () => {
    await rateLimitByKey({
        key: "getAllClients",
        
        window: 10000
    });
    return await getAllClientsUseCase();
})


export const getClientAction = authenticatedAction
    .createServerAction()
    .input(
        z.object({
            id: z.string()
        }))
    .handler(async ({ input }) => {
        await rateLimitByKey({
            key: "getClient",
            
            window: 10000
        });
        return await getClientUseCase(input.id);
    })

export const deleteClientAction = authenticatedAction
    .createServerAction()
    .input(
        z.object({
            id: z.string()
        }))
    .handler(async ({ input }) => {
        await rateLimitByKey({
            key: "getClient",
            
            window: 10000
        });
        revalidatePath("/dashboard/clients");
        return await deleteClientUseCase(input.id);
    })
