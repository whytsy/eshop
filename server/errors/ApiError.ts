class ApiError extends Error {
    status: number;
    message: string;
    
    constructor(status: number, message: string) {
        super()
        this.status = status
        this.message = message
    }

    static badRequest(message: string = 'Bad request') {
        return new ApiError(400, message)
    }

    static notFound(message: string = 'Not found') {
        return new ApiError(404, message)
    }

    static internal(message: string = 'Internal server error') {
        return new ApiError(500, message)
    }

    static forbidden(message: string = 'Forbidden') {
        return new ApiError(403, message)
    }

    static unauthorized(message: string = 'Unauthorized') {
        return new ApiError(401, message)
    }

    static conflict(message: string = 'Conflict') {
        return new ApiError(409, message)
    }

    static fileTooLarge(message: string = 'File too large') {
        return new ApiError(413, message)
    }

    static unsupportedMediaType(message: string = 'Unsupported media type') {
        return new ApiError(415, message)
    }

    static unavaliable(message: string = 'Unavaliable') {
        return new ApiError(503, message)
    }
}

export default ApiError