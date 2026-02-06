import swaggerJsdoc from 'swagger-jsdoc'

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: "Online shop Swagger API",
            version: '1.0.0',
            description: 'API for online shop'
        },
        contact: {
            name: 'Support',
            email: 'support@mail.com'
        },
        servers: [
            {
                url: process.env.HOST_NAME,
                description: "Development server"
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        },
        tags: [
            {name: 'Brand', description: 'Brand routes'},
            {name: 'Type', description: 'Type routes'},
            {name: 'Device', description: 'Device routes'},
            {name: 'Order', description: 'Order routes'},
            {name: 'User', description: 'User routes'},
            {name: 'Cart', description: 'Cart routes'},
            {name: 'Auth', description: 'Auth routes'},

            {name: 'Mod-Content', description: 'Content management'},

            {name: 'Admin-Role', description: 'Users roles management'},
            {name: 'Admin-Stats', description: 'Statistics'},
        ],
        'x-tagGroups': [
            {
                name: "For users",
                tags: ['Auth', 'User', 'Cart', 'Order', 'Device', 'Brand', 'Type']
            },
            {
                name: "For administration",
                tags: ['Mod-Content', 'Admin-Role', 'Admin-Stats']
            },
            {
                name: "For moderators",
                tags: ['Mod-Content']
            }
        ]
    },
    apis: ['./docs/components/*.schema.ts', './routers/*']
}

const swaggerSpec = swaggerJsdoc(options)

export default swaggerSpec