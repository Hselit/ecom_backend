import jwt from 'jsonwebtoken';
import config from '../../config/appConfig.js';

export const generateToken = (userId: number): string => {
  const payload = { userId };
  return jwt.sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn
  });
};

export const verifyToken = (token: string): { userId: number } => {
  try {
    const decoded = jwt.verify(token, config.jwt.secret) as { userId: number };
    return decoded;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

