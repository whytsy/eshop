import { QueryTypes } from "sequelize"
import { sequelize } from "../database/db"
import { OrderDto } from "../dto/Order.dto"
import ApiError from "../errors/ApiError"
import { Basket, BasketDevice, Brand, Device, Order, OrderItem, Type } from "../database/models/index"
import { DailyStatsDto, OrderSummaryDto } from "../dto/Stats.dto"

class OrderService {
    async createOrder(userId: number, deliveryAddress: string, phone: string) {
        return await sequelize.transaction(async (t) => {
            const basket = await Basket.findOne({
                where: {userId},
                include: [
                    {
                        model: Device,
                        attributes: ["id", "price", "quantityInStock"],
                        through: {
                            attributes: ["amount"]
                        }
                    }
                ],
                transaction: t
            })

            if (!basket) {
                throw ApiError.notFound("Basket not found")
            }

            if (!basket.devices || basket.devices.length === 0) {
                throw ApiError.badRequest("Basket is empty")
            }

            for (const device of basket.devices) {
                if (device.quantityInStock < device.basket_device!.amount) {
                    throw ApiError.conflict("Not enough items in stock");
                }
            }

            const order = await Order.create({
                    userId,
                    deliveryAddress,
                    phone
                },
                {transaction: t}
            )

            await Promise.all(basket.devices.map(async (device) => {
                await OrderItem.create({
                    orderId: order.id,
                    deviceId: device.id,
                    quantity: device.basket_device!.amount,
                    price: device.price
                }, {transaction: t});

                device.quantityInStock -= device.basket_device!.amount;
                await device.save({transaction: t});
            }));

            await BasketDevice.destroy({
                where: {basketId: basket.id},
                transaction: t
            })

            const fullOrder = await Order.findByPk(order.id, {
                include: [
                    {
                        model: OrderItem,
                        include: [
                            {model: Device}
                        ]
                    }
                ],
                transaction: t
            })

            return new OrderDto(fullOrder!)
        })
    }

    async getOrderList(userId: number) {
        const orders = await Order.findAll({
            where: {userId},
            include: [
                {
                    model: OrderItem,
                    include: [
                        {
                            model: Device,
                            include: [
                                {model: Brand},
                                {model: Type}
                            ]
                        }
                    ]
                }
            ]
        })

        return orders.map(order => new OrderDto(order))
    }

    async getStats() {
        const [summary] = await sequelize.query<{
            total_orders: string
            total_sum: string
            total_avg: string
        }>(`
            SELECT
                COUNT(orders.id) as total_orders,
                SUM(order_items.quantity * order_items.price) as total_sum,
                AVG(order_items.quantity * order_items.price) as total_avg
            FROM orders
            JOIN order_items ON (orders.id = order_items."orderId")
        `, {
            type: QueryTypes.SELECT
        })

        const dailyStats = await sequelize.query<{
            date: string
            orders_count: string
            total_sum: string
        }>(`
            SELECT
                DATE(orders."createdAt") as date,
                COUNT(*) as orders_count,
                SUM(order_items.quantity * order_items.price) as total_sum
            FROM orders
            INNER JOIN order_items ON (orders.id = order_items."orderId")
            GROUP BY date
            ORDER BY date DESC    
        `, {
            type: QueryTypes.SELECT
        })

        return {
            orderSummary: new OrderSummaryDto(summary), 
            dailyStats: dailyStats.map(
                dailyStats => new DailyStatsDto(dailyStats)
            )
        }
    }
}

export default new OrderService()