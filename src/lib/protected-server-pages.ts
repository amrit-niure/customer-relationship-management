import { redirect } from "next/navigation";
import { UnauthenticatedError } from "@/errors/common";
import { assertAuthenticated } from "@/lib/session";

export function withServerAuth<T extends (...args: any[]) => Promise<any>>(
    fn: T
) {
    return async (...args: Parameters<T>): Promise<ReturnType<T>> => {
        try {
            await assertAuthenticated();
            return await fn(...args);
        } catch (error) {
            if (error instanceof UnauthenticatedError) {
                redirect(error.redirectPath || "/sign-in");
            }
            throw error;
        }
    };
}
