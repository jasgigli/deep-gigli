// lib/utils/error.js
// Example custom error classes

export class ApiError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.name = "ApiError";
    }
}

export class ValidationError extends Error {
    constructor(message, errors) {
        super(message);
        this.errors = errors; // Array of validation errors
        this.name = "ValidationError";
    }
}

// ... more custom error classes as needed ...

export const errorHandler = (error, req, res, next) => {
    console.error("Global Error Handler:", error); // Log error details

    if (error instanceof ApiError) {
        res.status(error.statusCode).json({ error: error.message });
    } else if (error instanceof ValidationError) {
        res.status(400).json({ error: error.message, validationErrors: error.errors });
    }
    else {
        // Generic server error
        res.status(500).json({ error: "Internal Server Error" });
    }
    next(); // Important to call next to finish the request cycle (even if error is handled)
};