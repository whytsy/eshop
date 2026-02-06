import dotenv from 'dotenv'
dotenv.config({ path: process.env.NODE_ENV === 'production' ? "./.env.production" : "./.env" })
import {Sequelize} from 'sequelize'
import "reflect-metadata";
import logger from '../logger/logger';

export const sequelize = new Sequelize(
    process.env.DB_NAME || '',
    process.env.DB_USER || '',
    process.env.DB_PASS,
    {
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        logging: false,
        pool: {
            max: 20,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
)

export const connectToDB = async () => {
    try {
        logger.info("Connection to Database...")
        await sequelize.authenticate()
        await sequelize.sync()
    } catch (e) {
        logger.error("Unable to connect to DB", {
            error: e instanceof Error ? e.message : "Unknown error"
        })
    }
}