import { database } from "@/db/connection";

export async function getAllAppointments(){
    const appointments = await database.query.appointments.findMany({
        with: {
            client: true,
        },
    });
    return appointments;
}