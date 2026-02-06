import typeController from '../controllers/typeController'
import express from "express"
import { idParamValidation, validate } from '../validation/validation'
const router = express.Router()

/**
 * @swagger
 * 
 * /api/type:
 *   get:
 *     summary: Get all types
 *     tags: ["Type"]
 *     responses:
 *       200:
 *         description: List of types
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Type'
 *       503:
 *         $ref: '#/components/responses/Unavaliable'
 */
router.get('/', typeController.getAll)

/**
 * @swagger
 * /api/type/{id}:
 *   get:
 *     tags: ["Type"]
 *     summary: Get type by ID
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
 *               $ref: '#/components/schemas/Type'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       503:
 *         $ref: '#/components/responses/Unavaliable'
 */
router.get('/:id', idParamValidation(), validate, typeController.getOne)

export default router