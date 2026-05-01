import { inject, injectable } from "inversify";
import TYPES from "../../dependencyManager/inversifyTypes";
import { PaymentRepository } from "../repository/paymentRepository";
import { CreatePaymentDto, UpdatePaymentDto } from "../dto/payment.dto";

@injectable()
export class PaymentService {
    constructor(@inject(TYPES.PaymentRepository) private paymentRepository: PaymentRepository) {}

    async createPayment(userId: number, payload: CreatePaymentDto) {
        try {
            const payment = await this.paymentRepository.createPayment(userId, payload);
            return payment;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new Error(String(error));
            }
        }
    }

    async getPaymentList(userId: number, payload: { limit?: number; offset?: number }) {
        try {
            const payments = await this.paymentRepository.getPaymentList(userId, payload);
            return payments;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new Error(String(error));
            }
        }
    }

    async getPaymentById(userId: number, id: number) {
        try {
            const payment = await this.paymentRepository.getPaymentById(userId, id);
            return payment;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new Error(String(error));
            }
        }
    }

    async updatePayment(userId: number, id: number, payload: UpdatePaymentDto) {
        try {
            const payment = await this.paymentRepository.updatePayment(userId, id, payload);
            return payment;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new Error(String(error));
            }
        }
    }
}

