import winston from 'winston';
import path from 'path';
import fs from 'fs';
import { type StreamOptions } from 'morgan';

const logDir = process.env.NODE_ENV === "production"
    ? "/app/logs"
    : path.resolve(process.cwd(), '..', 'logs')

if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
}

const logFormat = winston.format.combine(
    winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json(),
    winston.format.printf(({ timestamp, level, message, ...meta }) => {
        return `${timestamp} [${level.toUpperCase()}]: ${message} ${
            Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ""
        }`;
    })
);

const logger: winston.Logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: logFormat,
    defaultMeta: { service: 'express-api' },
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            )
        }),

        new winston.transports.File({
            filename: path.join(logDir, 'errors.log'),
            level: 'error',
            maxsize: 5242880,
            maxFiles: 10
        }),

        new winston.transports.File({
            filename: path.join(logDir, 'combined.log'),
            maxsize: 5242880,
            maxFiles: 10
        }),

        new winston.transports.File({
            filename: path.join(logDir, 'http.log'),
            level: 'http',
            maxsize: 5242880,
            maxFiles: 10
        })
    ],

    exceptionHandlers: [
        new winston.transports.File({
            filename: path.join(logDir, 'exceptions.log')
        })
    ]
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
        )
    }));
}

export const morganStream: StreamOptions = {
    write: (message: string) => {
        logger.info(message.trim())
    }
}

export default logger;