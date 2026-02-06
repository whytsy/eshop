import type { NextFunction, Request, Response } from "express"
import tokenService from "../service/tokenService"
import logger from "../logger/logger"

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.method === "OPTIONS") {
        return next()
    }

    try {
        const token = req.headers.authorization?.split(" ")[1]

        if (!token) {
            logger.warn("Access attempt without token", {
                path: req.path,
                ip: req.ip
            })

            return res.status(401).json({
                errors: [
                    {
                        msg: "Unauthorized"
                    }
                ]
            })
        }
        const decoded = tokenService.validateAccessToken(token)

        if (!decoded) {
            logger.warn("Wrong token provided", {
                path: req.path,
                ip: req.ip
            })

            return res.status(401).json({
                errors: [
                    {
                        msg: "Unauthorized"
                    }
                ]
            })
        }
        req.user = {id: decoded.id, email: decoded.email, role: decoded.role}
        next()
    } catch (e) {
        logger.warn("Auth check error", {
            error: e instanceof Error ? e.message : 'Unknown error',
            path: req.path,
            ip: req.ip
        })

        return res.status(401).json({
                errors: [
                    {
                        msg: "Unauthorized"
                    }
                ]
            })
    }
    
}