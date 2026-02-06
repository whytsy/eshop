import { sequelize } from "../../../database/db"
import { UserDto } from "../../../dto/User.dto"
import { Activated, Basket, BasketDevice, Device, User, UserRecover } from "../../../database/models"
import tokenService from "../../../service/tokenService"
import userService from "../../../service/userService"
import mailService from "../../../service/mailService"
import bcrypt from "bcryptjs"
import ApiError from "../../../errors/ApiError"

jest.mock("../../../database/models/index", () => ({
    User: {
        findByPk: jest.fn(),
        findOne: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    },

    Activated: {
        create: jest.fn(),
        findOne: jest.fn()
    },

    Basket: {
        create: jest.fn(),
        findOne: jest.fn()
    },

    UserRecover: {
        create: jest.fn(),
        findOne: jest.fn()
    },

    Device: {
        findByPk: jest.fn()
    },

    BasketDevice: {
        findOne: jest.fn(),
        findOrCreate: jest.fn()
    }
}))

jest.mock('../../../database/db', () => ({
    sequelize: {
        query: jest.fn(),
        transaction: jest.fn(),
        LOCK: {
            UPDATE: "UPDATE"
        }
    }
}))

const mockSequelize = sequelize as jest.Mocked<typeof sequelize>

jest.mock('../../../service/tokenService', () => ({
    __esModule: true,
    default: {
        generateJWT: jest.fn(),
        validateAccessToken: jest.fn(),
        validateRefreshToken: jest.fn(),
        findToken: jest.fn(),
        saveToken: jest.fn(),
        deleteByToken: jest.fn(),
        deleteByUserId: jest.fn()
    }
}));

jest.mock("../../../service/mailService", () => ({
    __esModule: true,
    default: {
        sendActivationMail: jest.fn(),
        sendRecoveryMail: jest.fn(),
        sendConfirmationCode: jest.fn(),
        sendMailChangedMessage: jest.fn(),
        sendMailChangeLink: jest.fn()
    }
}))

