"use server";

import { afterLoginUrl } from "@/app-config";
import { rateLimitByKey } from "@/lib/limiter";
import { unauthenticatedAction } from "@/lib/safe-action";
import { setSession } from "@/lib/session";
import { loginSchema, userSchema } from "@/app/dashboard/(team)/users/components/validation";
import { signInUseCase } from "@/use-cases/users/sign-in.use-case";
import { redirect } from "next/navigation";
import { signUpUseCase } from "@/use-cases/users/sign-up.use-case";
import { revalidatePath } from "next/cache";
import { ValidationError } from "@/errors/database";
import { invalidateSession, validateRequest } from "@/auth";
import { sendEmail } from "@/lib/email";
import ApplyworldWelcomeEmail from "@/components/emails/welcome-user";

export const signInAction = unauthenticatedAction
    .createServerAction()
    .input(loginSchema)
    .handler(async ({ input }) => {
        try {
            await rateLimitByKey({
                key: input.email,
                limit: 3,
                window: 10000
            });

            const user = await signInUseCase(input.email, input.password);
            await setSession(user.id);
            revalidatePath("/dashboard");
            redirect(afterLoginUrl);
        } catch (error) {
            if (error instanceof ValidationError) {
                throw new ValidationError('Too many sign-in attempts. Please try again later.');
            }
            throw error;
        }
    });

export async function signOutAction() {
    const { session } = await validateRequest();

    if (!session) {
        redirect("/sign-in");
    }

    await invalidateSession(session.id);
    redirect("/signed-out");
}

// export const signUpAction = unauthenticatedAction
//     .createServerAction()
//     .input(userSchema)
//     .handler(async ({ input }) => {
//         try {
//             await rateLimitByKey({
//                 key: input.email,
//                 limit: 3,
//                 window: 10000
//             });

//             await signUpUseCase({
//                 ...input,
//                 hashedPassword: input.password
//             });

//             //send email verification use case using resend library here


//             revalidatePath("/dashboard/team");
//         } catch (error) {
//             if (error instanceof ValidationError) {
//                 throw new ValidationError('Too many sign-up attempts. Please try again later.');
//             }
//                 throw error;
//         }
//     });


export const signUpAction = unauthenticatedAction
    .createServerAction()
    .input(userSchema)
    .handler(async ({ input }) => {
        try {
            await rateLimitByKey({
                key: input.email,
                limit: 3,
                window: 10000
            });

           const user =  await signUpUseCase({
                ...input,
                hashedPassword: input.password
            });

            // Send welcome email
            await sendEmail({
                to: input.email,
                subject: "Welcome to Our CRM",
                body: ApplyworldWelcomeEmail({ userFirstname: user.firstName, email: user.email , password: input.password  })
            });

            revalidatePath("/dashboard/team");
        } catch (error) {
            if (error instanceof ValidationError) {
                throw new ValidationError('Too many sign-up attempts. Please try again later.');
            }
            // Handle email sending errors
            if (error instanceof Error && error.message.includes('email')) {
                console.error('Failed to send welcome email:', error);
                // You might want to log this error or handle it differently
                // For now, we'll still allow the sign-up to succeed
            } else {
                throw error;
            }
        }
    });


