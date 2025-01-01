import { visaTypeEnum } from "@/db/schema";
import { z } from 'zod';

export const clientBasicInfoSchema = z.object({
  id:z.string().optional(),
  firstName: z.string().min(3).max(100),
  middleName: z.string().max(100).optional(),
  lastName: z.string().min(3).max(100),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must have at least 10 digits").max(15, "Phone number is too long"),
  address: z.string().max(100).optional(),
  isActive: z.boolean().optional(),
});
export const clientVisaInfoSchema = z.object({
  dateOfBirth: z.coerce.date().optional(),
  firstLandedOn: z.coerce.date().optional(),
  firstLandedVisa: z.enum(visaTypeEnum.enumValues).optional(),
  passportNumber: z.string().max(100).optional(),
  currentVisa: z.enum(visaTypeEnum.enumValues).optional(),
  visaExpiry: z.coerce.date().optional(),
});
export const clientDocumentsSchema = z.object({
  documentName: z.string(),
});

export const clientSchemaFull = z.object({
  basicInfo: clientBasicInfoSchema,
  visaInfo: clientVisaInfoSchema,
  documents: z.array(clientDocumentsSchema),
});

export type IClientBasicInfo = z.infer<typeof clientBasicInfoSchema>;
export type IClientBasicInfoUpdate = Partial<z.infer<typeof clientBasicInfoSchema>>;
export type IClientVisaInfo = z.infer<typeof clientVisaInfoSchema>;
export type IClientVisaInfoUpdate = Partial<z.infer<typeof clientVisaInfoSchema>>;
export type IClientDocuments = z.infer<typeof clientDocumentsSchema>;
export type IClientDocumentsUpdate = Partial<z.infer<typeof clientDocumentsSchema>>;