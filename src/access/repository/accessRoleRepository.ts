import { inject, injectable } from "inversify";
import TYPES from "../../dependencyManager/inversifyTypes";
import { PrismaClient, Prisma } from "@prisma/client";
import { BadRequestError } from "../../error/badRequestError";
import { NotFoundError } from "../../error/notFoundError";
import { DatabaseError } from "../../error/databaseError";
import { CreateAccessRoleDto, UpdateAccessRoleDto, AssignAccessToRoleDto } from "../dto/accessRole.dto";

@injectable()
export class AccessRoleRepository {
    private readonly prisma: PrismaClient;
    
    constructor(@inject(TYPES.PrismaClient) prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async createAccessRole(payload: CreateAccessRoleDto) {
        try {
            // Check if role and access type exist
            const role = await this.prisma.role.findUnique({ where: { id: payload.roleId } });
            if (!role) {
                throw new NotFoundError('Role not found');
            }

            const accessType = await this.prisma.accessType.findUnique({ where: { id: payload.accessTypeId } });
            if (!accessType) {
                throw new NotFoundError('Access type not found');
            }

            const accessRole = await this.prisma.accessRole.create({
                data: {
                    roleId: payload.roleId,
                    accessTypeId: payload.accessTypeId,
                    canView: payload.canView ?? true,
                    canCreate: payload.canCreate ?? false,
                    canUpdate: payload.canUpdate ?? false,
                    canDelete: payload.canDelete ?? false,
                    isActive: payload.isActive ?? true
                },
                include: {
                    role: true,
                    accessType: true
                }
            });
            return accessRole;
        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new BadRequestError('This access role already exists');
                }
                throw new DatabaseError(error.message);
            }
            if (error instanceof BadRequestError || error instanceof NotFoundError) {
                throw error;
            }
            throw new DatabaseError('Failed to create access role');
        }
    }

    async getAccessRoleList(payload: { roleId?: number; accessTypeId?: number; limit?: number; offset?: number }) {
        try {
            const limit = payload.limit ?? 10;
            const offset = payload.offset ?? 0;

            if (limit <= 0 || offset < 0) {
                throw new BadRequestError('Invalid limit or offset');
            }

            const where: any = {};
            if (payload.roleId) {
                where.roleId = payload.roleId;
            }
            if (payload.accessTypeId) {
                where.accessTypeId = payload.accessTypeId;
            }

            const accessRoles = await this.prisma.accessRole.findMany({
                where,
                skip: offset,
                take: limit,
                include: {
                    role: true,
                    accessType: true
                },
                orderBy: {
                    createdAt: 'desc'
                }
            });

            if (!accessRoles || accessRoles.length === 0) {
                throw new NotFoundError('No access roles found');
            }

            return accessRoles;
        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new DatabaseError(error.message);
            }
            if (error instanceof BadRequestError || error instanceof NotFoundError) {
                throw error;
            }
            throw new DatabaseError('Failed to fetch access roles');
        }
    }

    async getAccessRoleById(id: number) {
        try {
            const accessRole = await this.prisma.accessRole.findUnique({
                where: { id },
                include: {
                    role: true,
                    accessType: true
                }
            });

            if (!accessRole) {
                throw new NotFoundError('Access role not found');
            }

            return accessRole;
        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new DatabaseError(error.message);
            }
            if (error instanceof NotFoundError) {
                throw error;
            }
            throw new DatabaseError('Failed to fetch access role');
        }
    }

    async updateAccessRole(id: number, payload: UpdateAccessRoleDto) {
        try {
            const accessRole = await this.prisma.accessRole.findUnique({
                where: { id }
            });

            if (!accessRole) {
                throw new NotFoundError('Access role not found');
            }

            const updatedAccessRole = await this.prisma.accessRole.update({
                where: { id },
                data: {
                    ...(payload.canView !== undefined && { canView: payload.canView }),
                    ...(payload.canCreate !== undefined && { canCreate: payload.canCreate }),
                    ...(payload.canUpdate !== undefined && { canUpdate: payload.canUpdate }),
                    ...(payload.canDelete !== undefined && { canDelete: payload.canDelete }),
                    ...(payload.isActive !== undefined && { isActive: payload.isActive })
                },
                include: {
                    role: true,
                    accessType: true
                }
            });

            return updatedAccessRole;
        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new DatabaseError(error.message);
            }
            if (error instanceof BadRequestError || error instanceof NotFoundError) {
                throw error;
            }
            throw new DatabaseError('Failed to update access role');
        }
    }

    async deleteAccessRole(id: number) {
        try {
            const accessRole = await this.prisma.accessRole.findUnique({
                where: { id }
            });

            if (!accessRole) {
                throw new NotFoundError('Access role not found');
            }

            const deletedAccessRole = await this.prisma.accessRole.delete({
                where: { id },
                include: {
                    role: true,
                    accessType: true
                }
            });

            return deletedAccessRole;
        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new DatabaseError(error.message);
            }
            if (error instanceof NotFoundError) {
                throw error;
            }
            throw new DatabaseError('Failed to delete access role');
        }
    }

    async assignAccessToRole(payload: AssignAccessToRoleDto) {
        try {
            // Check if role exists
            const role = await this.prisma.role.findUnique({ where: { id: payload.roleId } });
            if (!role) {
                throw new NotFoundError('Role not found');
            }

            // Check if all access types exist
            const accessTypes = await this.prisma.accessType.findMany({
                where: { id: { in: payload.accessTypeIds } }
            });

            if (accessTypes.length !== payload.accessTypeIds.length) {
                throw new NotFoundError('One or more access types not found');
            }

            // Create or update access roles
            const results = await Promise.all(
                payload.accessTypeIds.map(accessTypeId =>
                    this.prisma.accessRole.upsert({
                        where: {
                            roleId_accessTypeId: {
                                roleId: payload.roleId,
                                accessTypeId: accessTypeId
                            }
                        },
                        update: {
                            canView: payload.canView ?? true,
                            canCreate: payload.canCreate ?? false,
                            canUpdate: payload.canUpdate ?? false,
                            canDelete: payload.canDelete ?? false,
                            isActive: true
                        },
                        create: {
                            roleId: payload.roleId,
                            accessTypeId: accessTypeId,
                            canView: payload.canView ?? true,
                            canCreate: payload.canCreate ?? false,
                            canUpdate: payload.canUpdate ?? false,
                            canDelete: payload.canDelete ?? false,
                            isActive: true
                        },
                        include: {
                            role: true,
                            accessType: true
                        }
                    })
                )
            );

            return results;
        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new DatabaseError(error.message);
            }
            if (error instanceof BadRequestError || error instanceof NotFoundError) {
                throw error;
            }
            throw new DatabaseError('Failed to assign access to role');
        }
    }
}

