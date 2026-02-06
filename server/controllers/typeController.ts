import type { NextFunction, Request, Response } from "express";
import ApiError from "../errors/ApiError";
import TypeService from "../service/typeService";

class TypeController {

    async getAll(req: Request, res: Response) {
        const types = await TypeService.getAll()
        return res.status(200).json(types)
    }

    async getOne(req: Request, res: Response, next: NextFunction) {
        const {id} = req.params
        if (!id) {
            return next(ApiError.badRequest("Id is required"))
        }

        const type = await TypeService.getOne(id)
        return res.status(200).json(type)
    }

    async create(req: Request, res: Response, next: NextFunction) {
        const {name} = req.body
        if (!name) {
            return next(ApiError.badRequest("Type name is requred"))
        }

        const type = await TypeService.create(name)
        return res.status(201).json(type)
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        const {id} = req.params
        if (!id) {
            return next(ApiError.badRequest("Id is required"))
        }

        await TypeService.delete(id)
        return res.sendStatus(204)
    }

    async changeName(req: Request, res: Response, next: NextFunction) {
        const {id} = req.params
        const {name} = req.body
        if (!id || !name) {
            return next(ApiError.badRequest("Id is required"))
        }

        const type = await TypeService.changeName(id, name)
        return res.status(200).json(type)
    }
}

export default new TypeController()