import { AppError } from "./common";

// General ValidationError for request validation issues
export class ValidationError extends AppError {
    constructor(message: string, details?: Record<string, any>) {
        super(message, 400, details);
        this.name = "ValidationError";
    }
}

// NotFoundError for missing resources
export class NotFoundError extends AppError {
    constructor(resource: string, details?: Record<string, any>) {
        super(`${resource} not found`, 404, details);
        this.name = "NotFoundError";
    }
}

// Database errors with sub-classes for specific constraint issues
export class DatabaseError extends AppError {
    constructor(message: string, details: Record<string, any>, _originalError: Error) {
        super(message, 500, details);
        this.name = "DatabaseError";
    }
}

export class InvalidInputError extends DatabaseError {
    constructor(message: string, details: Record<string, any>, originalError: Error) {
        super(message, details, originalError);
        this.name = "InvalidInputError";
    }
}

export class UniqueConstraintViolationError extends DatabaseError {
    constructor(message: string, details: Record<string, any>, originalError: Error) {
        super(message, details, originalError);
        this.name = "UniqueConstraintViolationError";
    }
}

export class ForeignKeyConstraintViolationError extends DatabaseError {
    constructor(message: string, details: Record<string, any>, originalError: Error) {
        super(message, details, originalError);
        this.name = "ForeignKeyConstraintViolationError";
    }
}

export class NotNullConstraintViolationError extends DatabaseError {
    constructor(message: string, details: Record<string, any>, originalError: Error) {
        super(message, details, originalError);
        this.name = "NotNullConstraintViolationError";
    }
}

export class CheckConstraintViolationError extends DatabaseError {
    constructor(message: string, details: Record<string, any>, originalError: Error) {
        super(message, details, originalError);
        this.name = "CheckConstraintViolationError";
    }
}

// Function to handle and map database errors
export function handleDatabaseError(
    error: unknown,
    operation: string,
    data?: any,
): AppError {
    if (error instanceof Error) {
        const errorMessage = error.message.toLowerCase();
        const details = { operation, data };

        if (errorMessage.includes("invalid input syntax")) {
            const match = errorMessage.match(/column "(\w+)".*value "(.+)"/);
            const field = match ? match[1] : "unknown";
            const value = match ? match[2] : "unknown";
            return new InvalidInputError(
                `Invalid input for ${field}: "${value}"`,
                { ...details, field, value },
                error,
            );
        }

        if (errorMessage.includes("unique constraint")) {
            const match = errorMessage.match(/unique constraint "(\w+)"/);
            const constraint = match ? match[1] : "unknown";
            return new UniqueConstraintViolationError(
                `Unique constraint violation. Please specify unique ${constraint.replace("_unique", "").replace(/_/g, " ")}`, 
                { ...details, constraint },
                error,
            );
        }

        if (errorMessage.includes("foreign key constraint")) {
            const match = errorMessage.match(/foreign key constraint "(\w+)"/);
            const constraint = match ? match[1] : "unknown";
            return new ForeignKeyConstraintViolationError(
                `Foreign key constraint violation: ${constraint}`,
                { ...details, constraint },
                error,
            );
        }

        if (errorMessage.includes("not-null constraint")) {
            const match = errorMessage.match(/column "(\w+)"/);
            const column = match ? match[1] : "unknown";
            return new NotNullConstraintViolationError(
                `Not-null constraint violation on column: ${column}`,
                { ...details, column },
                error,
            );
        }

        if (errorMessage.includes("check constraint")) {
            const match = errorMessage.match(/check constraint "(\w+)"/);
            const constraint = match ? match[1] : "unknown";
            return new CheckConstraintViolationError(
                `Check constraint violation: ${constraint}`,
                { ...details, constraint },
                error,
            );
        }

        // // Default case for unknown database error
        // return new DatabaseError(
        //     `Database operation failed: ${operation}`,
        //     details,
        //     error,
        // );
    }

    // Wrap non-Error instances in a DatabaseError
    return new DatabaseError(
        `Unknown error during ${operation}`,
        { operation, data },
        new Error(String(error)),
    );
}