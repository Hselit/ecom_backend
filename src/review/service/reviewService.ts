import { inject, injectable } from "inversify";
import TYPES from "../../dependencyManager/inversifyTypes";
import { ReviewRepository } from "../repository/reviewRepository";
import { CreateReviewDto, UpdateReviewDto } from "../dto/review.dto";

@injectable()
export class ReviewService {
    constructor(@inject(TYPES.ReviewRepository) private reviewRepository: ReviewRepository) {}

    async createReview(userId: number, payload: CreateReviewDto) {
        try {
            const review = await this.reviewRepository.createReview(userId, payload);
            return review;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new Error(String(error));
            }
        }
    }

    async getReviewList(payload: { limit?: number; offset?: number; productId?: number }) {
        try {
            const reviews = await this.reviewRepository.getReviewList(payload);
            return reviews;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new Error(String(error));
            }
        }
    }

    async getReviewById(id: number) {
        try {
            const review = await this.reviewRepository.getReviewById(id);
            return review;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new Error(String(error));
            }
        }
    }

    async updateReview(userId: number, id: number, payload: UpdateReviewDto) {
        try {
            const review = await this.reviewRepository.updateReview(userId, id, payload);
            return review;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new Error(String(error));
            }
        }
    }

    async deleteReview(userId: number, id: number) {
        try {
            const review = await this.reviewRepository.deleteReview(userId, id);
            return review;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new Error(String(error));
            }
        }
    }
}

