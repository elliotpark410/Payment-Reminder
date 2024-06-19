import { Request, Response, NextFunction } from 'express';

export function notFoundHandler(req: Request, res: Response, next: NextFunction) {
  res.status(404).json({ message: 'Resource not found' });
}

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
}
