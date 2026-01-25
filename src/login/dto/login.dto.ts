import { z } from 'zod';

export const LoginBodySchema = z.object({
  identifier: z.string().min(1, 'Email/Name is required').openapi({ example: 'user@example.com' }),
  password: z.string().min(1, 'Password is required').openapi({ example: 'password123' })
}).openapi('LoginBody');

export const loginDto = z.object({
  body: LoginBodySchema
}).openapi('LoginDto');

export type LoginDto = z.infer<typeof loginDto>['body'];

