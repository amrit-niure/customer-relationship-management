// Base AppError class with HTTP status properties
import { redirect } from 'next/navigation';
export class AppError extends Error {
    public statusCode: number;
    public status: string;
    public isOperational: boolean;
    public details?: Record<string, any>;
    
    constructor(message: string, statusCode: number, details?: Record<string, any>) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;
        this.details = details;
        Error.captureStackTrace(this, this.constructor);
    }
}
// Authentication errors
export const AUTHENTICATION_ERROR_MESSAGE = "You must be logged in to view this content";

export class UnauthenticatedError extends AppError {
    public redirectPath: string;

    constructor(
        message: string = AUTHENTICATION_ERROR_MESSAGE,
        details?: Record<string, any>,
        redirectPath: string = "/sign-in"
    ) {
        super(message, 401, details);
        this.name = "UnauthenticatedError";
        this.redirectPath = redirectPath;
    }

    handleRedirect() {
        redirect(this.redirectPath);
    }

    // Optional method for more explicit error handling
    toRedirectResponse() {
        return {
            redirect: {
                destination: this.redirectPath,
                permanent: false
            }
        };
    }
}

export class UnauthorizedError extends AppError {
    constructor(message: string = "You are not authorized to perform this action", details?: Record<string, any>) {
        super(message, 403, details);
        this.name = "UnauthorizedError";
    }
}
