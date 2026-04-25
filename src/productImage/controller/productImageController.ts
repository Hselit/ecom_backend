import { inject, injectable } from "inversify";
import TYPES from "../../dependencyManager/inversifyTypes";
import { ProductImageService } from "../service/productImageService";
import { Request, Response, NextFunction } from "express";
import { HttpStatus } from "../../constants/common";
import { MESSAGE } from "../../constants/messages";
import { UnauthorizedError } from "../../error/unAuthorizedError";
import { BadRequestError } from "../../error/badRequestError";
import { validatedParams } from "../../middleware/validatedRequest.js";

@injectable()
export class ProductImageController {
    constructor(@inject(TYPES.ProductImageService) private productImageService: ProductImageService) {}

    async createProductImage(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.userId;
            if (!userId) {
                throw new UnauthorizedError('User ID not found in token');
            }

            const productId = parseInt(String(validatedParams(req).productId));
            if (isNaN(productId)) {
                throw new BadRequestError('Invalid product ID');
            }

            const productImage = await this.productImageService.createProductImage(productId, req.body);
            return res.status(HttpStatus.CREATED).json({
                message: MESSAGE.PRODUCT_IMAGE_CREATED_SUCCESS,
                data: productImage
            });
        } catch (error) {
            next(error);
        }
    }

    async getProductImages(req: Request, res: Response, next: NextFunction) {
        try {
            const productId = parseInt(String(validatedParams(req).productId));
            if (isNaN(productId)) {
                throw new BadRequestError('Invalid product ID');
            }

            const productImages = await this.productImageService.getProductImagesByProduct(productId);
            return res.status(HttpStatus.OK).json({
                message: MESSAGE.PRODUCT_IMAGE_FETCHED_SUCCESS,
                data: productImages
            });
        } catch (error) {
            next(error);
        }
    }

    async getProductImageById(req: Request, res: Response, next: NextFunction) {
        try {
            const imageId = parseInt(String(validatedParams(req).id));
            if (isNaN(imageId)) {
                throw new BadRequestError('Invalid image ID');
            }

            const productImage = await this.productImageService.getProductImageById(imageId);
            return res.status(HttpStatus.OK).json({
                message: MESSAGE.PRODUCT_IMAGE_FETCHED_SUCCESS,
                data: productImage
            });
        } catch (error) {
            next(error);
        }
    }

    async updateProductImage(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.userId;
            if (!userId) {
                throw new UnauthorizedError('User ID not found in token');
            }

            const imageId = parseInt(String(validatedParams(req).id));
            if (isNaN(imageId)) {
                throw new BadRequestError('Invalid image ID');
            }

            const productImage = await this.productImageService.updateProductImage(imageId, req.body);
            return res.status(HttpStatus.OK).json({
                message: MESSAGE.PRODUCT_IMAGE_UPDATED_SUCCESS,
                data: productImage
            });
        } catch (error) {
            next(error);
        }
    }

    async deleteProductImage(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.userId;
            if (!userId) {
                throw new UnauthorizedError('User ID not found in token');
            }

            const imageId = parseInt(String(validatedParams(req).id));
            if (isNaN(imageId)) {
                throw new BadRequestError('Invalid image ID');
            }

            const productImage = await this.productImageService.deleteProductImage(imageId);
            return res.status(HttpStatus.OK).json({
                message: MESSAGE.PRODUCT_IMAGE_DELETED_SUCCESS,
                data: productImage
            });
        } catch (error) {
            next(error);
        }
    }
}

