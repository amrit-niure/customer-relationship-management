import { getCurrentUser } from "@/lib/session";
import { AuthenticationError } from "../errors";
import { getAllAppointments } from "@/data-access/appointments";

export async function getAllAppointmentsUseCase() {
    const user = await getCurrentUser();
    if (!user) {
        throw new AuthenticationError();
    }
    return await getAllAppointments();
}