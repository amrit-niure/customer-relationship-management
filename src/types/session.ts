import { z } from 'zod';

export const sessionSchema = z.object({
    id: z.string(),
    userId: z.string(),
    expiresAt: z.date(),
});

type CookieAttributes = {
    secure?: boolean;
    path?: string;
    domain?: string;
    sameSite?: 'lax' | 'strict' | 'none';
    httpOnly?: boolean;
    maxAge?: number;
    expires?: Date;
};

export type Cookie = {
    name: string;
    value: string;
    attributes: CookieAttributes;
};

export type Session = z.infer<typeof sessionSchema>;
