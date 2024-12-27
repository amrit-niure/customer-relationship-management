"use server"
import { authenticatedAction } from "@/lib/safe-action";
import { clientSchema } from "./validation";
import { rateLimitByKey } from "@/lib/limiter";
import { sendEmail } from "@/lib/email";
import ApplyworldWelcomeEmail from "@/components/emails/welcome-user";
import { revalidatePath } from "next/cache";
import { createClientUseCase } from "@/use-cases/clients/create-client.use-case";

export const createClientAction = authenticatedAction.createServerAction().input(clientSchema).handler(async ({ input }) => {
    try {
        await rateLimitByKey({
            key: input.email,
            limit: 3,
            window: 10000
        });
        const client = await createClientUseCase(input);
        await sendEmail({
            to: input.email,
            subject: "Welcome to Our CRM",
            body: ApplyworldWelcomeEmail({ userFirstname: client.firstName, email: client.email, password: "xxxxx" })
        });
        revalidatePath("/dashboard/client");
    } catch (error) {
        throw error;
    }
})