import { z } from "zod";
import { appointmentStatusEnum } from "@/db/schema/enums";

export const appointmentSchema = z.object({
    firstName: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    lastName: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    address: z.string().min(5, {
        message: "Address must be at least 5 characters.",
    }),
    phone: z
        .string()
        .regex(
            /^\+?\d{1,3}?[\s\-\.]?\(?\d{1,4}\)?[\s\-\.]?\d{1,4}[\s\-\.]?\d{1,9}$/,
            {
                message: "Phone number must be 10 digits.",
            },
        ),
    status: z
        .enum(appointmentStatusEnum.enumValues, {
            errorMap: () => ({ message: "Invalid Branch. " }),
        })
        .default("CONFIRMED"),
    appointmentDate: z.string({
        required_error: "Please select a date.",
    }),
    appointmentTime: z.string(),
    reasonOfVisit: z.string().max(500, "Max word limit reached"),
});

export type IAppointment = z.infer<typeof appointmentSchema>;