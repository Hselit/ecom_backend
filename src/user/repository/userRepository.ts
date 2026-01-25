import { inject, injectable } from "inversify";
import TYPES from "../../dependencyManager/inversifyTypes";
import { PrismaClient, Prisma } from "@prisma/client";
import { BadRequestError } from "../../error/badRequestError";
import { NotFoundError } from "../../error/notFoundError";
import { DatabaseError } from "../../error/databaseError";
import { CreateUserDto, UpdateUserDto } from "../dto/user.dto";

@injectable()
export class UserRepository {
    private readonly prisma: PrismaClient;
    
    constructor(@inject(TYPES.PrismaClient) prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async createUser(payload: CreateUserDto & { password: string }) {
        try {
            const user = await this.prisma.user.create({
                data: {
                    name: payload.name,
                    email: payload.email,
                    password: payload.password,
                    phoneNumber: payload.phoneNumber,
                    profile: payload.profile,
                    gender: payload.gender,
                    roleId: payload.roleId,
                    isActive: payload.isActive ?? true
                },
                include: {
                    role: true
                }
            });
            return user;
        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    const field = error.meta?.target;
                    if (Array.isArray(field) && field.includes('email')) {
                        throw new BadRequestError('Email already exists');
                    }
                    if (Array.isArray(field) && field.includes('phoneNumber')) {
                        throw new BadRequestError('Phone number already exists');
                    }
                    throw new BadRequestError('User with this information already exists');
                }
                throw new DatabaseError(error.message);
            }
            if (error instanceof BadRequestError) {
                throw error;
            }
            throw new DatabaseError('Failed to create user');
        }
    }

    async getUserList(payload: { limit?: number; offset?: number }) {
        try {
            const limit = payload.limit ?? 10;
            const offset = payload.offset ?? 0;

            if (limit <= 0 || offset < 0) {
                throw new BadRequestError('Invalid limit or offset');
            }

            const users = await this.prisma.user.findMany({
                skip: offset,
                take: limit,
                include: {
                    role: true
                },
                orderBy: {
                    createdAt: 'desc'
                }
            });

            if (!users || users.length === 0) {
                throw new NotFoundError('No users found');
            }

            return users;
        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new DatabaseError(error.message);
            }
            if (error instanceof BadRequestError || error instanceof NotFoundError) {
                throw error;
            }
            throw new DatabaseError('Failed to fetch users');
        }
    }

    async getUserById(id: number) {
        try {
            const user = await this.prisma.user.findUnique({
                where: { id },
                include: {
                    role: true
                }
            });

            if (!user) {
                throw new NotFoundError('User not found');
            }

            return user;
        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new DatabaseError(error.message);
            }
            if (error instanceof NotFoundError) {
                throw error;
            }
            throw new DatabaseError('Failed to fetch user');
        }
    }

    async updateUser(id: number, payload: UpdateUserDto) {
        try {
            const user = await this.prisma.user.findUnique({
                where: { id }
            });

            if (!user) {
                throw new NotFoundError('User not found');
            }

            const updatedUser = await this.prisma.user.update({
                where: { id },
                data: {
                    ...(payload.name && { name: payload.name }),
                    ...(payload.email && { email: payload.email }),
                    ...(payload.phoneNumber && { phoneNumber: payload.phoneNumber }),
                    ...(payload.profile && { profile: payload.profile }),
                    ...(payload.gender && { gender: payload.gender }),
                    ...(payload.roleId && { roleId: payload.roleId }),
                    ...(payload.isActive !== undefined && { isActive: payload.isActive })
                },
                include: {
                    role: true
                }
            });

            return updatedUser;
        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    const field = error.meta?.target;
                    if (Array.isArray(field) && field.includes('email')) {
                        throw new BadRequestError('Email already exists');
                    }
                    if (Array.isArray(field) && field.includes('phoneNumber')) {
                        throw new BadRequestError('Phone number already exists');
                    }
                    throw new BadRequestError('User with this information already exists');
                }
                throw new DatabaseError(error.message);
            }
            if (error instanceof BadRequestError || error instanceof NotFoundError) {
                throw error;
            }
            throw new DatabaseError('Failed to update user');
        }
    }

    async deleteUser(id: number) {
        try {
            const user = await this.prisma.user.findUnique({
                where: { id }
            });

            if (!user) {
                throw new NotFoundError('User not found');
            }

            const deletedUser = await this.prisma.user.delete({
                where: { id },
                include: {
                    role: true
                }
            });

            return deletedUser;
        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new DatabaseError(error.message);
            }
            if (error instanceof NotFoundError) {
                throw error;
            }
            throw new DatabaseError('Failed to delete user');
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