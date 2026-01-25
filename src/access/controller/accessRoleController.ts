import { inject, injectable } from "inversify";
import TYPES from "../../dependencyManager/inversifyTypes";
import { AccessRoleService } from "../service/accessRoleService";
import { Response, Request, NextFunction } from "express";
import { HttpStatus } from "../../constants/common";
import { MESSAGE } from "../../constants/messages";
import { UnauthorizedError } from "../../error/unAuthorizedError";
import { BadRequestError } from "../../error/badRequestError";

@injectable()
export class AccessRoleController {
    constructor(@inject(TYPES.AccessRoleService) private accessRoleService: AccessRoleService) {}

    async createAccessRole(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.userId;
            if (!userId) {
                throw new UnauthorizedError('User ID not found in token');
            }

            const accessRole = await this.accessRoleService.createAccessRole(userId, req.body);
            return res.status(HttpStatus.CREATED).json({
                message: MESSAGE.ACCESS_ROLE_CREATED_SUCCESS,
                data: accessRole
            });
        } catch (error) {
            next(error);
        }
    }

    async getAccessRoles(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.userId;
            if (!userId) {
                throw new UnauthorizedError('User ID not found in token');
            }

            const accessRoles = await this.accessRoleService.getAccessRoleList(userId, req.query as any);
            return res.status(HttpStatus.OK).json({
                message: MESSAGE.ACCESS_ROLE_FETCHED_SUCCESS,
                data: accessRoles
            });
        } catch (error) {
            next(error);
        }
    }

    async getAccessRoleById(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.userId;
            if (!userId) {
                throw new UnauthorizedError('User ID not found in token');
            }

            const id = req.params.id as unknown as number;
            if (!id || isNaN(Number(id))) {
                throw new BadRequestError('Invalid access role ID');
            }

            const accessRole = await this.accessRoleService.getAccessRoleById(userId, id);
            return res.status(HttpStatus.OK).json({
                message: MESSAGE.ACCESS_ROLE_FETCHED_SUCCESS,
                data: accessRole
            });
        } catch (error) {
            next(error);
        }
    }

    async updateAccessRole(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.userId;
            if (!userId) {
                throw new UnauthorizedError('User ID not found in token');
            }

            const id = req.params.id as unknown as number;
            if (!id || isNaN(Number(id))) {
                throw new BadRequestError('Invalid access role ID');
            }

            const accessRole = await this.accessRoleService.updateAccessRole(userId, id, req.body);
            return res.status(HttpStatus.OK).json({
                message: MESSAGE.ACCESS_ROLE_UPDATED_SUCCESS,
                data: accessRole
            });
        } catch (error) {
            next(error);
        }
    }

    async deleteAccessRole(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.userId;
            if (!userId) {
                throw new UnauthorizedError('User ID not found in token');
            }

            const id = req.params.id as unknown as number;
            if (!id || isNaN(Number(id))) {
                throw new BadRequestError('Invalid access role ID');
            }

            const accessRole = await this.accessRoleService.deleteAccessRole(userId, id);
            return res.status(HttpStatus.OK).json({
                message: MESSAGE.ACCESS_ROLE_DELETED_SUCCESS,
                data: accessRole
            });
        } catch (error) {
            next(error);
        }
    }

    async assignAccessToRole(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.userId;
            if (!userId) {
                throw new UnauthorizedError('User ID not found in token');
            }

            const result = await this.accessRoleService.assignAccessToRole(userId, req.body);
            return res.status(HttpStatus.OK).json({
                message: MESSAGE.ACCESS_ROLE_ASSIGNED_SUCCESS,
                data: result
            });
        } catch (error) {
            next(error);
        }
    }
}

