import { inject, injectable } from "inversify";
import TYPES from "../../dependencyManager/inversifyTypes";
import { Prisma,PrismaClient } from "@prisma/client";
import { BadRequestError } from "../../error/badRequestError";
import { NotFoundError } from "../../error/notFoundError";
import { DatabaseError } from "../../error/databaseError";

@injectable()
export class RoleRepository{
    private readonly prisma:PrismaClient;
    constructor(@inject(TYPES.PrismaClient)prisma:PrismaClient) {
        this.prisma = prisma
    }

    async getRoleList(payload: any) {
        try {
            const limit = payload.limit ?? 10;
            const offset = payload.offset ?? 0;

            if (limit <= 0 || offset < 0) {
                throw new BadRequestError('Invalid limit or offset');
            }
            const roles = await this.prisma.role.findMany({
                skip: offset,
                take: limit,
                orderBy: {
                    createdAt: 'desc'
                }
            });
            if (!roles || roles.length === 0) {
                throw new NotFoundError('No roles found');
            }
            return roles;
        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new DatabaseError(error.message);
            }
            if (error instanceof BadRequestError || error instanceof NotFoundError) {
                throw error;
            }
            throw new DatabaseError('Failed to fetch roles');
        }
    }

    async createRole(payload: { roleName: string; isActive?: boolean }) {
        try {
            const role = await this.prisma.role.create({
                data: {
                    roleName: payload.roleName,
                    isActive: payload.isActive ?? true
                }
            });
            return role;
        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new BadRequestError('Role name already exists');
                }
                throw new DatabaseError(error.message);
            }
            if (error instanceof BadRequestError) {
                throw error;
            }
            throw new DatabaseError('Failed to create role');
        }
    }

    async deleteRole(id: number) {
        try {
            const role = await this.prisma.role.findUnique({
                where: { id }
            });

            if (!role) {
                throw new NotFoundError('Role not found');
            }

            const deletedRole = await this.prisma.role.delete({
                where: { id }
            });

            return deletedRole;
        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new DatabaseError(error.message);
            }
            if (error instanceof NotFoundError) {
                throw error;
            }
            throw new DatabaseError('Failed to delete role');
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