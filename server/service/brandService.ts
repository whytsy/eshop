import { DbErrorHandler } from "../errors/DbErrorHandler"
import { Brand } from "../database/models/index"
import { BrandDto } from "../dto/Brand.dto"
import ApiError from "../errors/ApiError"
import { sequelize } from "../database/db"

class BrandService {
    async getAll() {
        try {
            const brands = await Brand.findAll()

            const brandDtos = brands.map(brand => new BrandDto(brand))

            return brandDtos
        } catch (error) {
            DbErrorHandler.handle(error)
        }
    }

    async getOne(id: string) {
        try {
            const brand = await Brand.findByPk(id)

            if (!brand) {
                throw ApiError.notFound("Brand not found")
            }

            return new BrandDto(brand)
        } catch (error) {
            DbErrorHandler.handle(error)
        }
    }

    async create(name: string) {
        try {
            const brand = await Brand.create({name})

            return new BrandDto(brand)
        } catch (error) {
            DbErrorHandler.handle(error)
        }
    }

    async delete(id: string) {
        try {
            await Brand.destroy({where: {id}})
        } catch (error) {
            DbErrorHandler.handle(error)
        }
    }

    async changeName(id: string, name: string) {
        try {
            return await sequelize.transaction(async (t) => {
                const brand = await Brand.findByPk(id, {transaction: t})

                if (!brand) {
                    throw ApiError.notFound("Brand not found")
                }

                brand.name = name
                await brand.save({transaction: t})

                return new BrandDto(brand)
            })
        } catch (error) {
            DbErrorHandler.handle(error)
        }
    }
}

export default new BrandService()