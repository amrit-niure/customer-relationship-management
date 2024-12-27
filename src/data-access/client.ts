import { database } from "@/db/connection";
import { eq } from "drizzle-orm";
import { clients } from "@/db/schema";
import { Client, NewClient } from "@/db/schema/clients";
import { handleDatabaseError } from "@/errors/database";

export async function getClientByEmail(email: string) {
    const client = await database.query.clients.findFirst({
        where: eq(clients.email, email),
    });
    return client;
}

export async function getAllClients() {
    const clients = await database.query.clients.findMany();
    return clients;
}

  export async function createClient(input: NewClient): Promise < Client > {
    try {
        const query = database.insert(clients).values(input).returning();
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
