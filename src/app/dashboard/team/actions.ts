"use server"

import { rateLimitByKey } from "@/lib/limiter"
import { authenticatedAction } from "@/lib/safe-action"
import { getAllUsersUseCase } from "@/use-cases/users/get-all-users.use-case";
import { revalidatePath } from "next/cache";
import * as z from "zod";   
import { deleteUserUseCase } from "@/use-cases/users/delete-user.use-case";
import { ValidationError } from "@/errors/database";
import { userSchema } from "@/app/validation/user";
import { updateUserUseCase } from "@/use-cases/users/update-user.use-case";
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
            const result = await deleteUserUseCase(input.id);

            if (result.success) {
                revalidatePath('/dashboard/team');
                return result;
            }
        } catch(error) {
            if (error instanceof ValidationError) {
                throw new ValidationError('Too many sign-up attempts. Please try again later.');
            }
                throw error;
        }
    });

 const updateUserSchema = userSchema.extend({
        id: z.string({
            required_error: "User ID is required for updates",
        })
    })
    export const updateuserAction = authenticatedAction
    .createServerAction()
    .input(updateUserSchema)
    .handler(async ({ input }) => {
        try {
            await rateLimitByKey({
                key: input.email,
                limit: 3,
                window: 10000
            });
console.log(input)
            await updateUserUseCase({
                firstName: input.firstName,
                middleName: input.middleName,
                lastName: input.lastName,
                email: input.email,
                title: input.title,
                phoneNumber: input.phoneNumber,
                branch: input.branch,
                address: input.address,
                role: input.role,
                status: input.status,
                ...(input.password && { hashedPassword: input.password })
            }, input.id);

            revalidatePath("/dashboard/team");
        } catch (error) {
            if (error instanceof ValidationError) {
                throw new ValidationError('Too many update attempts. Please try again later.');
            }
            throw error;
        }
    });

