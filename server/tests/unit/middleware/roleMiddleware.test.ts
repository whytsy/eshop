import logger from "../../../logger/logger";
import { checkRole, checkRoleOnly, isGreaterRole, isValidRole } from "../../../middleware/roleMiddleware";
import tokenService from "../../../service/tokenService";

jest.mock('../../../service/tokenService')
jest.mock('../../../logger/logger')

const mockTokenService = tokenService as jest.Mocked<typeof tokenService>
const mockLogger = logger as jest.Mocked<typeof logger>

describe('checkRole middleware', () => {
    let mockReq: any
    let mockRes: any
    let mockNext: jest.Mock

    beforeEach(() => {
        mockReq = {
            method: 'GET',
            headers: {},
            path: '/api/admin',
            ip: '127.0.0.1',
            user: undefined
        }

        mockRes = {
            status: jest.fn(() => mockRes),
            json: jest.fn()
        }

        mockNext = jest.fn()

        jest.clearAllMocks()
    })

    describe('checkRole', () => {
        test('OPTIONS skip', () => {
            mockReq.method = 'OPTIONS'
            const middleware = checkRole('ADMIN')
        
            middleware(mockReq, mockRes, mockNext)

            expect(mockNext).toHaveBeenCalled()
            expect(mockTokenService.validateAccessToken).not.toHaveBeenCalled()
        })

        test('No token return 401', () => {
            mockReq.headers = {}
            const middleware = checkRole('USER')

            middleware(mockReq, mockRes, mockNext)

            expect(mockRes.status).toHaveBeenCalledWith(401)
            expect(mockRes.json).toHaveBeenCalledWith({ message: 'Unauthorized' })
            expect(mockLogger.warn).toHaveBeenCalledWith(
                'Restricted access attempt',
                expect.objectContaining({
                    error: 'No token provided'
                })
            )
        })

        test('Invalid token return 401', () => {
            mockReq.headers.authorization = 'Bearer invalid-token'
            mockTokenService.validateAccessToken.mockReturnValue(null)
            
            const middleware = checkRole('USER')

            middleware(mockReq, mockRes, mockNext)

            expect(mockTokenService.validateAccessToken).toHaveBeenCalledWith('invalid-token')
            expect(mockRes.status).toHaveBeenCalledWith(401)
            expect(mockRes.json).toHaveBeenCalledWith({ message: 'Unauthorized' })
        })

        test('USER trying to access ADMIN return 403', () => {
            mockReq.headers.authorization = 'Bearer user-token'
            mockTokenService.validateAccessToken.mockReturnValue({
                id: 1,
                email: 'user@test.com',
                role: 'USER'
            })
            
            const middleware = checkRole('ADMIN')

            middleware(mockReq, mockRes, mockNext)

            expect(mockRes.status).toHaveBeenCalledWith(403)
            expect(mockRes.json).toHaveBeenCalledWith({ message: 'Forbidden' })
            expect(mockLogger.warn).toHaveBeenCalledWith(
                'Restricted access attempt',
                expect.objectContaining({
                    error: 'USER can\'t access the resource'
                })
            )
        })

        test('ADMIN can get USER resource', () => {
            mockReq.headers.authorization = 'Bearer admin-token'
            mockTokenService.validateAccessToken.mockReturnValue({
                id: 2,
                email: 'admin@test.com',
                role: 'ADMIN'
            })
            
            const middleware = checkRole('USER')

            middleware(mockReq, mockRes, mockNext)

            expect(mockReq.user).toEqual({
                id: 2,
                email: 'admin@test.com',
                role: 'ADMIN'
            })
            expect(mockNext).toHaveBeenCalled()
            expect(mockRes.status).not.toHaveBeenCalled()
        })
    })

    describe('checkRoleOnly', () => {
        test('USER trying to get ADMIN return 403', () => {
            mockReq.headers.authorization = 'Bearer user-token'
            mockTokenService.validateAccessToken.mockReturnValue({
                id: 1,
                email: 'user@test.com',
                role: 'USER'
            })

            const middleware = checkRoleOnly('ADMIN')

            middleware(mockReq, mockRes, mockNext)

            expect(mockRes.status).toHaveBeenCalledWith(403)
            expect(mockRes.json).toHaveBeenCalledWith({ message: 'Forbidden' })
        })

        test('ADMIN trying to get ADMIN success', () => {
            mockReq.headers.authorization = 'Bearer admin-token'
            mockTokenService.validateAccessToken.mockReturnValue({
                id: 2,
                email: 'admin@test.com',
                role: 'ADMIN'
            })

            const middleware = checkRoleOnly('ADMIN')

            middleware(mockReq, mockRes, mockNext)

            expect(mockNext).toHaveBeenCalled()
            expect(mockReq.user.role).toBe('ADMIN')
        })
    })

    describe('isValidRole', () => {
        test('true for valid role', () => {
            expect(isValidRole('USER')).toBe(true)
        })

        test('false for invalid role', () => {
            expect(isValidRole('DONOTEXIST')).toBe(false)
        })

        test('false for empty string', () => {
            expect(isValidRole('')).toBe(false)
        })
    })

    describe('isGreaterRole', () => {
        test('USER < MODERATOR', () => {
            expect(isGreaterRole('MODERATOR', 'USER')).toBe(true)
            expect(isGreaterRole('USER', 'MODERATOR')).toBe(false)
        })

        test('MODERATOR < ADMIN', () => {
            expect(isGreaterRole('ADMIN', 'MODERATOR')).toBe(true)
            expect(isGreaterRole('MODERATOR', 'ADMIN')).toBe(false)
        })

        test('ADMIN < SUPERADMIN', () => {
            expect(isGreaterRole('SUPERADMIN', 'ADMIN')).toBe(true)
            expect(isGreaterRole('ADMIN', 'SUPERADMIN')).toBe(false)
        })

        test('равные роли возвращают false', () => {
            expect(isGreaterRole('USER', 'USER')).toBe(false)
            expect(isGreaterRole('ADMIN', 'ADMIN')).toBe(false)
        })
    })
})