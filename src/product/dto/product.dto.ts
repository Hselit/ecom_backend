import { z } from 'zod';

export const CreateProductBodySchema = z.object({
  name: z.string().min(1, 'Name is required').openapi({ example: 'iPhone 15' }),
  slug: z.string().min(1, 'Slug is required').openapi({ example: 'iphone-15' }),
  description: z.string().optional().openapi({ example: 'Latest iPhone model' }),
  sku: z.string().min(1, 'SKU is required').openapi({ example: 'IPH15-001' }),
  price: z.number().positive('Price must be positive').openapi({ example: 999.99 }),
  stock: z.number().int().nonnegative('Stock must be non-negative').openapi({ example: 100 }),
  categoryId: z.number().int().positive('Category ID must be a positive integer').openapi({ example: 1 }),
  isActive: z.boolean().optional().default(true).openapi({ example: true })
}).openapi('CreateProductBody');

export const createProductDto = z.object({
  body: CreateProductBodySchema
}).openapi('CreateProductDto');

export const UpdateProductBodySchema = z.object({
  name: z.string().min(1, 'Name is required').optional().openapi({ example: 'iPhone 15' }),
  slug: z.string().min(1, 'Slug is required').optional().openapi({ example: 'iphone-15' }),
  description: z.string().optional().openapi({ example: 'Latest iPhone model' }),
  sku: z.string().min(1, 'SKU is required').optional().openapi({ example: 'IPH15-001' }),
  price: z.number().positive('Price must be positive').optional().openapi({ example: 999.99 }),
  stock: z.number().int().nonnegative('Stock must be non-negative').optional().openapi({ example: 100 }),
  categoryId: z.number().int().positive('Category ID must be a positive integer').optional().openapi({ example: 1 }),
  isActive: z.boolean().optional().openapi({ example: true })
}).openapi('UpdateProductBody');

export const UpdateProductParamsSchema = z.object({
  id: z.string().transform(val => parseInt(val)).openapi({ example: '1' })
}).openapi('UpdateProductParams');

export const updateProductDto = z.object({
  body: UpdateProductBodySchema,
  params: UpdateProductParamsSchema
}).openapi('UpdateProductDto');

export const GetProductQuerySchema = z.object({
  limit: z.string().optional().transform(val => val ? parseInt(val) : undefined).openapi({ example: '10' }),
  offset: z.string().optional().transform(val => val ? parseInt(val) : undefined).openapi({ example: '0' }),
  categoryId: z.string().optional().transform(val => val ? parseInt(val) : undefined).openapi({ example: '1' })
}).openapi('GetProductQuery');

export const getProductQueryDto = z.object({
  query: GetProductQuerySchema
}).openapi('GetProductQueryDto');

export const GetProductParamsSchema = z.object({
  id: z.string().transform(val => parseInt(val)).openapi({ example: '1' })
}).openapi('GetProductParams');

export const getProductParamsDto = z.object({
  params: GetProductParamsSchema
}).openapi('GetProductParamsDto');

export const DeleteProductParamsSchema = z.object({
  id: z.string().transform(val => parseInt(val)).openapi({ example: '1' })
}).openapi('DeleteProductParams');

export const deleteProductParamsDto = z.object({
  params: DeleteProductParamsSchema
}).openapi('DeleteProductParamsDto');

export type CreateProductDto = z.infer<typeof CreateProductBodySchema>;
export type UpdateProductDto = z.infer<typeof UpdateProductBodySchema>;

