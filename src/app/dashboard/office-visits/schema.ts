import * as z from "zod"

export const officeVisitSchema = z.object({
  appointmentId: z.string().optional(),
  firstName: z.string().min(3).max(100),
  middleName: z.string().max(100).optional(),
  lastName: z.string().min(3).max(100),
  email: z.string(),
  address: z.string().max(100).optional(),
  phone: z.string(),
  dateTime: z.coerce.date(),
  status: z.string(),
  purpose: z.string().max(1000)
});

export type IOfficeVisit = z.infer<typeof officeVisitSchema>;
export type IOfficeVisitUpdate = Partial<z.infer<typeof officeVisitSchema>>;