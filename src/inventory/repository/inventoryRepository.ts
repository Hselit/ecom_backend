import { inject, injectable } from "inversify";
import TYPES from "../../dependencyManager/inversifyTypes";
import { PrismaClient, Prisma } from "@prisma/client";
import { BadRequestError } from "../../error/badRequestError";
import { NotFoundError } from "../../error/notFoundError";
import { DatabaseError } from "../../error/databaseError";
import { CreateInventoryDto, UpdateInventoryDto } from "../dto/inventory.dto";

@injectable()
export class InventoryRepository {
    private readonly prisma: PrismaClient;
    
    constructor(@inject(TYPES.PrismaClient) prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async createInventory(payload: CreateInventoryDto) {
        try {
            // Check if product exists
            const product = await this.prisma.product.findUnique({
                where: { id: payload.productId }
            });

            if (!product) {
                throw new NotFoundError('Product not found');
            }

            // Check if inventory already exists for this product
            const existingInventory = await this.prisma.inventory.findUnique({
                where: { productId: payload.productId }
            });

            if (existingInventory) {
                throw new BadRequestError('Inventory already exists for this product');
            }

            const inventory = await this.prisma.inventory.create({
                data: {
                    productId: payload.productId,
                    quantity: payload.quantity,
                    reservedQty: payload.reservedQty ?? 0,
                    isActive: payload.isActive ?? true
                },
                include: {
                    product: {
                        include: {
                            category: true,
                            images: true
                        }
                    }
                }
            });
            return inventory;
        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new BadRequestError('Inventory already exists for this product');
                }
                throw new DatabaseError(error.message);
            }
            if (error instanceof BadRequestError || error instanceof NotFoundError) {
                throw error;
            }
            throw new DatabaseError('Failed to create inventory');
        }
    }

    async getInventoryList(payload: { limit?: number; offset?: number; productId?: number }) {
        try {
            const limit = payload.limit ?? 10;
            const offset = payload.offset ?? 0;

            if (limit <= 0 || offset < 0) {
                throw new BadRequestError('Invalid limit or offset');
            }

            const where: any = {};
            if (payload.productId) {
                where.productId = payload.productId;
            }

            const inventories = await this.prisma.inventory.findMany({
                where,
                skip: offset,
                take: limit,
                include: {
                    product: {
                        include: {
                            category: true,
                            images: true
                        }
                    }
                },
                orderBy: {
                    createdAt: 'desc'
                }
            });

            return inventories;
        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new DatabaseError(error.message);
            }
            if (error instanceof BadRequestError) {
                throw error;
            }
            throw new DatabaseError('Failed to fetch inventories');
        }
    }

    async getInventoryById(id: number) {
        try {
            const inventory = await this.prisma.inventory.findUnique({
                where: { id },
                include: {
                    product: {
                        include: {
                            category: true,
                            images: true
                        }
                    }
                }
            });

            if (!inventory) {
                throw new NotFoundError('Inventory not found');
            }

            return inventory;
        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new DatabaseError(error.message);
            }
            if (error instanceof NotFoundError) {
                throw error;
            }
            throw new DatabaseError('Failed to fetch inventory');
        }
    }

    async updateInventory(id: number, payload: UpdateInventoryDto) {
        try {
            const inventory = await this.prisma.inventory.findUnique({
                where: { id }
            });

            if (!inventory) {
                throw new NotFoundError('Inventory not found');
            }

            const updatedInventory = await this.prisma.inventory.update({
                where: { id },
                data: {
                    ...(payload.quantity !== undefined && { quantity: payload.quantity }),
                    ...(payload.reservedQty !== undefined && { reservedQty: payload.reservedQty }),
                    ...(payload.isActive !== undefined && { isActive: payload.isActive })
                },
                include: {
                    product: {
                        include: {
                            category: true,
                            images: true
                        }
                    }
                }
            });

            return updatedInventory;
        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new DatabaseError(error.message);
            }
            if (error instanceof BadRequestError || error instanceof NotFoundError) {
                throw error;
            }
            throw new DatabaseError('Failed to update inventory');
        }
    }

    async deleteInventory(id: number) {
        try {
            const inventory = await this.prisma.inventory.findUnique({
                where: { id }
            });

            if (!inventory) {
                throw new NotFoundError('Inventory not found');
            }

            const deletedInventory = await this.prisma.inventory.delete({
                where: { id },
                include: {
                    product: {
                        include: {
                            category: true,
                            images: true
                        }
                    }
                }
            });

            return deletedInventory;
        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new DatabaseError(error.message);
            }
            if (error instanceof NotFoundError) {
                throw error;
            }
            throw new DatabaseError('Failed to delete inventory');
        }
    }

    async getUserRole(userId: number) {
        try {
            const user = await this.prisma.user.findUnique({
                where: { id: userId },
                include: { role: true }
            });

            if (!user) {
                throw new NotFoundError('User not found');
            }

            return user.role;
        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new DatabaseError(error.message);
            }
            if (error instanceof NotFoundError) {
                throw error;
            }
            throw new DatabaseError('Failed to fetch user role');
        }
    }
}


