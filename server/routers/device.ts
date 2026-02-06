import deviceController from '../controllers/deviceController'
import express from "express"
import { deviceSearchValidation, idParamValidation, searchQueryValidation, validate } from '../validation/validation'
const router = express.Router()

/**
 * @swagger
 * /api/device:
 *   get:
 *     summary: Get devices by parameters
 *     tags: ["Device"]
 *     parameters:
 *       - in: query
 *         name: page
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *           description: Page from pagination
 *       - in: query
 *         name: limit
 *         required: true
 *         schema:
 *           type: integer
 *           example: 10
 *           description: Number of items on page
 *       - in: query
 *         name: brandId
 *         required: false
 *         schema:
 *           type: integer
 *           example: 1
 *           description: Id of items brand to display
 *       - in: query
 *         name: typeId
 *         required: false
 *         schema:
 *           type: integer
 *           example: 2
 *           description: Id of items type to display
 *       - in: query
 *         name: query
 *         required: false
 *         schema:
 *           type: string
 *           example: iphone
 *           description: Query to search items by
 *     responses:
 *       200:
 *         description: List of devices
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 rows:
 *                   description: Devices for current page
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Device'
 *                 count:
 *                   type: integer
 *                   example: 125
 *                   description: All found devices amount
 *                 
 *       503:
 *         $ref: '#/components/responses/Unavaliable'
 */
router.get('/', deviceSearchValidation, validate, deviceController.getAll)

/**
 * @swagger
 * /api/device/{id}:
 *   get:
 *     summary: Get device by Id
 *     tags: ["Device"]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Device
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeviceFull'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       503:
 *         $ref: '#/components/responses/Unavaliable'
 *                       
 */
router.get('/:id',
    idParamValidation(),
    validate,
    deviceController.getOne
)

export default router