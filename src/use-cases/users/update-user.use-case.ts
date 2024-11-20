import { User } from "@/db/schema";
import { getCurrentUser } from "@/lib/session";
import { LoginError } from "../errors";
import { UnauthorizedError } from "@/errors/common";
import { getUserByEmail, getUserByPhone, updateUser } from "@/data-access/users";
import * as argon from "@node-rs/argon2";

export async function updateUserUseCase(input: Partial<User>, userId: string) {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        throw new LoginError();
    }
    
    if (currentUser.role !== "ADMIN") {
        throw new UnauthorizedError("Only admins can update users.");
    }

    // Check if email is being changed and if it's already taken
    if(input.email){
        const existingUserByEmail = await getUserByEmail(input.email);
        if (existingUserByEmail && existingUserByEmail.id !== userId) {
            throw new Error("Email already in use by another user");
        }
    }

    // Check if phone number is being changed and if it's already taken
    if(input.phoneNumber){
        const existingUserByPhone = await getUserByPhone(input.phoneNumber);
        if (existingUserByPhone && existingUserByPhone.id !== userId) {
            throw new Error("Phone number already in use by another user");
        }
    }

    const updateData: Partial<User>= {
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
    };

    // Only hash and update password if it's provided
    if (input.hashedPassword) {
        updateData.hashedPassword = await argon.hash(input.hashedPassword);
    }
    await updateUser(updateData, userId);
}