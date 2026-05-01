import { RouteConfig, getDefaultDocsResponses } from '../../types/routeConfig.js';
import { Methods } from '../../constants/methods.js';
import { APIEndPoint } from '../../constants/apiEndpoints.js';
import { EntityTags } from '../../constants/entityTags.js';
import { MESSAGE } from '../../constants/messages.js';
import { CreateAccessRoleBodySchema, UpdateAccessRoleBodySchema, GetAccessRoleQuerySchema, GetAccessRoleParamsSchema, UpdateAccessRoleParamsSchema, DeleteAccessRoleParamsSchema, AssignAccessToRoleBodySchema } from '../dto/accessRole.dto.js';
import { z } from 'zod';

export const AccessRoleRoleSchema = z.object({
  id: z.number().openapi({ example: 1 }),
  roleName: z.string().openapi({ example: 'admin' }),
  isActive: z.boolean().openapi({ example: true }),
}).openapi('AccessRoleRole');

export const AccessRoleAccessTypeSchema = z.object({
  id: z.number().openapi({ example: 1 }),
  name: z.string().openapi({ example: 'User Management' }),
  description: z.string().nullable().openapi({ example: 'Manage users' }),
  code: z.string().nullable().openapi({ example: 'USER_MGMT' }),
  isActive: z.boolean().openapi({ example: true }),
}).openapi('AccessRoleAccessType');

export const AccessRoleDataSchema = z.object({
  id: z.number().openapi({ example: 1 }),
  roleId: z.number().openapi({ example: 1 }),
  accessTypeId: z.number().openapi({ example: 1 }),
  canView: z.boolean().openapi({ example: true }),
  canCreate: z.boolean().openapi({ example: false }),
  canUpdate: z.boolean().openapi({ example: false }),
  canDelete: z.boolean().openapi({ example: false }),
  isActive: z.boolean().openapi({ example: true }),
  role: AccessRoleRoleSchema,
  accessType: AccessRoleAccessTypeSchema,
  createdAt: z.date().openapi({ example: new Date() }),
  updatedAt: z.date().openapi({ example: new Date() }),
}).openapi('AccessRoleData');

export const AccessRoleResponseSchema = z.object({
  message: z.string().openapi({ example: 'Access role fetched successfully' }),
  data: AccessRoleDataSchema,
}).openapi('AccessRoleResponse');

export const AccessRoleListResponseSchema = z.object({
  message: z.string().openapi({ example: 'Access roles fetched successfully' }),
  data: z.array(AccessRoleDataSchema),
}).openapi('AccessRoleListResponse');

export const AssignAccessToRoleResponseSchema = z.object({
  message: z.string().openapi({ example: 'Access assigned successfully' }),
  data: z.array(AccessRoleDataSchema),
}).openapi('AssignAccessToRoleResponse');

export const routerCreateAccessRoleSchema: RouteConfig = {
  method: Methods.POST,
  path: APIEndPoint.CREATE_ACCESS_ROLE,
  tags: [EntityTags.ACCESS_ROLES],
  summary: 'Create access role',
  request: {
    body: {
      content: {
        'application/json': {
          schema: CreateAccessRoleBodySchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: MESSAGE.ACCESS_ROLE_CREATED_SUCCESS,
      content: {
        'application/json': {
          schema: AccessRoleResponseSchema,
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

export const routerGetAccessRolesSchema: RouteConfig = {
  method: Methods.GET,
  path: APIEndPoint.GET_ACCESS_ROLES,
  tags: [EntityTags.ACCESS_ROLES],
  summary: 'Get list of access roles',
  request: {
    query: GetAccessRoleQuerySchema,
  },
  responses: {
    200: {
      description: MESSAGE.ACCESS_ROLE_FETCHED_SUCCESS,
      content: {
        'application/json': {
          schema: AccessRoleListResponseSchema,
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

export const routerGetAccessRoleByIdSchema: RouteConfig = {
  method: Methods.GET,
  path: APIEndPoint.GET_ACCESS_ROLE_BY_ID,
  tags: [EntityTags.ACCESS_ROLES],
  summary: 'Get access role by ID',
  request: {
    params: GetAccessRoleParamsSchema,
  },
  responses: {
    200: {
      description: MESSAGE.ACCESS_ROLE_FETCHED_SUCCESS,
      content: {
        'application/json': {
          schema: AccessRoleResponseSchema,
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

export const routerUpdateAccessRoleSchema: RouteConfig = {
  method: Methods.PUT,
  path: APIEndPoint.UPDATE_ACCESS_ROLE,
  tags: [EntityTags.ACCESS_ROLES],
  summary: 'Update access role',
  request: {
    body: {
      content: {
        'application/json': {
          schema: UpdateAccessRoleBodySchema,
        },
      },
    },
    params: UpdateAccessRoleParamsSchema,
  },
  responses: {
    200: {
      description: MESSAGE.ACCESS_ROLE_UPDATED_SUCCESS,
      content: {
        'application/json': {
          schema: AccessRoleResponseSchema,
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

export const routerDeleteAccessRoleSchema: RouteConfig = {
  method: Methods.DELETE,
  path: APIEndPoint.DELETE_ACCESS_ROLE,
  tags: [EntityTags.ACCESS_ROLES],
  summary: 'Delete access role',
  request: {
    params: DeleteAccessRoleParamsSchema,
  },
  responses: {
    200: {
      description: MESSAGE.ACCESS_ROLE_DELETED_SUCCESS,
      content: {
        'application/json': {
          schema: AccessRoleResponseSchema,
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

export const routerAssignAccessToRoleSchema: RouteConfig = {
  method: Methods.POST,
  path: APIEndPoint.ASSIGN_ACCESS_TO_ROLE,
  tags: [EntityTags.ACCESS_ROLES],
  summary: 'Assign multiple access types to a role',
  request: {
    body: {
      content: {
        'application/json': {
          schema: AssignAccessToRoleBodySchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: MESSAGE.ACCESS_ROLE_ASSIGNED_SUCCESS,
      content: {
        'application/json': {
          schema: AssignAccessToRoleResponseSchema,
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

