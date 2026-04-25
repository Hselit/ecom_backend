import { inject, injectable } from "inversify";
import TYPES from "../../dependencyManager/inversifyTypes";
import { CategoryService } from "../service/categoryService";
import { Request, Response, NextFunction } from "express";
import { HttpStatus } from "../../constants/common";
import { MESSAGE } from "../../constants/messages";
import { UnauthorizedError } from "../../error/unAuthorizedError";
import { BadRequestError } from "../../error/badRequestError";
import { validatedParams, validatedQuery } from "../../middleware/validatedRequest.js";

@injectable()
export class CategoryController {
    constructor(@inject(TYPES.CategoryService) private categoryService: CategoryService) {}

    async createCategory(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.userId;
            if (!userId) {
                throw new UnauthorizedError('User ID not found in token');
            }

            const category = await this.categoryService.createCategory(req.body);
            return res.status(HttpStatus.CREATED).json({
                message: MESSAGE.CATEGORY_CREATED_SUCCESS,
                data: category
            });
        } catch (error) {
            next(error);
        }
    }

    async getCategories(req: Request, res: Response, next: NextFunction) {
        try {
            const categories = await this.categoryService.getCategoryList(validatedQuery(req) as any);
            return res.status(HttpStatus.OK).json({
                message: MESSAGE.CATEGORY_FETCHED_SUCCESS,
                data: categories
            });
        } catch (error) {
            next(error);
        }
    }

    async getCategoryById(req: Request, res: Response, next: NextFunction) {
        try {
            const categoryId = parseInt(String(validatedParams(req).id));
            if (isNaN(categoryId)) {
                throw new BadRequestError('Invalid category ID');
            }

            const category = await this.categoryService.getCategoryById(categoryId);
            return res.status(HttpStatus.OK).json({
                message: MESSAGE.CATEGORY_FETCHED_SUCCESS,
                data: category
            });
        } catch (error) {
            next(error);
        }
    }

    async updateCategory(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.userId;
            if (!userId) {
                throw new UnauthorizedError('User ID not found in token');
            }

            const categoryId = parseInt(String(validatedParams(req).id));
            if (isNaN(categoryId)) {
                throw new BadRequestError('Invalid category ID');
            }

            const category = await this.categoryService.updateCategory(categoryId, req.body);
            return res.status(HttpStatus.OK).json({
                message: MESSAGE.CATEGORY_UPDATED_SUCCESS,
                data: category
            });
        } catch (error) {
            next(error);
        }
    }

    async deleteCategory(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.userId;
            if (!userId) {
                throw new UnauthorizedError('User ID not found in token');
            }

            const categoryId = parseInt(String(validatedParams(req).id));
            if (isNaN(categoryId)) {
                throw new BadRequestError('Invalid category ID');
            }

            const category = await this.categoryService.deleteCategory(categoryId);
            return res.status(HttpStatus.OK).json({
                message: MESSAGE.CATEGORY_DELETED_SUCCESS,
                data: category
            });
        } catch (error) {
            next(error);
        }
    }
}

