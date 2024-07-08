import { Request, Response, NextFunction } from 'express';
import winston from 'winston';
import moment from 'moment-timezone';

// Create a Winston logger
const logger = winston.createLogger({
  level: 'error',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  ]
});

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  logger.error({
    message: err.message,
    stack: err.stack,
    method: req.method,
    url: req.url,
    status: res.statusCode,
    timestamp: moment().tz('America/Los_Angeles').format('MM-DD-YYYY h:mmA')
  });

  res.status(500).json({ error: 'Internal Server Error' });
};

export function notFoundHandler(req: Request, res: Response, next: NextFunction) {
  res.status(404).json({ message: 'Not found' });
};

