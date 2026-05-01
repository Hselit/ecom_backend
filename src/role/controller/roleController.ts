import { inject, injectable } from "inversify";
import TYPES from "../../dependencyManager/inversifyTypes";
import { RoleService } from "../service/roleService";
import { Response,Request, NextFunction } from "express";
import { HttpStatus } from "../../constants/common";
import { MESSAGE } from "../../constants/messages";
import { UnauthorizedError } from "../../error/unAuthorizedError";
import { validatedParams, validatedQuery } from "../../middleware/validatedRequest.js";

@injectable()
export class RoleController{

    constructor(@inject(TYPES.RoleService)private roleService:RoleService){}

    async getRoles(req:Request,res:Response,next:NextFunction){
        try {
            const rolePayload = validatedQuery(req) as any;
            const roleList = await this.roleService.getRoleList(rolePayload);
            return res.status(HttpStatus.OK).json({
                message: MESSAGE.ROLE_SUCCESS,
                data:roleList
            })
        } catch (error) {
            next(error);
        }
    }

    async createRole(req:Request,res:Response,next:NextFunction){
        try {
            // Extract userId from token (set by auth middleware)
            const userId = req.userId;
            if (!userId) {
                throw new UnauthorizedError('User ID not found in token');
            }

            // Body is already validated by middleware
            const role = await this.roleService.createRole(userId, req.body);
            return res.status(HttpStatus.CREATED).json({
                message: MESSAGE.ROLE_CREATED_SUCCESS,
                data: role
            })
        } catch (error) {
            next(error);
        }
    }

    async deleteRole(req:Request,res:Response,next:NextFunction){
        try {
            // Extract userId from token (set by auth middleware)
            const userId = req.userId;
            if (!userId) {
                throw new UnauthorizedError('User ID not found in token');
            }

            // Params are already validated by middleware
            const roleId = validatedParams(req).id as unknown as number;
            
            const deletedRole = await this.roleService.deleteRole(userId, roleId);
            return res.status(HttpStatus.OK).json({
                message: MESSAGE.ROLE_DELETED_SUCCESS,
                data: deletedRole
            })
        } catch (error) {
            next(error);
        }
    }

}