import type { NextFunction, Request, Response } from "express";
import ApiError from "../errors/ApiError";
import BrandService from "../service/brandService";

class BrandController {

    async getAll(req: Request, res: Response) {
        const brands = await BrandService.getAll()
        return res.status(200).json(brands)
    }

    async getOne(req: Request, res: Response, next: NextFunction) {
        const {id} = req.params
        if (!id) {
            return next(ApiError.badRequest("Id is required"))
        }

        const brand = await BrandService.getOne(id)
        return res.status(200).json(brand)
    }

    async create(req: Request, res: Response, next: NextFunction) {
        const {name} = req.body
        if (!name) {
            return next(ApiError.badRequest("Brand name is requred"))
        }

        const brand = await BrandService.create(name)
        return res.status(201).json(brand)
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        const {id} = req.params
        if (!id) {
            return next(ApiError.badRequest("Id is required"))
        }

        await BrandService.delete(id)
        return res.sendStatus(204)
    }

    async changeName(req: Request, res: Response, next: NextFunction) {
        const {id} = req.params
        const {name} = req.body
        if (!id || !name) {
            return next(ApiError.badRequest("Id is required"))
        }

        const brand = await BrandService.changeName(id, name)
        return res.status(200).json(brand)
    }
}

export default new BrandController()