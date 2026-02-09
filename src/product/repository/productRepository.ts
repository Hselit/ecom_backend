import { inject, injectable } from "inversify";
import TYPES from "../../dependencyManager/inversifyTypes";
import { PrismaClient, Prisma } from "@prisma/client";
import { BadRequestError } from "../../error/badRequestError";
import { NotFoundError } from "../../error/notFoundError";
import { DatabaseError } from "../../error/databaseError";
import { CreateProductDto, UpdateProductDto } from "../dto/product.dto";

@injectable()
export class ProductRepository {
    private readonly prisma: PrismaClient;
    
    constructor(@inject(TYPES.PrismaClient) prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async createProduct(payload: CreateProductDto) {
        try {
            const product = await this.prisma.product.create({
                data: {
                    name: payload.name,
                    slug: payload.slug,
                    description: payload.description,
                    sku: payload.sku,
                    price: payload.price,
                    stock: payload.stock,
                    categoryId: payload.categoryId,
                    isActive: payload.isActive ?? true
                },
                include: {
                    category: true,
                    images: true
                }
            });
            return product;
        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    const field = error.meta?.target;
                    if (Array.isArray(field) && field.includes('slug')) {
                        throw new BadRequestError('Product slug already exists');
                    }
                    if (Array.isArray(field) && field.includes('sku')) {
                        throw new BadRequestError('Product SKU already exists');
                    }
                    throw new BadRequestError('Product with this information already exists');
                }
                throw new DatabaseError(error.message);
            }
            if (error instanceof BadRequestError) {
                throw error;
            }
            throw new DatabaseError('Failed to create product');
        }
    }

    async getProductList(payload: { limit?: number; offset?: number; categoryId?: number }) {
        try {
            const limit = payload.limit ?? 10;
            const offset = payload.offset ?? 0;

            if (limit <= 0 || offset < 0) {
                throw new BadRequestError('Invalid limit or offset');
            }

            const where: any = {};
            if (payload.categoryId) {
                where.categoryId = payload.categoryId;
            }

            const products = await this.prisma.product.findMany({
                where,
                skip: offset,
                take: limit,
                include: {
                    category: true,
                    images: true
                },
                orderBy: {
                    createdAt: 'desc'
                }
            });

            return products;
        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new DatabaseError(error.message);
            }
            if (error instanceof BadRequestError) {
                throw error;
            }
            throw new DatabaseError('Failed to fetch products');
        }
    }

    async getProductById(id: number) {
        try {
            const product = await this.prisma.product.findUnique({
                where: { id },
                include: {
                    category: true,
                    images: true
                }
            });

            if (!product) {
                throw new NotFoundError('Product not found');
            }

            return product;
        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new DatabaseError(error.message);
            }
            if (error instanceof NotFoundError) {
                throw error;
            }
            throw new DatabaseError('Failed to fetch product');
        }
    }

    async updateProduct(id: number, payload: UpdateProductDto) {
        try {
            const product = await this.prisma.product.findUnique({
                where: { id }
            });

            if (!product) {
                throw new NotFoundError('Product not found');
            }

            const updatedProduct = await this.prisma.product.update({
                where: { id },
                data: {
                    ...(payload.name && { name: payload.name }),
                    ...(payload.slug && { slug: payload.slug }),
                    ...(payload.description !== undefined && { description: payload.description }),
                    ...(payload.sku && { sku: payload.sku }),
                    ...(payload.price !== undefined && { price: payload.price }),
                    ...(payload.stock !== undefined && { stock: payload.stock }),
                    ...(payload.categoryId && { categoryId: payload.categoryId }),
                    ...(payload.isActive !== undefined && { isActive: payload.isActive })
                },
                include: {
                    category: true,
                    images: true
                }
            });

            return updatedProduct;
        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    const field = error.meta?.target;
                    if (Array.isArray(field) && field.includes('slug')) {
                        throw new BadRequestError('Product slug already exists');
                    }
                    if (Array.isArray(field) && field.includes('sku')) {
                        throw new BadRequestError('Product SKU already exists');
                    }
                    throw new BadRequestError('Product with this information already exists');
                }
                throw new DatabaseError(error.message);
            }
            if (error instanceof BadRequestError || error instanceof NotFoundError) {
                throw error;
            }
            throw new DatabaseError('Failed to update product');
        }
    }

    async deleteProduct(id: number) {
        try {
            const product = await this.prisma.product.findUnique({
                where: { id }
            });

            if (!product) {
                throw new NotFoundError('Product not found');
            }

            const deletedProduct = await this.prisma.product.delete({
                where: { id },
                include: {
                    category: true,
                    images: true
                }
            });

            return deletedProduct;
        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new DatabaseError(error.message);
            }
            if (error instanceof NotFoundError) {
                throw error;
            }
            throw new DatabaseError('Failed to delete product');
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

