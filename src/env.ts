import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().min(1),
    ADMIN_EMAIL: z.string().email().min(1),
    ADMIN_PASSWORD: z.string().min(8), 
    JWT_SECRET: z.string().min(2), 
    EMAIL_ID: z.string().email().min(1),
    EMAIL_FROM: z.string().email().min(1),
    RESEND_API_KEY: z.string().min(1),
    EMAIL_SECRET: z.string().min(1),
    NODE_ENV: z.enum(["development", "production", "test"]),
  },
  client: {
    NEXT_PUBLIC_BASE_URL: z.string().url().min(1),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
    JWT_SECRET: process.env.JWT_SECRET,
    EMAIL_ID: process.env.EMAIL_ID,
    EMAIL_SECRET: process.env.EMAIL_SECRET,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    EMAIL_FROM: process.env.EMAIL_FROM,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
  },
});