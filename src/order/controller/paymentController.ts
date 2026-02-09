import { inject, injectable } from "inversify";
import TYPES from "../../dependencyManager/inversifyTypes";
import { PaymentService } from "../service/paymentService";
import { Request, Response, NextFunction } from "express";
import { HttpStatus } from "../../constants/common";
import { MESSAGE } from "../../constants/messages";
import { UnauthorizedError } from "../../error/unAuthorizedError";
import { BadRequestError } from "../../error/badRequestError";

@injectable()
export class PaymentController {
    constructor(@inject(TYPES.PaymentService) private paymentService: PaymentService) {}

    async createPayment(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.userId;
            if (!userId) {
                throw new UnauthorizedError('User ID not found in token');
            }

            const payment = await this.paymentService.createPayment(userId, req.body);
            return res.status(HttpStatus.CREATED).json({
                message: MESSAGE.PAYMENT_CREATED_SUCCESS,
                data: payment
            });
        } catch (error) {
            next(error);
        }
    }

    async getPayments(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.userId;
            if (!userId) {
                throw new UnauthorizedError('User ID not found in token');
            }

            const payments = await this.paymentService.getPaymentList(userId, req.query as any);
            return res.status(HttpStatus.OK).json({
                message: MESSAGE.PAYMENT_FETCHED_SUCCESS,
                data: payments
            });
        } catch (error) {
            next(error);
        }
    }

    async getPaymentById(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.userId;
            if (!userId) {
                throw new UnauthorizedError('User ID not found in token');
            }

            const paymentId = parseInt(req.params.id);
            if (isNaN(paymentId)) {
                throw new BadRequestError('Invalid payment ID');
            }

            const payment = await this.paymentService.getPaymentById(userId, paymentId);
            return res.status(HttpStatus.OK).json({
                message: MESSAGE.PAYMENT_FETCHED_SUCCESS,
                data: payment
            });
        } catch (error) {
            next(error);
        }
    }

    async updatePayment(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.userId;
            if (!userId) {
                throw new UnauthorizedError('User ID not found in token');
            }

            const paymentId = parseInt(req.params.id);
            if (isNaN(paymentId)) {
                throw new BadRequestError('Invalid payment ID');
            }

            const payment = await this.paymentService.updatePayment(userId, paymentId, req.body);
            return res.status(HttpStatus.OK).json({
                message: MESSAGE.PAYMENT_UPDATED_SUCCESS,
                data: payment
            });
        } catch (error) {
            next(error);
        }
    }
}

