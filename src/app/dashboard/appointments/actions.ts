import { rateLimitByKey } from "@/lib/limiter";
import { authenticatedAction } from "@/lib/safe-action";
import { getAllAppointmentsUseCase } from "@/use-cases/appointments/get-all-appointments.use-case";

export const getAllAppointmentsAction = authenticatedAction.createServerAction().handler(async () => {
    await rateLimitByKey({
        key: "getAllAppointments",
        limit: 3,
        window: 10000
    });
    return await getAllAppointmentsUseCase();
})