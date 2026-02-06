import { DataTypes, Model, type ModelStatic, type Optional, Sequelize } from "sequelize"
import { type DeviceInstance } from "./Device.model"

interface DeviceInfoAttrs {
    id: number
    deviceId: number
    title: string
    description: string
    createdAt?: Date
    updatedAt?: Date
}

interface DeviceInfoCreationAttrs extends Optional<DeviceInfoAttrs, "id" | "createdAt" | "updatedAt"> {}

interface DeviceInfoInstance extends Model<DeviceInfoAttrs, DeviceInfoCreationAttrs>, DeviceInfoAttrs {
    device?: DeviceInstance
}

export default function initDeviceInfo(sequelize: Sequelize): ModelStatic<DeviceInfoInstance> {
    const DeviceInfo = sequelize.define<DeviceInfoInstance>("device_info", {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        deviceId: {type: DataTypes.INTEGER, allowNull: false},
        title: {type: DataTypes.STRING, allowNull: false},
        description: {type: DataTypes.STRING, allowNull: false}
    })

    return DeviceInfo
}

export type {DeviceInfoInstance}