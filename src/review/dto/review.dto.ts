import { z } from 'zod';

export const CreateReviewBodySchema = z.object({
  productId: z.number().int().positive('Product ID must be a positive integer').openapi({ example: 1 }),
  rating: z.number().int().min(1).max(5, 'Rating must be between 1 and 5').openapi({ example: 5 }),
  comment: z.string().optional().openapi({ example: 'Great product!' })
}).openapi('CreateReviewBody');

export const createReviewDto = z.object({
  body: CreateReviewBodySchema
}).openapi('CreateReviewDto');

export const UpdateReviewBodySchema = z.object({
  rating: z.number().int().min(1).max(5, 'Rating must be between 1 and 5').optional().openapi({ example: 4 }),
  comment: z.string().optional().openapi({ example: 'Updated review' })
}).openapi('UpdateReviewBody');

export const UpdateReviewParamsSchema = z.object({
  id: z.string().transform(val => parseInt(val)).openapi({ example: '1' })
}).openapi('UpdateReviewParams');

export const updateReviewDto = z.object({
  body: UpdateReviewBodySchema,
  params: UpdateReviewParamsSchema
}).openapi('UpdateReviewDto');

export const GetReviewQuerySchema = z.object({
  limit: z.string().optional().transform(val => val ? parseInt(val) : undefined).openapi({ example: '10' }),
  offset: z.string().optional().transform(val => val ? parseInt(val) : undefined).openapi({ example: '0' }),
  productId: z.string().optional().transform(val => val ? parseInt(val) : undefined).openapi({ example: '1' })
}).openapi('GetReviewQuery');

export const getReviewQueryDto = z.object({
  query: GetReviewQuerySchema
}).openapi('GetReviewQueryDto');

export const GetReviewParamsSchema = z.object({
  id: z.string().transform(val => parseInt(val)).openapi({ example: '1' })
}).openapi('GetReviewParams');

export const getReviewParamsDto = z.object({
  params: GetReviewParamsSchema
}).openapi('GetReviewParamsDto');

export const DeleteReviewParamsSchema = z.object({
  id: z.string().transform(val => parseInt(val)).openapi({ example: '1' })
}).openapi('DeleteReviewParams');

export const deleteReviewParamsDto = z.object({
  params: DeleteReviewParamsSchema
}).openapi('DeleteReviewParamsDto');

export type CreateReviewDto = z.infer<typeof CreateReviewBodySchema>;
export type UpdateReviewDto = z.infer<typeof UpdateReviewBodySchema>;

