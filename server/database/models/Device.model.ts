import { DataTypes, Model, type ModelStatic, type Optional, Sequelize } from "sequelize"
import { type DeviceImageInstance } from "./DeviceImage.model"
import { type DeviceInfoInstance } from "./DeviceInfo.model"
import { type TypeInstance } from "./Type.model"
import { type BrandInstance } from "./Brand.model"
import { type BasketDeviceInstance } from "./BasketDevice.model"

interface DeviceAttrs {
    id: number
    name: string
    price: number
    typeId: number
    brandId: number
    quantityInStock: number
    createdAt?: Date
    updatedAt?: Date
}

interface DeviceCreationAttrs extends Optional<DeviceAttrs, "id" | "createdAt" | "updatedAt"> {}

interface DeviceInstance extends Model<DeviceAttrs, DeviceCreationAttrs>, DeviceAttrs {
    device_images?: DeviceImageInstance[]
    device_infos?: DeviceInfoInstance[]
    type?: TypeInstance
    brand?: BrandInstance
    basket_device?: BasketDeviceInstance
}

export default function initDevice(sequelize: Sequelize): ModelStatic<DeviceInstance> {
    const Device = sequelize.define<DeviceInstance>("device", {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        name: {type: DataTypes.STRING, unique: true, allowNull: false},
        price: {type: DataTypes.INTEGER, allowNull: false, validate: {min: 0}},
        typeId: {type: DataTypes.INTEGER, allowNull: false},
        brandId: {type: DataTypes.INTEGER, allowNull: false},
        quantityInStock: {type: DataTypes.INTEGER, defaultValue: 0, validate: {min: 0}}
    })

    return Device
}

export type {DeviceInstance}