import userController from '../controllers/userController'
import { authMiddleware } from '../middleware/authMiddleware'
import express from "express"
import { emailValidation, idParamValidation, intValidation, notEmptyCookieValidation, notEmptyParamValidation, notEmptyValidation, passwordValidation, userAuthValidation, validate } from '../validation/validation'
import { checkRoleOnly, ROLES } from '../middleware/roleMiddleware'
const router = express.Router()

/**
 * @swagger
 * 
 * /api/user/registration:
 *   post:
 *     summary: User registration
 *     tags: ['Auth']
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUser'
 *     responses:
 *       201:
 *         description: Created User
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       503:
 *         $ref: '#/components/responses/Unavaliable'
 */
router.post('/registration',
    userAuthValidation,
    validate,
    userController.registration
)

/**
 * @swagger
 * 
 * /api/user/login:
 *   post:
 *     summary: User login
 *     tags: ['Auth']
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUser'
 *     responses:
 *       200:
 *         description: User Data
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/User'
 *                 - $ref: '#/components/schemas/TokenPair'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       503:
 *         $ref: '#/components/responses/Unavaliable'
 */
router.post('/login',
    userAuthValidation,
    validate,
    userController.login
)

/**
 * @swagger
 * 
 * /api/user/activate/{link}:
 *   get:
 *     summary: Profile activation
 *     tags: ['User']
 *     parameters:
 *       - in: path
 *         name: link
 *         required: true
 *         schema:
 *           type: string
 *           example: a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d
 *           description: Account activation link
 *     responses:
 *       202:
 *         description: OK
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       503:
 *         $ref: '#/components/responses/Unavaliable'
 */
router.get('/activate/:link',
    notEmptyParamValidation("link"),
    validate,
    userController.activateAccount
)

/**
 * @swagger
 * 
 * /api/user/refresh:
 *   post:
 *     summary: Refresh access token
 *     tags: ['Auth']
 *     parameters:
 *       - in: cookie
 *         name: refreshToken
 *         required: true
 *         schema:
 *           type: string
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30
 *           description: Refresh token
 *     responses:
 *       200:
 *         description: User Data
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/User'
 *                 - $ref: '#/components/schemas/TokenPair'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       503:
 *         $ref: '#/components/responses/Unavaliable'
 */
router.post('/refresh',
    notEmptyCookieValidation('refreshToken'),
    validate,
    userController.refreshToken
)

/**
 * @swagger
 * 
 * /api/user/recover:
 *   post:
 *     summary: Send recover password email
 *     tags: ['User']
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@mail.com
 *                 description: User email
 *     responses:
 *       202:
 *         description: OK
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       503:
 *         $ref: '#/components/responses/Unavaliable'
 */
router.post('/recover',
    emailValidation,
    validate,
    userController.sendRecoverEmail
)

/**
 * @swagger
 * 
 * /api/user/recover/{link}:
 *   post:
 *     summary: Change user password
 *     tags: ['User']
 *     parameters:
 *       - in: path
 *         name: link
 *         required: true
 *         schema:
 *           type: string
 *           example: a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d
 *           description: Password change link
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 example: Qwerty123!
 *                 description: Password min length 8, must have at least 1 uppercase, 1 lowercase, 1 digit, 1 symbol
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       503:
 *         $ref: '#/components/responses/Unavaliable'
 */
router.post('/recover/:link',
    notEmptyParamValidation("link"),
    passwordValidation,
    validate,
    userController.resetPassword
)

/**
 * @swagger
 * 
 * /api/user/email/{link}:
 *   patch:
 *     summary: Change user email
 *     tags: ['User']
 *     parameters:
 *       - in: path
 *         name: link
 *         required: true
 *         schema:
 *           type: string
 *           example: a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d
 *           description: Email change link
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       503:
 *         $ref: '#/components/responses/Unavaliable'
 */
router.patch('/email/:link',
    notEmptyParamValidation("link"),
    validate,
    userController.changeEmail
)

