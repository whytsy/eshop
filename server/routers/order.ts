import express from "express"
import orderController from "../controllers/orderController"
import { authMiddleware } from "../middleware/authMiddleware"

const router = express.Router()

/**
 * @swagger
 * 
 * /api/order:
 *   get:
 *     summary: Get user's orders history
 *     tags: ["Order"]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       401:
 *          $ref: '#/components/responses/Unauthorized'
 *       503:
 *         $ref: '#/components/responses/Unavaliable'
 */
router.get('/', authMiddleware, orderController.getOrderList)

/**
 * @swagger
 * 
 * /api/order:
 *   post:
 *     summary: Create order
 *     tags: ["Order"]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateOrder'
 *     responses:
 *       201:
 *         description: Created order
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       503:
 *         $ref: '#/components/responses/Unavaliable'
 */
router.post('/', authMiddleware, orderController.createOrder)

export default router