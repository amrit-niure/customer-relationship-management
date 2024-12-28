import { deleteClient } from "@/data-access/client";
import { getCurrentUser } from "@/lib/session";
import { AuthenticationError } from "../errors";

export async function deleteClientUseCase(id: string) {
    const user = await getCurrentUser();
    if (!user) {
        throw new AuthenticationError();
    }
    return await deleteClient(id)
}