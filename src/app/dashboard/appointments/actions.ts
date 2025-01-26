"use server"
import { rateLimitByKey } from "@/lib/limiter";
import { authenticatedAction } from "@/lib/safe-action";
import { getAllAppointmentsUseCase } from "@/use-cases/appointments/get-all-appointments.use-case";
import { appointmentSchema } from "./components/validation";
import { createAppointmentUseCase } from "@/use-cases/appointments/create-appointment.use-case";
import { createClientUseCase } from "@/use-cases/clients/create-client.use-case";
import { NewClient } from "@/db/schema/clients";
import { findClientByEmailOrPhone } from "@/data-access/client";
import { revalidatePath } from "next/cache";

export const getAllAppointmentsAction = authenticatedAction.createServerAction().handler(async () => {
    await rateLimitByKey({
        key: "getAllAppointments",
        window: 10000
    });
    return await getAllAppointmentsUseCase();
})

export const createAppointmentAction = authenticatedAction
    .createServerAction()
    .input(appointmentSchema)
    .handler(async ({ input }) => {
        await rateLimitByKey({
            key: "createAppointment",
            window: 10000,
        });

        const existingClient = await findClientByEmailOrPhone(
            input.email,
            input.phone
        );
        let clientId: string;

        if (existingClient) {
            clientId = existingClient.id;
        } else {
            const userData: NewClient = {
                email: input.email,
                firstName: input.firstName,
                lastName: input.lastName,
                middleName: input?.middleName,
                phone: input.phone,
                address: input?.address,
            };

            const newClient = await createClientUseCase(userData);
            clientId = newClient.id;
        }
        let agentId;
        if (input.agentId === 'none' || input.agentId === '') {
            agentId = null;
        }
        const appointmentData = {
            clientId: clientId,
            appointmentDateTime: input.dateTime,
            status: input.status,
            purpose: input.reason,
            agentId: agentId,
            isWalkIn: false,
        };
        const appointment = await createAppointmentUseCase(appointmentData);
        if (appointment) {
            revalidatePath("/dashboard/appointments");
        }
    });