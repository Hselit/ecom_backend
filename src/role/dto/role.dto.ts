import { z } from 'zod';

export const CreateRoleBodySchema = z.object({
  roleName: z.string().min(1, 'Role name is required').openapi({ example: 'admin' }),
  isActive: z.boolean().optional().default(true).openapi({ example: true })
}).openapi('CreateRoleBody');

export const createRoleDto = z.object({
  body: CreateRoleBodySchema
}).openapi('CreateRoleDto');

export const GetRolesQuerySchema = z.object({
  limit: z.string().optional().transform(val => val ? parseInt(val) : undefined).openapi({ example: '10' }),
  offset: z.string().optional().transform(val => val ? parseInt(val) : undefined).openapi({ example: '0' })
}).openapi('GetRolesQuery');

export const getRolesQueryDto = z.object({
  query: GetRolesQuerySchema
}).openapi('GetRolesQueryDto');

export const DeleteRoleParamsSchema = z.object({
  id: z.string().transform(val => parseInt(val)).openapi({ example: '1' })
}).openapi('DeleteRoleParams');

export const deleteRoleParamsDto = z.object({
  params: DeleteRoleParamsSchema
}).openapi('DeleteRoleParamsDto');

export type CreateRoleDto = z.infer<typeof CreateRoleBodySchema>;

