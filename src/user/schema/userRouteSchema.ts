import { RouteConfig, getDefaultDocsResponses } from '../../types/routeConfig.js';
import { Methods } from '../../constants/methods.js';
import { APIEndPoint } from '../../constants/apiEndpoints.js';
import { EntityTags } from '../../constants/entityTags.js';
import { MESSAGE } from '../../constants/messages.js';
import { CreateUserBodySchema, UpdateUserBodySchema, GetUserQuerySchema, GetUserParamsSchema, UpdateUserParamsSchema, DeleteUserParamsSchema } from '../dto/user.dto.js';
import { z } from 'zod';

export const UserRoleSchema = z.object({
  id: z.number().openapi({ example: 1 }),
  roleName: z.string().openapi({ example: 'admin' }),
  isActive: z.boolean().openapi({ example: true }),
}).openapi('UserRole');

export const UserDataSchema = z.object({
  id: z.number().openapi({ example: 1 }),
  name: z.string().openapi({ example: 'John Doe' }),
  email: z.string().nullable().openapi({ example: 'john@example.com' }),
  phoneNumber: z.string().openapi({ example: '1234567890' }),
  profile: z.string().openapi({ example: 'profile_url' }),
  gender: z.string().openapi({ example: 'MALE' }),
  isActive: z.boolean().openapi({ example: true }),
  roleId: z.number().openapi({ example: 1 }),
  role: UserRoleSchema,
  createdAt: z.date().openapi({ example: new Date() }),
  updatedAt: z.date().openapi({ example: new Date() }),
}).openapi('UserData');

export const UserResponseSchema = z.object({
  message: z.string().openapi({ example: 'User fetched successfully' }),
  data: UserDataSchema,
}).openapi('UserResponse');

export const UserListResponseSchema = z.object({
  message: z.string().openapi({ example: 'Users fetched successfully' }),
  data: z.array(UserDataSchema),
}).openapi('UserListResponse');

export const routerCreateUserSchema: RouteConfig = {
  method: Methods.POST,
  path: APIEndPoint.CREATE_USER,
  tags: [EntityTags.USERS],
  summary: 'Create a new user',
  request: {
    body: {
      content: {
        'application/json': {
          schema: CreateUserBodySchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: MESSAGE.USER_CREATED_SUCCESS,
      content: {
        'application/json': {
          schema: UserResponseSchema,
        },
      },
    },
    ...getDefaultDocsResponses([400, 401, 403, 500]),
  },
  security: [
    {
      BearerAuth: [],
    },
  ],
};

export const routerGetUsersSchema: RouteConfig = {
  method: Methods.GET,
  path: APIEndPoint.GET_USERS,
  tags: [EntityTags.USERS],
  summary: 'Get list of users',
  request: {
    query: GetUserQuerySchema,
  },
  responses: {
    200: {
      description: MESSAGE.USER_FETCHED_SUCCESS,
      content: {
        'application/json': {
          schema: UserListResponseSchema,
        },
      },
    },
    ...getDefaultDocsResponses([401, 403, 500]),
  },
  security: [
    {
      BearerAuth: [],
    },
  ],
};

export const routerGetUserByIdSchema: RouteConfig = {
  method: Methods.GET,
  path: APIEndPoint.GET_USER_BY_ID,
  tags: [EntityTags.USERS],
  summary: 'Get user by ID',
  request: {
    params: GetUserParamsSchema,
  },
  responses: {
    200: {
      description: MESSAGE.USER_FETCHED_SUCCESS,
      content: {
        'application/json': {
          schema: UserResponseSchema,
        },
      },
    },
    ...getDefaultDocsResponses([401, 403, 404, 500]),
  },
  security: [
    {
      BearerAuth: [],
    },
  ],
};

export const routerUpdateUserSchema: RouteConfig = {
  method: Methods.PUT,
  path: APIEndPoint.UPDATE_USER,
  tags: [EntityTags.USERS],
  summary: 'Update user',
  request: {
    body: {
      content: {
        'application/json': {
          schema: UpdateUserBodySchema,
        },
      },
    },
    params: UpdateUserParamsSchema,
  },
  responses: {
    200: {
      description: MESSAGE.USER_UPDATED_SUCCESS,
      content: {
        'application/json': {
          schema: UserResponseSchema,
        },
      },
    },
    ...getDefaultDocsResponses([400, 401, 403, 404, 500]),
  },
  security: [
    {
      BearerAuth: [],
    },
  ],
};

export const routerDeleteUserSchema: RouteConfig = {
  method: Methods.DELETE,
  path: APIEndPoint.DELETE_USER,
  tags: [EntityTags.USERS],
  summary: 'Delete user',
  request: {
    params: DeleteUserParamsSchema,
  },
  responses: {
    200: {
      description: MESSAGE.USER_DELETED_SUCCESS,
      content: {
        'application/json': {
          schema: UserResponseSchema,
        },
      },
    },
    ...getDefaultDocsResponses([401, 403, 404, 500]),
  },
  security: [
    {
      BearerAuth: [],
    },
  ],
};

