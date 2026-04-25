import { inject, injectable } from "inversify";
import TYPES from "../../dependencyManager/inversifyTypes";
import { AccessTypeService } from "../service/accessTypeService";
import { Response, Request, NextFunction } from "express";
import { HttpStatus } from "../../constants/common";
import { MESSAGE } from "../../constants/messages";
import { UnauthorizedError } from "../../error/unAuthorizedError";
import { BadRequestError } from "../../error/badRequestError";
import { validatedParams, validatedQuery } from "../../middleware/validatedRequest.js";

@injectable()
export class AccessTypeController {
    constructor(@inject(TYPES.AccessTypeService) private accessTypeService: AccessTypeService) {}

    async createAccessType(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.userId;
            if (!userId) {
                throw new UnauthorizedError('User ID not found in token');
            }

            const accessType = await this.accessTypeService.createAccessType(userId, req.body);
            return res.status(HttpStatus.CREATED).json({
                message: MESSAGE.ACCESS_TYPE_CREATED_SUCCESS,
                data: accessType
            });
        } catch (error) {
            next(error);
        }
    }

    async getAccessTypes(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.userId;
            if (!userId) {
                throw new UnauthorizedError('User ID not found in token');
            }

            const accessTypes = await this.accessTypeService.getAccessTypeList(userId, validatedQuery(req) as any);
            return res.status(HttpStatus.OK).json({
                message: MESSAGE.ACCESS_TYPE_FETCHED_SUCCESS,
                data: accessTypes
            });
        } catch (error) {
            next(error);
        }
    }

    async getAccessTypeById(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.userId;
            if (!userId) {
                throw new UnauthorizedError('User ID not found in token');
            }

            const id = validatedParams(req).id as unknown as number;
            if (!id || isNaN(Number(id))) {
                throw new BadRequestError('Invalid access type ID');
            }

            const accessType = await this.accessTypeService.getAccessTypeById(userId, id);
            return res.status(HttpStatus.OK).json({
                message: MESSAGE.ACCESS_TYPE_FETCHED_SUCCESS,
                data: accessType
            });
        } catch (error) {
            next(error);
        }
    }

    async updateAccessType(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.userId;
            if (!userId) {
                throw new UnauthorizedError('User ID not found in token');
            }

            const id = validatedParams(req).id as unknown as number;
            if (!id || isNaN(Number(id))) {
                throw new BadRequestError('Invalid access type ID');
            }

            const accessType = await this.accessTypeService.updateAccessType(userId, id, req.body);
            return res.status(HttpStatus.OK).json({
                message: MESSAGE.ACCESS_TYPE_UPDATED_SUCCESS,
                data: accessType
            });
        } catch (error) {
            next(error);
        }
    }

    async deleteAccessType(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.userId;
            if (!userId) {
                throw new UnauthorizedError('User ID not found in token');
            }

            const id = validatedParams(req).id as unknown as number;
            if (!id || isNaN(Number(id))) {
                throw new BadRequestError('Invalid access type ID');
            }

            const accessType = await this.accessTypeService.deleteAccessType(userId, id);
            return res.status(HttpStatus.OK).json({
                message: MESSAGE.ACCESS_TYPE_DELETED_SUCCESS,
                data: accessType
            });
        } catch (error) {
            next(error);
        }
    }
}

