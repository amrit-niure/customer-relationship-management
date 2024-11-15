import { getAllUsers } from "@/data-access/users";

export async function getAllUsersUseCase() {
    return await getAllUsers();
}