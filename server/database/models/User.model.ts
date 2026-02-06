import { DataTypes, Model, type ModelStatic, type Optional, Sequelize } from "sequelize"
import { type ROLE, ROLES } from "../../middleware/roleMiddleware"
import { type EmailChangeRequestInstance } from "./EmailChangeRequest.model"
import { type TokenInstance } from "./Token.model"
import { type ActivatedInstance } from "./Activated.model"
import { type UserRecoverInstance } from "./UserRecover.model"
import { type BasketInstance } from "./Basket.model"

interface UserAttrs {
    id: number
    email: string
    password: string
    role: ROLE,
    createdAt?: Date,
    updatedAt?: Date
}

interface UserCreationAttrs extends Optional<UserAttrs, 'id' | 'createdAt' | 'updatedAt' | 'role'> {}

interface UserInstance extends Model<UserAttrs, UserCreationAttrs>, UserAttrs {
    emailChangeRequest?: EmailChangeRequestInstance
    token?: TokenInstance
    activated?: ActivatedInstance
    userRecover?: UserRecoverInstance
    basket?: BasketInstance
}

export default function initUser(sequelize: Sequelize): ModelStatic<UserInstance> {
    const User = sequelize.define<UserInstance>('user', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        email: {type: DataTypes.STRING, unique: true, allowNull: false},
        password: {type: DataTypes.STRING, allowNull: false},
        role: {type: DataTypes.ENUM(...Object.values(ROLES)), defaultValue: ROLES.USER},
    })

    return User
}

export type {UserInstance}