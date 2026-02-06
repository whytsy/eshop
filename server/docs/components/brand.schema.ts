/**
 * @swagger
 * components:
 *   schemas:
 *     Brand:
 *       type: object
 *       required:
 *         - id
 *         - name
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *           description: Brand Id
 *         name:
 *           type: string
 *           example: "Apple"
 *           description: Brand name
 * 
 *     CreateBrand:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           example: "Apple"
 *           description: Brand name
 */