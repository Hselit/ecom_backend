import { z } from 'zod';

export const CreatePaymentBodySchema = z.object({
  orderId: z.number().int().positive('Order ID must be a positive integer').openapi({ example: 1 }),
  paymentMethod: z.string().min(1, 'Payment method is required').openapi({ example: 'CREDIT_CARD' }),
  transactionId: z.string().optional().openapi({ example: 'TXN123456' }),
  amount: z.number().positive('Amount must be positive').openapi({ example: 999.99 })
}).openapi('CreatePaymentBody');

export const createPaymentDto = z.object({
  body: CreatePaymentBodySchema
}).openapi('CreatePaymentDto');

export const UpdatePaymentBodySchema = z.object({
  status: z.enum(['PENDING', 'SUCCESS', 'FAILED', 'REFUNDED']).openapi({ example: 'SUCCESS' }),
  transactionId: z.string().optional().openapi({ example: 'TXN123456' })
}).openapi('UpdatePaymentBody');

export const UpdatePaymentParamsSchema = z.object({
  id: z.string().transform(val => parseInt(val)).openapi({ example: '1' })
}).openapi('UpdatePaymentParams');

export const updatePaymentDto = z.object({
  body: UpdatePaymentBodySchema,
  params: UpdatePaymentParamsSchema
}).openapi('UpdatePaymentDto');

export const GetPaymentQuerySchema = z.object({
  limit: z.string().optional().transform(val => val ? parseInt(val) : undefined).openapi({ example: '10' }),
  offset: z.string().optional().transform(val => val ? parseInt(val) : undefined).openapi({ example: '0' })
}).openapi('GetPaymentQuery');

export const getPaymentQueryDto = z.object({
  query: GetPaymentQuerySchema
}).openapi('GetPaymentQueryDto');

export const GetPaymentParamsSchema = z.object({
  id: z.string().transform(val => parseInt(val)).openapi({ example: '1' })
}).openapi('GetPaymentParams');

export const getPaymentParamsDto = z.object({
  params: GetPaymentParamsSchema
}).openapi('GetPaymentParamsDto');

export type CreatePaymentDto = z.infer<typeof CreatePaymentBodySchema>;
export type UpdatePaymentDto = z.infer<typeof UpdatePaymentBodySchema>;

