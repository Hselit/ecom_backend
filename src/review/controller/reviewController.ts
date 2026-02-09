import { inject, injectable } from "inversify";
import TYPES from "../../dependencyManager/inversifyTypes";
import { ReviewService } from "../service/reviewService";
import { Request, Response, NextFunction } from "express";
import { HttpStatus } from "../../constants/common";
import { MESSAGE } from "../../constants/messages";
import { UnauthorizedError } from "../../error/unAuthorizedError";
import { BadRequestError } from "../../error/badRequestError";

@injectable()
export class ReviewController {
    constructor(@inject(TYPES.ReviewService) private reviewService: ReviewService) {}

    async createReview(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.userId;
            if (!userId) {
                throw new UnauthorizedError('User ID not found in token');
            }

            const review = await this.reviewService.createReview(userId, req.body);
            return res.status(HttpStatus.CREATED).json({
                message: MESSAGE.REVIEW_CREATED_SUCCESS,
                data: review
            });
        } catch (error) {
            next(error);
        }
    }

    async getReviews(req: Request, res: Response, next: NextFunction) {
        try {
            const reviews = await this.reviewService.getReviewList(req.query as any);
            return res.status(HttpStatus.OK).json({
                message: MESSAGE.REVIEW_FETCHED_SUCCESS,
                data: reviews
            });
        } catch (error) {
            next(error);
        }
    }

    async getReviewById(req: Request, res: Response, next: NextFunction) {
        try {
            const reviewId = parseInt(req.params.id);
            if (isNaN(reviewId)) {
                throw new BadRequestError('Invalid review ID');
            }

            const review = await this.reviewService.getReviewById(reviewId);
            return res.status(HttpStatus.OK).json({
                message: MESSAGE.REVIEW_FETCHED_SUCCESS,
                data: review
            });
        } catch (error) {
            next(error);
        }
    }

    async updateReview(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.userId;
            if (!userId) {
                throw new UnauthorizedError('User ID not found in token');
            }

            const reviewId = parseInt(req.params.id);
            if (isNaN(reviewId)) {
                throw new BadRequestError('Invalid review ID');
            }

            const review = await this.reviewService.updateReview(userId, reviewId, req.body);
            return res.status(HttpStatus.OK).json({
                message: MESSAGE.REVIEW_UPDATED_SUCCESS,
                data: review
            });
        } catch (error) {
            next(error);
        }
    }

    async deleteReview(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.userId;
            if (!userId) {
                throw new UnauthorizedError('User ID not found in token');
            }

            const reviewId = parseInt(req.params.id);
            if (isNaN(reviewId)) {
                throw new BadRequestError('Invalid review ID');
            }

            const review = await this.reviewService.deleteReview(userId, reviewId);
            return res.status(HttpStatus.OK).json({
                message: MESSAGE.REVIEW_DELETED_SUCCESS,
                data: review
            });
        } catch (error) {
            next(error);
        }
    }
}

