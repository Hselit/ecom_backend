import { inject, injectable } from "inversify";
import TYPES from "../../dependencyManager/inversifyTypes";
import { OrderService } from "../service/orderService";
import { Request, Response, NextFunction } from "express";
import { HttpStatus } from "../../constants/common";
import { MESSAGE } from "../../constants/messages";
import { UnauthorizedError } from "../../error/unAuthorizedError";
import { BadRequestError } from "../../error/badRequestError";

@injectable()
export class OrderController {
    constructor(@inject(TYPES.OrderService) private orderService: OrderService) {}

    async createOrder(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.userId;
            if (!userId) {
                throw new UnauthorizedError('User ID not found in token');
            }

            const order = await this.orderService.createOrder(userId, req.body);
            return res.status(HttpStatus.CREATED).json({
                message: MESSAGE.ORDER_CREATED_SUCCESS,
                data: order
            });
        } catch (error) {
            next(error);
        }
    }

    async getOrders(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.userId;
            if (!userId) {
                throw new UnauthorizedError('User ID not found in token');
            }

            const orders = await this.orderService.getOrderList(userId, req.query as any);
            return res.status(HttpStatus.OK).json({
                message: MESSAGE.ORDER_FETCHED_SUCCESS,
                data: orders
            });
        } catch (error) {
            next(error);
        }
    }

    async getOrderById(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.userId;
            if (!userId) {
                throw new UnauthorizedError('User ID not found in token');
            }

            const orderId = parseInt(req.params.id);
            if (isNaN(orderId)) {
                throw new BadRequestError('Invalid order ID');
            }

            const order = await this.orderService.getOrderById(userId, orderId);
            return res.status(HttpStatus.OK).json({
                message: MESSAGE.ORDER_FETCHED_SUCCESS,
                data: order
            });
        } catch (error) {
            next(error);
        }
    }

    async updateOrder(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.userId;
            if (!userId) {
                throw new UnauthorizedError('User ID not found in token');
            }

            const orderId = parseInt(req.params.id);
            if (isNaN(orderId)) {
                throw new BadRequestError('Invalid order ID');
            }

            const order = await this.orderService.updateOrder(userId, orderId, req.body);
            return res.status(HttpStatus.OK).json({
                message: MESSAGE.ORDER_UPDATED_SUCCESS,
                data: order
            });
        } catch (error) {
            next(error);
        }
    }

    async deleteOrder(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.userId;
            if (!userId) {
                throw new UnauthorizedError('User ID not found in token');
            }

            const orderId = parseInt(req.params.id);
            if (isNaN(orderId)) {
                throw new BadRequestError('Invalid order ID');
            }

            const order = await this.orderService.deleteOrder(userId, orderId);
            return res.status(HttpStatus.OK).json({
                message: MESSAGE.ORDER_DELETED_SUCCESS,
                data: order
            });
        } catch (error) {
            next(error);
        }
    }
}

