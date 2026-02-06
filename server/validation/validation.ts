import type { NextFunction, Request, Response } from "express"
import { body, cookie, param, query, validationResult } from "express-validator"

export const emailValidation = [
    body('email')
        .isEmail().withMessage('Invalid email address')
]

export const passwordValidation = [
    body('password')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
        .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
        .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
        .matches(/\d/).withMessage('Password must contain at least one number')
]

export const searchValidation = (paramName: string = "query") => [
    query(paramName)
        .trim()
        .notEmpty().withMessage(`${paramName} is required`)
]

export const idParamValidation = (paramName: string = "id") => [
    param(paramName)
        .notEmpty().withMessage(`${paramName} shouldn't be empty`)
        .isInt({min: 1}).withMessage(`${paramName} should be a positive number`)
        .toInt()
]

export const intValidation = (paramName: string, min: number = 0) => [
    body(paramName)
        .isInt({min: min}).withMessage(`${paramName} should be a positive number`)
        .toInt()
]

export const notEmptyCookieValidation = (paramName: string) => [
    cookie(paramName)
        .trim()
        .notEmpty().withMessage(`${paramName} shouldn't be empty`)
]

export const notEmptyParamValidation = (paramName: string) => [
    param(paramName)
        .trim()
        .notEmpty().withMessage(`${paramName} shouldn't be empty`)
]

export const notEmptyValidation = (paramName: string) => [
    body(paramName)
        .trim()
        .notEmpty().withMessage(`${paramName} shouldn't be empty`)
]

export const userAuthValidation = [
    ...emailValidation,
    ...passwordValidation
]

export const deviceSearchValidation = [
    query("page")
        .isInt({min: 1}).withMessage('Page should be a positive number')
        .toInt(),
    query("limit")
        .isInt({min: 1}).withMessage("Limit should be a positive number")
        .toInt(),
    query("brandId")
        .optional()
        .isInt({min: 1}).withMessage("Brand ID should be a positive number")
        .toInt(),
    query("typeId")
        .optional()
        .isInt({min: 1}).withMessage("Type ID should be a positive number")
        .toInt(),
    query("query")
        .optional()
        .trim()
        .notEmpty().withMessage("Query shouldn't be empty when searching")
]

export const deviceValidation = [
    body("name")
        .trim()
        .notEmpty().withMessage("Name shouln't be empty"),
    body("price")
        .isInt({min: 0}).withMessage("Price should be a positive number")
        .toInt(),
    ...notEmptyValidation("info"),
    ...intValidation("typeId", 1),
    ...intValidation("brandId", 1),
    ...intValidation("quantityInStock")
]

export const deviceUpdateValidation = [
    ...deviceValidation,
    ...idParamValidation(),
    ...notEmptyValidation("oldImages"),
]

export const searchQueryValidation = [
    param("query")
        .trim()
        .notEmpty().withMessage("Query shouldn't be empty")
]

export const validate = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array(),
            errorStatus: 422
        })
    }
    next()
}