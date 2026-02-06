import express from 'express'
import cors from 'cors'
import {connectToDB} from './database/db'
import dotenv from 'dotenv'
dotenv.config({ path: process.env.NODE_ENV === 'production' ? "./.env.production" : "./.env" })
import './database/models/index'
import { errorHandler } from './middleware/errorMiddleware'
import router from './routers/index'
import fileUpload from 'express-fileupload'
import path from "path"
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './docs/swagger.config'
import logger from './logger/logger'

const PORT = process.env.PORT || 5000
const app = express()

app.use(cors({origin: process.env.HOST_CLIENT}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(fileUpload())
app.use('/static', express.static(path.join(process.cwd(), 'static')))
if (process.env.NODE_ENV === "development") {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
}
app.use('/api', router)
app.use(errorHandler)

const start = async () => {
    try {
        await connectToDB()
        app.listen(PORT, () => {
            logger.info(`Started on port ${PORT}`)
        })
    } catch (error) {
        logger.error('Failed to start server:', error)
        process.exit(1)
    }
}

start()