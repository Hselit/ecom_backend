import { z } from 'zod';

export const CreateAccessRoleBodySchema = z.object({
  roleId: z.number().int().positive('Role ID must be a positive integer').openapi({ example: 1 }),
  accessTypeId: z.number().int().positive('Access Type ID must be a positive integer').openapi({ example: 1 }),
  canView: z.boolean().optional().default(true).openapi({ example: true }),
  canCreate: z.boolean().optional().default(false).openapi({ example: false }),
  canUpdate: z.boolean().optional().default(false).openapi({ example: false }),
  canDelete: z.boolean().optional().default(false).openapi({ example: false }),
  isActive: z.boolean().optional().default(true).openapi({ example: true })
}).openapi('CreateAccessRoleBody');

export const createAccessRoleDto = z.object({
  body: CreateAccessRoleBodySchema
}).openapi('CreateAccessRoleDto');

export const UpdateAccessRoleBodySchema = z.object({
  canView: z.boolean().optional().openapi({ example: true }),
  canCreate: z.boolean().optional().openapi({ example: false }),
  canUpdate: z.boolean().optional().openapi({ example: false }),
  canDelete: z.boolean().optional().openapi({ example: false }),
  isActive: z.boolean().optional().openapi({ example: true })
}).openapi('UpdateAccessRoleBody');

export const UpdateAccessRoleParamsSchema = z.object({
  id: z.string().transform(val => parseInt(val)).openapi({ example: '1' })
}).openapi('UpdateAccessRoleParams');

export const updateAccessRoleDto = z.object({
  body: UpdateAccessRoleBodySchema,
  params: UpdateAccessRoleParamsSchema
}).openapi('UpdateAccessRoleDto');

export const GetAccessRoleParamsSchema = z.object({
  id: z.string().transform(val => parseInt(val)).openapi({ example: '1' })
}).openapi('GetAccessRoleParams');

export const getAccessRoleParamsDto = z.object({
  params: GetAccessRoleParamsSchema
}).openapi('GetAccessRoleParamsDto');

export const GetAccessRoleQuerySchema = z.object({
  roleId: z.string().optional().transform(val => val ? parseInt(val) : undefined).openapi({ example: '1' }),
  accessTypeId: z.string().optional().transform(val => val ? parseInt(val) : undefined).openapi({ example: '1' }),
  limit: z.string().optional().transform(val => val ? parseInt(val) : undefined).openapi({ example: '10' }),
  offset: z.string().optional().transform(val => val ? parseInt(val) : undefined).openapi({ example: '0' })
}).openapi('GetAccessRoleQuery');

export const getAccessRoleQueryDto = z.object({
  query: GetAccessRoleQuerySchema
}).openapi('GetAccessRoleQueryDto');

export const DeleteAccessRoleParamsSchema = z.object({
  id: z.string().transform(val => parseInt(val)).openapi({ example: '1' })
}).openapi('DeleteAccessRoleParams');

export const deleteAccessRoleParamsDto = z.object({
  params: DeleteAccessRoleParamsSchema
}).openapi('DeleteAccessRoleParamsDto');

export const AssignAccessToRoleBodySchema = z.object({
  roleId: z.number().int().positive('Role ID must be a positive integer').openapi({ example: 1 }),
  accessTypeIds: z.array(z.number().int().positive()).min(1, 'At least one access type ID is required').openapi({ example: [1, 2, 3] }),
  canView: z.boolean().optional().default(true).openapi({ example: true }),
  canCreate: z.boolean().optional().default(false).openapi({ example: false }),
  canUpdate: z.boolean().optional().default(false).openapi({ example: false }),
  canDelete: z.boolean().optional().default(false).openapi({ example: false })
}).openapi('AssignAccessToRoleBody');

export const assignAccessToRoleDto = z.object({
  body: AssignAccessToRoleBodySchema
}).openapi('AssignAccessToRoleDto');

export type CreateAccessRoleDto = z.infer<typeof CreateAccessRoleBodySchema>;
export type UpdateAccessRoleDto = z.infer<typeof UpdateAccessRoleBodySchema>;
export type AssignAccessToRoleDto = z.infer<typeof AssignAccessToRoleBodySchema>;

