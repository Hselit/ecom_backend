import { inject, injectable } from "inversify";
import TYPES from "../../dependencyManager/inversifyTypes";
import { PrismaClient, Prisma } from "@prisma/client";
import { BadRequestError } from "../../error/badRequestError";
import { NotFoundError } from "../../error/notFoundError";
import { DatabaseError } from "../../error/databaseError";
import { CreatePaymentDto, UpdatePaymentDto } from "../dto/payment.dto";

@injectable()
export class PaymentRepository {
    private readonly prisma: PrismaClient;
    
    constructor(@inject(TYPES.PrismaClient) prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async createPayment(userId: number, payload: CreatePaymentDto) {
        try {
            // Verify order exists and belongs to user
            const order = await this.prisma.order.findUnique({
                where: { id: payload.orderId },
                include: { user: true }
            });

            if (!order) {
                throw new NotFoundError('Order not found');
            }

            if (order.userId !== userId) {
                throw new NotFoundError('Order not found');
            }

            // Check if payment already exists
            const existingPayment = await this.prisma.payment.findUnique({
                where: { orderId: payload.orderId }
            });

            if (existingPayment) {
                throw new BadRequestError('Payment already exists for this order');
            }

            // Verify amount matches order total
            if (Math.abs(payload.amount - order.totalAmount) > 0.01) {
                throw new BadRequestError('Payment amount does not match order total');
            }

            const payment = await this.prisma.payment.create({
                data: {
                    orderId: payload.orderId,
                    paymentMethod: payload.paymentMethod,
                    transactionId: payload.transactionId,
                    amount: payload.amount,
                    status: 'PENDING'
                },
                include: {
                    order: {
                        include: {
                            items: true
                        }
                    }
                }
            });

            return payment;
        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new DatabaseError(error.message);
            }
            if (error instanceof BadRequestError || error instanceof NotFoundError) {
                throw error;
            }
            throw new DatabaseError('Failed to create payment');
        }
    }

    async getPaymentList(userId: number, payload: { limit?: number; offset?: number }) {
        try {
            const limit = payload.limit ?? 10;
            const offset = payload.offset ?? 0;

            const payments = await this.prisma.payment.findMany({
                where: {
                    order: {
                        userId
                    }
                },
                skip: offset,
                take: limit,
                include: {
                    order: {
                        include: {
                            items: true
                        }
                    }
                },
                orderBy: {
                    createdAt: 'desc'
                }
            });

            return payments;
        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new DatabaseError(error.message);
            }
            throw new DatabaseError('Failed to fetch payments');
        }
    }

    async getPaymentById(userId: number, id: number) {
        try {
            const payment = await this.prisma.payment.findUnique({
                where: { id },
                include: {
                    order: {
                        include: {
                            items: true,
                            user: true
                        }
                    }
                }
            });

            if (!payment) {
                throw new NotFoundError('Payment not found');
            }

            if (payment.order.userId !== userId) {
                throw new NotFoundError('Payment not found');
            }

            return payment;
        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new DatabaseError(error.message);
            }
            if (error instanceof NotFoundError) {
                throw error;
            }
            throw new DatabaseError('Failed to fetch payment');
        }
    }

    async updatePayment(userId: number, id: number, payload: UpdatePaymentDto) {
        try {
            const payment = await this.prisma.payment.findUnique({
                where: { id },
                include: { order: true }
            });

            if (!payment) {
                throw new NotFoundError('Payment not found');
            }

            if (payment.order.userId !== userId) {
                throw new NotFoundError('Payment not found');
            }

            const updatedPayment = await this.prisma.payment.update({
                where: { id },
                data: {
                    ...(payload.status && { status: payload.status }),
                    ...(payload.transactionId && { transactionId: payload.transactionId })
                },
                include: {
                    order: {
                        include: {
                            items: true
                        }
                    }
                }
            });

            return updatedPayment;
        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new DatabaseError(error.message);
            }
            if (error instanceof NotFoundError) {
                throw error;
            }
            throw new DatabaseError('Failed to update payment');
        }
    }
}

