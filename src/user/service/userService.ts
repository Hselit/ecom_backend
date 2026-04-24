import { inject, injectable } from "inversify";
import TYPES from "../../dependencyManager/inversifyTypes";
import { UserRepository } from "../repository/userRepository";
import { CreateUserDto, UpdateUserDto } from "../dto/user.dto";
import { hashPassword, comparePassword } from "../../libs/password";
import { UnauthorizedError } from "../../error/unAuthorizedError";
import { BadRequestError } from "../../error/badRequestError";
import { sendVerificationEmail, generateVerificationCode } from "../../libs/email";

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

    async createUser(payload: CreateUserDto) {
        try {
            // Hash password
            const hashedPassword = await hashPassword(payload.password);

            // Generate verification code
            const verificationCode = generateVerificationCode();
            const verificationCodeExpiry = new Date();
            verificationCodeExpiry.setMinutes(verificationCodeExpiry.getMinutes() + 10); // 10 minutes expiry

            const user = await this.userRepository.createUser({
                ...payload,
                password: hashedPassword,
                verificationCode,
                verificationCodeExpiry
            });

            // Send verification email
            if (user.email) {
                try {
                    await sendVerificationEmail(user.email, verificationCode);
                } catch (emailError) {
                    // Log error but don't fail user creation
                    console.error('Failed to send verification email:', emailError);
                }
            }

            // Remove password and verification code from response
            const { password, verificationCode: code, verificationCodeExpiry: expiry, ...userWithoutPassword } = user;
            return userWithoutPassword;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new Error(String(error));
            }
        }
    }

    async resendVerificationCode(email: string) {
        try {
            const user = await this.userRepository.findUserByEmail(email);

            if (user.isEmailVerified) {
                throw new BadRequestError('Email is already verified');
            }

            // Generate new verification code
            const verificationCode = generateVerificationCode();
            const verificationCodeExpiry = new Date();
            verificationCodeExpiry.setMinutes(verificationCodeExpiry.getMinutes() + 10); // 10 minutes expiry

            await this.userRepository.updateVerificationCode(email, verificationCode, verificationCodeExpiry);

            // Send verification email
            await sendVerificationEmail(email, verificationCode);

            return { message: 'Verification code sent successfully' };
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new Error(String(error));
            }
        }
    }

    async verifyEmail(email: string, code: string) {
        try {
            const user = await this.userRepository.verifyEmail(email, code);

            // Remove password and verification code from response
            const { password, verificationCode: verificationCodeValue, verificationCodeExpiry, ...userWithoutPassword } = user;
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

    async forgotPassword(email: string, currentPassword: string, newPassword: string) {
        try {
            // Find user by email
            const user = await this.userRepository.findUserByEmail(email);

            // Verify current password
            const isPasswordValid = await comparePassword(currentPassword, user.password);
            if (!isPasswordValid) {
                throw new BadRequestError('Current password is incorrect');
            }

            // Hash new password
            const hashedNewPassword = await hashPassword(newPassword);

            // Update password
            const updatedUser = await this.userRepository.updatePassword(email, hashedNewPassword);

            // Remove password from response
            const { password, ...userWithoutPassword } = updatedUser;
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