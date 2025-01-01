import { getCurrentUser } from "@/lib/session";
import { AuthenticationError } from "../errors";
import { NewFile } from "@/db/schema/files";
import { getClientById } from "@/data-access/client";
import { createFileRecord } from "@/data-access/files";

export async function createClientFilesUseCase(input: NewFile[], clientId: string) {
    const user = await getCurrentUser();
    if (!user) {
        throw new AuthenticationError();
    }
    const client = getClientById(clientId);
    if (!client) {
        throw new Error("Client not found");
    }

    return await createFileRecord(input, clientId);
}