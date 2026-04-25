import { inject, injectable } from "inversify";
import TYPES from "../../dependencyManager/inversifyTypes";
import { UserService } from "../service/userService";
import { Request, Response, NextFunction } from "express";
import { HttpStatus } from "../../constants/common";
import { MESSAGE } from "../../constants/messages";
import { UnauthorizedError } from "../../error/unAuthorizedError";
import { BadRequestError } from "../../error/badRequestError";
import { validatedParams, validatedQuery } from "../../middleware/validatedRequest.js";

@injectable()
export class UserController {
    constructor(@inject(TYPES.UserService) private userService: UserService) {}

    async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await this.userService.createUser(req.body);
            return res.status(HttpStatus.CREATED).json({
                message: MESSAGE.USER_CREATED_SUCCESS,
                data: user
            });
        } catch (error) {
            next(error);
        }
    }

    async resendVerificationCode(req: Request, res: Response, next: NextFunction) {
        try {
            const email = req.body.email;
            if (!email) {
                throw new BadRequestError('Email is required');
            }
            const result = await this.userService.resendVerificationCode(email);
            return res.status(HttpStatus.OK).json({
                message: MESSAGE.VERIFICATION_CODE_SENT_SUCCESS,
                data: result
            });
        } catch (error) {
            next(error);
        }
    }

    async verifyEmail(req: Request, res: Response, next: NextFunction) {
        try {
            const email = req.body.email;
            const code = req.body.code;
            if (!email || !code) {
                throw new BadRequestError('Email and verification code are required');
            }
            const user = await this.userService.verifyEmail(email, code);
            return res.status(HttpStatus.OK).json({
                message: MESSAGE.EMAIL_VERIFIED_SUCCESS,
                data: user
            });
        } catch (error) {
            next(error);
        }
    }

    async forgotPassword(req: Request, res: Response, next: NextFunction) {
        try {
            const email = req.body.email;
            const currentPassword = req.body.currentPassword;
            const newPassword = req.body.newPassword;
            if (!email || !currentPassword || !newPassword) {
                throw new BadRequestError('Email, current password, and new password are required');
            }
            const user = await this.userService.forgotPassword(email, currentPassword, newPassword);
            return res.status(HttpStatus.OK).json({
                message: MESSAGE.PASSWORD_RESET_SUCCESS,
                data: user
            });
        } catch (error) {
            next(error);
        }
    }

    async getUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.userId;
            if (!userId) {
                throw new UnauthorizedError('User ID not found in token');
            }

            const users = await this.userService.getUserList(userId, validatedQuery(req) as any);
            return res.status(HttpStatus.OK).json({
                message: MESSAGE.USER_FETCHED_SUCCESS,
                data: users
            });
        } catch (error) {
            next(error);
        }
    }

    async getUserById(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.userId;
            if (!userId) {
                throw new UnauthorizedError('User ID not found in token');
            }

            const idParam = validatedParams(req).id;
            if (!idParam) {
                throw new BadRequestError('User ID is required');
            }
            const targetUserId = parseInt(idParam);
            if (isNaN(targetUserId)) {
                throw new BadRequestError('Invalid user ID');
            }

            const user = await this.userService.getUserById(userId, targetUserId);
            return res.status(HttpStatus.OK).json({
                message: MESSAGE.USER_FETCHED_SUCCESS,
                data: user
            });
        } catch (error) {
            next(error);
        }
    }

    async updateUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.userId;
            if (!userId) {
                throw new UnauthorizedError('User ID not found in token');
            }

            const idParam = validatedParams(req).id;
            if (!idParam) {
                throw new BadRequestError('User ID is required');
            }
            const targetUserId = parseInt(idParam);
            if (isNaN(targetUserId)) {
                throw new BadRequestError('Invalid user ID');
            }

            const user = await this.userService.updateUser(userId, targetUserId, req.body);
            return res.status(HttpStatus.OK).json({
                message: MESSAGE.USER_UPDATED_SUCCESS,
                data: user
            });
        } catch (error) {
            next(error);
        }
    }

    async deleteUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.userId;
            if (!userId) {
                throw new UnauthorizedError('User ID not found in token');
            }

            const idParam = validatedParams(req).id;
            if (!idParam) {
                throw new BadRequestError('User ID is required');
            }
            const targetUserId = parseInt(idParam);
            if (isNaN(targetUserId)) {
                throw new BadRequestError('Invalid user ID');
            }

            const user = await this.userService.deleteUser(userId, targetUserId);
            return res.status(HttpStatus.OK).json({
                message: MESSAGE.USER_DELETED_SUCCESS,
                data: user
            });
        } catch (error) {
            next(error);
        }
    }
}