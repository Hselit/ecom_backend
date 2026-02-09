import { inject, injectable } from "inversify";
import TYPES from "../../dependencyManager/inversifyTypes";
import { PrismaClient, Prisma } from "@prisma/client";
import { BadRequestError } from "../../error/badRequestError";
import { NotFoundError } from "../../error/notFoundError";
import { DatabaseError } from "../../error/databaseError";
import { AddCartItemDto, UpdateCartItemDto } from "../dto/cartItem.dto";

@injectable()
export class CartItemRepository {
    private readonly prisma: PrismaClient;
    
    constructor(@inject(TYPES.PrismaClient) prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async addCartItem(userId: number, payload: AddCartItemDto) {
        try {
            // Get or create cart
            let cart = await this.prisma.cart.findUnique({
                where: { userId }
            });

            if (!cart) {
                cart = await this.prisma.cart.create({
                    data: { userId }
                });
            }

            // Check if product exists
            const product = await this.prisma.product.findUnique({
                where: { id: payload.productId }
            });

            if (!product) {
                throw new NotFoundError('Product not found');
            }

            if (product.stock < payload.quantity) {
                throw new BadRequestError('Insufficient stock');
            }

            // Check if item already exists in cart
            const existingItem = await this.prisma.cartItem.findUnique({
                where: {
                    cartId_productId: {
                        cartId: cart.id,
                        productId: payload.productId
                    }
                }
            });

            let cartItem;
            if (existingItem) {
                // Update quantity
                cartItem = await this.prisma.cartItem.update({
                    where: { id: existingItem.id },
                    data: { quantity: existingItem.quantity + payload.quantity },
                    include: {
                        product: {
                            include: {
                                images: true,
                                category: true
                            }
                        }
                    }
                });
            } else {
                // Create new item
                cartItem = await this.prisma.cartItem.create({
                    data: {
                        cartId: cart.id,
                        productId: payload.productId,
                        quantity: payload.quantity
                    },
                    include: {
                        product: {
                            include: {
                                images: true,
                                category: true
                            }
                        }
                    }
                });
            }

            return cartItem;
        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new DatabaseError(error.message);
            }
            if (error instanceof BadRequestError || error instanceof NotFoundError) {
                throw error;
            }
            throw new DatabaseError('Failed to add cart item');
        }
    }

    async getCartItems(userId: number) {
        try {
            const cart = await this.prisma.cart.findUnique({
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
                return [];
            }

            return cart.items;
        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new DatabaseError(error.message);
            }
            throw new DatabaseError('Failed to fetch cart items');
        }
    }

    async updateCartItem(userId: number, itemId: number, payload: UpdateCartItemDto) {
        try {
            // Verify cart ownership
            const cart = await this.prisma.cart.findUnique({
                where: { userId }
            });

            if (!cart) {
                throw new NotFoundError('Cart not found');
            }

            const cartItem = await this.prisma.cartItem.findUnique({
                where: { id: itemId }
            });

            if (!cartItem || cartItem.cartId !== cart.id) {
                throw new NotFoundError('Cart item not found');
            }

            // Check product stock
            const product = await this.prisma.product.findUnique({
                where: { id: cartItem.productId }
            });

            if (!product) {
                throw new NotFoundError('Product not found');
            }

            if (product.stock < payload.quantity) {
                throw new BadRequestError('Insufficient stock');
            }

            const updatedCartItem = await this.prisma.cartItem.update({
                where: { id: itemId },
                data: { quantity: payload.quantity },
                include: {
                    product: {
                        include: {
                            images: true,
                            category: true
                        }
                    }
                }
            });

            return updatedCartItem;
        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new DatabaseError(error.message);
            }
            if (error instanceof BadRequestError || error instanceof NotFoundError) {
                throw error;
            }
            throw new DatabaseError('Failed to update cart item');
        }
    }

    async deleteCartItem(userId: number, itemId: number) {
        try {
            // Verify cart ownership
            const cart = await this.prisma.cart.findUnique({
                where: { userId }
            });

            if (!cart) {
                throw new NotFoundError('Cart not found');
            }

            const cartItem = await this.prisma.cartItem.findUnique({
                where: { id: itemId }
            });

            if (!cartItem || cartItem.cartId !== cart.id) {
                throw new NotFoundError('Cart item not found');
            }

            const deletedCartItem = await this.prisma.cartItem.delete({
                where: { id: itemId },
                include: {
                    product: {
                        include: {
                            images: true,
                            category: true
                        }
                    }
                }
            });

            return deletedCartItem;
        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new DatabaseError(error.message);
            }
            if (error instanceof NotFoundError) {
                throw error;
            }
            throw new DatabaseError('Failed to delete cart item');
        }
    }
}

