import { z } from 'zod';

export const AddCartItemBodySchema = z.object({
  productId: z.number().int().positive('Product ID must be a positive integer').openapi({ example: 1 }),
  quantity: z.number().int().positive('Quantity must be positive').openapi({ example: 1 })
}).openapi('AddCartItemBody');

export const addCartItemDto = z.object({
  body: AddCartItemBodySchema
}).openapi('AddCartItemDto');

export const UpdateCartItemBodySchema = z.object({
  quantity: z.number().int().positive('Quantity must be positive').openapi({ example: 2 })
}).openapi('UpdateCartItemBody');

export const UpdateCartItemParamsSchema = z.object({
  id: z.string().transform(val => parseInt(val)).openapi({ example: '1' })
}).openapi('UpdateCartItemParams');

export const updateCartItemDto = z.object({
  body: UpdateCartItemBodySchema,
  params: UpdateCartItemParamsSchema
}).openapi('UpdateCartItemDto');

export const getCartItemsDto = z.object({}).openapi('GetCartItemsDto');

export const DeleteCartItemParamsSchema = z.object({
  id: z.string().transform(val => parseInt(val)).openapi({ example: '1' })
}).openapi('DeleteCartItemParams');

export const deleteCartItemParamsDto = z.object({
  params: DeleteCartItemParamsSchema
}).openapi('DeleteCartItemParamsDto');

export type AddCartItemDto = z.infer<typeof AddCartItemBodySchema>;
export type UpdateCartItemDto = z.infer<typeof UpdateCartItemBodySchema>;

