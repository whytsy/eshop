import type { NextFunction, Request, Response } from "express";
import ApiError from "../errors/ApiError";
import UserService from "../service/userService";
import TokenService from "../service/tokenService";
import { isGreaterRole, type ROLE, ROLES } from "../middleware/roleMiddleware";

interface DeviceAddRequest extends Request {
    body: {
        userId: number
        deviceId: number
    }
}

class UserController {

    async registration(req: Request, res: Response, next: NextFunction) {
        const {email, password} = req.body;
        if (!email || !password) {
            return next(ApiError.badRequest("Valid credentials required"))
        }

        await UserService.registration(email, password)
        res.sendStatus(201)
    }

    async login(req: Request, res: Response, next: NextFunction) {
        const {email, password} = req.body;
        if (!email || !password) {
            return next(ApiError.badRequest("Valid credentials required"))
        }
        const data = await UserService.login(email, password)
        res.status(200).json(data)
    }

    async logout(req: Request, res: Response) {
        const {refreshToken} = req.cookies
        await UserService.logout(refreshToken)
        res.status(204)
    }

    async check(req: Request, res: Response) {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            throw ApiError.unauthorized("Unauthorized")
        }

        const token = authHeader.split(' ')[1];

        const decoded = TokenService.validateAccessToken(token)

        if (decoded == null) {
            throw ApiError.unauthorized("Unauthorized")
        }

        return res.status(200).json(decoded)
    }

    async activateAccount(req: Request, res: Response, next: NextFunction) {
        const {link} = req.params
        if (!link) {
            return next(ApiError.badRequest("Full link is required"))
        }

        await UserService.activateAccount(link)
        res.sendStatus(202)
    }

    async refreshToken(req: Request, res: Response, next: NextFunction) {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return next(ApiError.unauthorized("Unauthorized"))
        }

        const refreshData = await UserService.refresh(refreshToken)
        res.status(200).json(refreshData)
    }

    async sendRecoverEmail(req: Request, res: Response) {
        const {email} = req.body
        await UserService.sendRecoverEmail(email)
        res.sendStatus(202)
    }

    async resetPassword(req: Request, res: Response) {
        const {link} = req.params
        const {password} = req.body
        await UserService.recoverPassword(link, password)
        res.sendStatus(200)
    }

    async addToCart(req: DeviceAddRequest, res: Response, next: NextFunction) {
        const userId = req.user!.id
        const deviceId = parseInt(req.params.deviceId)

        if (!deviceId || !userId) {
            return next(ApiError.badRequest("Invalid arguments"))
        }

        await UserService.addToCart(userId, deviceId)

        res.sendStatus(200)
    }

    async getCart(req: Request, res: Response) {
        const userId = req.user!.id
        const cart = await UserService.getCart(userId)
        res.status(200).json(cart)
    }

    async changeCartItemAmount(req: Request, res: Response, next: NextFunction) {
        const userId = req.user!.id
        const deviceId = parseInt(req.params.deviceId)
        const {amount} = req.body

        if (!deviceId || !userId || !amount) {
            return next(ApiError.badRequest("Invalid arguments"))
        }

        await UserService.changeCartItemAmount(userId, deviceId, amount)
        res.sendStatus(200)
    }

    async deleteItemFromCart(req: Request, res: Response) {
        const userId = req.user!.id
        const deviceId = parseInt(req.params.deviceId)

        await UserService.deleteItemFromCart(userId, deviceId)

        res.sendStatus(204)
    }

    async getAll(req: Request, res: Response) {
        const userRole = req.user!.role
        
        const acceptedRoles = Object.keys(ROLES).filter(role => 
            isGreaterRole(userRole, role as ROLE)
        )

        const users = await UserService.getAll(acceptedRoles as ROLE[])

        return res.status(200).json(users)
    }

    async changeRole(req: Request, res: Response, next: NextFunction) {
        const user = req.user
        const {id} = req.params
        const {role} = req.body

        if (!id || !role) {
            return next(ApiError.badRequest("Invalid parameters"))
        }

        await UserService.changeRole(id, role, user!.role)

        return res.sendStatus(204)
    }

    async changeEmailRequest(req: Request, res: Response) {
        const id = req.user!.id
        const email = req.user!.email
        const {newEmail} = req.body

        await UserService.changeEmailRequest(id, email, newEmail)

        return res.sendStatus(202)
    }

    async confirmEmailChange(req: Request, res: Response) {
        const id = req.user!.id
        const {code} = req.body

        await UserService.confirmEmailChange(id, code)

        return res.sendStatus(202)
    }

    async changeEmail(req: Request, res: Response) {
        const {link} = req.params

        await UserService.changeEmail(link)

        return res.sendStatus(200)
    }
}

export default new UserController()