import { getCurrentUser } from "@/lib/session";
import { AuthenticationError } from "../errors";
import { NewAppointments } from "@/db/schema/appointments";
import { createAppointment } from "@/data-access/appointments";

export const createAppointmentUseCase = async (input: NewAppointments) => {
        const user = await getCurrentUser();
        if (!user) {
            throw new AuthenticationError();
        }
        const data: NewAppointments = {
            ...input,
           bookedBy: user.id
        }
    return await createAppointment(data);
}