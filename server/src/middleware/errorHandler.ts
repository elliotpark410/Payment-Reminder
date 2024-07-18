import { Request, Response } from 'express';
import winston from 'winston';
import moment from 'moment-timezone';

// Create a Winston logger
const logger = winston.createLogger({
  level: 'error',
  format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
    }),
  ],
});

export function errorHandler(err: Error, req: Request, res: Response) {
  const errorMessage = err.message || 'Internal Server Error';
  const responseBody = res.locals?.errorMessage || '';

  logger.error({
    message: err.message,
    stack: err.stack,
    method: req.method,
    url: req.url,
    status: res.statusCode,
    responseBody: JSON.stringify(responseBody),
    responseMessage: res.statusMessage,
    timestamp: moment().tz('America/Los_Angeles').format('MM-DD-YYYY h:mmA'),
  });

  res.status(500).json({ error: errorMessage });
}

export function notFoundHandler(req: Request, res: Response) {
  res.status(404).json({ message: 'Not found' });
}
