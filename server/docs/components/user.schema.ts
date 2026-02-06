/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - id
 *         - email
 *         - role
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *           description: User Id
 *         email:
 *           type: string
 *           example: user@mail.com
 *           description: User email
 *         role:
 *           type: string
 *           example: USER
 *           description: User role
 *     
 *     CreateUser:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:   
 *           type: string
 *           example: user@mail.com
 *           description: User email
 *         password:
 *           type: string
 *           example: Qwerty123!
 *           description: Password min length 8, must have at least 1 uppercase, 1 lowercase, 1 digit, 1 symbol
 *     
 *     TokenPair:
 *       type: object
 *       required:
 *         - accessToken
 *         - refreshToken
 *       properties:
 *         accessToken:
 *           type: string
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30
 *           description: User Access Token
 *         refreshToken:
 *           type: string
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30
 *           description: User Refresh Token
 */