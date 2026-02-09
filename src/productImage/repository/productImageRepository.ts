import { inject, injectable } from "inversify";
import TYPES from "../../dependencyManager/inversifyTypes";
import { PrismaClient, Prisma } from "@prisma/client";
import { BadRequestError } from "../../error/badRequestError";
import { NotFoundError } from "../../error/notFoundError";
import { DatabaseError } from "../../error/databaseError";
import { CreateProductImageDto, UpdateProductImageDto } from "../dto/productImage.dto";

@injectable()
export class ProductImageRepository {
    private readonly prisma: PrismaClient;
    
    constructor(@inject(TYPES.PrismaClient) prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async createProductImage(productId: number, payload: CreateProductImageDto) {
        try {
            // Check if product exists
            const product = await this.prisma.product.findUnique({
                where: { id: productId }
            });

            if (!product) {
                throw new NotFoundError('Product not found');
            }

            // If setting as primary, unset other primary images
            if (payload.isPrimary) {
                await this.prisma.productImage.updateMany({
                    where: { productId, isPrimary: true },
                    data: { isPrimary: false }
                });
            }

            const productImage = await this.prisma.productImage.create({
                data: {
                    imageUrl: payload.imageUrl,
                    isPrimary: payload.isPrimary ?? false,
                    productId
                },
                include: {
                    product: true
                }
            });
            return productImage;
        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new DatabaseError(error.message);
            }
            if (error instanceof BadRequestError || error instanceof NotFoundError) {
                throw error;
            }
            throw new DatabaseError('Failed to create product image');
        }
    }

    async getProductImagesByProduct(productId: number) {
        try {
            const productImages = await this.prisma.productImage.findMany({
                where: { productId },
                include: {
                    product: true
                },
                orderBy: {
                    isPrimary: 'desc'
                }
            });

            return productImages;
        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new DatabaseError(error.message);
            }
            throw new DatabaseError('Failed to fetch product images');
        }
    }

    async getProductImageById(id: number) {
        try {
            const productImage = await this.prisma.productImage.findUnique({
                where: { id },
                include: {
                    product: true
                }
            });

            if (!productImage) {
                throw new NotFoundError('Product image not found');
            }

            return productImage;
        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new DatabaseError(error.message);
            }
            if (error instanceof NotFoundError) {
                throw error;
            }
            throw new DatabaseError('Failed to fetch product image');
        }
    }

    async updateProductImage(id: number, payload: UpdateProductImageDto) {
        try {
            const productImage = await this.prisma.productImage.findUnique({
                where: { id }
            });

            if (!productImage) {
                throw new NotFoundError('Product image not found');
            }

            // If setting as primary, unset other primary images for the same product
            if (payload.isPrimary) {
                await this.prisma.productImage.updateMany({
                    where: { productId: productImage.productId, isPrimary: true, id: { not: id } },
                    data: { isPrimary: false }
                });
            }

            const updatedProductImage = await this.prisma.productImage.update({
                where: { id },
                data: {
                    ...(payload.imageUrl && { imageUrl: payload.imageUrl }),
                    ...(payload.isPrimary !== undefined && { isPrimary: payload.isPrimary })
                },
                include: {
                    product: true
                }
            });

            return updatedProductImage;
        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new DatabaseError(error.message);
            }
            if (error instanceof BadRequestError || error instanceof NotFoundError) {
                throw error;
            }
            throw new DatabaseError('Failed to update product image');
        }
    }

    async deleteProductImage(id: number) {
        try {
            const productImage = await this.prisma.productImage.findUnique({
                where: { id }
            });

            if (!productImage) {
                throw new NotFoundError('Product image not found');
            }

            const deletedProductImage = await this.prisma.productImage.delete({
                where: { id },
                include: {
                    product: true
                }
            });

            return deletedProductImage;
        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new DatabaseError(error.message);
            }
            if (error instanceof NotFoundError) {
                throw error;
            }
            throw new DatabaseError('Failed to delete product image');
        }
    }
}

