import { database } from "@/db/connection";
import crypto from "crypto";
import * as argon from "@node-rs/argon2";

export const ITERATIONS = 10000;

export async function generateRandomToken(length: number) {
    const buf = await new Promise<Buffer>((resolve, reject) => {
        crypto.randomBytes(Math.ceil(length / 2), (err, buf) => {
            if (err !== null) {
                reject(err);
            } else {
                resolve(buf);
            }
        });
    });

    return buf.toString("hex").slice(0, length);
}

export async function createTransaction<T extends typeof database>(
    cb: (trx: T) => void
) {
    await database.transaction(cb as any);
}

export async function hashPassword(plainTextPassword: string): Promise<string> {
    try {
        const hash = await argon.hash(plainTextPassword);
        return hash;
    } catch (err) {
        console.log(err);
        throw new Error("Error hashing password");
    }
}