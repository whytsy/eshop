import { DataTypes, Model, type ModelStatic, type Optional, Sequelize } from "sequelize"
import { type DeviceInstance } from "./Device.model"

interface BrandAttrs {
    id: number
    name: string
    createdAt?: Date
    updatedAt?: Date
}

interface BrandCreationAttrs extends Optional<BrandAttrs, "id" | "createdAt" | "updatedAt"> {}

interface BrandInstance extends Model<BrandAttrs, BrandCreationAttrs>, BrandAttrs {
    device?: DeviceInstance
}

export default function initBrand(sequelize: Sequelize): ModelStatic<BrandInstance> {
    const Brand = sequelize.define<BrandInstance>("brand", {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        name: {type: DataTypes.STRING, unique: true, allowNull: false}
    })

    return Brand
}

export type {BrandInstance}