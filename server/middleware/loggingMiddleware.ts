import { Request, NextFunction } from 'express';
import morgan from 'morgan';
import logger from '../logger/logger';
import { morganStream } from '../logger/logger';

const morganFormat = ':method :url :status :response-time ms - :res[content-length]';

export const requestLogger = morgan(morganFormat, {
    stream: morganStream,
    skip: (req: Request) => {
        return process.env.NODE_ENV === 'production' && req.url === '/health';
    }
});

export const errorLogger = (err: Error, req: Request, next: NextFunction): void => {
    logger.error({
        message: err.message,
        stack: err.stack,
        path: req.path,
        method: req.method,
        ip: req.ip,
        userAgent: req.get('User-Agent')
    });

    next(err);
};

export const notFoundLogger = (req: Request, next: NextFunction): void => {
    logger.warn(`404 Not Found: ${req.method} ${req.originalUrl}`);
    next();
};