/**
 * @swagger
 * 
 * /api/user/email:
 *   post:
 *     summary: Сhange user email request
 *     tags: ['User']
 *     security:
 *       - bearerAuth: ['USER']
 *     parameters:
 *       - in: path
 *         name: newEmail
 *         required: true
 *         schema:
 *           type: string
 *           example: newmail@mail.com
 *           description: New email
 *     responses:
 *       202:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Sent confirmation code to old email
 *                 expiresAt:
 *                   type: string
 *                   example: 2026-01-26T07:43:00.000Z
 *                   description: Request expiration date
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       409:
 *         $ref: '#/components/responses/Conflict'
 *       503:
 *         $ref: '#/components/responses/Unavaliable'
 */
router.post('/email',
    authMiddleware,
    checkRoleOnly(ROLES.USER),
    notEmptyValidation("newEmail"),
    validate,
    userController.changeEmailRequest
)

/**
 * @swagger
 * 
 * /api/user/email/code:
 *   post:
 *     summary: Old email confirmation
 *     tags: ['User']
 *     security:
 *       - bearerAuth: [USER]
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         schema:
 *           type: string
 *           example: 123456
 *           description: 6-digit code from old email
 *     responses:
 *       202:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Check new email to confirm email change
 *                 expiresAt:
 *                   type: string
 *                   example: 2026-01-26T07:43:00.000Z
 *                   description: Request expiration date
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       503:
 *         $ref: '#/components/responses/Unavaliable'
 */
router.post('/email/code',
    authMiddleware,
    checkRoleOnly(ROLES.USER),
    notEmptyValidation('code'),
    validate,
    userController.confirmEmailChange
)

/**
 * @swagger
 * 
 * /api/user/auth:
 *   get:
 *     summary: Check if user is authorized
 *     tags: ['Auth']
 *     security:
 *       - bearerAuth: [USER]
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       503:
 *         $ref: '#/components/responses/Unavaliable'
 */
router.get('/auth',
    authMiddleware,
    userController.check
)

/**
 * @swagger
 * 
 * /api/user/cart:
 *   get:
 *     summary: Get user cart
 *     tags: ['Cart']
 *     security:
 *       - bearerAuth: [USER]
 *     responses:
 *       200:
 *         description: User's cart
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CartItem'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       503:
 *         $ref: '#/components/responses/Unavaliable'
 */
router.get('/cart',
    authMiddleware,
    userController.getCart
)

/**
 * @swagger
 * 
 * /api/user/cart/items/{deviceId}:
 *   post:
 *     summary: Add item to cart
 *     tags: ['Cart']
 *     security:
 *       - bearerAuth: [USER]
 *     parameters:
 *       - in: path
 *         name: deviceId
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *           description: Device Id
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       409:
 *         $ref: '#/components/responses/Conflict'
 *       503:
 *         $ref: '#/components/responses/Unavaliable'
 */
router.post('/cart/items/:deviceId',
    authMiddleware,
    idParamValidation("deviceId"),
    validate,
    userController.addToCart
)

/**
 * @swagger
 * 
 * /api/user/cart/items/{deviceId}/amount:
 *   patch:
 *     summary: Change cart item amount
 *     tags: ['Cart']
 *     security:
 *       - bearerAuth: [USER]
 *     parameters:
 *       - in: path
 *         name: deviceId
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *           description: Device Id
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       409:
 *         $ref: '#/components/responses/Conflict'
 *       503:
 *         $ref: '#/components/responses/Unavaliable'
 */
router.patch('/cart/items/:deviceId/amount',
    authMiddleware,
    idParamValidation("deviceId"),
    intValidation("amount"),
    validate, 
    userController.changeCartItemAmount
)

/**
 * @swagger
 * 
 * /api/user/cart/items/{deviceId}:
 *   delete:
 *     summary: Delete item from cart
 *     tags: ['Cart']
 *     security:
 *       - bearerAuth: [USER]
 *     parameters:
 *       - in: path
 *         name: deviceId
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *           description: Device Id
 *     responses:
 *       204:
 *         description: OK
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       503:
 *         $ref: '#/components/responses/Unavaliable'
 */
router.delete('/cart/items/:deviceId',
    authMiddleware,
    idParamValidation("deviceId"),
    validate,
    userController.deleteItemFromCart
)

export default router