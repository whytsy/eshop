import path from "path";
import ApiError from "../errors/ApiError";
import { Brand, Device, DeviceImage, DeviceInfo, Type } from "../database/models/index";
import * as uuid from 'uuid'
import { Op } from "sequelize";
import * as fs from 'fs/promises'
import { type UploadedFile } from "express-fileupload";
import { DbErrorHandler } from "../errors/DbErrorHandler";
import { sequelize } from "../database/db";
import { DeviceDto } from "../dto/Device.dto"
import logger from "../logger/logger";
import { DeviceInstance } from "../database/models/Device.model";

interface DeviceInfo {
    id?: number;
    title: string;
    description: string;
}

export interface DeviceImageInterface {
    id: number;
    deviceId: number;
    imageUrl: string;
    isMain: boolean;
    orderIndex: number;
}

class DeviceService {
    async getAll(page: string, limit: string, brandId: string | undefined, typeId: string | undefined, query: string) {
        try {
            const pageNumber = Number(page)
            const limitNumber = Number(limit)
            const offset = pageNumber * limitNumber - limitNumber
            let devices: {rows: DeviceInstance[], count: number}
            if (!brandId && !typeId) {
                devices = await Device.findAndCountAll({
                    where: {
                        quantityInStock: {
                            [Op.gt]: 0
                        },
                        name: {
                            [Op.iLike]: `%${query}%`
                        }
                    },
                    distinct: true,
                    include:[
                        {model: DeviceImage},
                        {model: Brand},
                        {model: Type}
                    ],
                    limit: limitNumber,
                    offset
                })
            } else if (!brandId && typeId) {
                devices = await Device.findAndCountAll({
                    where: {
                        typeId,
                        quantityInStock: {
                            [Op.gt]: 0
                        },
                        name: {
                            [Op.iLike]: `%${query}%`
                        }
                    },
                    distinct: true,
                    include:[
                        {model: DeviceImage},
                        {model: Brand},
                        {model: Type}
                    ],
                    limit: limitNumber,
                    offset
                })
            } else if (brandId && !typeId) {
                devices = await Device.findAndCountAll({
                    where: {
                        brandId,
                        quantityInStock: {
                            [Op.gt]: 0
                        },
                        name: {
                            [Op.iLike]: `%${query}%`
                        }
                    }, 
                    distinct: true,
                    include:[
                        {model: DeviceImage},
                        {model: Brand},
                        {model: Type}
                    ], 
                    limit: limitNumber, 
                    offset
                })
            } else {
                devices = await Device.findAndCountAll({
                    where: {
                        brandId,
                        typeId,
                        quantityInStock: {
                            [Op.gt]: 0
                        },
                        name: {
                            [Op.iLike]: `%${query}%`
                        }
                    },
                    distinct: true,
                    include:[
                        {model: DeviceImage},
                        {model: Brand},
                        {model: Type}
                    ], 
                    limit: limitNumber, 
                    offset
                })
            }

            return {
                rows: devices.rows.map(device => new DeviceDto(device)),
                count: devices.count
            }
        } catch (error) {
            DbErrorHandler.handle(error)
        }
    }

    async getOne(id: string) {
        try {
            const device = await Device.findOne({
                where: {id},
                include: [
                    {model: DeviceInfo},
                    {model: DeviceImage},
                    {model: Brand},
                    {model: Type}
                ]
            })

            if (!device) {
                throw ApiError.notFound("Device not found")
            }

            return new DeviceDto(device)
        } catch (error) {
            DbErrorHandler.handle(error)
        }
    }

