import { inject, injectable } from "inversify";
import TYPES from "../../dependencyManager/inversifyTypes";
import { PrismaClient, Prisma } from "@prisma/client";
import { BadRequestError } from "../../error/badRequestError";
import { NotFoundError } from "../../error/notFoundError";
import { DatabaseError } from "../../error/databaseError";
import { CreateReviewDto, UpdateReviewDto } from "../dto/review.dto";

@injectable()
export class ReviewRepository {
    private readonly prisma: PrismaClient;
    
    constructor(@inject(TYPES.PrismaClient) prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async createReview(userId: number, payload: CreateReviewDto) {
        try {
            // Check if product exists
            const product = await this.prisma.product.findUnique({
                where: { id: payload.productId }
            });

            if (!product) {
                throw new NotFoundError('Product not found');
            }

            // Check if review already exists
            const existingReview = await this.prisma.review.findUnique({
                where: {
                    userId_productId: {
                        userId,
                        productId: payload.productId
                    }
                }
            });

            if (existingReview) {
                throw new BadRequestError('Review already exists for this product');
            }

            const review = await this.prisma.review.create({
                data: {
                    userId,
                    productId: payload.productId,
                    rating: payload.rating,
                    comment: payload.comment
                },
                include: {
                    user: {
                        include: {
                            role: true
                        }
                    },
                    product: {
                        include: {
                            images: true,
                            category: true
                        }
                    }
                }
            });

            return review;
        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new DatabaseError(error.message);
            }
            if (error instanceof BadRequestError || error instanceof NotFoundError) {
                throw error;
            }
            throw new DatabaseError('Failed to create review');
        }
    }

    async getReviewList(payload: { limit?: number; offset?: number; productId?: number }) {
        try {
            const limit = payload.limit ?? 10;
            const offset = payload.offset ?? 0;

            const where: any = {};
            if (payload.productId) {
                where.productId = payload.productId;
            }

            const reviews = await this.prisma.review.findMany({
                where,
                skip: offset,
                take: limit,
                include: {
                    user: {
                        include: {
                            role: true
                        }
                    },
                    product: {
                        include: {
                            images: true,
                            category: true
                        }
                    }
                },
                orderBy: {
                    createdAt: 'desc'
                }
            });

            return reviews;
        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new DatabaseError(error.message);
            }
            throw new DatabaseError('Failed to fetch reviews');
        }
    }

    async getReviewById(id: number) {
        try {
            const review = await this.prisma.review.findUnique({
                where: { id },
                include: {
                    user: {
                        include: {
                            role: true
                        }
                    },
                    product: {
                        include: {
                            images: true,
                            category: true
                        }
                    }
                }
            });

            if (!review) {
                throw new NotFoundError('Review not found');
            }

            return review;
        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new DatabaseError(error.message);
            }
            if (error instanceof NotFoundError) {
                throw error;
            }
            throw new DatabaseError('Failed to fetch review');
        }
    }

    async updateReview(userId: number, id: number, payload: UpdateReviewDto) {
        try {
            const review = await this.prisma.review.findUnique({
                where: { id }
            });

            if (!review) {
                throw new NotFoundError('Review not found');
            }

            if (review.userId !== userId) {
                throw new NotFoundError('Review not found');
            }

            const updatedReview = await this.prisma.review.update({
                where: { id },
                data: {
                    ...(payload.rating !== undefined && { rating: payload.rating }),
                    ...(payload.comment !== undefined && { comment: payload.comment })
                },
                include: {
                    user: {
                        include: {
                            role: true
                        }
                    },
                    product: {
                        include: {
                            images: true,
                            category: true
                        }
                    }
                }
            });

            return updatedReview;
        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new DatabaseError(error.message);
            }
            if (error instanceof NotFoundError) {
                throw error;
            }
            throw new DatabaseError('Failed to update review');
        }
    }

    async deleteReview(userId: number, id: number) {
        try {
            const review = await this.prisma.review.findUnique({
                where: { id }
            });

            if (!review) {
                throw new NotFoundError('Review not found');
            }

            if (review.userId !== userId) {
                throw new NotFoundError('Review not found');
            }

            const deletedReview = await this.prisma.review.delete({
                where: { id },
                include: {
                    user: {
                        include: {
                            role: true
                        }
                    },
                    product: {
                        include: {
                            images: true,
                            category: true
                        }
                    }
                }
            });

            return deletedReview;
        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new DatabaseError(error.message);
            }
            if (error instanceof NotFoundError) {
                throw error;
            }
            throw new DatabaseError('Failed to delete review');
        }
    }
}

