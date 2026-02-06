import { DataTypes, Model, type ModelStatic, type Optional, Sequelize } from "sequelize"
import { type DeviceInstance } from "./Device.model"

interface DeviceImageAttrs {
    id: number
    deviceId: number
    imageUrl: string
    isMain: boolean
    orderIndex: number,
    createdAt?: Date
    updatedAt?: Date
}

interface DeviceImageCreationAttrs extends Optional<DeviceImageAttrs, "id" | "createdAt" | "updatedAt"> {}

interface DeviceImageInstance extends Model<DeviceImageAttrs, DeviceImageCreationAttrs>, DeviceImageAttrs {
    device?: DeviceInstance
}

export default function initDeviceImage(sequelize: Sequelize): ModelStatic<DeviceImageInstance> {
    const DeviceImage = sequelize.define<DeviceImageInstance>("device_image", {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        deviceId: {type: DataTypes.INTEGER, allowNull: false},
        imageUrl: {type: DataTypes.STRING, allowNull: false},
        isMain: {type: DataTypes.BOOLEAN, defaultValue: false},
        orderIndex: {type: DataTypes.INTEGER, defaultValue: 0}
    })

    return DeviceImage
}

export type {DeviceImageInstance}