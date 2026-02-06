import { DataTypes, Model, type ModelStatic, type Optional, Sequelize } from "sequelize"
import { type BasketInstance } from "./Basket.model"
import { type DeviceInstance } from "./Device.model"

interface BasketDeviceAttrs {
    id: number
    basketId: number
    deviceId: number
    amount: number
}

interface BasketDeviceCreationAttrs extends Optional<BasketDeviceAttrs, "id" | "amount"> {}

interface BasketDeviceInstance extends Model<BasketDeviceAttrs, BasketDeviceCreationAttrs>, BasketDeviceAttrs {
    basket?: BasketInstance
    device?: DeviceInstance
}

export default function initBasketDevice(sequelize: Sequelize): ModelStatic<BasketDeviceInstance> {
    const BasketDevice = sequelize.define<BasketDeviceInstance>('basket_device', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        basketId: {type: DataTypes.INTEGER, allowNull: false},
        deviceId: {type: DataTypes.INTEGER, allowNull: false},
        amount: {type: DataTypes.INTEGER, defaultValue: 1, validate: {min: 1}}
    })

    return BasketDevice
}

export type {BasketDeviceInstance}