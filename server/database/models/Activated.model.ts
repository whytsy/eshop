import { DataTypes, Model, type ModelStatic, type Optional, Sequelize } from "sequelize"
import { type UserInstance } from "./User.model"

interface ActivatedAttrs {
    id: number
    userId: number
    activated: boolean
    activationLink: string
    createdAt?: Date
    updatedAt?: Date
}

interface ActivatedCreationAttrs extends Optional<ActivatedAttrs, "id" | "activated" | "createdAt" | "updatedAt"> {}

interface ActivatedInstance extends Model<ActivatedAttrs, ActivatedCreationAttrs>, ActivatedAttrs {
    user?: UserInstance
}

export default function initActivated(sequelize: Sequelize): ModelStatic<ActivatedInstance> {
    const Activated = sequelize.define<ActivatedInstance>('activated', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        userId: {type: DataTypes.INTEGER, unique: true},
        activated: {type: DataTypes.BOOLEAN, defaultValue: false},
        activationLink: {type: DataTypes.STRING, allowNull: false, unique: true}
    })

    return Activated
}

export type { ActivatedInstance }