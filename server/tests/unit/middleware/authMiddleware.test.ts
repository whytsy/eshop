import logger from "../../../logger/logger";
import { authMiddleware } from "../../../middleware/authMiddleware";
import tokenService from "../../../service/tokenService";

jest.mock('../../../service/tokenService')
jest.mock('../../../logger/logger')

describe("AuthMiddleware", () => {
    let mockReq: any
    let mockRes: any
    let mockNext: jest.Mock

    beforeEach(() => {
        mockReq = {
            method: 'GET',
            headers: {},
            path: '/api/test',
            ip: '127.0.0.1'
        }

        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        mockNext = jest.fn()

        jest.clearAllMocks()
    })

    test("OPTIONS with no check", () => {
        mockReq.method = "OPTIONS"

        authMiddleware(mockReq, mockRes, mockNext)

        expect(mockNext).toHaveBeenCalled()
        expect(tokenService.validateAccessToken).not.toHaveBeenCalled()
    })

    test("No token returns 401", () => {
        authMiddleware(mockReq, mockRes, mockNext)

        expect(mockRes.status).toHaveBeenCalledWith(401)
        expect(mockRes.json).toHaveBeenCalledWith({
            errors: [{msg: "Unauthorized"}]
        })
        expect(logger.warn).toHaveBeenCalled()
    })

    test("Invalid token returns 401", () => {
        mockReq.headers.authorization = 'Bearer invalid-token'

        ;(tokenService.validateAccessToken as jest.Mock).mockReturnValue(null)

        authMiddleware(mockReq, mockRes, mockNext)

        expect(tokenService.validateAccessToken).toHaveBeenCalledWith('invalid-token')
        expect(mockRes.status).toHaveBeenCalledWith(401)
        expect(logger.warn).toHaveBeenCalled()
    })

    test("Valid token returns user", () => {
        mockReq.headers.authorization = "Bearer valid-token"
        const userData = {id: "1", email: "test@test.com", role: "USER"}
        ;(tokenService.validateAccessToken as jest.Mock).mockReturnValue(userData)

        authMiddleware(mockReq, mockRes, mockNext)

        expect(mockReq.user).toEqual(userData)
        expect(mockNext).toHaveBeenCalled()
    })
})

