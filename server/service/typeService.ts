import { DbErrorHandler } from "../errors/DbErrorHandler"
import { Brand, Type } from "../database/models/index"
import { TypeDto } from "../dto/Type.dto"
import ApiError from "../errors/ApiError"
import { sequelize } from "../database/db"
import { BrandDto } from "../dto/Brand.dto"

class TypeService {
    async getAll() {
        try {
            const types = await Type.findAll()

            const typeDtos = types.map(type => new TypeDto(type))

            return typeDtos
        } catch (error) {
            DbErrorHandler.handle(error)
        }
    }

    async getOne(id: string) {
        try {
            const type = await Type.findOne({where: {id}})

            if (!type) {
                throw ApiError.notFound("Type not found")
            }

            return new TypeDto(type)
        } catch (error) {
            DbErrorHandler.handle(error)
        }
    }

    async create(name: string) {
        try {
            const type = await Type.create({name})

            return new TypeDto(type)
        } catch (error) {
            DbErrorHandler.handle(error)
        }
    }

    async delete(id: string) {
        try {
            await Type.destroy({where: {id}})
        } catch (error) {
            DbErrorHandler.handle(error)
        }
    }

    async changeName(id: string, name: string) {
        try {
            return await sequelize.transaction(async (t) => {
                const type = await Type.findByPk(id, {transaction: t})

                if (!type) {
                    throw ApiError.notFound("Type not found")
                }

                type.name = name
                await type.save({transaction: t})

                return new TypeDto(type)
            })
            
        } catch (error) {
            DbErrorHandler.handle(error)
        }
    }
}

export default new TypeService()