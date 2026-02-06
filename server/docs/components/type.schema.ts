/**
 * @swagger
 * components:
 *   schemas:
 *     Type:
 *       type: object
 *       required:
 *         - id
 *         - name
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *           description: Type Id
 *         name:
 *           type: string
 *           example: "Phone"
 *           description: Type name
 *     
 *     CreateType:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           example: "Phone"
 *           description: Type name
 */