describe("UserService", () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    describe("registration", () => {
        test("valid data creates user", async () => {
            const mockTransaction = {
                commit: jest.fn(),
                rollback: jest.fn()
            }
            mockSequelize.transaction.mockImplementation(async (callback: any) => {
                return await callback(mockTransaction)
            })

            jest.spyOn(User, 'findOne').mockResolvedValue(null)
            jest.spyOn(User, 'create').mockResolvedValue({
                id: 1,
                email: "user@test.com",
                role: 'USER'
            })
            jest.spyOn(Activated, 'create').mockResolvedValue({
                id: 1,
                userId: 1,
                activated: false,
                activationLink: "link"
            })
            jest.spyOn(tokenService, 'generateJWT').mockReturnValue({
                refreshToken: "rt",
                accessToken: "at"
            })

            const result = await userService.registration("user@test.com", "Qwerty1")

            expect(User.create).toHaveBeenCalled()
            expect(Activated.create).toHaveBeenCalled()
            expect(result).toBeInstanceOf(UserDto)
        })

        test("non-unique email -> error", async () => {
            const mockTransaction = {
                commit: jest.fn(),
                rollback: jest.fn()
            }
            mockSequelize.transaction.mockImplementation(async (callback: any) => {
                return await callback(mockTransaction)
            })

            jest.spyOn(User, 'findOne').mockResolvedValue({
                id: 3,
                email: "user@test.com"
            } as any)

            await expect(userService.registration("user@test.com", "Qwerty1"))
                .rejects
                .toThrow("Email is already taken")
        })

        test("error rollbacks everithing", async () => {
            const mockTransaction = {
                commit: jest.fn(),
                rollback: jest.fn()
            }
            mockSequelize.transaction.mockImplementation(async (callback: any) => {
                try {
                    return await callback(mockTransaction)
                } catch (error) {
                    mockTransaction.rollback()
                    throw error
                }
            })

            jest.spyOn(User, 'findOne').mockResolvedValue(null)
            jest.spyOn(User, 'create').mockResolvedValue({
                id: 1,
                email: "user@test.com",
                role: 'USER'
            })
            jest.spyOn(Activated, 'create').mockRejectedValue(new Error("DB error"))

            await expect(userService.registration("user@test.com", "Qwerty1"))
                .rejects
                .toThrow("DB error")
            
            expect(mockTransaction.rollback).toHaveBeenCalled()
            expect(mailService.sendActivationMail).not.toHaveBeenCalled()
        })
    })

    describe("login", () => {
        test("valid data returns userDto", async () => {
            jest.spyOn(User, 'findOne').mockResolvedValue({
                id: 1,
                email: "user@test.com",
                role: "USER",
                password: "hash",
                activated: {
                    activated: true
                }
            } as any)

            jest.spyOn(bcrypt, 'compareSync').mockReturnValue(true)

            jest.spyOn(tokenService, 'generateJWT').mockReturnValue({
                refreshToken: "rt",
                accessToken: "at"
            })

            const result = await userService.login("user@test.com", "password")

            expect(result).toStrictEqual({
                id: 1,
                email: "user@test.com",
                role: "USER",
                refreshToken: "rt",
                accessToken: "at"
            })
        })

        test("not activated return error", async () => {
            jest.spyOn(User, 'findOne').mockResolvedValue({
                id: 1,
                email: "user@test.com",
                role: "USER",
                password: "hash",
                activated: {
                    activated: false
                }
            } as any)

            await expect(userService.login("user@test.com", "password"))
                .rejects
                .toThrow(ApiError)
        })

        test("invalid email return error", async () => {
            jest.spyOn(User, 'findOne').mockResolvedValue(null as any)

            await expect(userService.login("user@test.com", "password"))
                .rejects
                .toThrow("Wrong email or password")
        })

        test("invalid password return error", async () => {
            jest.spyOn(User, 'findOne').mockResolvedValue({
                id: 1,
                email: "user@test.com",
                role: "USER",
                password: "hash",
                activated: {
                    activated: true
                }
            } as any)

            jest.spyOn(bcrypt, 'compareSync').mockReturnValue(false)

            await expect(userService.login("user@test.com", "password"))
                .rejects
                .toThrow("Wrong email or password")
        })
    })

    describe("activateAccount", () => {
        test("valid link activates account", async () => {
            const mockTransaction = {
                commit: jest.fn(),
                rollback: jest.fn()
            }
            mockSequelize.transaction.mockImplementation(async (callback: any) => {
                return await callback(mockTransaction)
            })
            
            const account = jest.spyOn(Activated, 'findOne').mockResolvedValue({
                id: 1,
                userId: 1,
                activated: false,
                save: jest.fn()
            } as any)

            await userService.activateAccount("validLink")

            expect(Basket.create).toHaveBeenCalled()
        })

        test("invalid link return error", async () => {
            jest.spyOn(Activated, 'findOne').mockResolvedValue(null as any)

            await expect(userService.activateAccount("invalidLink"))
                .rejects
                .toThrow("Wrong activation link")
        })

        test("activated account return error", async () => {
            jest.spyOn(Activated, 'findOne').mockResolvedValue({
                id: 1,
                userId: 1,
                activated: true,
                save: jest.fn()
            } as any)

            await expect(userService.activateAccount("validLink"))
                .rejects
                .toThrow("Profile is already activated")
        })

        test("error rollbacks", async () => {
            const mockTransaction = {
                commit: jest.fn(),
                rollback: jest.fn()
            }
            mockSequelize.transaction.mockImplementation(async (callback: any) => {
                try {
                    return await callback(mockTransaction)
                } catch (error) {
                    mockTransaction.rollback()
                    throw error
                }
            })
            
            jest.spyOn(Activated, 'findOne').mockResolvedValue({
                id: 1,
                userId: 1,
                activated: false,
                save: jest.fn()
            } as any)

            jest.spyOn(Basket, 'create').mockRejectedValue(new Error("DB Error"))

            await expect(userService.activateAccount("validLink"))
                .rejects
                .toThrow("DB Error")

            expect(mockTransaction.rollback).toHaveBeenCalled()
        })
    })

    describe("sendRecoverEmail", () => {
        test("valid token return tokenData", async () => {
            jest.spyOn(tokenService, 'validateRefreshToken').mockReturnValue({
                id: 1,
                email: 'test@test.com',
                role: "USER"
            })
            jest.spyOn(tokenService, 'findToken').mockResolvedValue({
                id: 1,
                refreshToken: "rt"
            } as any)
            jest.spyOn(User, 'findOne').mockResolvedValue({
                id: 1,
                email: 'test@test.com',
                role: "USER"
            } as any)
            jest.spyOn(tokenService, 'generateJWT').mockReturnValue({
                refreshToken: "rt2",
                accessToken: "at"
            })

            const result = await userService.refresh("validToken")

            expect(result.refreshToken).toEqual("rt2")
            expect(result.userDto).toBeInstanceOf(UserDto)
        })

        test("falsy userData return error", async () => {
            jest.spyOn(tokenService, 'validateRefreshToken').mockReturnValue(null)
            jest.spyOn(tokenService, 'findToken').mockResolvedValue({
                id: 1,
                refreshToken: "rt"
            } as any)

            await expect(userService.refresh("validToken"))
                .rejects
                .toThrow("Invalid credentials")
        })

        test("falsy tokenData return error", async () => {
            jest.spyOn(tokenService, 'validateRefreshToken').mockReturnValue({
                id: 1,
                email: 'test@test.com',
                role: "USER"
            })
            jest.spyOn(tokenService, 'findToken').mockResolvedValue(null as any)

            await expect(userService.refresh("validToken"))
                .rejects
                .toThrow("Invalid credentials")
        })

        test("non-existing user return error", async () => {
            jest.spyOn(tokenService, 'validateRefreshToken').mockReturnValue({
                id: 1,
                email: 'test@test.com',
                role: "USER"
            })
            jest.spyOn(tokenService, 'findToken').mockResolvedValue({
                id: 1,
                refreshToken: "rt"
            } as any)
            jest.spyOn(User, 'findOne').mockResolvedValue(null as any)

            await expect(userService.refresh("validToken"))
                .rejects
                .toThrow("Invalid credentials")
        })
    })

    describe("sendRecoverEmail", () => {
        test("valid email -> sends email", async () => {
            const mockTransaction = {
                commit: jest.fn(),
                rollback: jest.fn(),
                LOCK: {
                    UPDATE: 'UPDATE'
                }
            };
            
            mockSequelize.transaction.mockImplementation(async (callback: any) => {
                return await callback(mockTransaction);
            });

            jest.spyOn(User, 'findOne').mockResolvedValue({
                id: 1,
                email: "test@mail.com",
                role: "USER"
            } as any)
            jest.spyOn(mailService, 'sendRecoveryMail').mockResolvedValue()
            jest.spyOn(UserRecover, 'create').mockResolvedValue({})
            
            await userService.sendRecoverEmail("test@mail.com")

            expect(User.findOne).toHaveBeenCalledWith({where: {email: "test@mail.com"}})
            expect(mailService.sendRecoveryMail).toHaveBeenCalled()
            expect(UserRecover.create).toHaveBeenCalled()
        })

        test("invalid email -> error", async () => {
            const mockTransaction = {
                commit: jest.fn(),
                rollback: jest.fn(),
                LOCK: {
                    UPDATE: 'UPDATE'
                }
            };
            
            mockSequelize.transaction.mockImplementation(async (callback: any) => {
                return await callback(mockTransaction);
            });

            jest.spyOn(User, 'findOne').mockResolvedValue(null as any)
            
            await expect(userService.sendRecoverEmail("test@mail.com"))
                .rejects
                .toThrow("Invalid credentials")
        })

        test("mailservice error -> sends email", async () => {
            const mockTransaction = {
                commit: jest.fn(),
                rollback: jest.fn(),
                LOCK: {
                    UPDATE: 'UPDATE' // Добавьте это
                }
            };
            
            mockSequelize.transaction.mockImplementation(async (callback: any) => {
                return await callback(mockTransaction);
            });

            jest.spyOn(User, 'findOne').mockResolvedValue({
                id: 1,
                email: "test@mail.com",
                role: "USER"
            } as any)
            jest.spyOn(mailService, 'sendRecoveryMail').mockRejectedValue(new Error("Could't send email"))
            
            await expect(userService.sendRecoverEmail("test@mail.com"))
                .rejects
                .toThrow("Could't send email")
        })
    })

    describe("recoverPassword", () => {
        test("valid data return userDto", async () => {
            const mockTransaction = {
                commit: jest.fn(),
                rollback: jest.fn()
            }
            mockSequelize.transaction.mockImplementation(async (callback: any) => {
                try {
                    return await callback(mockTransaction)
                } catch (error) {
                    mockTransaction.rollback()
                    throw error
                }
            })

            jest.spyOn(UserRecover, 'findOne').mockResolvedValue({
                id: 1,
                recoveryLink: "validLink",
                userId: 1,
                destroy: jest.fn()
            } as any)
            jest.spyOn(User, 'findOne').mockResolvedValue({
                id: 1,
                email: 'test@tes.com',
                role: 'USER',
                save: jest.fn()
            } as any)
            jest.spyOn(tokenService, 'deleteByUserId').mockResolvedValue()
            
            const result = await userService.recoverPassword("validLink", "Qwerty1")

            expect(UserRecover.findOne).toHaveBeenCalledWith({where: {recoveryLink: "validLink"}})
            expect(result).toBeInstanceOf(UserDto)
            expect(result.id).toBe(1)
        })

        test("empty user return error", async () => {
            const mockTransaction = {
                commit: jest.fn(),
                rollback: jest.fn()
            }
            mockSequelize.transaction.mockImplementation(async (callback: any) => {
                try {
                    return await callback(mockTransaction)
                } catch (error) {
                    mockTransaction.rollback()
                    throw error
                }
            })

            jest.spyOn(UserRecover, 'findOne').mockResolvedValue({
                id: 1,
                recoveryLink: "validLink",
                userId: 1,
                destroy: jest.fn()
            } as any)
            jest.spyOn(User, 'findOne').mockResolvedValue(null as any)
            
            await expect(userService.recoverPassword("invalidLink", "Qwerty1"))
                .rejects
                .toThrow("Couldn't find user")
        })

        test("invalid link return error", async () => {
            const mockTransaction = {
                commit: jest.fn(),
                rollback: jest.fn()
            }
            mockSequelize.transaction.mockImplementation(async (callback: any) => {
                try {
                    return await callback(mockTransaction)
                } catch (error) {
                    mockTransaction.rollback()
                    throw error
                }
            })

            jest.spyOn(UserRecover, 'findOne').mockResolvedValue(null as any)
            
            await expect(userService.recoverPassword("invalidLink", "Qwerty1"))
                .rejects
                .toThrow("Invalid recovery link")
        })

        test("error causes rollback", async () => {
            const mockTransaction = {
                commit: jest.fn(),
                rollback: jest.fn()
            }
            mockSequelize.transaction.mockImplementation(async (callback: any) => {
                try {
                    return await callback(mockTransaction)
                } catch (error) {
                    mockTransaction.rollback()
                    throw error
                }
            })

            jest.spyOn(UserRecover, 'findOne').mockResolvedValue({
                id: 1,
                recoveryLink: "validLink",
                userId: 1,
                destroy: jest.fn()
            } as any)
            jest.spyOn(User, 'findOne').mockResolvedValue({
                id: 1,
                email: 'test@tes.com',
                role: 'USER',
                save: jest.fn()
            } as any)
            jest.spyOn(tokenService, 'deleteByUserId').mockRejectedValue(new Error("Service error"))

            await expect(userService.recoverPassword("validLink", "Qwerty1"))
                .rejects
                .toThrow("Service error")
            expect(mockTransaction.rollback).toHaveBeenCalled()
        })
    })

    describe("addToCart", () => {
        beforeAll(() => {
            (sequelize as any).LOCK = {
                UPDATE: 'UPDATE',
                SHARE: 'SHARE', 
                KEY_SHARE: 'KEY_SHARE',
                NO_KEY_UPDATE: 'NO_KEY_UPDATE'
            };

            (sequelize.transaction as jest.Mock).mockImplementation(async (callback) => {
                const mockTransaction = {
                    commit: jest.fn(),
                    rollback: jest.fn(),
                    LOCK: (sequelize as any).LOCK
                };
                return await callback(mockTransaction);
            });
        });

        beforeEach(() => {
            jest.clearAllMocks();
        });

        test("valid data adds to cart", async () => {
            jest.spyOn(Device, 'findByPk').mockResolvedValue({
                id: 1,
                name: 'device',
                quantityInStock: 1
            } as any)
            jest.spyOn(Basket, 'findOne').mockResolvedValue({
                id: 1,
                userId: 2
            } as any)
            const basketdeviceSpy = jest.spyOn(BasketDevice, 'findOrCreate').mockResolvedValue([
                {
                    amount: 1,
                    save: jest.fn()
                },
                false
            ] as [any, boolean])

            await userService.addToCart(2, 1)

            expect(BasketDevice.findOrCreate).toHaveBeenCalled()
            expect(basketdeviceSpy).toHaveBeenCalled()
        })

        test("invalid deviceId return error", async () => {
            jest.spyOn(Device, 'findByPk').mockResolvedValue(null as any)

            await expect(userService.addToCart(2, 1))
                .rejects
                .toThrow("Device not found")
        })

        test("unavaliable device return error", async () => {
            jest.spyOn(Device, 'findByPk').mockResolvedValue({
                id: 1,
                name: 'device',
                quantityInStock: 0
            } as any)

            await expect(userService.addToCart(2, 1))
                .rejects
                .toThrow("Not enough items in stock")
        })

        test("invalid userId return error", async () => {
            jest.spyOn(Device, 'findByPk').mockResolvedValue({
                id: 1,
                name: 'device',
                quantityInStock: 1
            } as any)
            jest.spyOn(Basket, 'findOne').mockResolvedValue(null as any)

            await expect(userService.addToCart(2, 1))
                .rejects
                .toThrow("Basket not found")
        })
    })

    describe("changeCartItemAmount", () => {
        test("valid data changes amount", async () => {
            const mockTransaction = {
                commit: jest.fn(),
                rollback: jest.fn()
            }
            mockSequelize.transaction.mockImplementation(async (callback: any) => {
                try {
                    return await callback(mockTransaction)
                } catch (error) {
                    mockTransaction.rollback()
                    throw error
                }
            })

            jest.spyOn(Basket, 'findOne').mockResolvedValue({
                id: 1,
                userId: 1
            } as any)
            const basketdeviceSpy = jest.spyOn(BasketDevice, 'findOne').mockResolvedValue({
                device: {
                    quantityInStock: 5
                },
                destroy: jest.fn(),
                save: jest.fn()
            } as any)

            await userService.changeCartItemAmount(1, 1, 1)

            expect(basketdeviceSpy).toHaveBeenCalled()
        })
        
        test("invalid userId return error", async () => {
            const mockTransaction = {
                commit: jest.fn(),
                rollback: jest.fn()
            }
            mockSequelize.transaction.mockImplementation(async (callback: any) => {
                try {
                    return await callback(mockTransaction)
                } catch (error) {
                    mockTransaction.rollback()
                    throw error
                }
            })

            jest.spyOn(Basket, 'findOne').mockResolvedValue(null as any)

            await expect(userService.changeCartItemAmount(1, 1, 1))
                .rejects
                .toThrow("Couldn't find cart")
        })

        test("invalid deviceId return error", async () => {
            const mockTransaction = {
                commit: jest.fn(),
                rollback: jest.fn()
            }
            mockSequelize.transaction.mockImplementation(async (callback: any) => {
                try {
                    return await callback(mockTransaction)
                } catch (error) {
                    mockTransaction.rollback()
                    throw error
                }
            })

            jest.spyOn(Basket, 'findOne').mockResolvedValue({
                id: 1,
                userId: 1
            } as any)
            jest.spyOn(BasketDevice, 'findOne').mockResolvedValue(null as any)

            await expect(userService.changeCartItemAmount(1, 1, 1))
                .rejects
                .toThrow("Item wasn't added to cart")
        })

        test("not enought in stock return error", async () => {
            const mockTransaction = {
                commit: jest.fn(),
                rollback: jest.fn()
            }
            mockSequelize.transaction.mockImplementation(async (callback: any) => {
                try {
                    return await callback(mockTransaction)
                } catch (error) {
                    mockTransaction.rollback()
                    throw error
                }
            })

            jest.spyOn(Basket, 'findOne').mockResolvedValue({
                id: 1,
                userId: 1
            } as any)
            jest.spyOn(BasketDevice, 'findOne').mockResolvedValue({
                device: {
                    quantityInStock: 2
                },
                destroy: jest.fn(),
                save: jest.fn()
            } as any)

            await expect(userService.changeCartItemAmount(1, 1, 3))
                .rejects
                .toThrow("Not enough items in stock")
        })
    })
})