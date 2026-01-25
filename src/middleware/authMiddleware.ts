import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../../config/appConfig.js';
import { UnauthorizedError } from '../error/unAuthorizedError.js';

// Extend Express Request to include userId
declare global {
  namespace Express {
    interface Request {
      userId?: number;
    }
  }
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      throw new UnauthorizedError('Access token is required');
    }

    jwt.verify(token, config.jwt.secret, (err: any, decoded: any) => {
      if (err) {
        throw new UnauthorizedError('Invalid or expired token');
      }

      // Extract userId from token payload
      if (decoded && decoded.userId) {
        req.userId = decoded.userId;
        next();
      } else {
        throw new UnauthorizedError('Invalid token payload');
      }
    });
  } catch (error) {
    next(error);
  }
};

