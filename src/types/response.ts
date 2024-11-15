import { AppError } from "@/errors/common";

export type Response<T, E = AppError> =
    | { success: true; data: T }
    | { success: false; error: E };

export const ok = <T>(data: T): Response<T> => ({
    success: true,
    data
});

export const err = <E>(error: E): Response<never, E> => ({
    success: false,
    error
});