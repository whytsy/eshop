import { DataTypes, Model, type ModelStatic, type Optional, Sequelize } from "sequelize"
import { type DeviceInstance } from "./Device.model"

interface TypeAttrs {
    id: number
    name: string
    createdAt?: Date
    updatedAt?: Date
}

interface TypeCreationAttrs extends Optional<TypeAttrs, "id" | "createdAt" | "updatedAt"> {}

interface TypeInstance extends Model<TypeAttrs, TypeCreationAttrs>, TypeAttrs {
    device?: DeviceInstance
}

export default function initType(sequelize: Sequelize): ModelStatic<TypeInstance> {
    const Type = sequelize.define<TypeInstance>("type", {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        name: {type: DataTypes.STRING, unique: true, allowNull: false}
    })

    return Type
}

export type {TypeInstance}