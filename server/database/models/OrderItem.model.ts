import { DataTypes, Model, type ModelStatic, type Optional, Sequelize } from "sequelize"
import { type OrderInstance } from "./Order.model"
import { type DeviceInstance } from "./Device.model"

interface OrderItemAttrs {
    id: number
    orderId: number
    deviceId: number
    quantity: number
    price: number
}

interface OrderItemCreationAttrs extends Optional<OrderItemAttrs, "id"> {}

interface OrderItemInstance extends Model<OrderItemAttrs, OrderItemCreationAttrs>, OrderItemAttrs {
    order?: OrderInstance,
    device?: DeviceInstance 
}

export type { OrderItemInstance }

export default function initOrderItem(sequelize: Sequelize): ModelStatic<OrderItemInstance> {
    const OrderItem = sequelize.define<OrderItemInstance>("order_item", {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        orderId: {type: DataTypes.INTEGER, allowNull: false, validate: {min: 1}},
        deviceId: {type: DataTypes.INTEGER, allowNull: false, validate: {min: 1}},
        quantity: {type: DataTypes.INTEGER, allowNull: false, validate: {min: 1}},
        price: {type: DataTypes.INTEGER, allowNull: false, validate: {min: 1}}
    })

    return OrderItem
}