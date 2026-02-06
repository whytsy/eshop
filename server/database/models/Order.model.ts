import { Model, type ModelStatic, Sequelize, type Optional, DataTypes } from "sequelize"
import { type UserInstance } from "./User.model"
import { type OrderItemInstance } from "./OrderItem.model"

const OrderStatus = {
    PENDING: "PENDING",
    SHIPPED: "SHIPPED",
    DELIVERED: "DELIVERED"
} as const

type OrderStatusType = typeof OrderStatus[keyof typeof OrderStatus]

interface OrderAttrs {
    id: number
    userId: number
    status: OrderStatusType
    deliveryAddress: string
    phone: string
    createdAt?: Date
    updatedAt?: Date
}

interface OrderCreationAttrs extends Optional<OrderAttrs, "id" | "status" | "createdAt" | "updatedAt"> {}

interface OrderInstance extends Model<OrderAttrs, OrderCreationAttrs>, OrderAttrs {
    order_items?: OrderItemInstance[]
    user?: UserInstance
}

export type {OrderInstance, OrderStatusType}

export default function initOrder(sequelize: Sequelize): ModelStatic<OrderInstance> {
    const Order = sequelize.define<OrderInstance>("order", {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        userId: {type: DataTypes.INTEGER, allowNull: false},
        status: {type: DataTypes.ENUM(...Object.values(OrderStatus)), defaultValue: OrderStatus.PENDING},
        deliveryAddress: {type: DataTypes.STRING, allowNull: false},
        phone: {type: DataTypes.STRING, allowNull: false}
    })

    return Order
}