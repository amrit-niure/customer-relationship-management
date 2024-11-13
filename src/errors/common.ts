export const AUTHENTICATION_ERROR_MESSAGE =
    "You must be logged in to view this content";
    
export class UnauthenticatedError extends Error {
    constructor(message: string, options?: ErrorOptions) {
        super(message, options);
    }
}

export class UnauthorizedError extends Error {
    constructor(message: string, options?: ErrorOptions) {
        super(message, options);
    }
}


export const AuthenticationError = class AuthenticationError extends Error {
    constructor() {
        super(AUTHENTICATION_ERROR_MESSAGE);
        this.name = "AuthenticationError";
    }
};

export const NotFoundError = class NotFoundError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "NotFoundError";
    }
};

export class AppError extends Error {
    constructor(public message: string, public statusCode: number) {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
