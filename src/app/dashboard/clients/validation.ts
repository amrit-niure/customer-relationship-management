import { visaTypeEnum } from "@/db/schema";
import * as z from "zod";
export const clientSchema = z.object({
    firstName: z.string().min(3).max(100),
    middleName: z.string().max(100).optional(),
    lastName: z.string().min(3).max(100),
    email: z.string(),
    phone: z.string(),
    address: z.string().max(100).optional(),
    passportNumber: z.string().max(100).optional(),
    currentVisa: z
        .enum(visaTypeEnum.enumValues, {
            errorMap: () => ({ message: "Invalid Visa type. " }),
        }),
    visaExpiry: z.coerce.date().optional(),
    isActive: z.boolean().optional(),
});

export type IClient = z.infer<typeof clientSchema>;
export type IClientUpdate = Partial<z.infer<typeof clientSchema>>;