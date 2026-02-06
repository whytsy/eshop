import { DatabaseError, ForeignKeyConstraintError, UniqueConstraintError, ValidationError } from "sequelize";
import ApiError from "./ApiError";

export class DbErrorHandler {
    static handle(error: unknown): never {
        if (error instanceof UniqueConstraintError) {
            const message = "Field is not unique"
            throw ApiError.conflict(message)
        }

        if (error instanceof ValidationError) {
            const messages = error.errors.map(e => e.message)
            throw ApiError.badRequest(messages.join(", "))
        }

        if (error instanceof ForeignKeyConstraintError) {
            throw ApiError.notFound("Entity doesn't exist")
        }

        if (error instanceof DatabaseError) {
            if (error.message.includes('connection')) {
                throw ApiError.unavaliable('Service unavailable')
            }
        }

        throw error
    }
}