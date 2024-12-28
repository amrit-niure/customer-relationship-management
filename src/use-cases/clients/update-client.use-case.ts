import { NewClient } from "@/db/schema/clients";
import { getCurrentUser } from "@/lib/session";
import { AuthenticationError } from "../errors";
import { getClientById, updateClient } from "@/data-access/client";

export async function updateClientUseCase(
    values: Partial<NewClient>,
    id: string,
) {
    const user = await getCurrentUser();
    if (!user) {
        throw new AuthenticationError();
    }
    if (!id) {
        return new Error("No Id Provided")
    }
    const existingClient = await getClientById(id);
    if (!existingClient) {
        throw new Error("Client not found");
    }
    return await updateClient(values, id)
}