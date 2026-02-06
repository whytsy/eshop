import type { NextFunction, Request, Response } from "express";
import ApiError from "../errors/ApiError";
import DeviceService from "../service/deviceService";
import { type FileArray, type UploadedFile } from "express-fileupload";

type FileRequest = Request & {
    files?: FileArray | null;
    body: DeviceCreationAttrs;
};

interface DeviceCreationAttrs {
    name: string;
    price: number;
    brandId: number;
    typeId: number;
    info: string;
}

class DeviceController {

    async getAll(req: Request, res: Response) {
        const {page, limit, brandId, typeId, query} = req.query
        const pageNum = page ? String(page) : "1";
        const limitNum = limit ? String(limit) : "5";
        const brandIdNum = brandId ? String(brandId) : undefined;
        const typeIdNum = typeId ? String(typeId) : undefined;
        const queryString = query ? String(query) : "";
        const devices = await DeviceService.getAll(pageNum, limitNum, brandIdNum, typeIdNum, queryString);

        return res.status(200).json(devices)
    }

    async getOne(req: Request, res: Response, next: NextFunction) {
        const {id} = req.params
        if (!id) {
            return next(ApiError.badRequest("Id required"))
        }

        const device = await DeviceService.getOne(id)

        res.status(200).json(device)
    }

    async create(req: FileRequest, res: Response, next: NextFunction) {
        const { name, price, info, brandId, typeId, quantityInStock } = req.body;

        if (!name || !price || !info || !brandId || !typeId || !quantityInStock) {
            return next(ApiError.badRequest("Required data is missing"))
        }

        const files = req.files as {images?: UploadedFile | UploadedFile[] }

        if (!files || !files.images) {
            return next(ApiError.badRequest("At least one image is required"));
        }

        let images: UploadedFile[]

        if (Array.isArray(files.images)) {
            images = files.images;
        } else {
            images = [files.images];
        }

        for (const image of images) {
            if (!image.mimetype.startsWith('image/')) {
                return next(ApiError.unsupportedMediaType(`File ${image.name} is not an image`));
            }
        }

        const data = await DeviceService.create(name, price, info, brandId, typeId, quantityInStock, images)

        res.status(200).json(data)
    }

    async update(req: Request, res: Response, next: NextFunction) {
        const id = parseInt(req.params.id)

        if (!id || isNaN(id)) {
            return next(ApiError.badRequest("Id is required"))
        }

        const { name, price, info, brandId, typeId, quantityInStock, oldImages } = req.body;

        if (!name || !price || !info || !brandId || !typeId || !quantityInStock) {
            return next(ApiError.badRequest("Required data is missing"))
        }

        const files = req.files as {images?: UploadedFile | UploadedFile[] }

        if (!oldImages && (!files || !files.images)) {
            return next(ApiError.badRequest("At least one image is required"))
        }

        const oldImagesParsed = JSON.parse(oldImages)

        let images: UploadedFile[] = []

        if (files && files.images) {

            if (Array.isArray(files.images)) {
                images = files.images;
            } else {
                images = [files.images];
            }

            for (const image of images) {
                if (!image.mimetype.startsWith('image/')) {
                    return next(ApiError.unsupportedMediaType(`File ${image.name} is not an image`));
                }
            }
        }

        await DeviceService.update(id, name, price, info, brandId, typeId, quantityInStock, images, oldImagesParsed)
        return res.sendStatus(200)
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        const {id} = req.params

        if (!id) {
            return next(ApiError.badRequest("Id is required"))
        }

        await DeviceService.delete(id)
        return res.sendStatus(204)
    }

    async getAllAdmin(req: Request, res: Response) {
        const devices = await DeviceService.getAllAdmin();
        return res.status(200).json(devices)
    }
}

export default new DeviceController()