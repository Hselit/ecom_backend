import { inject, injectable } from "inversify";
import TYPES from "../../dependencyManager/inversifyTypes";
import { PrismaClient, Prisma } from "@prisma/client";
import { BadRequestError } from "../../error/badRequestError";
import { NotFoundError } from "../../error/notFoundError";
import { DatabaseError } from "../../error/databaseError";
import { CreateAccessTypeDto, UpdateAccessTypeDto } from "../dto/accessType.dto";

@injectable()
export class AccessTypeRepository {
    private readonly prisma: PrismaClient;
    
    constructor(@inject(TYPES.PrismaClient) prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async createAccessType(payload: CreateAccessTypeDto) {
        try {
            const accessType = await this.prisma.accessType.create({
                data: {
                    name: payload.name,
                    description: payload.description,
                    code: payload.code,
                    module: payload.module,
                    action: payload.action,
                    isActive: payload.isActive ?? true
                }
            });
            return accessType;
        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    const field = error.meta?.target;
                    if (Array.isArray(field) && field.includes('name')) {
                        throw new BadRequestError('Access type name already exists');
                    }
                    if (Array.isArray(field) && field.includes('code')) {
                        throw new BadRequestError('Access type code already exists');
                    }
                    throw new BadRequestError('Access type with this information already exists');
                }
                throw new DatabaseError(error.message);
            }
            if (error instanceof BadRequestError) {
                throw error;
            }
            throw new DatabaseError('Failed to create access type');
        }
    }

    async getAccessTypeList(payload: { limit?: number; offset?: number }) {
        try {
            const limit = payload.limit ?? 10;
            const offset = payload.offset ?? 0;

            if (limit <= 0 || offset < 0) {
                throw new BadRequestError('Invalid limit or offset');
            }

            const accessTypes = await this.prisma.accessType.findMany({
                skip: offset,
                take: limit,
                orderBy: {
                    createdAt: 'desc'
                }
            });

            if (!accessTypes || accessTypes.length === 0) {
                throw new NotFoundError('No access types found');
            }

            return accessTypes;
        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new DatabaseError(error.message);
            }
            if (error instanceof BadRequestError || error instanceof NotFoundError) {
                throw error;
            }
            throw new DatabaseError('Failed to fetch access types');
        }
    }

    async getAccessTypeById(id: number) {
        try {
            const accessType = await this.prisma.accessType.findUnique({
                where: { id },
                include: {
                    accessRoles: {
                        include: {
                            role: true
                        }
                    }
                }
            });

            if (!accessType) {
                throw new NotFoundError('Access type not found');
            }

            return accessType;
        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new DatabaseError(error.message);
            }
            if (error instanceof NotFoundError) {
                throw error;
            }
            throw new DatabaseError('Failed to fetch access type');
        }
    }

    async updateAccessType(id: number, payload: UpdateAccessTypeDto) {
        try {
            const accessType = await this.prisma.accessType.findUnique({
                where: { id }
            });

            if (!accessType) {
                throw new NotFoundError('Access type not found');
            }

            const updatedAccessType = await this.prisma.accessType.update({
                where: { id },
                data: {
                    ...(payload.name && { name: payload.name }),
                    ...(payload.description !== undefined && { description: payload.description }),
                    ...(payload.code && { code: payload.code }),
                    ...(payload.module && { module: payload.module }),
                    ...(payload.action && { action: payload.action }),
                    ...(payload.isActive !== undefined && { isActive: payload.isActive })
                }
            });

            return updatedAccessType;
        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    const field = error.meta?.target;
                    if (Array.isArray(field) && field.includes('name')) {
                        throw new BadRequestError('Access type name already exists');
                    }
                    if (Array.isArray(field) && field.includes('code')) {
                        throw new BadRequestError('Access type code already exists');
                    }
                    throw new BadRequestError('Access type with this information already exists');
                }
                throw new DatabaseError(error.message);
            }
            if (error instanceof BadRequestError || error instanceof NotFoundError) {
                throw error;
            }
            throw new DatabaseError('Failed to update access type');
        }
    }

    async deleteAccessType(id: number) {
        try {
            const accessType = await this.prisma.accessType.findUnique({
                where: { id }
            });

            if (!accessType) {
                throw new NotFoundError('Access type not found');
            }

            const deletedAccessType = await this.prisma.accessType.delete({
                where: { id }
            });

            return deletedAccessType;
        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new DatabaseError(error.message);
            }
            if (error instanceof NotFoundError) {
                throw error;
            }
            throw new DatabaseError('Failed to delete access type');
        }
    }
}

