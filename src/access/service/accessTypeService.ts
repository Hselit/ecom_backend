import { inject, injectable } from "inversify";
import TYPES from "../../dependencyManager/inversifyTypes";
import { AccessTypeRepository } from "../repository/accessTypeRepository";
import { CreateAccessTypeDto, UpdateAccessTypeDto } from "../dto/accessType.dto";
import { RoleRepository } from "../../role/repository/roleRepository";
import { UnauthorizedError } from "../../error/unAuthorizedError";

@injectable()
export class AccessTypeService {
    constructor(
        @inject(TYPES.AccessTypeRepository) private accessTypeRepository: AccessTypeRepository,
        @inject(TYPES.RoleRepository) private roleRepository: RoleRepository
    ) {}

    private async checkAdmin(userId: number) {
        const userRole = await this.roleRepository.getUserRole(userId);
        const roleName = userRole.roleName.toLowerCase();
        
        if (roleName !== 'admin' && roleName !== 'superadmin') {
            throw new UnauthorizedError('Only admin or superadmin users can perform this operation');
        }
    }

    async createAccessType(userId: number, payload: CreateAccessTypeDto) {
        try {
            await this.checkAdmin(userId);
            return await this.accessTypeRepository.createAccessType(payload);
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new Error(String(error));
            }
        }
    }

    async getAccessTypeList(userId: number, payload: { limit?: number; offset?: number }) {
        try {
            await this.checkAdmin(userId);
            return await this.accessTypeRepository.getAccessTypeList(payload);
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new Error(String(error));
            }
        }
    }

    async getAccessTypeById(userId: number, id: number) {
        try {
            await this.checkAdmin(userId);
            return await this.accessTypeRepository.getAccessTypeById(id);
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new Error(String(error));
            }
        }
    }

    async updateAccessType(userId: number, id: number, payload: UpdateAccessTypeDto) {
        try {
            await this.checkAdmin(userId);
            return await this.accessTypeRepository.updateAccessType(id, payload);
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new Error(String(error));
            }
        }
    }

    async deleteAccessType(userId: number, id: number) {
        try {
            await this.checkAdmin(userId);
            return await this.accessTypeRepository.deleteAccessType(id);
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new Error(String(error));
            }
        }
    }
}

