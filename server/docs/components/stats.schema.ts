/**
 * @swagger
 * 
 * components:
 *   schemas:
 *     OrderSummary:
 *       type: object
 *       required:
 *         - totalOrders
 *         - totalSum
 *         - totalAvg
 *       properties:
 *         totalOrders:
 *           type: integer
 *           example: 10
 *           description: Total orders all time
 *         totalSum:
 *           type: integer
 *           example: 10
 *           description: Total sum got from orders
 *         totalAvg:
 *           type: float
 *           example: 890.50
 *           description: Average total of order
 * 
 *     DailyStats:
 *       type: object
 *       required:
 *         - date
 *         - ordersCount
 *         - totalSum
 *       properties:
 *         date:
 *           type: Date
 *           example: Mon Jan 26 2026
 *           description: Date
 *         ordersCount:
 *           type: integer
 *           example: 10
 *           description: Amount of orders in this date
 *         totalSum:
 *           type: integer
 *           example: 10000
 *           description: Total sum got from orders in this date
 * 
 *     Stats:
 *       type: object
 *       required:
 *         - orderSummary
 *         - dailyStats
 *       properties:
 *         orderSummary:
 *           $ref: '#/components/schemas/OrderSummary'
 *           description: Summary statistics for all orders
 *         dailyStats:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/DailyStats'
 *           description: Daily statistics
 */