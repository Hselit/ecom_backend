import { inject, injectable } from "inversify";
import TYPES from "../../dependencyManager/inversifyTypes";
import { InventoryService } from "../service/inventoryService";
import { Request, Response, NextFunction } from "express";
import { HttpStatus } from "../../constants/common";
import { MESSAGE } from "../../constants/messages";
import { UnauthorizedError } from "../../error/unAuthorizedError";
import { BadRequestError } from "../../error/badRequestError";

@injectable()
export class InventoryController {
    constructor(@inject(TYPES.InventoryService) private inventoryService: InventoryService) {}

    async createInventory(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.userId;
            if (!userId) {
                throw new UnauthorizedError('User ID not found in token');
            }

            const inventory = await this.inventoryService.createInventory(userId, req.body);
            return res.status(HttpStatus.CREATED).json({
                message: MESSAGE.INVENTORY_CREATED_SUCCESS,
                data: inventory
            });
        } catch (error) {
            next(error);
        }
    }

    async getInventories(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.userId;
            if (!userId) {
                throw new UnauthorizedError('User ID not found in token');
            }

            const inventories = await this.inventoryService.getInventoryList(userId, req.query as any);
            return res.status(HttpStatus.OK).json({
                message: MESSAGE.INVENTORY_FETCHED_SUCCESS,
                data: inventories
            });
        } catch (error) {
            next(error);
        }
    }

    async getInventoryById(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.userId;
            if (!userId) {
                throw new UnauthorizedError('User ID not found in token');
            }

            const inventoryId = parseInt(req.params.id);
            if (isNaN(inventoryId)) {
                throw new BadRequestError('Invalid inventory ID');
            }

            const inventory = await this.inventoryService.getInventoryById(userId, inventoryId);
            return res.status(HttpStatus.OK).json({
                message: MESSAGE.INVENTORY_FETCHED_SUCCESS,
                data: inventory
            });
        } catch (error) {
            next(error);
        }
    }

    async updateInventory(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.userId;
            if (!userId) {
                throw new UnauthorizedError('User ID not found in token');
            }

            const inventoryId = parseInt(req.params.id);
            if (isNaN(inventoryId)) {
                throw new BadRequestError('Invalid inventory ID');
            }

            const inventory = await this.inventoryService.updateInventory(userId, inventoryId, req.body);
            return res.status(HttpStatus.OK).json({
                message: MESSAGE.INVENTORY_UPDATED_SUCCESS,
                data: inventory
            });
        } catch (error) {
            next(error);
        }
    }

    async deleteInventory(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.userId;
            if (!userId) {
                throw new UnauthorizedError('User ID not found in token');
            }

            const inventoryId = parseInt(req.params.id);
            if (isNaN(inventoryId)) {
                throw new BadRequestError('Invalid inventory ID');
            }

            const inventory = await this.inventoryService.deleteInventory(userId, inventoryId);
            return res.status(HttpStatus.OK).json({
                message: MESSAGE.INVENTORY_DELETED_SUCCESS,
                data: inventory
            });
        } catch (error) {
            next(error);
        }
    }
}

