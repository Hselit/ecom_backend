import { inject, injectable } from "inversify";
import TYPES from "../../dependencyManager/inversifyTypes";
import { PrismaClient, Prisma } from "@prisma/client";
import { NotFoundError } from "../../error/notFoundError";
import { DatabaseError } from "../../error/databaseError";

@injectable()
export class CartRepository {
    private readonly prisma: PrismaClient;
    
    constructor(@inject(TYPES.PrismaClient) prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async getOrCreateCart(userId: number) {
        try {
            let cart = await this.prisma.cart.findUnique({
                where: { userId },
                include: {
                    items: {
                        include: {
                            product: {
                                include: {
                                    images: true,
                                    category: true
                                }
                            }
                        }
                    }
                }
            });

            if (!cart) {
                cart = await this.prisma.cart.create({
                    data: { userId },
                    include: {
                        items: {
                            include: {
                                product: {
                                    include: {
                                        images: true,
                                        category: true
                                    }
                                }
                            }
                        }
                    }
                });
            }

            return cart;
        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new DatabaseError(error.message);
            }
            throw new DatabaseError('Failed to get or create cart');
        }
    }

    async deleteCart(userId: number) {
        try {
            const cart = await this.prisma.cart.findUnique({
                where: { userId }
            });

            if (!cart) {
                throw new NotFoundError('Cart not found');
            }

            const deletedCart = await this.prisma.cart.delete({
                where: { userId },
                include: {
                    items: true
                }
            });

            return deletedCart;
        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new DatabaseError(error.message);
            }
            if (error instanceof NotFoundError) {
                throw error;
            }
            throw new DatabaseError('Failed to delete cart');
        }
    }
}

