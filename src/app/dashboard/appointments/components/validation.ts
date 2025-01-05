import { z } from "zod";
import { appointmentStatusEnum } from "@/db/schema/enums";

export const appointmentSchema = z.object({
    firstName: z.string().min(2).max(100),
    middleName: z.string().max(100).optional(),
    lastName: z.string().min(2).max(100),
    email: z.string().optional(),
    address: z.string().min(0).max(100).optional(),
    phone: z.string(),
    status: z
    .enum(appointmentStatusEnum.enumValues, {
        errorMap: () => ({ message: "Invalid Branch. " }),
    })
    .default("SCHEDULED"),
    dateTime: z.coerce.date(),
    reason: z.string().optional()
    })

export type IAppointment = z.infer<typeof appointmentSchema>;