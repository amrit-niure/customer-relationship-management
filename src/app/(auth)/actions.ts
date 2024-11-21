"use server";

import { afterLoginUrl } from "@/app-config";
import { rateLimitByKey } from "@/lib/limiter";
import { unauthenticatedAction } from "@/lib/safe-action";
import { setSession } from "@/lib/session";
import { loginSchema, userSchema } from "@/app/validation/user";
import { signInUseCase } from "@/use-cases/users/sign-in.use-case";
import { redirect } from "next/navigation";
import { signUpUseCase } from "@/use-cases/users/sign-up.use-case";
import { revalidatePath } from "next/cache";
import { ValidationError } from "@/errors/database";

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
            redirect(afterLoginUrl);
        } catch (error) {
            if (error instanceof ValidationError) {
                throw new ValidationError('Too many sign-in attempts. Please try again later.');
            }
            throw error;
        }
    });

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

            await signUpUseCase({
                ...input,
                hashedPassword: input.password
            });

            revalidatePath("/dashboard/team");
        } catch (error) {
            if (error instanceof ValidationError) {
                throw new ValidationError('Too many sign-up attempts. Please try again later.');
            }
                throw error;
        }
    });