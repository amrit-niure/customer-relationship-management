"use server"
import { authenticatedAction } from "@/lib/safe-action";
import { clientSchema } from "./validation";
import { rateLimitByKey } from "@/lib/limiter";
import { sendEmail } from "@/lib/email";
import { revalidatePath } from "next/cache";
import { createClientUseCase } from "@/use-cases/clients/create-client.use-case";
import { getCurrentUser } from "@/lib/session";
import { ClientWelcomeEmail } from "@/components/emails/welcome-client";

export const createClientAction = authenticatedAction.createServerAction().input(clientSchema).handler(async ({ input }) => {
    try {
        await rateLimitByKey({
            key: input.email,
            limit: 3,
            window: 10000
        });
        const currentUser = await getCurrentUser()
        const payload = { ...input, createdBy: currentUser?.id, updatedBy: currentUser?.id }
        const client = await createClientUseCase(payload);
        await sendEmail({
            to: input.email,
            subject: "Welcome to Our CRM",
            body: ClientWelcomeEmail({ userFirstname: client.firstName })
        });
        revalidatePath("/dashboard/client");
        return client;
    } catch (error) {
        throw error;
    }
})