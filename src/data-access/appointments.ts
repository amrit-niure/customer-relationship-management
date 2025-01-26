import { database } from "@/db/connection";
import { appointments, NewAppointments } from "@/db/schema/appointments";

export async function getAllAppointments(){
    const appointments = await database.query.appointments.findMany({
        with: {
            client: true,
        },
    });
    return appointments;
}

export async function createAppointment(input: NewAppointments){
    const appointment = await database.insert(appointments).values(input).returning();
    return appointment;
}