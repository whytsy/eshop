import { sequelize } from "../../../database/db"
import { OrderDto } from "../../../dto/Order.dto"
import { DailyStatsDto, OrderSummaryDto } from "../../../dto/Stats.dto"
import { Basket, BasketDevice, Order, OrderItem } from "../../../database/models/index"
import orderService from "../../../service/orderService"
import { where } from "sequelize"

jest.mock('../../../database/models/index', () => ({
    Order: {
        findlOne: jest.fn(),
        findAll: jest.fn(),
        findByPk: jest.fn(),
        create: jest.fn()
    },
    Basket: {
        findOne: jest.fn()
    },
    OrderItem: {
        create: jest.fn()
    },
    BasketDevice: {
        destroy: jest.fn()
    }
}))

jest.mock('../../../database/db', () => ({
    sequelize: {
        query: jest.fn(),
        transaction: jest.fn()
    }
}))

const mockSequelize = sequelize as jest.Mocked<typeof sequelize>

describe("OrderService", () => {
    describe("createOrder", () => {
        test("passing valid parameters return order", async () => {
            const mockTransaction = {
                commit: jest.fn(),
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

            jest.spyOn(Basket, 'findOne').mockResolvedValue({
                id: 1,
                userId: 1,
                devices: [
                    {
                        id: 1,
                        name: "device1",
                        price: 1000,
                        typeId: 1,
                        brandId: 1,
                        quantityInStock: 3,
                        basket_device: {
                            amount: 1
                        },
                        save: jest.fn()
                    }
                ]
            } as any)

            const deliveryAddress = "address"
            const phone = "phone"

            jest.spyOn(Order, 'create').mockResolvedValue({
                id: 1,
                userId: 1,
                status: "PENDING",
                deliveryaddress: deliveryAddress,
                phone: phone
            })

            const orderItemSpy = jest.spyOn(OrderItem, 'create').mockResolvedValue({
                id: 1,
                orderId: 1,
                deviceId: 1,
                quantity: 1,
                price: 1000
            })

            jest.spyOn(BasketDevice, 'destroy').mockResolvedValue(1)

            jest.spyOn(Order, 'findByPk').mockResolvedValue({
                id: 1,
                userId: 1,
                order_items: [
                    {
                        id: 1,
                        orderId: 1,
                        deviceId: 1,
                        quantity: 1,
                        price: 1000
                    }
                ]
            } as any)

            const result = await orderService.createOrder(1, deliveryAddress, phone)

            expect(orderItemSpy).toHaveBeenCalledTimes(1)
            expect(result).toBeInstanceOf(OrderDto)
        })

        test("passing invalid userId return notFound error", async () => {
            const mockTransaction = {
                commit: jest.fn(),
                rollback: jest.fn()
            }
            mockSequelize.transaction.mockImplementation(async (callback: any) => {
                return await callback(mockTransaction)
            })

            jest.spyOn(Basket, 'findOne').mockResolvedValue(null as any)

            const deliveryAddress = "address"
            const phone = "phone"

            await expect(orderService.createOrder(1, deliveryAddress, phone))
                .rejects
                .toThrow("Basket not found")
        })

        test("if basket is empty return badrequest", async () => {
            const mockTransaction = {
                commit: jest.fn(),
                rollback: jest.fn()
            }
            mockSequelize.transaction.mockImplementation(async (callback: any) => {
                return await callback(mockTransaction)
            })

            jest.spyOn(Basket, 'findOne').mockResolvedValue({
                id: 1,
                userId: 1,
                devices: []
            } as any)

            const deliveryAddress = "address"
            const phone = "phone"

            await expect(orderService.createOrder(1, deliveryAddress, phone))
                .rejects
                .toThrow("Basket is empty")
        })

        test("if amount in basket greater then in stock return conflict", async () => {
            const mockTransaction = {
                commit: jest.fn(),
                rollback: jest.fn()
            }
            mockSequelize.transaction.mockImplementation(async (callback: any) => {
                return await callback(mockTransaction)
            })

            jest.spyOn(Basket, 'findOne').mockResolvedValue({
                id: 1,
                userId: 1,
                devices: [
                    {
                        id: 1,
                        name: "device1",
                        price: 1000,
                        typeId: 1,
                        brandId: 1,
                        quantityInStock: 3,
                        basket_device: {
                            amount: 5
                        },
                        save: jest.fn()
                    }
                ]
            } as any)

            const deliveryAddress = "address"
            const phone = "phone"

            await expect(orderService.createOrder(1, deliveryAddress, phone))
                .rejects
                .toMatchObject({
                    message: "Not enough items in stock",
                    status: 409
                });
        })

        test("returns all back on error", async () => {
            const mockTransaction = {
                commit: jest.fn(),
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

            jest.spyOn(Basket, 'findOne').mockRejectedValue(new Error("DB error"))

            const deliveryAddress = "address"
            const phone = "phone"

            await expect(orderService.createOrder(1, deliveryAddress, phone))
                .rejects
                .toThrow("DB error")

            expect(mockTransaction.rollback).toHaveBeenCalled()
        })
    })

    describe("getOrderList", () => {
        test("passing existing id returns orders list", async () => {
            const orders = [
                {
                    id: 1,
                    status: "PENDING",
                    deliveryAddress: "address",
                    phone: "phone",
                    order_items: [
                        {
                            id: 2,
                            deviceId: 1,
                            quantity: 1,
                            price: 100
                        },
                        {
                            id: 3,
                            deviceId: 2,
                            quantity: 2,
                            price: 200
                        }
                    ]
                }
            ]

            const orderSpy = jest.spyOn(Order, 'findAll').mockResolvedValue(orders as any)

            const result = await orderService.getOrderList(1)

            expect(orderSpy).toHaveBeenCalledWith(
                expect.objectContaining({
                    where: {
                        userId: 1
                    }
                })
            )
            expect(result.length).toBe(1)
            expect(result[0]).toBeInstanceOf(OrderDto)
            expect(result).toEqual(orders)
        })

        test("passing non-existing userId returns empty array", async () => {
            const orderSpy = jest.spyOn(Order, 'findAll').mockResolvedValue([] as any)

            const result = await orderService.getOrderList(1)

            expect(orderSpy).toHaveBeenCalledWith(
                expect.objectContaining({
                    where: {
                        userId: 1
                    }
                })
            )
            expect(result.length).toBe(0)
        })
    })

    describe("getStats", () => {
        test("returns correct structure", async () => {
            (sequelize.query as jest.Mock)
                .mockImplementationOnce(() => ([{
                    total_orders: "2",
                    total_sum: "10000",
                    total_avg: "5000"
                }]))
                .mockImplementationOnce(() => ([{
                    date: "December 5, 2023 8:53:00",
                    orders_count: "2",
                    total_sum: "10000"
                }]))

            const result = await orderService.getStats()

            expect(sequelize.query).toHaveBeenCalledTimes(2)
            expect(result.orderSummary).toBeInstanceOf(OrderSummaryDto)
            expect(result.dailyStats[0]).toBeInstanceOf(DailyStatsDto)
        })
    })
})