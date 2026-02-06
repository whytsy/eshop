/**
 * @swagger
 * components:
 *   schemas:
 *     ApiError:
 *       type: object
 *       required:
 *         - errors
 *         - errorStatus
 *       properties:
 *         errors:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               msg:
 *                 type: string
 *                 description: Error message
 *         errorStatus:
 *           type: integer
 *           description: HTTP status code
 *     
 *   responses:
 *     BadRequest:
 *       description: Bad Request
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ApiError'
 *           example:
 *             errors:
 *               - msg: "Id should be a positive number"
 *             errorStatus: 400
 *     
 *     Unauthorized:
 *       description: Authentication required
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ApiError'
 *           example:
 *             errors:
 *               - msg: "Unauthorized"
 *             errorStatus: 401
 *     
 *     Forbidden:
 *       description: Forbidden
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ApiError'
 *           example:
 *             errors:
 *               - msg: "Forbidden"
 *             errorStatus: 403
 *     
 *     NotFound:
 *       description: Not Found
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ApiError'
 *           example:
 *             errors:
 *               - msg: "Entity doesn't exist"
 *             errorStatus: 404
 * 
 *     Conflict:
 *       description: Conflict
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ApiError'
 *           example:
 *             errors:
 *               - msg: "Name is not unique!"
 *             errorStatus: 409
 * 
 *     FileTooLarge:
 *       description: File too large
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ApiError'
 *           example:
 *             errors:
 *               - msg: "File size exceeds 5MB limit"
 *             errorStatus: 413
 * 
 *     UnsupportedMediaType:
 *       description: Unsupported file type
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ApiError'
 *           example:
 *             errors:
 *               - msg: "Only JPEG, PNG, and WEBP images are allowed"
 *             errorStatus: 415
 *     
 *     ValidationError:
 *       description: Validation failed
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ApiError'
 *           example:
 *             errors:
 *               - msg: "Invalid email address"
 *               - msg: "Password must be at least 8 characters long"
 *             errorStatus: 422
 *     
 *     ServerError:
 *       description: Internal Server Error
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ApiError'
 *           example:
 *             errors:
 *               - msg: "Internal Server Error"
 *             errorStatus: 500
 * 
 *     Unavaliable:
 *       description: Service unavailable
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ApiError'
 *           example:
 *             errors:
 *               - msg: "Service unavailable"
 *             errorStatus: 503
 */