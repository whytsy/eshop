import { UserDto } from "../../../dto/User.dto"
import { Token } from "../../../database/models/index"
import jwt from 'jsonwebtoken'
import tokenService from "../../../service/tokenService"
import { Transaction } from "sequelize"

jest.mock('jsonwebtoken', () => ({
  verify: jest.fn(),
  sign: jest.fn(),
  decode: jest.fn()
}))

jest.mock('../../../database/models/index', () => ({
    Token: {
        findOne: jest.fn(),
        findByPk: jest.fn(),
        create: jest.fn(),
        destroy: jest.fn()
    },
    sequelize: {
        transaction: jest.fn()
    }
}))

jest.mock('../../../helpers/JWTSecret', () => ({
    getRefreshSecret: () => "refresh-secret",
    getAccessSecret: () => "access-secret"
}))

describe("tokenService", () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })
    
    describe("generateJWT", () => {

        test("generating return token pair", () => {
            jest.spyOn(jwt, 'sign')
                .mockReturnValueOnce("refresh" as any)
                .mockReturnValueOnce("access" as any)

            const userDto = new UserDto({ id: 1, email: 'test@test.com', role: 'USER' })

            const result =  tokenService.generateJWT(userDto)

            expect(jwt.sign).toHaveBeenCalledTimes(2)
            expect(jwt.sign).toHaveBeenCalledWith(
                { id: 1, email: 'test@test.com', role: 'USER' },
                'refresh-secret',
                { expiresIn: '1h' }
            )
            expect(jwt.sign).toHaveBeenCalledWith(
                { id: 1, email: 'test@test.com', role: 'USER' },
                'access-secret',
                { expiresIn: '30m' }
            )
            expect(result).toEqual({
                refreshToken: "refresh",
                accessToken: "access"
            })
        })
    })

    describe("validateAccessToken", () => {
        test("valid token return userDto", () => {
            (jwt.verify as jest.Mock).mockImplementation(() => {
                return {
                    id: 1,
                    email: 'test@test.com',
                    role: "USER"
                }
            })

            const result = tokenService.validateAccessToken("validToken")

            expect(result).toEqual({
                id: 1,
                email: 'test@test.com',
                role: "USER"
            })
        })
        
        test('invalid token returns null', () => {
            (jwt.verify as jest.Mock).mockImplementation(() => {
                throw new jwt.JsonWebTokenError('invalid token')
            })

            const result = tokenService.validateAccessToken("invalidToken")

            expect(result).toBeNull()
        })

        test('expired token returns null', () => {
            (jwt.verify as jest.Mock).mockImplementation(() => {
                throw new jwt.TokenExpiredError('expired token', new Date())
            })

            const result = tokenService.validateAccessToken("expiredToken")

            expect(result).toBeNull()
        })
    })

    describe("validateRefreshToken", () => {
        test("valid token return userDto", () => {
            (jwt.verify as jest.Mock).mockImplementation(() => {
                return {
                    id: 1,
                    email: 'test@test.com',
                    role: "USER"
                }
            })

            const result = tokenService.validateRefreshToken("validToken")

            expect(result).toEqual({
                id: 1,
                email: 'test@test.com',
                role: "USER"
            })
        })
        
        test('invalid token returns null', () => {
            (jwt.verify as jest.Mock).mockImplementation(() => {
                throw new jwt.JsonWebTokenError('invalid token')
            })

            const result = tokenService.validateRefreshToken("invalidToken")

            expect(result).toBeNull()
        })

        test('expired token returns null', () => {
            (jwt.verify as jest.Mock).mockImplementation(() => {
                throw new jwt.TokenExpiredError('expired token', new Date())
            })

            const result = tokenService.validateRefreshToken("expiredToken")

            expect(result).toBeNull()
        })
    })

    describe("findToken", () => {
        test("if token in db returns tokendata", async () => {
            jest.spyOn(Token, 'findOne').mockResolvedValue({
                id: 1,
                refreshToken: 'refreshToken'
            } as any)

            const result = await tokenService.findToken('refreshToken')

            expect(result).toEqual({
                id: 1,
                refreshToken: 'refreshToken'
            })
        })
    })
    
    describe("saveToken", () => {
        test("if tokenData in db changes existing token", async () => {
            const tokenInstance = {
                id: 1,
                refreshToken: 'refreshToken',
                save: jest.fn().mockResolvedValue({
                    id: 1,
                    refreshToken: 'newRefreshToken'
                })
            }

            jest.spyOn(Token, 'findOne').mockResolvedValue(tokenInstance as any)

            await tokenService.saveToken(1, 'newRefreshToken')

            expect(tokenInstance.save).toHaveBeenCalled()
            expect(tokenInstance.refreshToken).toBe('newRefreshToken')
        })

        test("if tokenData not in db creates and returns token", async () => {
            jest.spyOn(Token, 'findOne').mockResolvedValue(null)
            const createSpy = jest.spyOn(Token, 'create').mockResolvedValue({
                id: 1,
                refreshToken: 'refreshToken'
            } as any)

            const result = await tokenService.saveToken(1, 'refreshToken')

            expect(createSpy).toHaveBeenCalled()
            expect(result.id).toBe(1)
            expect(result.refreshToken).toBe('refreshToken')
        })
    })

    describe("deleteByToken", () => {
        test("destroys with correct token", async () => {
            const destroySpy = jest.spyOn(Token, "destroy").mockResolvedValue(0)

            await tokenService.deleteByToken("token")

            expect(destroySpy).toHaveBeenCalledWith({
                where: { refreshToken: "token" }
            })
        })
    })

    describe("deleteByUserId", () => {
        test("destroys correctly with transaction", async () => {
            const destroySpy = jest.spyOn(Token, "destroy").mockResolvedValue(0)
            const transaction = {} as Transaction

            await tokenService.deleteByUserId(1, transaction)

            expect(destroySpy).toHaveBeenCalledWith({
                where: {userId: 1}, transaction: transaction
            })
        })

        test("destroys correctly without transaction", async () => {
            const destroySpy = jest.spyOn(Token, "destroy").mockResolvedValue(0)

            await tokenService.deleteByUserId(1)

            expect(destroySpy).toHaveBeenCalledWith({
                where: {userId: 1}, transaction: undefined
            })
        })
    })
})