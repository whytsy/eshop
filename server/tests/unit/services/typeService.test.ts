import { UniqueConstraintError } from "sequelize"
import { TypeDto } from "../../../dto/Type.dto"
import { Type } from "../../../database/models/index"
import typeService from "../../../service/typeService"
import { sequelize } from "../../../database/db"

const mockType = Type as jest.Mocked<typeof Type>

jest.mock('../../../database/models/index', () => ({
  Type: {
    findAll: jest.fn(),
    findOne: jest.fn(),
    findByPk: jest.fn(),
    create: jest.fn(),
    destroy: jest.fn()
  },
  sequelize: {
    transaction: jest.fn()
  }
}))

describe("TypeService", () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    describe("getAll", () => {
        test("success -> typeDto array", async () => {
            const types = [
                {
                    id: 1,
                    name: "Phone"
                },
                {
                    id: 2,
                    name: "TV"
                }
            ] as any

            jest.spyOn(Type, 'findAll').mockResolvedValue(types)

            const result = await typeService.getAll()

            expect(mockType.findAll).toHaveBeenCalled()
            expect(result).toHaveLength(2)
            expect(result[0]).toBeInstanceOf(TypeDto)
            expect(result[1]).toBeInstanceOf(TypeDto)
        })

        test("db error -> error", async () => {
            jest.spyOn(Type, 'findAll').mockRejectedValue(new Error("DB connection error"))

            await expect(typeService.getAll())
                .rejects
                .toThrow("DB connection error")
        })
    })

    describe("getOne", () => {
        test("success -> typeDto", async () => {
            const type = {
                id: 1,
                name: "Phone"
            } as any

            jest.spyOn(Type, 'findOne').mockResolvedValue(type)

            const result = await typeService.getOne("1")

            expect(result).toBeInstanceOf(TypeDto)
        })

        test("not found -> error", async () => {
            jest.spyOn(Type, 'findOne').mockResolvedValue(null)

            await expect(typeService.getOne("1"))
                .rejects
                .toThrow("Type not found")
        })
    })

    describe("create", () => {
        test("success -> typeDto", async () => {
            jest.spyOn(Type, 'create').mockResolvedValue({
                id: 1,
                name: "Phone"
            })

            const result = await typeService.create("Phone")
            
            expect(result).toBeInstanceOf(TypeDto)
        })

        test("trying to create non unique -> error", async () => {
            jest.spyOn(Type, 'create').mockRejectedValue(new UniqueConstraintError({}))

            await expect(typeService.create("NonUnique"))
                .rejects
                .toMatchObject({
                    status: 409,
                    message: "Field is not unique"
                })
        })
    })

    describe("delete", () => {
        test("error -> throws error", async () => {
            jest.spyOn(Type, 'destroy').mockRejectedValue(new Error("DB error"))

            await expect(typeService.delete("1111"))
                .rejects
                .toThrow("DB error")
        })
    })

    describe("changeName", () => {
        let mockTransaction: any
        
        beforeEach(() => {
            mockTransaction = {
                commit: jest.fn(),
                rollback: jest.fn()
            }
            
            jest.spyOn(sequelize, 'transaction').mockImplementation((callback: any) => {
                return callback(mockTransaction)
            })
        })
        
        test("success -> typeDto", async () => {
            const mockTypeInstance = {
                id: 1,
                name: "OldName",
                save: jest.fn().mockResolvedValue({ id: 1, name: "NewName" })
            }
            
            jest.spyOn(Type, 'findByPk').mockResolvedValue(mockTypeInstance as any)
            
            const result = await typeService.changeName('1', "NewName")
            
            expect(Type.findByPk).toHaveBeenCalledWith('1', { transaction: mockTransaction })
            expect(mockTypeInstance.name).toBe("NewName")
            expect(mockTypeInstance.save).toHaveBeenCalledWith({ transaction: mockTransaction })
            expect(result).toBeInstanceOf(TypeDto)
        })
        
        test("trying to change to existing name -> conflict error", async () => {
            const mockTypeInstance = {
                id: 1,
                name: "OldName",
                save: jest.fn().mockRejectedValue(new UniqueConstraintError({}))
            }
            
            jest.spyOn(Type, 'findByPk').mockResolvedValue(mockTypeInstance as any)
            
            await expect(typeService.changeName('1', "ExistingName"))
                .rejects
                .toMatchObject({
                    status: 409,
                    message: "Field is not unique"
                })
            
            expect(Type.findByPk).toHaveBeenCalledWith('1', { transaction: mockTransaction })
            expect(mockTypeInstance.save).toHaveBeenCalledWith({ transaction: mockTransaction })
        })
    })
})