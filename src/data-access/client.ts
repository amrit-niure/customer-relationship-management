import { database } from "@/db/connection";
import { eq } from "drizzle-orm";
import { clients } from "@/db/schema";
import { Client, NewClient } from "@/db/schema/clients";
import { handleDatabaseError } from "@/errors/database";

export async function getClientById(id: string) {
    const client = await database.query.clients.findFirst({
        where: eq(clients.id, id),
    });
    return client;
}
export async function getClientByEmail(email: string) {
    const client = await database.query.clients.findFirst({
        where: eq(clients.email, email),
    });
    return client;
}
export async function getClientByPhone(phone: string) {
    const client = await database.query.clients.findFirst({
        where: eq(clients.phone, phone),
    });
    return client;
}
export async function getClientByPassport(passport: string) {
    const client = await database.query.clients.findFirst({
        where: eq(clients.passportNumber, passport),
    });
    return client;
}

export async function getAllClients() {
    const clients = await database.query.clients.findMany();
    return clients;
}
export async function getClient(id: string) {
    const client = await database.query.clients.findFirst({
        where: eq(clients.id, id)
    });
    return client;
}
export async function deleteClient(id: string) {
    try {
        await database.delete(clients).where(eq(clients.id, id));
        return {
            success: true,
            message: "Client deleted successfully"
        }
    } catch (error) {
        throw error
    }
}

export async function createClient(input: NewClient): Promise<Client> {
    try {
        
        const query = database.insert(clients).values(input).returning();
        const [created] = await query.execute();
        if (created) {
            return created;
        } else {
            throw new Error("Client creation failed.");
        }
    } catch (err) {
        throw handleDatabaseError(err, "client creation", input);
    }
}
export async function updateClient(input: Partial<NewClient>, id: string): Promise<Client> {
    try {
        const query = database.update(clients).set(input).where(eq(clients.id, id)).returning();
        const [updated] = await query.execute();
        if (updated) {
            return updated;
        } else {
            throw new Error("Client update failed.");
        }
    } catch (err) {
        throw handleDatabaseError(err, "Client update", input);
    }
}

