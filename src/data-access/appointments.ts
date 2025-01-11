import { database } from "@/db/connection";
import { Appointments } from "@/db/schema/appointments";

export async function getAllAppointments(){
    const appointments = await database.query.appointments.findMany({
        with: {
            client: true,
        },
    });
    return appointments;
}