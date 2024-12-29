"use server"
import { authenticatedAction } from "@/lib/safe-action";
import { clientSchema, clientSchemaFull } from "./schema";
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

export const createClientAction = authenticatedAction.createServerAction().input(clientSchemaFull).handler(async ({ input }) => {
    try {
        await rateLimitByKey({
            key: input.clientBasicInfo.email,
            limit: 3,
            window: 10000
        });
        const currentUser = await getCurrentUser();
        if (!currentUser) {
            throw new AuthenticationError()
        }
        const gatheredData = {...input.clientBasicInfo, ...input.clientVisaInfo, ...input.clientDocuments}
        const payload = { ...gatheredData, createdBy: currentUser?.id, updatedBy: currentUser?.id }
        // const client = await createClientUseCase(payload);
        // TODO: prepare payload for creating file table in database
        // TODO: const document = await createClientFileUseCase(filepayload);
        // 
        await sendEmail({
            to: input.clientBasicInfo.email,
            subject: "Welcome to Our CRM",
            body: ClientWelcomeEmail({ userFirstname: input.clientBasicInfo.firstName })
        });
        revalidatePath("/dashboard/client");
        // return client;
    } catch (error) {
        throw error;
    }
})

export const updateClientAction = authenticatedAction
    .createServerAction()
    .input(clientSchema.extend({
        id: z.string()
    }))
    .handler(async ({ input }) => {
        await rateLimitByKey({
            key: "update",
            limit: 3,
            window: 10000
        });
        const currentUser = await getCurrentUser();
        if (!currentUser) {
            throw new AuthenticationError()
        }
        const payload = { ...input, updatedBy: currentUser?.id };
        return await updateClientUseCase(payload, input.id);
    })

export const getAllClientsAction = authenticatedAction.createServerAction().handler(async () => {
    await rateLimitByKey({
        key: "getAllClients",
        limit: 3,
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
            limit: 3,
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
            limit: 3,
            window: 10000
        });
        revalidatePath("/dashboard/clients");
        return await deleteClientUseCase(input.id);
    })


import { uploadToOneDrive } from '@/lib/onedrive/upload';
export async function uploadFileAction(fileData: string, fileName: string, folderPath = "root") {
  try {
    // Convert base64 to buffer
    const buffer = Buffer.from(fileData.split(',')[1], 'base64');
    
    const result = await uploadToOneDrive({
      fileName,
      folderPath,
      buffer,
      onProgress: (progress) => {
        // Note: Server-side progress updates need to be handled differently,
        // such as through WebSockets or Server-Sent Events if needed
        console.log(`Upload progress: ${progress}%`);
      }
    });

    console.log('Upload result:', result);
    return result;
  } catch (error) {
    console.error('Error in upload action:', error);
    throw error;
  }
}