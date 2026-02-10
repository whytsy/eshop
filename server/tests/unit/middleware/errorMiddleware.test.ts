import ApiError from "../../../errors/ApiError";
import logger from "../../../logger/logger";
import { errorHandler } from "../../../middleware/errorMiddleware";

jest.mock('../../../logger/logger')

describe("errorMiddleware", () => {
    let mockReq: any
    let mockRes: any

    beforeEach(() => {
        mockReq = {
            method: "GET",
            url: "/api/test"
        }
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
    })

    test("ApiError return error array", () => {
        const apiError = ApiError.badRequest("Bad request")

        errorHandler(apiError, mockReq, mockRes)

        expect(logger.warn).toHaveBeenCalled()
        expect(mockRes.status).toHaveBeenCalledWith(400)
        expect(mockRes.json).toHaveBeenCalledWith(
            expect.objectContaining({
                errors: [
                    {
                        msg: "Bad request"
                    }
                ]
            })
        )
    })

    test("Error return server error", () => {
        const error = new Error("Server error")

        errorHandler(error, mockReq, mockRes)

        expect(logger.error).toHaveBeenCalled()
        expect(mockRes.status).toHaveBeenCalledWith(500)
        expect(mockRes.json).toHaveBeenCalledWith(
            expect.objectContaining({
                errors: [
                    {
                        msg: "Internal server error"
                    }
                ]
            })
        )
    })

    test("Not error object", () => {
        const error: unknown = "Something went wrong"

        errorHandler(error as Error, mockReq, mockRes)

        expect(logger.error).toHaveBeenCalled()
        expect(mockRes.status).toHaveBeenCalledWith(500)
        expect(mockRes.json).toHaveBeenCalledWith(
            expect.objectContaining({
                errors: [
                    {
                        msg: 'Unknown error...'
                    }
                ]
            })
        )
    })
})