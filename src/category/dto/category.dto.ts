import { z } from 'zod';

export const CreateCategoryBodySchema = z.object({
  name: z.string().min(1, 'Name is required').openapi({ example: 'Electronics' }),
  slug: z.string().min(1, 'Slug is required').openapi({ example: 'electronics' }),
  description: z.string().optional().openapi({ example: 'Electronic products' }),
  parentId: z.number().int().positive('Parent ID must be a positive integer').optional().openapi({ example: 1 }),
  isActive: z.boolean().optional().default(true).openapi({ example: true })
}).openapi('CreateCategoryBody');

export const createCategoryDto = z.object({
  body: CreateCategoryBodySchema
}).openapi('CreateCategoryDto');

export const UpdateCategoryBodySchema = z.object({
  name: z.string().min(1, 'Name is required').optional().openapi({ example: 'Electronics' }),
  slug: z.string().min(1, 'Slug is required').optional().openapi({ example: 'electronics' }),
  description: z.string().optional().openapi({ example: 'Electronic products' }),
  parentId: z.number().int().positive('Parent ID must be a positive integer').optional().nullable().openapi({ example: 1 }),
  isActive: z.boolean().optional().openapi({ example: true })
}).openapi('UpdateCategoryBody');

export const UpdateCategoryParamsSchema = z.object({
  id: z.string().transform(val => parseInt(val)).openapi({ example: '1' })
}).openapi('UpdateCategoryParams');

export const updateCategoryDto = z.object({
  body: UpdateCategoryBodySchema,
  params: UpdateCategoryParamsSchema
}).openapi('UpdateCategoryDto');

export const GetCategoryQuerySchema = z.object({
  limit: z.string().optional().transform(val => val ? parseInt(val) : undefined).openapi({ example: '10' }),
  offset: z.string().optional().transform(val => val ? parseInt(val) : undefined).openapi({ example: '0' })
}).openapi('GetCategoryQuery');

export const getCategoryQueryDto = z.object({
  query: GetCategoryQuerySchema
}).openapi('GetCategoryQueryDto');

export const GetCategoryParamsSchema = z.object({
  id: z.string().transform(val => parseInt(val)).openapi({ example: '1' })
}).openapi('GetCategoryParams');

export const getCategoryParamsDto = z.object({
  params: GetCategoryParamsSchema
}).openapi('GetCategoryParamsDto');

export const DeleteCategoryParamsSchema = z.object({
  id: z.string().transform(val => parseInt(val)).openapi({ example: '1' })
}).openapi('DeleteCategoryParams');

export const deleteCategoryParamsDto = z.object({
  params: DeleteCategoryParamsSchema
}).openapi('DeleteCategoryParamsDto');

export type CreateCategoryDto = z.infer<typeof CreateCategoryBodySchema>;
export type UpdateCategoryDto = z.infer<typeof UpdateCategoryBodySchema>;

