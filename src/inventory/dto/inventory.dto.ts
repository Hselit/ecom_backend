import { z } from 'zod';

export const CreateInventoryBodySchema = z.object({
  productId: z.number().int().positive('Product ID must be a positive integer').openapi({ example: 1 }),
  quantity: z.number().int().nonnegative('Quantity must be non-negative').openapi({ example: 100 }),
  reservedQty: z.number().int().nonnegative('Reserved quantity must be non-negative').optional().default(0).openapi({ example: 0 }),
  isActive: z.boolean().optional().default(true).openapi({ example: true })
}).openapi('CreateInventoryBody');

export const createInventoryDto = z.object({
  body: CreateInventoryBodySchema
}).openapi('CreateInventoryDto');

export const UpdateInventoryBodySchema = z.object({
  quantity: z.number().int().nonnegative('Quantity must be non-negative').optional().openapi({ example: 100 }),
  reservedQty: z.number().int().nonnegative('Reserved quantity must be non-negative').optional().openapi({ example: 10 }),
  isActive: z.boolean().optional().openapi({ example: true })
}).openapi('UpdateInventoryBody');

export const UpdateInventoryParamsSchema = z.object({
  id: z.string().transform(val => parseInt(val)).openapi({ example: '1' })
}).openapi('UpdateInventoryParams');

export const updateInventoryDto = z.object({
  body: UpdateInventoryBodySchema,
  params: UpdateInventoryParamsSchema
}).openapi('UpdateInventoryDto');

export const GetInventoryQuerySchema = z.object({
  limit: z.string().optional().transform(val => val ? parseInt(val) : undefined).openapi({ example: '10' }),
  offset: z.string().optional().transform(val => val ? parseInt(val) : undefined).openapi({ example: '0' }),
  productId: z.string().optional().transform(val => val ? parseInt(val) : undefined).openapi({ example: '1' })
}).openapi('GetInventoryQuery');

export const getInventoryQueryDto = z.object({
  query: GetInventoryQuerySchema
}).openapi('GetInventoryQueryDto');

export const GetInventoryParamsSchema = z.object({
  id: z.string().transform(val => parseInt(val)).openapi({ example: '1' })
}).openapi('GetInventoryParams');

export const getInventoryParamsDto = z.object({
  params: GetInventoryParamsSchema
}).openapi('GetInventoryParamsDto');

export const DeleteInventoryParamsSchema = z.object({
  id: z.string().transform(val => parseInt(val)).openapi({ example: '1' })
}).openapi('DeleteInventoryParams');

export const deleteInventoryParamsDto = z.object({
  params: DeleteInventoryParamsSchema
}).openapi('DeleteInventoryParamsDto');

export type CreateInventoryDto = z.infer<typeof CreateInventoryBodySchema>;
export type UpdateInventoryDto = z.infer<typeof UpdateInventoryBodySchema>;

