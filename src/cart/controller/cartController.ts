import { inject, injectable } from "inversify";
import TYPES from "../../dependencyManager/inversifyTypes";
import { CartService } from "../service/cartService";
import { Request, Response, NextFunction } from "express";
import { HttpStatus } from "../../constants/common";
import { MESSAGE } from "../../constants/messages";
import { UnauthorizedError } from "../../error/unAuthorizedError";

@injectable()
export class CartController {
    constructor(@inject(TYPES.CartService) private cartService: CartService) {}

    async getCart(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.userId;
            if (!userId) {
                throw new UnauthorizedError('User ID not found in token');
            }

            const cart = await this.cartService.getCart(userId);
            return res.status(HttpStatus.OK).json({
                message: MESSAGE.CART_FETCHED_SUCCESS,
                data: cart
            });
        } catch (error) {
            next(error);
        }
    }

    async deleteCart(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.userId;
            if (!userId) {
                throw new UnauthorizedError('User ID not found in token');
            }

            const cart = await this.cartService.deleteCart(userId);
            return res.status(HttpStatus.OK).json({
                message: MESSAGE.CART_DELETED_SUCCESS,
                data: cart
            });
        } catch (error) {
            next(error);
        }
    }
}

