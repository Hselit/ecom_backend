import { inject, injectable } from "inversify";
import TYPES from "../../dependencyManager/inversifyTypes";
import { UserRepository } from "../repository/userRepository";
import { CreateUserDto, UpdateUserDto } from "../dto/user.dto";
import { hashPassword } from "../../libs/password";
import { UnauthorizedError } from "../../error/unAuthorizedError";

@injectable()
export class UserService {
    constructor(@inject(TYPES.UserRepository) private userRepository: UserRepository) {}

    private async checkAdminOrSuperAdmin(userId: number) {
        const userRole = await this.userRepository.getUserRole(userId);
        const roleName = userRole.roleName.toLowerCase();
        
        if (roleName !== 'admin' && roleName !== 'superadmin') {
            throw new UnauthorizedError('Only admin or superadmin users can perform this operation');
        }
    }

    async createUser(userId: number, payload: CreateUserDto) {
        try {
            // Check if user has admin or superadmin role
            await this.checkAdminOrSuperAdmin(userId);

            // Hash password
            const hashedPassword = await hashPassword(payload.password);

            const user = await this.userRepository.createUser({
                ...payload,
                password: hashedPassword
            });

            // Remove password from response
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new Error(String(error));
            }
        }
    }

    async getUserList(userId: number, payload: { limit?: number; offset?: number }) {
        try {
            // Check if user has admin or superadmin role
            await this.checkAdminOrSuperAdmin(userId);

            const users = await this.userRepository.getUserList(payload);
            
            // Remove passwords from response
            return users.map(({ password, ...user }) => user);
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new Error(String(error));
            }
        }
    }

    async getUserById(userId: number, targetUserId: number) {
        try {
            // Check if user has admin or superadmin role
            await this.checkAdminOrSuperAdmin(userId);

            const user = await this.userRepository.getUserById(targetUserId);
            
            // Remove password from response
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new Error(String(error));
            }
        }
    }

    async updateUser(userId: number, targetUserId: number, payload: UpdateUserDto) {
        try {
            // Check if user has admin or superadmin role
            await this.checkAdminOrSuperAdmin(userId);

            const user = await this.userRepository.updateUser(targetUserId, payload);
            
            // Remove password from response
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new Error(String(error));
            }
        }
    }

    async deleteUser(userId: number, targetUserId: number) {
        try {
            // Check if user has admin or superadmin role
            await this.checkAdminOrSuperAdmin(userId);

            const user = await this.userRepository.deleteUser(targetUserId);
            
            // Remove password from response
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new Error(String(error));
            }
        }
    }
}