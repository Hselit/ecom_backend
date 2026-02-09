import { z } from 'zod';

export const CreateOrderBodySchema = z.object({
  cartItemIds: z.array(z.number().int().positive()).optional().openapi({ example: [1, 2] })
}).openapi('CreateOrderBody');

export const createOrderDto = z.object({
  body: CreateOrderBodySchema
}).openapi('CreateOrderDto');

export const UpdateOrderBodySchema = z.object({
  status: z.enum(['PENDING', 'CONFIRMED', 'CANCELLED', 'DELIVERED']).openapi({ example: 'CONFIRMED' })
}).openapi('UpdateOrderBody');

export const UpdateOrderParamsSchema = z.object({
  id: z.string().transform(val => parseInt(val)).openapi({ example: '1' })
}).openapi('UpdateOrderParams');

export const updateOrderDto = z.object({
  body: UpdateOrderBodySchema,
  params: UpdateOrderParamsSchema
}).openapi('UpdateOrderDto');

export const GetOrderQuerySchema = z.object({
  limit: z.string().optional().transform(val => val ? parseInt(val) : undefined).openapi({ example: '10' }),
  offset: z.string().optional().transform(val => val ? parseInt(val) : undefined).openapi({ example: '0' })
}).openapi('GetOrderQuery');

export const getOrderQueryDto = z.object({
  query: GetOrderQuerySchema
}).openapi('GetOrderQueryDto');

export const GetOrderParamsSchema = z.object({
  id: z.string().transform(val => parseInt(val)).openapi({ example: '1' })
}).openapi('GetOrderParams');

export const getOrderParamsDto = z.object({
  params: GetOrderParamsSchema
}).openapi('GetOrderParamsDto');

export const DeleteOrderParamsSchema = z.object({
  id: z.string().transform(val => parseInt(val)).openapi({ example: '1' })
}).openapi('DeleteOrderParams');

export const deleteOrderParamsDto = z.object({
  params: DeleteOrderParamsSchema
}).openapi('DeleteOrderParamsDto');

export type CreateOrderDto = z.infer<typeof CreateOrderBodySchema>;
export type UpdateOrderDto = z.infer<typeof UpdateOrderBodySchema>;

