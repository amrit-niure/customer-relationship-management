import { getCurrentUser } from "@/lib/session";
import { LoginError } from "../errors";
import { createUser, getUserByEmail } from "@/data-access/users";
import { UnauthorizedError } from "@/errors/common";
import { NewUser } from "@/db/schema";
import * as argon from "@node-rs/argon2";

export async function signUpUseCase(input: NewUser) {
    const user = await getCurrentUser();
    if (!user) {
        throw new LoginError();
    }
    if (user.role !== "ADMIN") {
        throw new UnauthorizedError("Only admins can create new user.");
    }
    const existingUser = await getUserByEmail(input.email);
    if (existingUser) {
        throw new Error("User already exists");
    }
    const hashedPassword = await argon.hash(input.hashedPassword);
    const newUserData = { ...input, hashedPassword: hashedPassword }
    await createUser(newUserData);
}