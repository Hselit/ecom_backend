import { inject, injectable } from "inversify";
import TYPES from "../../dependencyManager/inversifyTypes";
import { CartItemRepository } from "../repository/cartItemRepository";
import { AddCartItemDto, UpdateCartItemDto } from "../dto/cartItem.dto";

@injectable()
export class CartItemService {
    constructor(@inject(TYPES.CartItemRepository) private cartItemRepository: CartItemRepository) {}

    async addCartItem(userId: number, payload: AddCartItemDto) {
        try {
            const cartItem = await this.cartItemRepository.addCartItem(userId, payload);
            return cartItem;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new Error(String(error));
            }
        }
    }

    async getCartItems(userId: number) {
        try {
            const cartItems = await this.cartItemRepository.getCartItems(userId);
            return cartItems;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new Error(String(error));
            }
        }
    }

    async updateCartItem(userId: number, itemId: number, payload: UpdateCartItemDto) {
        try {
            const cartItem = await this.cartItemRepository.updateCartItem(userId, itemId, payload);
            return cartItem;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new Error(String(error));
            }
        }
    }

    async deleteCartItem(userId: number, itemId: number) {
        try {
            const cartItem = await this.cartItemRepository.deleteCartItem(userId, itemId);
            return cartItem;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new Error(String(error));
            }
        }
    }
}

