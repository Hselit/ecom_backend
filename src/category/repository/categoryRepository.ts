import { inject, injectable } from "inversify";
import TYPES from "../../dependencyManager/inversifyTypes";
import { PrismaClient, Prisma } from "@prisma/client";
import { BadRequestError } from "../../error/badRequestError";
import { NotFoundError } from "../../error/notFoundError";
import { DatabaseError } from "../../error/databaseError";
import { CreateCategoryDto, UpdateCategoryDto } from "../dto/category.dto";

@injectable()
export class CategoryRepository {
    private readonly prisma: PrismaClient;
    
    constructor(@inject(TYPES.PrismaClient) prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async createCategory(payload: CreateCategoryDto) {
        try {
            const category = await this.prisma.category.create({
                data: {
                    name: payload.name,
                    slug: payload.slug,
                    description: payload.description,
                    parentId: payload.parentId,
                    isActive: payload.isActive ?? true
                },
                include: {
                    parent: true,
                    children: true
                }
            });
            return category;
        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    const field = error.meta?.target;
                    if (Array.isArray(field) && field.includes('slug')) {
                        throw new BadRequestError('Category slug already exists');
                    }
                    throw new BadRequestError('Category with this information already exists');
                }
                throw new DatabaseError(error.message);
            }
            if (error instanceof BadRequestError) {
                throw error;
            }
            throw new DatabaseError('Failed to create category');
        }
    }

    async getCategoryList(payload: { limit?: number; offset?: number }) {
        try {
            const limit = payload.limit ?? 10;
            const offset = payload.offset ?? 0;

            if (limit <= 0 || offset < 0) {
                throw new BadRequestError('Invalid limit or offset');
            }

            const categories = await this.prisma.category.findMany({
                skip: offset,
                take: limit,
                include: {
                    parent: true,
                    children: true
                },
                orderBy: {
                    createdAt: 'desc'
                }
            });

            return categories;
        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new DatabaseError(error.message);
            }
            if (error instanceof BadRequestError) {
                throw error;
            }
            throw new DatabaseError('Failed to fetch categories');
        }
    }

    async getCategoryById(id: number) {
        try {
            const category = await this.prisma.category.findUnique({
                where: { id },
                include: {
                    parent: true,
                    children: true
                }
            });

            if (!category) {
                throw new NotFoundError('Category not found');
            }

            return category;
        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new DatabaseError(error.message);
            }
            if (error instanceof NotFoundError) {
                throw error;
            }
            throw new DatabaseError('Failed to fetch category');
        }
    }

    async updateCategory(id: number, payload: UpdateCategoryDto) {
        try {
            const category = await this.prisma.category.findUnique({
                where: { id }
            });

            if (!category) {
                throw new NotFoundError('Category not found');
            }

            const updatedCategory = await this.prisma.category.update({
                where: { id },
                data: {
                    ...(payload.name && { name: payload.name }),
                    ...(payload.slug && { slug: payload.slug }),
                    ...(payload.description !== undefined && { description: payload.description }),
                    ...(payload.parentId !== undefined && { parentId: payload.parentId }),
                    ...(payload.isActive !== undefined && { isActive: payload.isActive })
                },
                include: {
                    parent: true,
                    children: true
                }
            });

            return updatedCategory;
        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    const field = error.meta?.target;
                    if (Array.isArray(field) && field.includes('slug')) {
                        throw new BadRequestError('Category slug already exists');
                    }
                    throw new BadRequestError('Category with this information already exists');
                }
                throw new DatabaseError(error.message);
            }
            if (error instanceof BadRequestError || error instanceof NotFoundError) {
                throw error;
            }
            throw new DatabaseError('Failed to update category');
        }
    }

    async deleteCategory(id: number) {
        try {
            const category = await this.prisma.category.findUnique({
                where: { id }
            });

            if (!category) {
                throw new NotFoundError('Category not found');
            }

            const deletedCategory = await this.prisma.category.delete({
                where: { id },
                include: {
                    parent: true,
                    children: true
                }
            });

            return deletedCategory;
        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new DatabaseError(error.message);
            }
            if (error instanceof NotFoundError) {
                throw error;
            }
            throw new DatabaseError('Failed to delete category');
        }
    }
}

