import { z } from 'zod';

export const CreateProductImageBodySchema = z.object({
  imageUrl: z.string().url('Invalid image URL').openapi({ example: 'https://example.com/image.jpg' }),
  isPrimary: z.boolean().optional().default(false).openapi({ example: false })
}).openapi('CreateProductImageBody');

export const CreateProductImageParamsSchema = z.object({
  productId: z.string().transform(val => parseInt(val)).openapi({ example: '1' })
}).openapi('CreateProductImageParams');

export const createProductImageDto = z.object({
  body: CreateProductImageBodySchema,
  params: CreateProductImageParamsSchema
}).openapi('CreateProductImageDto');

export const UpdateProductImageBodySchema = z.object({
  imageUrl: z.string().url('Invalid image URL').optional().openapi({ example: 'https://example.com/image.jpg' }),
  isPrimary: z.boolean().optional().openapi({ example: false })
}).openapi('UpdateProductImageBody');

export const UpdateProductImageParamsSchema = z.object({
  id: z.string().transform(val => parseInt(val)).openapi({ example: '1' })
}).openapi('UpdateProductImageParams');

export const updateProductImageDto = z.object({
  body: UpdateProductImageBodySchema,
  params: UpdateProductImageParamsSchema
}).openapi('UpdateProductImageDto');

export const GetProductImageQuerySchema = z.object({
  productId: z.string().transform(val => parseInt(val)).openapi({ example: '1' })
}).openapi('GetProductImageQuery');

export const getProductImageQueryDto = z.object({
  query: GetProductImageQuerySchema
}).openapi('GetProductImageQueryDto');

export const GetProductImageParamsSchema = z.object({
  id: z.string().transform(val => parseInt(val)).openapi({ example: '1' })
}).openapi('GetProductImageParams');

export const getProductImageParamsDto = z.object({
  params: GetProductImageParamsSchema
}).openapi('GetProductImageParamsDto');

export const DeleteProductImageParamsSchema = z.object({
  id: z.string().transform(val => parseInt(val)).openapi({ example: '1' })
}).openapi('DeleteProductImageParams');

export const deleteProductImageParamsDto = z.object({
  params: DeleteProductImageParamsSchema
}).openapi('DeleteProductImageParamsDto');

export const GetProductImagesByProductParamsSchema = z.object({
  productId: z.string().transform(val => parseInt(val)).openapi({ example: '1' })
}).openapi('GetProductImagesByProductParams');

export const getProductImagesByProductParamsDto = z.object({
  params: GetProductImagesByProductParamsSchema
}).openapi('GetProductImagesByProductParamsDto');

export type CreateProductImageDto = z.infer<typeof CreateProductImageBodySchema>;
export type UpdateProductImageDto = z.infer<typeof UpdateProductImageBodySchema>;

