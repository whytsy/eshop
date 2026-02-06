import type { NextFunction, Request, Response } from "express";
import tokenService from "../service/tokenService";
import { UserDto } from "../dto/User.dto";
import logger from "../logger/logger";

declare global {
    namespace Express {
        interface Request {
            user?: UserDto;
        }
    }
}

export const ROLES = {
    USER: 'USER',
    MODERATOR: 'MODERATOR',
    ADMIN: 'ADMIN',
    SUPERADMIN: 'SUPERADMIN'
} as const;

export type ROLE = keyof typeof ROLES;

const ROLE_HIERARCHY = {
    [ROLES.USER]: 0,
    [ROLES.MODERATOR]: 1,
    [ROLES.ADMIN]: 2,
    [ROLES.SUPERADMIN]: 3
};

export const isValidRole = (role: string) => {
    return Object.keys(ROLES).includes(role)
}

export function isGreaterRole(
    firstRole: ROLE,
    secondRole: ROLE
) {
    return ROLE_HIERARCHY[firstRole] > ROLE_HIERARCHY[secondRole]
}

function hasRequiredRole(
    userRole: ROLE, 
    requiredRole: ROLE
): boolean {
    return isValidRole(userRole) && ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[requiredRole];
}

export const checkRole = (role: ROLE) => {
    return function (req: Request, res: Response, next: NextFunction) {
        if (req.method == "OPTIONS") {
            return next()
        }
        try {
            logger.info("Restricted access attempt", {
                path: req.path,
                ip: req.ip
            })

            const token = req.headers.authorization?.split(" ")[1]
            if (!token) {
                logger.warn("Restricted access attempt", {
                    error: "No token provided",
                    path: req.path,
                    ip: req.ip
                })

                return res.status(401).json({message: "Unauthorized"})
            }
            const decoded = tokenService.validateAccessToken(token)
            if (!decoded) {
                logger.warn("Restricted access attempt", {
                    error: "Wrong access token",
                    path: req.path,
                    ip: req.ip
                })

                return res.status(401).json({message: "Unauthorized"})
            }
            if (!hasRequiredRole(decoded.role, role)) {
                logger.warn("Restricted access attempt", {
                    error: `${decoded.role} can't access the resource`,
                    path: req.path,
                    ip: req.ip
                })

                return res.status(403).json({message: "Forbidden"})
            }
            req.user = decoded
            next()
        } catch(e) {
            logger.error("Restricted access attempt", {
                error: e instanceof Error ? e.message : 'Unknown error',
                path: req.path,
                ip: req.ip
            })

            return res.status(401).json({message: "Unauthorized"})
        }
    }
}

export const checkRoleOnly = (role: ROLE) => {
    return function (req: Request, res: Response, next: NextFunction) {
        if (req.method == "OPTIONS") {
            return next()
        }
        try {
            logger.info("Restricted access attempt", {
                path: req.path,
                ip: req.ip
            })

            const token = req.headers.authorization?.split(" ")[1]
            if (!token) {
                logger.warn("Restricted access attempt", {
                    error: "No token provided",
                    path: req.path,
                    ip: req.ip
                })

                return res.status(401).json({message: "Unauthorized"})
            }
            const decoded = tokenService.validateAccessToken(token)
            if (!decoded) {
                logger.warn("Restricted access attempt", {
                    error: "Wrong access token",
                    path: req.path,
                    ip: req.ip
                })

                return res.status(401).json({message: "Unauthorized"})
            }
            if (decoded.role !== role) {
                logger.warn("Restricted access attempt", {
                    error: `${decoded.role} can't access the resource`,
                    path: req.path,
                    ip: req.ip
                })

                return res.status(403).json({message: "Forbidden"})
            }
            req.user = decoded
            next()
        } catch(e) {
            logger.error("Restricted access attempt", {
                error: e instanceof Error ? e.message : 'Unknown error',
                path: req.path,
                ip: req.ip
            })

            return res.status(401).json({message: "Unauthorized"})
        }
    }
}