import { inject, injectable } from "inversify";
import TYPES from "../../dependencyManager/inversifyTypes";
import { OrderRepository } from "../repository/orderRepository";
import { CreateOrderDto, UpdateOrderDto } from "../dto/order.dto";

@injectable()
export class OrderService {
    constructor(@inject(TYPES.OrderRepository) private orderRepository: OrderRepository) {}

    async createOrder(userId: number, payload: CreateOrderDto) {
        try {
            const order = await this.orderRepository.createOrder(userId, payload);
            return order;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new Error(String(error));
            }
        }
    }

    async getOrderList(userId: number, payload: { limit?: number; offset?: number }) {
        try {
            const orders = await this.orderRepository.getOrderList(userId, payload);
            return orders;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new Error(String(error));
            }
        }
    }

    async getOrderById(userId: number, id: number) {
        try {
            const order = await this.orderRepository.getOrderById(userId, id);
            return order;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new Error(String(error));
            }
        }
    }

    async updateOrder(userId: number, id: number, payload: UpdateOrderDto) {
        try {
            const order = await this.orderRepository.updateOrder(userId, id, payload);
            return order;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new Error(String(error));
            }
        }
    }

    async deleteOrder(userId: number, id: number) {
        try {
            const order = await this.orderRepository.deleteOrder(userId, id);
            return order;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new Error(String(error));
            }
        }
    }
}

