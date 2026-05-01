import type { Request, Response, NextFunction } from 'express';
import { BadRequestError } from '../error/badRequestError.js';
import { productImageFileUpload } from '../libs/productImageUpload.js';

/**
 * Runs disk upload when the client sends `multipart/form-data` (field name: `image`).
 * JSON `application/json` requests skip multer unchanged.
 */
export function optionalProductImageMultipart(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (req.is('multipart/form-data')) {
    productImageFileUpload.single('image')(req, res, next);
    return;
  }
  next();
}

function parseOptionalBoolean(value: unknown, defaultValue: boolean | undefined): boolean | undefined {
  if (value === undefined || value === null || value === '') {
    return defaultValue;
  }
  if (typeof value === 'boolean') {
    return value;
  }
  if (value === 'true' || value === '1') {
    return true;
  }
  if (value === 'false' || value === '0') {
    return false;
  }
  return defaultValue;
}

/**
 * Coerces string fields from multipart into types expected by Zod, and maps an uploaded
 * file to `productImage.imageUrl` (public path served under `/uploads/...`).
 */
export function normalizeProductMultipartBody(
  req: Request,
  _res: Response,
  next: NextFunction
): void {
  if (!req.is('multipart/form-data')) {
    next();
    return;
  }

  const b = req.body as Record<string, unknown>;
  for (const key of Object.keys(b)) {
    if (b[key] === '') {
      delete b[key];
    }
  }

  if (b.price !== undefined) {
    const n = Number(b.price);
    if (Number.isNaN(n)) {
      next(new BadRequestError('Invalid price'));
      return;
    }
    b.price = n;
  }

  if (b.categoryId !== undefined) {
    const n = parseInt(String(b.categoryId), 10);
    if (Number.isNaN(n)) {
      next(new BadRequestError('Invalid categoryId'));
      return;
    }
    b.categoryId = n;
  }

  const isActiveParsed = parseOptionalBoolean(b.isActive, undefined);
  if (isActiveParsed !== undefined) {
    b.isActive = isActiveParsed;
  }

  if (req.file) {
    const imageIsPrimary = parseOptionalBoolean(b.imageIsPrimary, true) ?? true;
    b.productImage = {
      imageUrl: `/uploads/products/${req.file.filename}`,
      isPrimary: imageIsPrimary
    };
    delete b.imageIsPrimary;
  }

  next();
}
