import { z } from 'zod'

export const personalInfoSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
})

export const addressSchema = z.object({
  street: z.string().min(5, 'Street address must be at least 5 characters'),
  city: z.string().min(2, 'City must be at least 2 characters'),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, 'Invalid zip code'),
})

export const preferencesSchema = z.object({
  favoriteColor: z.string().min(3, 'Favorite color must be at least 3 characters'),
  communicationPreference: z.enum(['email', 'phone', 'sms'], {
    errorMap: () => ({ message: 'Please select a valid communication preference' }),
  }),
})

export type PersonalInfoFormData = z.infer<typeof personalInfoSchema>
export type AddressFormData = z.infer<typeof addressSchema>
export type PreferencesFormData = z.infer<typeof preferencesSchema>

