import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { getEnvVariable } from '../util/index';

export interface AuthenticatedRequest extends Request {
  user?: { username: string; userId: number };
}

export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, getEnvVariable('JWT_SECRET'), (err: any, user: any) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};
