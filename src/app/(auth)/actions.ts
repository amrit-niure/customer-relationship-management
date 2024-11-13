"use server";

import { afterLoginUrl } from "@/app-config";
import { rateLimitByKey } from "@/lib/limiter";
import { unauthenticatedAction } from "@/lib/safe-action";
import { setSession } from "@/lib/session";
import { loginSchema, userSchema } from "@/schema/user";
import { signInUseCase } from "@/use-cases/users/sign-in.use-case";
import { redirect } from "next/navigation";

export const signInAction = unauthenticatedAction
    .createServerAction()
    .input(loginSchema)
    .handler(async ({ input }) => {
        await rateLimitByKey({ key: input.email, limit: 3, window: 10000 });
        const user = await signInUseCase(input.email, input.password);
        await setSession(user.id);
        redirect(afterLoginUrl);
    });


export const signUpAction = unauthenticatedAction
    .createServerAction()
    .input(userSchema)
    .handler(async ({ input }) => {
        await rateLimitByKey({ key: input.email, limit: 3, window: 10000 });
        await signUpUseCase(input);
    });