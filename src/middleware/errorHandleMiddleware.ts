import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { MulterError } from 'multer';
import { ZodError,ZodIssue } from 'zod';
import logger from '../libs/logger';
import { AppError } from '../error/appError';

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (err instanceof Error) {
    logger.error(
      `${err.name}: ${err.message}${err.stack ? `\n${err.stack}` : ''}`,
    );
  } else {
    logger.error(`Request handler error: ${String(err)}`);
  }

  if (err instanceof MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(StatusCodes.BAD_REQUEST).json({
        statusCode: StatusCodes.BAD_REQUEST,
        message: 'Uploaded file is too large (max 5MB)'
      });
    }
    return res.status(StatusCodes.BAD_REQUEST).json({
      statusCode: StatusCodes.BAD_REQUEST,
      message: err.message
    });
  }

  if (err instanceof ZodError) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      statusCode: StatusCodes.BAD_REQUEST,
      message: 'Validation failed',
      errors: err.issues.map((e: ZodIssue) => ({
        path: e.path.join('.'),
        message: e.message
      }))
    });
  }

  // Known application errors
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      statusCode: err.statusCode,
      message: err.message
    });
  }

  // Unknown / programmer errors
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    message: 'Internal server error',
  });
}
