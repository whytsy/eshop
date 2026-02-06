import { DataTypes, Model, type ModelStatic, type Optional, Sequelize } from "sequelize"
import { type UserInstance } from "./User.model"

interface UserRecoverAttrs {
    id: number
    userId: number
    recoveryLink: string
}

interface UserRecoverCreationAttrs extends Optional<UserRecoverAttrs, "id"> {}

interface UserRecoverInstance extends Model<UserRecoverAttrs, UserRecoverCreationAttrs>, UserRecoverAttrs {
    user?: UserInstance
}

export default function initUserRecover(sequelize: Sequelize): ModelStatic<UserRecoverInstance> {
    const UserRevocer = sequelize.define<UserRecoverInstance>("user_recover", {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        userId: {type: DataTypes.INTEGER, unique: true},
        recoveryLink: {type: DataTypes.STRING, allowNull: false, unique: true}
    })

    return UserRevocer
}

export type {UserRecoverInstance}