import { database } from "@/db/connection";
import { eq } from "drizzle-orm";
import { NewUser, User, users } from "@/db/schema";
import * as argon from "@node-rs/argon2";
import { handleDatabaseError, NotFoundError } from "@/errors/database";
import { err, ok, Response}  from "@/types/response";

export async function getUser(userId: string) {
    const user = await database.query.users.findFirst({
        where: eq(users.id, userId),
    });
    return user;
}

export async function getAllUsers() {
    const users = await database.query.users.findMany();
    return users;
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
        console.log(err);
        throw new Error("Error verifying password");
    }

}
  export async function createUser(input: NewUser): Promise < User > {
    try {
        const query = database.insert(users).values(input).returning();
        const [created] = await query.execute();
        if(created) {
            return created;
        } else {
            throw new Error("User creation failed.");
        }
    } catch(err) {
        console.log(err);
        console.error("Error in createUser:", err);
        throw handleDatabaseError(err, "user creation", input);
    }
}

export const deleteUser = async (id: string): Promise<Response<User>> => {
    try {
        const deletedUser = await database.delete(users)
            .where(eq(users.id, id))
            .returning();

        if (!deletedUser.length) {
            return err(new NotFoundError('User'));
        }

        return ok(deletedUser[0]);
    } catch (error) {
        return err(handleDatabaseError(
            error,
            'delete',
            'user'
        ));
    }
};
