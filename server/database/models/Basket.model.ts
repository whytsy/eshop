import { DataTypes, Model, type ModelStatic, type Optional, Sequelize } from "sequelize";
import { type UserInstance } from "./User.model";
import { type BasketDeviceInstance } from "./BasketDevice.model";
import { type DeviceInstance } from "./Device.model";

interface BasketAttrs {
    id: number
    userId: number
}

interface BasketCreationAttrs extends Optional<BasketAttrs, "id"> {}

interface BasketInstance extends Model<BasketAttrs, BasketCreationAttrs>, BasketAttrs {
    user?: UserInstance
    basket_devices?: BasketDeviceInstance[]
    devices?: DeviceInstance[]
}

export default function initBasket(sequelize: Sequelize): ModelStatic<BasketInstance> {
    const Basket = sequelize.define<BasketInstance>('basket', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        userId: {type: DataTypes.INTEGER, unique: true}
    })

    return Basket
}

export type {BasketInstance}