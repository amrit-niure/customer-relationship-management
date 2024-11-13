class DatabaseError extends Error {
    constructor(
        message: string,
        public details: Record<string, any>,
        public originalError: Error,
    ) {
        super(message);
        this.name = "DatabaseError";
    }
}

class InvalidInputError extends DatabaseError {
    constructor(
        message: string,
        details: Record<string, any>,
        originalError: Error,
    ) {
        super(message, details, originalError);
        this.name = "InvalidInputError";
    }
}

class UniqueConstraintViolationError extends DatabaseError {
    constructor(
        message: string,
        details: Record<string, any>,
        originalError: Error,
    ) {
        super(message, details, originalError);
        this.name = "UniqueConstraintViolationError";
    }
}

class ForeignKeyConstraintViolationError extends DatabaseError {
    constructor(
        message: string,
        details: Record<string, any>,
        originalError: Error,
    ) {
        super(message, details, originalError);
        this.name = "ForeignKeyConstraintViolationError";
    }
}

class NotNullConstraintViolationError extends DatabaseError {
    constructor(
        message: string,
        details: Record<string, any>,
        originalError: Error,
    ) {
        super(message, details, originalError);
        this.name = "NotNullConstraintViolationError";
    }
}

class CheckConstraintViolationError extends DatabaseError {
    constructor(
        message: string,
        details: Record<string, any>,
        originalError: Error,
    ) {
        super(message, details, originalError);
        this.name = "CheckConstraintViolationError";
    }
}

export function handleDatabaseError(
    error: unknown,
    operation: string,
    data?: any,
): Error {
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
                `Unique constraint violation: ${constraint}`,
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

        // Default case: unknown database error
        return new DatabaseError(
            `Database operation failed: ${operation}`,
            details,
            error,
        );
    }

    // If it's not an Error instance, wrap it in a DatabaseError
    return new DatabaseError(
        `Unknown error during ${operation}`,
        { operation, data },
        new Error(String(error)),
    );
}