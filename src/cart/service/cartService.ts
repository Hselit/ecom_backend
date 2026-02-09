import { inject, injectable } from "inversify";
import TYPES from "../../dependencyManager/inversifyTypes";
import { CartRepository } from "../repository/cartRepository";

@injectable()
export class CartService {
    constructor(@inject(TYPES.CartRepository) private cartRepository: CartRepository) {}

    async getCart(userId: number) {
        try {
            const cart = await this.cartRepository.getOrCreateCart(userId);
            return cart;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new Error(String(error));
            }
        }
    }

    async deleteCart(userId: number) {
        try {
            const cart = await this.cartRepository.deleteCart(userId);
            return cart;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new Error(String(error));
            }
        }
    }
}

