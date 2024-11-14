"use server"

import { rateLimitByKey } from "@/lib/limiter"
import { authenticatedAction } from "@/lib/safe-action"
import { getAllUsersUseCase } from "@/use-cases/users/get-all-users.use-case";
import { revalidatePath } from "next/cache";
import * as z from "zod";   
import { deleteUserUseCase } from "@/use-cases/users/delete-user.use-case";
import { ValidationError } from "@/errors/database";
export const getAllUsersAction = authenticatedAction
.createServerAction()
.handler(async () => {
    await rateLimitByKey({ key: "getAllUsers", limit: 3, window: 10000 });
    return await getAllUsersUseCase();
});

export const deleteUserAction = authenticatedAction.createServerAction()
    .input(
        z.object({
            id: z.string().uuid(),
        })
    )
    .handler(async ({input}) => {
        try {
            await rateLimitByKey({
                key: `deleteUser-${input.id}`,
                limit: 3,
                window: 10000
            });
        } catch {
            throw new ValidationError('Too many delete attempts. Please try again later.');
        }

        const result = await deleteUserUseCase(input.id);

        if (result.success) {
            revalidatePath('/dashboard/team');
            return result;
        }

        throw result.error;
    });