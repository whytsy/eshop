import type { Request, Response } from "express"
import ApiError from "../errors/ApiError"
import logger from "../logger/logger"

export const errorHandler = (err: Error, req: Request, res: Response) => {

    if (err instanceof ApiError) {
        logger.warn("Api error", {
            error: err.message,
            path: req.path,
            ip: req.ip
        })

        return res.status(err.status).json({
            errors: [
                {
                    msg: err.message
                }
            ],
            errorStatus: err.status
        })
    }
    if (err instanceof Error) {
        logger.error("Internal error", {
            error: err.message,
            path: req.path,
            ip: req.ip,
            stack: err.stack
        })

        return res.status(500).json({
            errors: [
                {
                    msg: "Internal server error"
                }
            ],
            errorStatus: 500
        })
    }

    logger.error("Unknown error", {
        error: "Unknown error",
        path: req.path,
        ip: req.ip
    })

    return res.status(500).json({
        errors: [
            {
                msg: 'Unknown error...'
            }
        ],
        errorStatus: 500
    })
}