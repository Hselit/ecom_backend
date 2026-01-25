import { RouteConfig, getDefaultDocsResponses } from '../../types/routeConfig.js';
import { Methods } from '../../constants/methods.js';
import { APIEndPoint } from '../../constants/apiEndpoints.js';
import { EntityTags } from '../../constants/entityTags.js';
import { MESSAGE } from '../../constants/messages.js';
import { CreateRoleBodySchema, GetRolesQuerySchema, DeleteRoleParamsSchema } from '../dto/role.dto.js';
import { z } from 'zod';

export const RoleDataSchema = z.object({
  id: z.number().openapi({ example: 1 }),
  roleName: z.string().openapi({ example: 'admin' }),
  isActive: z.boolean().openapi({ example: true }),
  createdAt: z.date().openapi({ example: new Date() }),
  updatedAt: z.date().openapi({ example: new Date() }),
}).openapi('RoleData');

export const RoleResponseSchema = z.object({
  message: z.string().openapi({ example: 'Role fetched successfully' }),
  data: RoleDataSchema,
}).openapi('RoleResponse');

export const RoleListResponseSchema = z.object({
  message: z.string().openapi({ example: 'Roles fetched successfully' }),
  data: z.array(RoleDataSchema),
}).openapi('RoleListResponse');

export const routerGetRolesSchema: RouteConfig = {
  method: Methods.GET,
  path: APIEndPoint.GET_ROLES,
  tags: [EntityTags.ROLES],
  summary: 'Get list of roles',
  request: {
    query: GetRolesQuerySchema,
  },
  responses: {
    200: {
      description: MESSAGE.ROLE_SUCCESS,
      content: {
        'application/json': {
          schema: RoleListResponseSchema,
        },
      },
    },
    ...getDefaultDocsResponses([401, 500]),
  },
  security: [
    {
      BearerAuth: [],
    },
  ],
};

export const routerCreateRoleSchema: RouteConfig = {
  method: Methods.POST,
  path: APIEndPoint.CREATE_ROLE,
  tags: [EntityTags.ROLES],
  summary: 'Create a new role',
  request: {
    body: {
      content: {
        'application/json': {
          schema: CreateRoleBodySchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: MESSAGE.ROLE_CREATED_SUCCESS,
      content: {
        'application/json': {
          schema: RoleResponseSchema,
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

export const routerDeleteRoleSchema: RouteConfig = {
  method: Methods.DELETE,
  path: APIEndPoint.DELETE_ROLE,
  tags: [EntityTags.ROLES],
  summary: 'Delete role',
  request: {
    params: DeleteRoleParamsSchema,
  },
  responses: {
    200: {
      description: MESSAGE.ROLE_DELETED_SUCCESS,
      content: {
        'application/json': {
          schema: RoleResponseSchema,
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

