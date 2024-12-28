import { getAllClients, getClient } from "@/data-access/client";
import { getCurrentUser } from "@/lib/session";
import { AuthenticationError } from "../errors";

export async function getClientUseCase(id: string) {
    const user = await getCurrentUser();
    if (!user) {
        throw new AuthenticationError();
    }
    return await getClient(id)
}
export async function getAllClientsUseCase() {
    const user = await getCurrentUser();
    if (!user) {
        throw new AuthenticationError();
    }
    return await getAllClients()
}