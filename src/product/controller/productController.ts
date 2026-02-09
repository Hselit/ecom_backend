import { inject, injectable } from "inversify";
import TYPES from "../../dependencyManager/inversifyTypes";
import { ProductService } from "../service/productService";
import { Request, Response, NextFunction } from "express";
import { HttpStatus } from "../../constants/common";
import { MESSAGE } from "../../constants/messages";
import { UnauthorizedError } from "../../error/unAuthorizedError";
import { BadRequestError } from "../../error/badRequestError";

@injectable()
export class ProductController {
    constructor(@inject(TYPES.ProductService) private productService: ProductService) {}

    async createProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.userId;
            if (!userId) {
                throw new UnauthorizedError('User ID not found in token');
            }

            const product = await this.productService.createProduct(userId, req.body);
            return res.status(HttpStatus.CREATED).json({
                message: MESSAGE.PRODUCT_CREATED_SUCCESS,
                data: product
            });
        } catch (error) {
            next(error);
        }
    }

    async getProducts(req: Request, res: Response, next: NextFunction) {
        try {
            const products = await this.productService.getProductList(req.query as any);
            return res.status(HttpStatus.OK).json({
                message: MESSAGE.PRODUCT_FETCHED_SUCCESS,
                data: products
            });
        } catch (error) {
            next(error);
        }
    }

    async getProductById(req: Request, res: Response, next: NextFunction) {
        try {
            const productId = parseInt(req.params.id);
            if (isNaN(productId)) {
                throw new BadRequestError('Invalid product ID');
            }

            const product = await this.productService.getProductById(productId);
            return res.status(HttpStatus.OK).json({
                message: MESSAGE.PRODUCT_FETCHED_SUCCESS,
                data: product
            });
        } catch (error) {
            next(error);
        }
    }

    async updateProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.userId;
            if (!userId) {
                throw new UnauthorizedError('User ID not found in token');
            }

            const productId = parseInt(req.params.id);
            if (isNaN(productId)) {
                throw new BadRequestError('Invalid product ID');
            }

            const product = await this.productService.updateProduct(userId, productId, req.body);
            return res.status(HttpStatus.OK).json({
                message: MESSAGE.PRODUCT_UPDATED_SUCCESS,
                data: product
            });
        } catch (error) {
            next(error);
        }
    }

    async deleteProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.userId;
            if (!userId) {
                throw new UnauthorizedError('User ID not found in token');
            }

            const productId = parseInt(req.params.id);
            if (isNaN(productId)) {
                throw new BadRequestError('Invalid product ID');
            }

            const product = await this.productService.deleteProduct(userId, productId);
            return res.status(HttpStatus.OK).json({
                message: MESSAGE.PRODUCT_DELETED_SUCCESS,
                data: product
            });
        } catch (error) {
            next(error);
        }
    }
}

