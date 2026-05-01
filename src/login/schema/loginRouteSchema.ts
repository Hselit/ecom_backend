import { RouteConfig, getDefaultDocsResponses } from '../../types/routeConfig.js';
import { Methods } from '../../constants/methods.js';
import { APIEndPoint } from '../../constants/apiEndpoints.js';
import { EntityTags } from '../../constants/entityTags.js';
import { MESSAGE } from '../../constants/messages.js';
import { LoginBodySchema } from '../dto/login.dto.js';
import { z } from 'zod';

export const LoginUserSchema = z.object({
  id: z.number().openapi({ example: 1 }),
  name: z.string().openapi({ example: 'John Doe' }),
  email: z.string().nullable().openapi({ example: 'john@example.com' }),
  phoneNumber: z.string().openapi({ example: '1234567890' }),
  role: z.string().openapi({ example: 'admin' }),
}).openapi('LoginUser');

export const LoginDataSchema = z.object({
  token: z.string().openapi({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' }),
  user: LoginUserSchema,
}).openapi('LoginData');

export const LoginResponseSchema = z.object({
  message: z.string().openapi({ example: 'Login successful' }),
  data: LoginDataSchema,
}).openapi('LoginResponse');

export const routerLoginSchema: RouteConfig = {
  method: Methods.POST,
  path: APIEndPoint.LOGIN,
  tags: [EntityTags.AUTHENTICATION],
  summary: 'User login',
  request: {
    body: {
      content: {
        'application/json': {
          schema: LoginBodySchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: MESSAGE.LOGIN_SUCCESSFULLY,
      content: {
        'application/json': {
          schema: LoginResponseSchema,
        },
      },
    },
    ...getDefaultDocsResponses([401, 500]),
  },
};

