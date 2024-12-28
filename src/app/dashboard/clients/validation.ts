import { visaTypeEnum } from "@/db/schema";
import { z } from 'zod';

export const clientSchema = z.object({
  id:z.string().optional(),
  firstName: z.string().min(3).max(100),
  middleName: z.string().max(100).optional(),
  lastName: z.string().min(3).max(100),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must have at least 10 digits").max(15, "Phone number is too long"),
  address: z.string().max(100).optional(),
  passportNumber: z.string().max(100).optional(),
  currentVisa: z.enum(visaTypeEnum.enumValues).optional(),
  visaExpiry: z.coerce.date().optional(),
  isActive: z.boolean().optional(),
});


export type IClient = z.infer<typeof clientSchema>;
export type IClientUpdate = Partial<z.infer<typeof clientSchema>>;