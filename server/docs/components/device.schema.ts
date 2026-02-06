/**
 * @swagger
 * components:
 *   schemas:
 *     Device:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - price
 *         - quantityInStock
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *           description: Device Id
 *         name:
 *           type: string
 *           example: Iphone 14
 *           description: Device name
 *         price:
 *           type: integer
 *           example: 1000
 *           description: Price
 *         quantityInStock:
 *           type: integer
 *           example: 10
 *           description: Available items in stock
 *         type:
 *           $ref: '#/components/schemas/Type'
 *         brand:
 *           $ref: '#/components/schemas/Brand'
 *         images:
 *           description: Device Images
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/DeviceImage'
 * 
 *     CartItem:
 *       allOf:
 *         - $ref: '#/components/schemas/Device'
 *         - type: object
 *           required:
 *             - amount
 *           properties:
 *             amount:
 *               type: integer
 *               minimum: 1
 *               maximum: 99
 *               example: 2
 *               description: Quantity of this device in cart
 * 
 *     DeviceImage:
 *       type: object
 *       required:
 *         - id
 *         - imageUrl
 *         - isMain
 *         - orderIndex
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *           description: Image id
 *         imageUrl:
 *           type: string
 *           example: "/static/devices/1/1ceb5942-6c79-4985-9997-175fc6cbfd7f.jpg"
 *           description: Image Url to get from /static folder
 *         isMain:
 *           type: boolean
 *           example: true
 *           description: Whether image is the main image of device or not
 *         orderIndex:
 *           type: integer
 *           example: 0
 *           description: Number in order of device images
 * 
 *     DeviceInfo:
 *       type: object
 *       required:
 *         - id
 *         - title
 *         - description
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *           description: Info Id
 *         title:
 *           type: string
 *           example: Display resolution
 *           description: Title of info
 *         description:
 *           type: string
 *           example: 1920x1080
 *           description: Description of info
 * 
 *     DeviceFull:
 *       allOf:
 *         - $ref: '#/components/schemas/Device'
 *         - type: object
 *           properties:
 *             info:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/DeviceInfo'
 *               description: Additional information about the device
 * 
 *     CreateDevice:
 *       type: object
 *       required:
 *         - name
 *         - price
 *         - brandId
 *         - typeId
 *       properties:
 *         name:
 *           type: string
 *           example: iPhone 14
 *           description: Device name
 *         price:
 *           type: integer
 *           example: 1000
 *           description: Device price
 *         quantityInStock:
 *           type: integer
 *           example: 50
 *           description: Available items in stock
 *         brandId:
 *           type: integer
 *           example: 1
 *           description: Brand ID
 *         typeId:
 *           type: integer
 *           example: 1
 *           description: Type ID
 *         info:
 *           type: string
 *           description: "JSON string array of device info. Format: [{\"title\": \"...\", \"description\": \"...\"}]"
 *           example: '[{"title": "Display", "description": "6.1 inch"}, {"title": "Camera", "description": "48MP"}]'
 *         images:
 *           type: array
 *           items:
 *             type: string
 *             format: binary
 *           description: Device images
 *     
 *     CreateDeviceInfoItem:
 *       type: object
 *       required:
 *         - title
 *         - description
 *       properties:
 *         title:
 *           type: string
 *           example: Display
 *           description: Information title
 *         description:
 *           type: string
 *           example: 6.1-inch Super Retina XDR display
 *           description: Information description
 * 
 *     UpdateDevice:
 *       allOf:
 *         - $ref: '#/components/schemas/CreateDevice'
 *         - type: object
 *           properties:
 *             oldImages:
 *               type: string
 *               description: "JSON array of DeviceImage objects to keep. Format: [{\"id\": 1, \"imageUrl\": \"...\", \"isMain\": true, \"orderIndex\": 0}]"
 *               example: '[{"id": 1, "imageUrl": "/static/devices/1/image1.jpg", "isMain": true, "orderIndex": 0}, {"id": 3, "imageUrl": "/static/devices/1/image3.jpg", "isMain": false, "orderIndex": 2}]'
 *               nullable: true
 */