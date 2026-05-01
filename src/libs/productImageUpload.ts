import multer from 'multer';
import path from 'node:path';
import fs from 'node:fs';
import { randomBytes } from 'node:crypto';
import { BadRequestError } from '../error/badRequestError.js';

const uploadDir = path.join(process.cwd(), 'uploads', 'products');

const allowedExt = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp']);
const allowedMime = new Set(['image/jpeg', 'image/png', 'image/gif', 'image/webp']);

function ensureUploadDir(): void {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination(_req, _file, cb) {
    ensureUploadDir();
    cb(null, uploadDir);
  },
  filename(_req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    const safeExt = allowedExt.has(ext) ? ext : '.bin';
    cb(null, `${Date.now()}-${randomBytes(8).toString('hex')}${safeExt}`);
  }
});

/** Optional `image` field on multipart requests; files land under `uploads/products/`. */
export const productImageFileUpload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter(_req, file, cb) {
    if (allowedMime.has(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new BadRequestError('Only JPEG, PNG, GIF, and WebP images are allowed'));
    }
  }
});
