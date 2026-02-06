import express from "express"
import deviceController from "../controllers/deviceController"
import typeController from "../controllers/typeController"
import BrandController from '../controllers/brandController'
import { checkRole, ROLES } from "../middleware/roleMiddleware"
import userController from "../controllers/userController"
import orderController from "../controllers/orderController"
import { deviceUpdateValidation, deviceValidation, idParamValidation, notEmptyValidation, validate } from "../validation/validation"
const router = express.Router()


// Brand routes

/**
 * @swagger
 * 
 * /api/admin/brand:
 *   post:
 *     summary: Create new brand
 *     tags: ["Mod-Content"]
 *     security:
 *       - bearerAuth: [MODERATOR]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateBrand'
 *     responses:
 *       201:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Brand'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       503:
 *         $ref: '#/components/responses/Unavaliable'
 */
router.post('/brand',
    checkRole(ROLES.MODERATOR),
    notEmptyValidation("name"),
    validate,
    BrandController.create
)

/**
 * @swagger
 * 
 * /api/admin/brand/{id}:
 *   delete:
 *     summary: Delete brand
 *     tags: ["Mod-Content"]
 *     security:
 *       - bearerAuth: [MODERATOR]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *           description: Brand Id
 *     responses:
 *       204:
 *         description: OK
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       503:
 *         $ref: '#/components/responses/Unavaliable'
 */
router.delete('/brand/:id',
    checkRole(ROLES.MODERATOR),
    idParamValidation(),
    validate,
    BrandController.delete
)

/**
 * @swagger
 * 
 * /api/admin/brand/{id}:
 *   patch:
 *     summary: Edit brand name
 *     tags: ["Mod-Content"]
 *     security:
 *       - bearerAuth: [MODERATOR]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *           description: Brand Id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateBrand'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Brand'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       503:
 *         $ref: '#/components/responses/Unavaliable'
 */
router.patch('/brand/:id',
    checkRole(ROLES.MODERATOR),
    idParamValidation(),
    notEmptyValidation("name"),
    validate,
    BrandController.changeName
)


// Device Routes

/**
 * @swagger
 * 
 * /api/admin/device/{id}:
 *   post:
 *     summary: Create device
 *     tags: ["Mod-Content"]
 *     security:
 *       - bearerAuth: [MODERATOR]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/CreateDevice'
 *     responses:
 *       201:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Device'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       413:
 *         $ref: '#/components/responses/FileTooLarge'
 *       415:
 *         $ref: '#/components/responses/UnsupportedMediaType'
 *       503:
 *         $ref: '#/components/responses/Unavaliable'
 */
router.post('/device',
    checkRole(ROLES.MODERATOR),
    deviceValidation,
    validate,
    deviceController.create
)

/**
 * @swagger
 * 
 * /api/admin/device/{id}:
 *   put:
 *     summary: Update device
 *     tags: ["Mod-Content"]
 *     security:
 *       - bearerAuth: [MODERATOR]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/UpdateDevice'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Device'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       413:
 *         $ref: '#/components/responses/FileTooLarge'
 *       415:
 *         $ref: '#/components/responses/UnsupportedMediaType'
 *       503:
 *         $ref: '#/components/responses/Unavaliable'
 */
router.put('/device/:id',
    checkRole(ROLES.MODERATOR),
    deviceUpdateValidation,
    validate,
    deviceController.update
)

/**
 * @swagger
 * 
 * /api/admin/device/{id}:
 *   delete:
 *     summary: Delete device
 *     tags: ["Mod-Content"]
 *     security:
 *       - bearerAuth: [MODERATOR]
 *     parameters:
 *       - in: path
 *         name: id
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
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       503:
 *         $ref: '#/components/responses/Unavaliable'
 */
router.delete('/device/:id',
    checkRole(ROLES.MODERATOR),
    idParamValidation(),
    validate,
    deviceController.delete
)

/**
 * @swagger
 * 
 * /api/admin/device:
 *   get:
 *     summary: Get all devices
 *     tags: ["Mod-Content"]
 *     security:
 *       - bearerAuth: [MODERATOR]
 *     responses:
 *       200:
 *         description: List of devices
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/DeviceFull'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       503:
 *         $ref: '#/components/responses/Unavaliable'
 */
router.get('/device',
    checkRole(ROLES.MODERATOR),
    deviceController.getAllAdmin
)


// Type routes

/**
 * @swagger
 * 
 * /api/admin/type:
 *   post:
 *     summary: Create new type
 *     tags: ["Mod-Content"]
 *     security:
 *       - bearerAuth: [MODERATOR]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateType'
 *     responses:
 *       201:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Type'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       503:
 *         $ref: '#/components/responses/Unavaliable'
 */
router.post('/type',
    checkRole(ROLES.MODERATOR),
    notEmptyValidation("name"),
    validate,
    typeController.create
)

/**
 * @swagger
 * 
 * /api/admin/type/{id}:
 *   delete:
 *     summary: Delete type
 *     tags: ["Mod-Content"]
 *     security:
 *       - bearerAuth: [MODERATOR]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *           description: Type Id
 *     responses:
 *       204:
 *         description: OK
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       503:
 *         $ref: '#/components/responses/Unavaliable'
 */
router.delete('/type/:id',
    checkRole(ROLES.MODERATOR),
    idParamValidation(),
    validate,
    typeController.delete
)

/**
 * @swagger
 * 
 * /api/admin/type/{id}:
 *   patch:
 *     summary: Edit type name
 *     tags: ["Mod-Content"]
 *     security:
 *       - bearerAuth: [MODERATOR]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *           description: Type Id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateType'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Type'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       503:
 *         $ref: '#/components/responses/Unavaliable'
 */
router.patch('/type/:id',
    checkRole(ROLES.MODERATOR),
    idParamValidation(),
    notEmptyValidation("name"),
    validate,
    typeController.changeName
)


// Admin+ routes
// User Routes

/**
 * @swagger
 * 
 * /api/admin/users:
 *   get:
 *     summary: Get all users
 *     tags: [Admin-Role]
 *     security:
 *       - bearerAuth: [ADMIN]
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       503:
 *         $ref: '#/components/responses/Unavaliable'
 */
router.get('/users',
    checkRole(ROLES.ADMIN),
    userController.getAll
)

/**
 * @swagger
 * 
 * /api/admin/users/{id}/role:
 *   patch:
 *     summary: Change user role
 *     tags: [Admin-Role]
 *     security:
 *       - bearerAuth: [ADMIN]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *           description: User Id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example: MODERATOR
 *             description: New role
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       503:
 *         $ref: '#/components/responses/Unavaliable'
 */
router.patch('/users/:id/role',
    checkRole(ROLES.ADMIN),
    idParamValidation(),
    notEmptyValidation("role"),
    validate,
    userController.changeRole
)

// Order Routes

/**
 * @swagger
 * 
 * /api/admin/order/stats:
 *   patch:
 *     summary: Get orders statistics
 *     tags: [Admin-Stats]
 *     security:
 *       - bearerAuth: [ADMIN]
 *     responses:
 *       200:
 *         description: Statistics
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Stats'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       503:
 *         $ref: '#/components/responses/Unavaliable'
 */
router.get('/order/stats',
    checkRole(ROLES.ADMIN),
    orderController.getStats
)

export default router
