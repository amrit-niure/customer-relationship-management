import { getCurrentUser } from "@/lib/session";
import { AuthenticationError } from "../errors";
import { getAllOfficeVisits } from "@/data-access/office-visits";

export async function getAllOfficeVisitsUseCase() {
    const user = await getCurrentUser();
    if (!user) {
        throw new AuthenticationError();
    }
    return await getAllOfficeVisits();
}