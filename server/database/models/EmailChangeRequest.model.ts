import { DataTypes, Model, type ModelStatic, type Optional, Sequelize } from "sequelize"
import * as uuid from 'uuid'
import { type UserInstance } from "./User.model"
import { generateSixDigitCode } from "../../helpers/CodeGenerator"

interface EmailChangeRequestAttrs {
    id: number
    userId: number
    newEmail: string
    newEmailConfirmationLink: string
    oldEmail: string
    oldEmailCode: string
    oldEmailConfirmed: boolean
    expiresAt: Date
    createdAt?: Date
    updatedAt?: Date
}

interface EmailChangeRequestCreationAttrs
    extends Optional<EmailChangeRequestAttrs, 'id' | 'createdAt' | 'updatedAt' | "oldEmailConfirmed" | "newEmailConfirmationLink" | "oldEmailCode" | "expiresAt"> {}

interface EmailChangeRequestInstance extends Model<EmailChangeRequestAttrs, EmailChangeRequestCreationAttrs>, EmailChangeRequestAttrs {
    user?: UserInstance
}

export default function initEmailChangeRequest(sequelize: Sequelize): ModelStatic<EmailChangeRequestInstance> {
    const EmailChangeRequest = sequelize.define<EmailChangeRequestInstance>('email_change_request', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        userId: {type: DataTypes.INTEGER, allowNull: false, unique: true},
        newEmail: {type: DataTypes.STRING, allowNull: false, unique: true},
        newEmailConfirmationLink: {type: DataTypes.STRING, allowNull: false, unique: true},
        oldEmail: {type: DataTypes.STRING, allowNull: false, unique: true},
        oldEmailCode: {type: DataTypes.STRING, allowNull: false},
        oldEmailConfirmed: {type: DataTypes.BOOLEAN, defaultValue: false},
        expiresAt: {type: DataTypes.DATE, allowNull: false}
    }, {
        hooks: {
            beforeCreate: (instance: EmailChangeRequestInstance) => {
                const request = instance
                request.newEmailConfirmationLink = uuid.v4()
                request.oldEmailCode = generateSixDigitCode()
                request.expiresAt = new Date(Date.now() + 30 * 60 * 1000)
            }
        }
    })

    return EmailChangeRequest
}

export type {EmailChangeRequestInstance}