import { inject, injectable } from "inversify";
import TYPES from "../../dependencyManager/inversifyTypes";
import { RoleRepository } from "../repository/roleRepository";
import { UnauthorizedError } from "../../error/unAuthorizedError";
import { CreateRoleDto } from "../dto/role.dto";

@injectable()
export class RoleService{
    constructor(@inject(TYPES.RoleRepository)private roleRepository:RoleRepository){}

    async getRoleList(data:any) {
        try {
            const response: any = await this.roleRepository.getRoleList(data);
            return response;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new Error(String(error));
            }
        }
    }

    async createRole(userId: number, payload: CreateRoleDto) {
        try {
            // Check if user has admin role
            const userRole = await this.roleRepository.getUserRole(userId);
            
            if (!userRole || userRole.roleName.toLowerCase() !== 'admin') {
                throw new UnauthorizedError('Only admin users can create roles');
            }

            const response = await this.roleRepository.createRole(payload);
            return response;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new Error(String(error));
            }
        }
    }

    async deleteRole(userId: number, roleId: number) {
        try {
            // Check if user has admin role
            const userRole = await this.roleRepository.getUserRole(userId);
            
            if (!userRole || userRole.roleName.toLowerCase() !== 'admin') {
                throw new UnauthorizedError('Only admin users can delete roles');
            }

            const response = await this.roleRepository.deleteRole(roleId);
            return response;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new Error(String(error));
            }
        }
    }
}