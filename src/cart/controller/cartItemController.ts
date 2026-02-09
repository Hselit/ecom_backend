import { inject, injectable } from "inversify";
import TYPES from "../../dependencyManager/inversifyTypes";
import { CartItemService } from "../service/cartItemService";
import { Request, Response, NextFunction } from "express";
import { HttpStatus } from "../../constants/common";
import { MESSAGE } from "../../constants/messages";
import { UnauthorizedError } from "../../error/unAuthorizedError";
import { BadRequestError } from "../../error/badRequestError";

@injectable()
export class CartItemController {
    constructor(@inject(TYPES.CartItemService) private cartItemService: CartItemService) {}

    async addCartItem(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.userId;
            if (!userId) {
                throw new UnauthorizedError('User ID not found in token');
            }

            const cartItem = await this.cartItemService.addCartItem(userId, req.body);
            return res.status(HttpStatus.CREATED).json({
                message: MESSAGE.CART_ITEM_ADDED_SUCCESS,
                data: cartItem
            });
        } catch (error) {
            next(error);
        }
    }

    async getCartItems(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.userId;
            if (!userId) {
                throw new UnauthorizedError('User ID not found in token');
            }

            const cartItems = await this.cartItemService.getCartItems(userId);
            return res.status(HttpStatus.OK).json({
                message: MESSAGE.CART_ITEM_FETCHED_SUCCESS,
                data: cartItems
            });
        } catch (error) {
            next(error);
        }
    }

    async updateCartItem(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.userId;
            if (!userId) {
                throw new UnauthorizedError('User ID not found in token');
            }

            const itemId = parseInt(req.params.id);
            if (isNaN(itemId)) {
                throw new BadRequestError('Invalid cart item ID');
            }

            const cartItem = await this.cartItemService.updateCartItem(userId, itemId, req.body);
            return res.status(HttpStatus.OK).json({
                message: MESSAGE.CART_ITEM_UPDATED_SUCCESS,
                data: cartItem
            });
        } catch (error) {
            next(error);
        }
    }

    async deleteCartItem(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.userId;
            if (!userId) {
                throw new UnauthorizedError('User ID not found in token');
            }

            const itemId = parseInt(req.params.id);
            if (isNaN(itemId)) {
                throw new BadRequestError('Invalid cart item ID');
            }

            const cartItem = await this.cartItemService.deleteCartItem(userId, itemId);
            return res.status(HttpStatus.OK).json({
                message: MESSAGE.CART_ITEM_DELETED_SUCCESS,
                data: cartItem
            });
        } catch (error) {
            next(error);
        }
    }
}

