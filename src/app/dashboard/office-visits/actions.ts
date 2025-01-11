"use server"
import { rateLimitByKey } from "@/lib/limiter";
import { authenticatedAction } from "@/lib/safe-action";
import { getAllOfficeVisitsUseCase } from "@/use-cases/office-visits/get-all-office-visits.use-case";

export const getAllOfficeVisitsAction = authenticatedAction.createServerAction().handler(async () => {
    await rateLimitByKey({
        key: "getAllOfficeVisits",
        limit: 3,
        window: 10000
    });
    return await getAllOfficeVisitsUseCase();
})