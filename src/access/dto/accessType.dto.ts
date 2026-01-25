import { z } from 'zod';

export const CreateAccessTypeBodySchema = z.object({
  name: z.string().min(1, 'Name is required').openapi({ example: 'User Management' }),
  description: z.string().optional().openapi({ example: 'Manage users' }),
  code: z.string().optional().openapi({ example: 'USER_MGMT' }),
  module: z.string().optional().openapi({ example: 'user' }),
  action: z.string().optional().openapi({ example: 'read' }),
  isActive: z.boolean().optional().default(true).openapi({ example: true })
}).openapi('CreateAccessTypeBody');

export const createAccessTypeDto = z.object({
  body: CreateAccessTypeBodySchema
}).openapi('CreateAccessTypeDto');

export const UpdateAccessTypeBodySchema = z.object({
  name: z.string().min(1, 'Name is required').optional().openapi({ example: 'User Management' }),
  description: z.string().optional().openapi({ example: 'Manage users' }),
  code: z.string().optional().openapi({ example: 'USER_MGMT' }),
  module: z.string().optional().openapi({ example: 'user' }),
  action: z.string().optional().openapi({ example: 'read' }),
  isActive: z.boolean().optional().openapi({ example: true })
}).openapi('UpdateAccessTypeBody');

export const UpdateAccessTypeParamsSchema = z.object({
  id: z.string().transform(val => parseInt(val)).openapi({ example: '1' })
}).openapi('UpdateAccessTypeParams');

export const updateAccessTypeDto = z.object({
  body: UpdateAccessTypeBodySchema,
  params: UpdateAccessTypeParamsSchema
}).openapi('UpdateAccessTypeDto');

export const GetAccessTypeParamsSchema = z.object({
  id: z.string().transform(val => parseInt(val)).openapi({ example: '1' })
}).openapi('GetAccessTypeParams');

export const getAccessTypeParamsDto = z.object({
  params: GetAccessTypeParamsSchema
}).openapi('GetAccessTypeParamsDto');

export const GetAccessTypeQuerySchema = z.object({
  limit: z.string().optional().transform(val => val ? parseInt(val) : undefined).openapi({ example: '10' }),
  offset: z.string().optional().transform(val => val ? parseInt(val) : undefined).openapi({ example: '0' })
}).openapi('GetAccessTypeQuery');

export const getAccessTypeQueryDto = z.object({
  query: GetAccessTypeQuerySchema
}).openapi('GetAccessTypeQueryDto');

export const DeleteAccessTypeParamsSchema = z.object({
  id: z.string().transform(val => parseInt(val)).openapi({ example: '1' })
}).openapi('DeleteAccessTypeParams');

export const deleteAccessTypeParamsDto = z.object({
  params: DeleteAccessTypeParamsSchema
}).openapi('DeleteAccessTypeParamsDto');

export type CreateAccessTypeDto = z.infer<typeof CreateAccessTypeBodySchema>;
export type UpdateAccessTypeDto = z.infer<typeof UpdateAccessTypeBodySchema>;

