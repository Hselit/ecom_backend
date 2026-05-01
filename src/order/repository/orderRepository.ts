import { inject, injectable } from "inversify";
import TYPES from "../../dependencyManager/inversifyTypes";
import { PrismaClient, Prisma } from "@prisma/client";
import { BadRequestError } from "../../error/badRequestError";
import { NotFoundError } from "../../error/notFoundError";
import { DatabaseError } from "../../error/databaseError";
import { CreateOrderDto, UpdateOrderDto } from "../dto/order.dto";

@injectable()
export class OrderRepository {
    private readonly prisma: PrismaClient;
    
    constructor(@inject(TYPES.PrismaClient) prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async createOrder(userId: number, payload: CreateOrderDto) {
        try {
            // Get user's cart
            const cart = await this.prisma.cart.findUnique({
                where: { userId },
                include: {
                    items: {
                        include: {
                            product: true
                        }
                    }
                }
            });

            if (!cart || cart.items.length === 0) {
                throw new BadRequestError('Cart is empty');
            }

            // Filter items if cartItemIds provided
            let itemsToOrder = cart.items;
            if (payload.cartItemIds && payload.cartItemIds.length > 0) {
                itemsToOrder = cart.items.filter(item => payload.cartItemIds!.includes(item.id));
                if (itemsToOrder.length === 0) {
                    throw new BadRequestError('No valid cart items selected');
                }
            }

            // Calculate total and validate stock
            let totalAmount = 0;
            for (const item of itemsToOrder) {
                if (item.product.stock < item.quantity) {
                    throw new BadRequestError(`Insufficient stock for product ${item.product.name}`);
                }
                totalAmount += item.product.price * item.quantity;
            }

            // Generate order number
            const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

            // Create order with items
            const order = await this.prisma.order.create({
                data: {
                    orderNumber,
                    totalAmount,
                    userId,
                    status: 'PENDING',
                    items: {
                        create: itemsToOrder.map(item => ({
                            productId: item.productId,
                            price: item.product.price,
                            quantity: item.quantity
                        }))
                    }
                },
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
                    },
                    user: {
                        include: {
                            role: true
                        }
                    }
                }
            });

            // Update product stock
            for (const item of itemsToOrder) {
                await this.prisma.product.update({
                    where: { id: item.productId },
                    data: { stock: { decrement: item.quantity } }
                });
            }

            // Remove ordered items from cart
            const itemIds = itemsToOrder.map(item => item.id);
            await this.prisma.cartItem.deleteMany({
                where: {
                    id: { in: itemIds }
                }
            });

            return order;
        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new DatabaseError(error.message);
            }
            if (error instanceof BadRequestError || error instanceof NotFoundError) {
                throw error;
            }
            throw new DatabaseError('Failed to create order');
        }
    }

    async getOrderList(userId: number, payload: { limit?: number; offset?: number }) {
        try {
            const limit = payload.limit ?? 10;
            const offset = payload.offset ?? 0;

            const orders = await this.prisma.order.findMany({
                where: { userId },
                skip: offset,
                take: limit,
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
                    },
                    payment: true
                },
                orderBy: {
                    createdAt: 'desc'
                }
            });

            return orders;
        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new DatabaseError(error.message);
            }
            throw new DatabaseError('Failed to fetch orders');
        }
    }

    async getOrderById(userId: number, id: number) {
        try {
            const order = await this.prisma.order.findUnique({
                where: { id },
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
                    },
                    payment: true,
                    user: {
                        include: {
                            role: true
                        }
                    }
                }
            });

            if (!order) {
                throw new NotFoundError('Order not found');
            }

            if (order.userId !== userId) {
                throw new NotFoundError('Order not found');
            }

            return order;
        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new DatabaseError(error.message);
            }
            if (error instanceof NotFoundError) {
                throw error;
            }
            throw new DatabaseError('Failed to fetch order');
        }
    }

    async updateOrder(userId: number, id: number, payload: UpdateOrderDto) {
        try {
            const order = await this.prisma.order.findUnique({
                where: { id }
            });

            if (!order) {
                throw new NotFoundError('Order not found');
            }

            if (order.userId !== userId) {
                throw new NotFoundError('Order not found');
            }

            const updatedOrder = await this.prisma.order.update({
                where: { id },
                data: {
                    status: payload.status
                },
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
                    },
                    payment: true
                }
            });

            return updatedOrder;
        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new DatabaseError(error.message);
            }
            if (error instanceof NotFoundError) {
                throw error;
            }
            throw new DatabaseError('Failed to update order');
        }
    }

    async deleteOrder(userId: number, id: number) {
        try {
            const order = await this.prisma.order.findUnique({
                where: { id }
            });

            if (!order) {
                throw new NotFoundError('Order not found');
            }

            if (order.userId !== userId) {
                throw new NotFoundError('Order not found');
            }

            const deletedOrder = await this.prisma.order.delete({
                where: { id },
                include: {
                    items: true,
                    payment: true
                }
            });

            return deletedOrder;
        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new DatabaseError(error.message);
            }
            if (error instanceof NotFoundError) {
                throw error;
            }
            throw new DatabaseError('Failed to delete order');
        }
    }
}

