import { z } from 'zod';

export const CreateUserBodySchema = z.object({
  name: z.string().min(1, 'Name is required').openapi({ example: 'John Doe' }),
  email: z.string().email('Invalid email address').optional().openapi({ example: 'john@example.com' }),
  password: z.string().min(6, 'Password must be at least 6 characters').openapi({ example: 'password123' }),
  phoneNumber: z.string().min(1, 'Phone number is required').openapi({ example: '1234567890' }),
  profile: z.string().min(1, 'Profile is required').openapi({ example: 'profile_url' }),
  gender: z.string().min(1, 'Gender is required').openapi({ example: 'MALE' }),
  roleId: z.number().int().positive('Role ID must be a positive integer').openapi({ example: 1 }),
  isActive: z.boolean().optional().default(true).openapi({ example: true })
}).openapi('CreateUserBody');

export const createUserDto = z.object({
  body: CreateUserBodySchema
}).openapi('CreateUserDto');

export const UpdateUserBodySchema = z.object({
  name: z.string().min(1, 'Name is required').optional().openapi({ example: 'John Doe' }),
  email: z.string().email('Invalid email address').optional().openapi({ example: 'john@example.com' }),
  phoneNumber: z.string().min(1, 'Phone number is required').optional().openapi({ example: '1234567890' }),
  profile: z.string().min(1, 'Profile is required').optional().openapi({ example: 'profile_url' }),
  gender: z.string().min(1, 'Gender is required').optional().openapi({ example: 'MALE' }),
  roleId: z.number().int().positive('Role ID must be a positive integer').optional().openapi({ example: 1 }),
  isActive: z.boolean().optional().openapi({ example: true })
}).openapi('UpdateUserBody');

export const UpdateUserParamsSchema = z.object({
  id: z.string().transform(val => parseInt(val)).openapi({ example: '1' })
}).openapi('UpdateUserParams');

export const updateUserDto = z.object({
  body: UpdateUserBodySchema,
  params: UpdateUserParamsSchema
}).openapi('UpdateUserDto');

export const GetUserQuerySchema = z.object({
  limit: z.string().optional().transform(val => val ? parseInt(val) : undefined).openapi({ example: '10' }),
  offset: z.string().optional().transform(val => val ? parseInt(val) : undefined).openapi({ example: '0' })
}).openapi('GetUserQuery');

export const getUserQueryDto = z.object({
  query: GetUserQuerySchema
}).openapi('GetUserQueryDto');

export const GetUserParamsSchema = z.object({
  id: z.string().transform(val => parseInt(val)).openapi({ example: '1' })
}).openapi('GetUserParams');

export const getUserParamsDto = z.object({
  params: GetUserParamsSchema
}).openapi('GetUserParamsDto');

export const DeleteUserParamsSchema = z.object({
  id: z.string().transform(val => parseInt(val)).openapi({ example: '1' })
}).openapi('DeleteUserParams');

export const deleteUserParamsDto = z.object({
  params: DeleteUserParamsSchema
}).openapi('DeleteUserParamsDto');

export type CreateUserDto = z.infer<typeof CreateUserBodySchema>;
export type UpdateUserDto = z.infer<typeof UpdateUserBodySchema>;

