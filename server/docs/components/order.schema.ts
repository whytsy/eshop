/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       required:
 *         - id
 *         - status
 *         - deliveryAddress
 *         - phone
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *           description: Order id
 *         status:
 *           type: string
 *           example: PENDING
 *           description: Order status
 *         deliveryAddress:
 *           type: string
 *           example: Russia, Tyumen, Respubliry st., 48
 *           description: Delivery address
 *         phone:
 *           type: string
 *           example: 89324481029
 *           description: Phone number (Russian format)
 *         order_items:
 *           description: Items in order
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/OrderItem'
 * 
 *     CreateOrder:
 *       type: object
 *       required:
 *         - deliveryAddress
 *         - phone
 *       properties:
 *         deliveryAddress:
 *           type: string
 *           minLength: 1
 *           example: Russia, Tyumen, Respubliry st., 48
 *           description: Delivery address
 *         phone:
 *           type: string
 *           example: 89324481029
 *           description: Phone number (Russian format)
 * 
 *     OrderItem:
 *       type: object
 *       required:
 *         - id
 *         - deviceId
 *         - quantity
 *         - price
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *           description: OrderItem id
 *         deviceId:
 *           type: integer
 *           example: 2
 *           description: Device Id
 *         quantity:
 *           type: integer
 *           example: 2
 *           description: Amount of items in order
 *         price:
 *           type: integer
 *           example: 800
 *           description: Price for device in this order
 */