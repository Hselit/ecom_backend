import { RouteConfig, getDefaultDocsResponses } from '../../types/routeConfig.js';
import { Methods } from '../../constants/methods.js';
import { APIEndPoint } from '../../constants/apiEndpoints.js';
import { EntityTags } from '../../constants/entityTags.js';
import { MESSAGE } from '../../constants/messages.js';
import { CreateAccessTypeBodySchema, UpdateAccessTypeBodySchema, GetAccessTypeQuerySchema, GetAccessTypeParamsSchema, UpdateAccessTypeParamsSchema, DeleteAccessTypeParamsSchema } from '../dto/accessType.dto.js';
import { z } from 'zod';

export const AccessTypeDataSchema = z.object({
  id: z.number().openapi({ example: 1 }),
  name: z.string().openapi({ example: 'User Management' }),
  description: z.string().nullable().openapi({ example: 'Manage users' }),
  code: z.string().nullable().openapi({ example: 'USER_MGMT' }),
  module: z.string().nullable().openapi({ example: 'user' }),
  action: z.string().nullable().openapi({ example: 'read' }),
  isActive: z.boolean().openapi({ example: true }),
  createdAt: z.date().openapi({ example: new Date() }),
  updatedAt: z.date().openapi({ example: new Date() }),
}).openapi('AccessTypeData');

export const AccessTypeResponseSchema = z.object({
  message: z.string().openapi({ example: 'Access type fetched successfully' }),
  data: AccessTypeDataSchema,
}).openapi('AccessTypeResponse');

export const AccessTypeListResponseSchema = z.object({
  message: z.string().openapi({ example: 'Access types fetched successfully' }),
  data: z.array(AccessTypeDataSchema),
}).openapi('AccessTypeListResponse');

export const routerCreateAccessTypeSchema: RouteConfig = {
  method: Methods.POST,
  path: APIEndPoint.CREATE_ACCESS_TYPE,
  tags: [EntityTags.ACCESS_TYPES],
  summary: 'Create access type',
  request: {
    body: {
      content: {
        'application/json': {
          schema: CreateAccessTypeBodySchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: MESSAGE.ACCESS_TYPE_CREATED_SUCCESS,
      content: {
        'application/json': {
          schema: AccessTypeResponseSchema,
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

export const routerGetAccessTypesSchema: RouteConfig = {
  method: Methods.GET,
  path: APIEndPoint.GET_ACCESS_TYPES,
  tags: [EntityTags.ACCESS_TYPES],
  summary: 'Get list of access types',
  request: {
    query: GetAccessTypeQuerySchema,
  },
  responses: {
    200: {
      description: MESSAGE.ACCESS_TYPE_FETCHED_SUCCESS,
      content: {
        'application/json': {
          schema: AccessTypeListResponseSchema,
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

export const routerGetAccessTypeByIdSchema: RouteConfig = {
  method: Methods.GET,
  path: APIEndPoint.GET_ACCESS_TYPE_BY_ID,
  tags: [EntityTags.ACCESS_TYPES],
  summary: 'Get access type by ID',
  request: {
    params: GetAccessTypeParamsSchema,
  },
  responses: {
    200: {
      description: MESSAGE.ACCESS_TYPE_FETCHED_SUCCESS,
      content: {
        'application/json': {
          schema: AccessTypeResponseSchema,
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

export const routerUpdateAccessTypeSchema: RouteConfig = {
  method: Methods.PUT,
  path: APIEndPoint.UPDATE_ACCESS_TYPE,
  tags: [EntityTags.ACCESS_TYPES],
  summary: 'Update access type',
  request: {
    body: {
      content: {
        'application/json': {
          schema: UpdateAccessTypeBodySchema,
        },
      },
    },
    params: UpdateAccessTypeParamsSchema,
  },
  responses: {
    200: {
      description: MESSAGE.ACCESS_TYPE_UPDATED_SUCCESS,
      content: {
        'application/json': {
          schema: AccessTypeResponseSchema,
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

export const routerDeleteAccessTypeSchema: RouteConfig = {
  method: Methods.DELETE,
  path: APIEndPoint.DELETE_ACCESS_TYPE,
  tags: [EntityTags.ACCESS_TYPES],
  summary: 'Delete access type',
  request: {
    params: DeleteAccessTypeParamsSchema,
  },
  responses: {
    200: {
      description: MESSAGE.ACCESS_TYPE_DELETED_SUCCESS,
      content: {
        'application/json': {
          schema: AccessTypeResponseSchema,
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

