import express from "express"
const router = express.Router()
import BrandController from '../controllers/brandController'
import { idParamValidation, validate } from "../validation/validation"

/**
 * @swagger
 * 
 * /api/brand:
 *   get:
 *     summary: Get all brands
 *     tags: ["Brand"]
 *     responses:
 *       200:
 *         description: List of brands
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Brand'
 *       503:
 *         $ref: '#/components/responses/Unavaliable'
 */
router.get('/', BrandController.getAll)

/**
 * @swagger
 * /api/brand/{id}:
 *   get:
 *     tags: ["Brand"]
 *     summary: Get brand by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Brand'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       503:
 *         $ref: '#/components/responses/Unavaliable'
 */
router.get('/:id',
    idParamValidation(),
    validate,
    BrandController.getOne
)

export default router