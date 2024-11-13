import { database } from "@/db/connection";
import { eq } from "drizzle-orm";
import { users } from "@/db/schema";
import * as argon from "@node-rs/argon2";

export async function getUser(userId: string) {
    const user = await database.query.users.findFirst({
        where: eq(users.id, userId),
    });
    return user;
}

export async function getUserByEmail(email: string) {
    const user = await database.query.users.findFirst({
        where: eq(users.email, email),
    });

    return user;
}

export async function verifyPassword(email: string, plainTextPassword: string) {
    const user = await getUserByEmail(email);

    if (!user) {
        return false;
    }
    try {
        const isMatch = await argon.verify(user.hashedPassword, plainTextPassword);
        return isMatch;
    } catch (err) {
        throw new Error("Error verifying password");
    }

}