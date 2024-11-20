import { z } from "zod";
import {
    roleEnum,
    branchEnum,
    userStatusEnum,
} from "@/db/schema/enums";
export const userSchema = z.object({
    firstName: z.string().min(2, {
        message: "First name must be at least 2 characters.",
    }),
    middleName: z.string().optional(),
    lastName: z.string().min(2, {
        message: "Last name must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),
    role: z
        .enum(roleEnum.enumValues, {
            errorMap: () => ({
                message: "Invalid role. Must be either 'USER' or 'ADMIN'",
            }),
        })
        .default("USER"),
    title: z.string().min(2, {
        message: "Title must be at least 2 characters.",
    }),
    phoneNumber: z
        .string(),
    branch: z
        .enum(branchEnum.enumValues, {
            errorMap: () => ({ message: "Invalid Branch. " }),
        })
        .default("AUSTRALIA"),
    address: z.string().min(5, {
        message: "Address must be at least 5 characters.",
    }),
    status: z
        .enum(userStatusEnum.enumValues, {
            errorMap: () => ({ message: "Invalid Branch. " }),
        })
        .default("ACTIVE"),
});

export const loginSchema = z.object({
    email: z
        .string()
        .email({ message: "Invalid email address" })
        .max(255, { message: "Email address cannot exceed 255 characters" }),
    password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters long" })
        .max(255, { message: "Password cannot exceed 255 characters" }),
});

export type ISignUp = z.infer<typeof userSchema>;
export type IUserUpdate = Partial<z.infer<typeof userSchema>>;
export type ISignIn = z.infer<typeof loginSchema>;