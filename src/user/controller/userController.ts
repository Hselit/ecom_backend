import { inject, injectable } from "inversify";
import TYPES from "../../dependencyManager/inversifyTypes";
import { UserService } from "../service/userService";
import { Request, Response, NextFunction } from "express";
import { HttpStatus } from "../../constants/common";
import { MESSAGE } from "../../constants/messages";
import { UnauthorizedError } from "../../error/unAuthorizedError";
import { BadRequestError } from "../../error/badRequestError";

@injectable()
export class UserController {
    constructor(@inject(TYPES.UserService) private userService: UserService) {}

    async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.userId;
            if (!userId) {
                throw new UnauthorizedError('User ID not found in token');
            }

            const user = await this.userService.createUser(userId, req.body);
            return res.status(HttpStatus.CREATED).json({
                message: MESSAGE.USER_CREATED_SUCCESS,
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

            const users = await this.userService.getUserList(userId, req.query as any);
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

            const targetUserId = parseInt(req.params.id);
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

            const targetUserId = parseInt(req.params.id);
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

            const targetUserId = parseInt(req.params.id);
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