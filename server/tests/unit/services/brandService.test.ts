import BrandService from '../../../service/brandService'
import { Brand } from '../../../database/models/index'
import ApiError from '../../../errors/ApiError'
import { BrandDto } from '../../../dto/Brand.dto'
import { sequelize } from '../../../database/db'

const createMockBrandInstance = (data: any) => {
  const instance = new Object() as any
  
  Object.assign(instance, data)
  
  instance.dataValues = data
  instance.toJSON = () => data
  instance.save = jest.fn()
  
  return instance
}

jest.mock('../../../database/models/index', () => ({
  Brand: {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    destroy: jest.fn(),
    findByPk: jest.fn()
  }
}))

jest.mock('../../../database/db', () => ({
  sequelize: {
    transaction: jest.fn()
  }
}))

const mockBrand = Brand as jest.Mocked<typeof Brand>
const mockSequelize = sequelize as jest.Mocked<typeof sequelize>

describe('BrandService', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('getAll', () => {
    test('success - BrandDto array', async () => {
      const mockBrands = [
        createMockBrandInstance({ id: 1, name: 'Apple' }),
        createMockBrandInstance({ id: 2, name: 'Samsung' })
      ]
      mockBrand.findAll.mockResolvedValue(mockBrands)

      const result = await BrandService.getAll()

      expect(mockBrand.findAll).toHaveBeenCalled()
      expect(result).toHaveLength(2)
      expect(result[0]).toBeInstanceOf(BrandDto)
      expect(result[1]).toBeInstanceOf(BrandDto)
    })

    test('Calls DbErrorHandler.handle on db error', async () => {
      const dbError = new Error('Database connection failed')
      mockBrand.findAll.mockRejectedValue(dbError)

      await expect(BrandService.getAll())
        .rejects
        .toThrow('Database connection failed')
    })
  })

  describe('getOne', () => {

    test('return BrandDto on found brand', async () => {

        jest.spyOn(Brand, 'findByPk').mockResolvedValue({
            id: "1",
            name: "Apple"
        } as any)

        const result = await BrandService.getOne('1')

        expect(result).toBeInstanceOf(BrandDto)
    })

    test('throws ApiError.notFound if not found', async () => {
      mockBrand.findByPk.mockResolvedValue(null)

      await expect(BrandService.getOne('999'))
        .rejects
        .toThrow(ApiError)
    })

    test('calls DbErrorHandler.handle on db error', async () => {
        jest.spyOn(Brand, 'findByPk').mockRejectedValue(new Error("Query failed"))

        await expect(BrandService.getOne('1'))
        .rejects
        .toThrow("Query failed")
    })
  })

  describe('create', () => {
    test('creates brand and return BrandDto', async () => {
      const mockCreatedBrand = { 
        id: 1, 
        name: 'New Brand'
      }
      mockBrand.create.mockResolvedValue(mockCreatedBrand)

      const result = await BrandService.create('New Brand')

      expect(mockBrand.create).toHaveBeenCalledWith({ name: 'New Brand' })
      expect(result).toBeInstanceOf(BrandDto)
      expect(result.name).toBe('New Brand')
    })
  })

  describe('delete', () => {
    test('deletes brand by id', async () => {
      mockBrand.destroy.mockResolvedValue(1)

      await BrandService.delete('1')

      expect(mockBrand.destroy).toHaveBeenCalledWith({ where: { id: '1' } })
    })

    test('calls DbErrorHandler.handle on delete error', async () => {
      const dbError = new Error('Delete failed')
      mockBrand.destroy.mockRejectedValue(dbError)

      await expect(BrandService.delete('1'))
        .rejects
        .toThrow('Delete failed')
    })
  })

  describe('changeName', () => {
    test('changes name', async () => {
      const mockTransaction = {
        commit: jest.fn(),
        rollback: jest.fn()
      }
      
      const mockBrandInstance = createMockBrandInstance({
        id: 1,
        name: 'Old Name',
        save: jest.fn()
      })

      mockSequelize.transaction.mockImplementation(async (callback: any) => {
        return await callback(mockTransaction)
      })

      mockBrand.findByPk.mockResolvedValue(mockBrandInstance)
      mockBrandInstance.save.mockResolvedValue(undefined)

      const result = await BrandService.changeName('1', 'New Name')

      expect(mockSequelize.transaction).toHaveBeenCalled()
      expect(mockBrand.findByPk).toHaveBeenCalledWith('1', { transaction: mockTransaction })
      expect(mockBrandInstance.name).toBe('New Name')
      expect(mockBrandInstance.save).toHaveBeenCalledWith({ transaction: mockTransaction })
      expect(result).toBeInstanceOf(BrandDto)
    })

    test('throws ApiError.notFound if brand not found', async () => {
      const mockTransaction = {}
      mockSequelize.transaction.mockImplementation(async (callback: any) => {
        return await callback(mockTransaction)
      })
      mockBrand.findByPk.mockResolvedValue(null)

      await expect(BrandService.changeName('999', 'New Name'))
        .rejects
        .toThrow('Brand not found')
    })

    test('returns all back on error', async () => {
      const mockTransaction = {
        rollback: jest.fn()
      }
      
      mockSequelize.transaction.mockImplementation(async (callback: any) => {
        try {
          return await callback(mockTransaction)
        } catch (error) {
          mockTransaction.rollback()
          throw error
        }
      })

      mockBrand.findByPk.mockRejectedValue(new Error('DB error'))

      await expect(BrandService.changeName('1', 'New Name'))
        .rejects
        .toThrow('DB error')

      expect(mockTransaction.rollback).toHaveBeenCalled()
    })
  })
})