import { headers } from "next/headers";

export async function getIp() {
    const headerValues = await headers();
    const forwardedFor = headerValues.get("x-forwarded-for");
    const realIp = headerValues.get("x-real-ip");

    if (forwardedFor) {
        return forwardedFor.split(",")[0].trim();
    }

    if (realIp) {
        return realIp.trim();
    }

    return null;
}