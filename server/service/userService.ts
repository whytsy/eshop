import { UserDto } from "../dto/User.dto"
import ApiError from "../errors/ApiError"
import { User, Basket, Activated, UserRecover, Device, BasketDevice, DeviceImage, EmailChangeRequest, Brand, Type } from "../database/models/index"
import bcrypt from 'bcryptjs'
import * as uuid from 'uuid'
import TokenService from "./tokenService"
import MailService from "./mailService"
import { isGreaterRole, isValidRole, type ROLE, ROLES } from "../middleware/roleMiddleware"
import { DbErrorHandler } from "../errors/DbErrorHandler"
import { sequelize } from "../database/db"
import tokenService from "./tokenService"
import { DeviceDto } from "../dto/Device.dto"

class UserService {

    async registration(email: string, password: string) {
        const candidate = await User.findOne({where: {email}})

        if (candidate) {
            throw ApiError.badRequest("Email is already taken")
        }
        
        const hashPassword = await bcrypt.hash(password, 7)

        const activationLink = uuid.v4()

        try {
            return await sequelize.transaction(async (t) => {
                const user = await User.create({email, password: hashPassword}, {transaction: t})
                await Activated.create({activationLink, userId: user.id}, {transaction: t})
                await MailService.sendActivationMail(email, activationLink)

                const userDto = new UserDto(user)

                return userDto
            })
        } catch (error) {
            DbErrorHandler.handle(error)
        }
    }

    async login(email: string, password: string) {
        const user = await User.findOne({where: {email}, include: [{model: Activated}]})
        if (!user) {
            throw ApiError.badRequest("Wrong email or password")
        }

        if (!user.activated?.activated) {
            throw ApiError.badRequest("You should activate your account first")
        }

        const comparedPassword = bcrypt.compareSync(password, user.password)

        if (!comparedPassword) {
            throw ApiError.badRequest("Wrong email or password")
        }
        
        const userDto = new UserDto(user)
        const jwt = TokenService.generateJWT(userDto)

        await TokenService.saveToken(userDto.id, jwt.refreshToken)

        return {...userDto, ...jwt}
    }

    async logout(token: string) {
        await TokenService.deleteByToken(token)
    }

    async activateAccount(activationLink: string) {
        const activatedAccount = await Activated.findOne({where: {activationLink}})
        if (!activatedAccount) {
            throw ApiError.badRequest("Wrong activation link")
        }

        if (activatedAccount.activated) {
            throw ApiError.badRequest("Profile is already activated")
        }

        try {
            activatedAccount.activated = true
            await sequelize.transaction(async (t) => {
                await activatedAccount.save({transaction: t})
                await Basket.create({userId: activatedAccount.userId}, {transaction: t})
            })
        } catch (e) {
            DbErrorHandler.handle(e)
        }
    }

    async refresh(token: string) {
        const userData = TokenService.validateRefreshToken(token);
        const tokenData = await TokenService.findToken(token)

        if (!userData || !tokenData) {
            throw ApiError.badRequest("Invalid credentials")
        }

        const user = await User.findOne({where: {id: userData.id}})

        if (!user) {
            throw ApiError.badRequest("Invalid credentials")
        }

        const userDto = new UserDto(user)

        const tokenPair = TokenService.generateJWT({...userDto})

        await TokenService.saveToken(userDto.id, tokenPair.refreshToken)

        return {...tokenPair, userDto}
    }

    async sendRecoverEmail(email: string) {
        const user = await User.findOne({where: {email}})

        if (!user) {
            throw ApiError.badRequest("Invalid credentials")
        }

        const recoveryLink = uuid.v4()
        await MailService.sendRecoveryMail(email, recoveryLink)

        try {
            await UserRecover.create({recoveryLink, userId: user.id})
        } catch (error) {
            DbErrorHandler.handle(error)
        }
    }