    async create(name: string, price: number, info: string, brandId: number, typeId: number, quantityInStock: number, images: UploadedFile[]) {
        try {
            return await sequelize.transaction(async (t) => {
                const device = await Device.create({
                    name,
                    price,
                    brandId,
                    typeId,
                    quantityInStock
                }, {transaction: t});

                if (!info) {
                    throw ApiError.badRequest("Device info is required")
                }

                const parsedInfo = JSON.parse(info) as DeviceInfo[]
                parsedInfo.forEach(async (i) => {
                    await DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id
                    }, {transaction: t})
                })

                const deviceDir = path.resolve('static', 'devices', device.id.toString());
                await fs.mkdir(deviceDir, { recursive: true });

                for (let i = 0; i < images.length; i++) {
                    const image = images[i];

                    if (image.data.length > 5000000) {
                        throw ApiError.fileTooLarge(`File ${image.name} is too large (>5MB)`)
                    }

                    const fileExtension = path.extname(image.name);
                    const fileName = `${uuid.v4()}${fileExtension}`;
                    const filePath = path.join(deviceDir, fileName);
                    
                    await fs.writeFile(filePath, image.data);
                    
                    const imageUrl = `/static/devices/${device.id}/${fileName}`;
                    
                    await DeviceImage.create({
                        deviceId: device.id,
                        imageUrl,
                        isMain: i === 0,
                        orderIndex: i
                    }, {transaction: t});
                }

                const deviceWithRelations = await Device.findByPk(device.id, {
                    include: [
                        {model: Brand},
                        {model: Type},
                        {model: DeviceImage},
                        {model: DeviceInfo}
                    ],
                    transaction: t
                })

                return new DeviceDto(deviceWithRelations!)
            })
        } catch (error) {
            DbErrorHandler.handle(error)
        }
    }

    async update(id: number, name: string, price: number, info: string, brandId: number, typeId: number, quantityInStock: number, images: UploadedFile[], oldImages: DeviceImageInterface[]) {
        try {
            return await sequelize.transaction(async (t) => {

                const device = await Device.findByPk(id, {
                    transaction: t,
                    lock: t.LOCK.UPDATE
                })

                if (!device) {
                    throw ApiError.notFound("Device not found")
                }

                device.name = name
                device.price = price
                device.brandId = brandId
                device.typeId = typeId
                device.quantityInStock = quantityInStock

                await device.save({transaction: t})

                if (info) {
                    const parsedInfo = JSON.parse(info) as DeviceInfo[]
                    const ids: number[] = []

                    parsedInfo.forEach(async i => {
                        if (i.id) {
                            const deviceInfo = await DeviceInfo.findByPk(
                                i.id,
                                {
                                    transaction: t,
                                    lock: t.LOCK.UPDATE
                                }
                            )

                            if (!deviceInfo) {
                                return
                            }

                            deviceInfo.title = i.title
                            deviceInfo.description = i.description
                            await deviceInfo.save({transaction: t})

                            ids.push(i.id)
                        } else {
                            const deviceInfo = await DeviceInfo.create({
                                title: i.title,
                                description: i.description,
                                deviceId: id
                            }, {transaction: t})

                            ids.push(deviceInfo.id)
                        }
                    })

                    await DeviceInfo.destroy({
                        where: {
                            deviceId: id,
                            id: {
                                [Op.notIn]: ids
                            }
                        },
                        transaction: t
                    })
                }

                const deviceDir = path.resolve(process.cwd(), 'static', 'devices', String(id));

                

                const deviceImages = await DeviceImage.findAll({where: {deviceId: id}, transaction: t})
                
                deviceImages.forEach(async (deviceImage) => {
                    if (oldImages.filter(oldImage => oldImage.id === deviceImage.id).length === 0) {
                        const imgPath = path.join(process.cwd(), deviceImage.imageUrl)
                        try {
                            await fs.rm(imgPath)
                        } catch (error) {
                            logger.error("No image found", {
                                error: error instanceof Error ? error.message : "Unknown error",
                                fileName: imgPath,
                                deviceId: id
                            })
                        }
                        
                        await DeviceImage.destroy({where: {id: deviceImage.id}, transaction: t})
                    }
                })

                const imageUrls: string[] = [];

                if (images.length > 0) {
                    for (let i = 0; i < images.length; i++) {
                        const image = images[i];

                        if (image.data.length > 5000000) {
                            throw ApiError.fileTooLarge(`File ${image.name} is too large (>5MB)`)
                        }

                        const fileExtension = path.extname(image.name);
                        const fileName = `${uuid.v4()}${fileExtension}`;
                        const filePath = path.join(deviceDir, fileName);
                        
                        await fs.writeFile(filePath, image.data);
                        
                        const imageUrl = `/static/devices/${id}/${fileName}`;
                        imageUrls.push(imageUrl);
                        
                        await DeviceImage.create({
                            deviceId: id,
                            imageUrl,
                            isMain: i === 0,
                            orderIndex: i
                        }, {transaction: t});
                    }
                }

                const deviceWithRelations = await Device.findByPk(device.id, {
                    include: [
                        {model: Brand},
                        {model: Type},
                        {model: DeviceImage},
                        {model: DeviceInfo}
                    ],
                    transaction: t
                })

                return new DeviceDto(deviceWithRelations!)
            })
        } catch (error) {
            DbErrorHandler.handle(error)
        }
    }

    async delete(id: string) {
        try {
            return sequelize.transaction(async (t) => {
                await Device.destroy({where: {id}, transaction: t})
                await DeviceInfo.destroy({where: {deviceId: id}, transaction: t})
                
                const deviceImage = await DeviceImage.findAll({where: {deviceId: id}, transaction: t})

                deviceImage.forEach(async (di) => {
                    const imgPath = path.join(process.cwd(), di.imageUrl)
                    try {
                        await fs.rm(imgPath)
                    } catch (error) {
                        logger.error("No image found", {
                            error: error instanceof Error ? error.message : "Unknown error",
                            fileName: imgPath,
                            deviceId: id
                        })
                    }

                    await DeviceImage.destroy({where: {id: di.id}, transaction: t})
                })
            })
        } catch (error) {
            DbErrorHandler.handle(error)
        }
    }

    async getAllAdmin() {
        try {
            const devices = await Device.findAll({
                include: [
                    {model: Brand},
                    {model: Type},
                    {model: DeviceImage},
                    {model: DeviceInfo}
                ]
            })

            const deviceDtos = devices.map(device => new DeviceDto(device))

            return {
                rows: deviceDtos,
                count: deviceDtos.length
            }
        } catch (error) {
            DbErrorHandler.handle(error)
        }
    }
}

export default new DeviceService()