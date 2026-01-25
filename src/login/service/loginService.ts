import { inject, injectable } from "inversify";
import TYPES from "../../dependencyManager/inversifyTypes";
import { LoginRepository } from "../repository/loginRepository";
import { LoginDto } from "../dto/login.dto";
import { comparePassword } from "../../libs/password";
import { generateToken } from "../../libs/jwt";
import { UnauthorizedError } from "../../error/unAuthorizedError";

@injectable()
export class LoginService {
    constructor(@inject(TYPES.LoginRepository) private loginRepository: LoginRepository) {}

    async login(payload: LoginDto) {
        try {
            // Find user by email or name
            const user = await this.loginRepository.findUserByIdentifier(payload.identifier);

            // Check if user is active
            if (!user.isActive) {
                throw new UnauthorizedError('User account is inactive');
            }

            // Verify password
            const isPasswordValid = await comparePassword(payload.password, user.password);
            if (!isPasswordValid) {
                throw new UnauthorizedError('Invalid credentials');
            }

            // Generate JWT token
            const token = generateToken(user.id);

            return {
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    phoneNumber: user.phoneNumber,
                    role: user.role.roleName
                }
            };
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new Error(String(error));
            }
        }
    }
}