    async recoverPassword(recoveryLink: string, password: string) {
        return await sequelize.transaction(async (t) => {
            const userRecover = await UserRecover.findOne({where: {recoveryLink}})

            if (!userRecover) {
                throw ApiError.badRequest("Invalid recovery link")
            }

            const user = await User.findOne({where: {id: userRecover.userId}})

            if (!user) {
                throw ApiError.notFound("Couldn't find user")
            }

            const hashPassword = await bcrypt.hash(password, 7)
            user.password = hashPassword
            await user.save({transaction: t})
            await userRecover.destroy({transaction: t})
            await tokenService.deleteByUserId(user.id, t)

            const userDto = new UserDto(user)
            
            return userDto
        })
    }

    async addToCart(userId: number, deviceId: number) {
        return sequelize.transaction(async (t) => {

            const device = await Device.findByPk(deviceId, {
                transaction: t,
                lock: t.LOCK.UPDATE
            })

            if (!device) {
                throw ApiError.notFound("Device not found")
            }

            if (device.quantityInStock < 1) {
                throw ApiError.conflict("Not enough items in stock")
            }

            const basket = await Basket.findOne({
                where: {userId},
                transaction: t
            })

            if (!basket) {
                throw ApiError.notFound("Basket not found")
            }

            const [basketDevice, created] = await BasketDevice.findOrCreate({
                where: {
                    basketId: basket.id,
                    deviceId: device.id
                },
                transaction: t,
                lock: t.LOCK.UPDATE
            })

            if (!created) {
                basketDevice.amount += 1
                await basketDevice.save({transaction: t})
            }
        })
    }

    async getCart(userId: number) {
        const cart = await Basket.findOne({
            where: {
                userId: userId
            },
            include: [{
                    model: Device,
                    as: 'devices',
                    attributes: ['id', 'name', 'price', 'quantityInStock'],
                    through: {
                        attributes: ['amount']
                    },
                    include: [
                        {
                            model: DeviceImage,
                            attributes: ['imageUrl'],
                            limit: 1,
                            where: {isMain: true}
                        },
                        { model: Brand },
                        { model: Type }
                ]
                }
            ]
        })

        if (!cart || !cart?.devices) {
            throw ApiError.notFound("Couldn't find cart")
        }

        const devices = cart.devices.map(device => new DeviceDto(device))

        return devices
    }

    async changeCartItemAmount(userId: number, deviceId: number, amount: number) {
        return sequelize.transaction(async (t) => {
            const cart = await Basket.findOne({
                where: {
                    userId
                },
                transaction: t
            })

            if (!cart) {
                throw ApiError.notFound("Couldn't find cart")
            }

            const basketDevice = await BasketDevice.findOne({
                where: {
                    basketId: cart.id,
                    deviceId: deviceId
                },
                include: [
                    {
                        model: Device,
                        attributes: ["quantityInStock"]
                    }
                ],
                transaction: t
            })

            if (!basketDevice) {
                throw ApiError.notFound("Item wasn't added to cart")
            }

            if (!basketDevice.device || basketDevice.device.quantityInStock < amount) {
                throw ApiError.conflict("Not enough items in stock")
            }

            try {
                if (amount < 1) {
                    await basketDevice.destroy()
                } else {
                    basketDevice.amount = amount
                    await basketDevice.save()
                }
            } catch (error) {
                DbErrorHandler.handle(error)
            }
        })
    }

    async deleteItemFromCart(userId: number, deviceId: number) {
        return sequelize.transaction(async (t) => {
            const cart = await Basket.findOne({
                where: {userId},
                transaction: t,
                lock: t.LOCK.UPDATE
            })

            if (!cart) {
                throw ApiError.notFound("Couldn't find cart")
            }

            const count = await BasketDevice.destroy({
                where: {
                    basketId: cart.id,
                    deviceId: deviceId
                },
                transaction: t
            })

            if (count === 0) {
                throw ApiError.notFound("Item wasn't added to cart")
            }
        })
    }

    async getAll(roles: ROLE[]) {
        try {
            const users = await User.findAll({
                where: {
                    role: roles
                },
                attributes: ["id", "email", "role"]
            })
            const userDtos = users.map(user => new UserDto(user))
            return userDtos
        } catch (error) {
            DbErrorHandler.handle(error)
        }
    }

