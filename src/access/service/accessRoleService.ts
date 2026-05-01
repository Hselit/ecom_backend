import { inject, injectable } from "inversify";
import TYPES from "../../dependencyManager/inversifyTypes";
import { AccessRoleRepository } from "../repository/accessRoleRepository";
import { CreateAccessRoleDto, UpdateAccessRoleDto, AssignAccessToRoleDto } from "../dto/accessRole.dto";
import { RoleRepository } from "../../role/repository/roleRepository";
import { UnauthorizedError } from "../../error/unAuthorizedError";

@injectable()
export class AccessRoleService {
    constructor(
        @inject(TYPES.AccessRoleRepository) private accessRoleRepository: AccessRoleRepository,
        @inject(TYPES.RoleRepository) private roleRepository: RoleRepository
    ) {}

    private async checkAdmin(userId: number) {
        const userRole = await this.roleRepository.getUserRole(userId);
        const roleName = userRole.roleName.toLowerCase();
        
        if (roleName !== 'admin' && roleName !== 'superadmin') {
            throw new UnauthorizedError('Only admin or superadmin users can perform this operation');
        }
    }

    async createAccessRole(userId: number, payload: CreateAccessRoleDto) {
        try {
            await this.checkAdmin(userId);
            return await this.accessRoleRepository.createAccessRole(payload);
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new Error(String(error));
            }
        }
    }

    async getAccessRoleList(userId: number, payload: { roleId?: number; accessTypeId?: number; limit?: number; offset?: number }) {
        try {
            await this.checkAdmin(userId);
            return await this.accessRoleRepository.getAccessRoleList(payload);
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new Error(String(error));
            }
        }
    }

    async getAccessRoleById(userId: number, id: number) {
        try {
            await this.checkAdmin(userId);
            return await this.accessRoleRepository.getAccessRoleById(id);
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new Error(String(error));
            }
        }
    }

    async updateAccessRole(userId: number, id: number, payload: UpdateAccessRoleDto) {
        try {
            await this.checkAdmin(userId);
            return await this.accessRoleRepository.updateAccessRole(id, payload);
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new Error(String(error));
            }
        }
    }

    async deleteAccessRole(userId: number, id: number) {
        try {
            await this.checkAdmin(userId);
            return await this.accessRoleRepository.deleteAccessRole(id);
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new Error(String(error));
            }
        }
    }

    async assignAccessToRole(userId: number, payload: AssignAccessToRoleDto) {
        try {
            await this.checkAdmin(userId);
            return await this.accessRoleRepository.assignAccessToRole(payload);
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new Error(String(error));
            }
        }
    }
}

