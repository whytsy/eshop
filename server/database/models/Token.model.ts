import { DataTypes, Model, type ModelStatic, type Optional, Sequelize } from "sequelize"
import { type UserInstance } from "./User.model"

interface TokenAttrs {
    id: number
    userId: number
    refreshToken: string
    createdAt?: Date
    updatedAt?: Date
}

interface TokenCreationAttrs extends Optional<TokenAttrs, "id" | "createdAt" | "updatedAt"> {}

interface TokenInstance extends Model<TokenAttrs, TokenCreationAttrs>, TokenAttrs {
    user?: UserInstance
}

export default function initToken(sequelize: Sequelize): ModelStatic<TokenInstance> {
    const Token = sequelize.define<TokenInstance>('token', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        userId: {type: DataTypes.INTEGER, unique: true},
        refreshToken: {type: DataTypes.STRING, allowNull: false, unique: true}
    })

    return Token
}

export type {TokenInstance}