    async changeRole(id: string, role: ROLE, userRole: ROLE) {
        if (!isValidRole(role)) {
            throw ApiError.badRequest("Invalid role")
        }

        if (userRole !== ROLES.SUPERADMIN && !isGreaterRole(userRole, role)) {
            throw ApiError.forbidden("Not enought rights")
        }

        return sequelize.transaction(async (t) => {
            const user = await User.findByPk(id, {
                transaction: t,
                lock: t.LOCK.UPDATE
            })

            if (!user) {
                throw ApiError.notFound("User not found")
            }

            if (user.role === role) {
                throw ApiError.badRequest("User already has this role")
            }

            if (user.role === ROLES.SUPERADMIN) {
                throw ApiError.forbidden("Cannot change this user's role")
            }

            user.role = role
            await user.save({transaction: t})

            return new UserDto(user)
        })
    }

    async changeEmailRequest(id: number, email: string, newEmail: string) {
        return sequelize.transaction(async (t) => {
            const user = await User.findByPk(id, {
                transaction: t,
                lock: t.LOCK.UPDATE
            })

            if (!user) {
                throw ApiError.notFound("User not found")
            }

            const emailExist = await User.findOne({
                where: {email: newEmail},
                transaction: t
            })

            if (emailExist) {
                throw ApiError.conflict("Email is taken")
            }

            await EmailChangeRequest.destroy({
                where: {userId: id},
                transaction: t
            })

            const emailChangeRequest = await EmailChangeRequest.create({
                userId: id,
                oldEmail: email,
                newEmail: newEmail
            }, {transaction: t})

            await MailService.sendConfirmationCode(user.email, emailChangeRequest.oldEmailCode)

            return {
                message: "Sent confirmation code to old email",
                expiresAt: emailChangeRequest.expiresAt
            }
        })
    }

    async confirmEmailChange(id: number, code: string) {
        return sequelize.transaction(async (t) => {
            const emailChangeRequest = await EmailChangeRequest.findOne({
                where: {userId: id, oldEmailCode: code},
                transaction: t,
                lock: t.LOCK.UPDATE
            })

            if (!emailChangeRequest) {
                throw ApiError.badRequest("Wrong code")
            }

            if (emailChangeRequest.expiresAt < new Date()) {
                await emailChangeRequest.destroy({transaction: t})
                throw ApiError.badRequest("Email change code has been expired")
            }

            emailChangeRequest.oldEmailConfirmed = true
            await emailChangeRequest.save({transaction: t})

            await MailService.sendMailChangeLink(emailChangeRequest.newEmail, emailChangeRequest.newEmailConfirmationLink)

            return {
                message: 'Check new email to confirm email change',
                expiresAt: emailChangeRequest.expiresAt
            }
        })
    }

    async changeEmail(link: string) {
        return sequelize.transaction(async (t) => {
            const emailChangeRequest = await EmailChangeRequest.findOne({
                where: {newEmailConfirmationLink: link},
                transaction: t,
                lock: t.LOCK.UPDATE
            })

            if (!emailChangeRequest) {
                throw ApiError.notFound()
            }

            if (!emailChangeRequest.oldEmailConfirmed) {
                throw ApiError.badRequest("Confirm old and new email first")
            }

            if (emailChangeRequest.expiresAt < new Date()) {
                await emailChangeRequest.destroy({transaction: t})
                throw ApiError.badRequest("Email change link has been expired")
            }

            await User.update(
                {email: emailChangeRequest.newEmail},
                {
                    where: {id: emailChangeRequest.userId},
                    transaction: t
                }
            )
            await MailService.sendMailChangedMessage(emailChangeRequest.oldEmail)
            await TokenService.deleteByUserId(emailChangeRequest.userId, t)
            await emailChangeRequest.destroy({transaction: t})

            return {
                message: "Email changed successfully"
            }
        })
    }
}

export default new UserService()