import { RouteConfig, getDefaultDocsResponses } from '../../types/routeConfig.js';
import { Methods } from '../../constants/methods.js';
import { APIEndPoint } from '../../constants/apiEndpoints.js';
import { EntityTags } from '../../constants/entityTags.js';
import { MESSAGE } from '../../constants/messages.js';
import { CreateInventoryBodySchema, UpdateInventoryBodySchema, GetInventoryQuerySchema, GetInventoryParamsSchema, UpdateInventoryParamsSchema, DeleteInventoryParamsSchema } from '../dto/inventory.dto.js';
import { z } from 'zod';

export const InventoryProductSchema = z.object({
  id: z.number().openapi({ example: 1 }),
  name: z.string().openapi({ example: 'iPhone 15' }),
  slug: z.string().openapi({ example: 'iphone-15' }),
  sku: z.string().openapi({ example: 'IPH15-001' }),
  price: z.number().openapi({ example: 999.99 }),
  stock: z.number().openapi({ example: 100 }),
  isActive: z.boolean().openapi({ example: true }),
}).openapi('InventoryProduct');

export const InventoryDataSchema = z.object({
  id: z.number().openapi({ example: 1 }),
  quantity: z.number().openapi({ example: 100 }),
  reservedQty: z.number().openapi({ example: 10 }),
  isActive: z.boolean().openapi({ example: true }),
  productId: z.number().openapi({ example: 1 }),
  product: InventoryProductSchema,
  createdAt: z.date().openapi({ example: new Date() }),
  updatedAt: z.date().openapi({ example: new Date() }),
}).openapi('InventoryData');

export const InventoryResponseSchema = z.object({
  message: z.string().openapi({ example: 'Inventory fetched successfully' }),
  data: InventoryDataSchema,
}).openapi('InventoryResponse');

export const InventoryListResponseSchema = z.object({
  message: z.string().openapi({ example: 'Inventories fetched successfully' }),
  data: z.array(InventoryDataSchema),
}).openapi('InventoryListResponse');

export const routerCreateInventorySchema: RouteConfig = {
  method: Methods.POST,
  path: APIEndPoint.CREATE_INVENTORY,
  tags: [EntityTags.INVENTORY],
  summary: 'Create a new inventory (Seller, Admin, Super Admin only)',
  request: {
    body: {
      content: {
        'application/json': {
          schema: CreateInventoryBodySchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: MESSAGE.INVENTORY_CREATED_SUCCESS,
      content: {
        'application/json': {
          schema: InventoryResponseSchema,
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

export const routerGetInventoriesSchema: RouteConfig = {
  method: Methods.GET,
  path: APIEndPoint.GET_INVENTORIES,
  tags: [EntityTags.INVENTORY],
  summary: 'Get list of inventories (Seller, Admin, Super Admin only)',
  request: {
    query: GetInventoryQuerySchema,
  },
  responses: {
    200: {
      description: MESSAGE.INVENTORY_FETCHED_SUCCESS,
      content: {
        'application/json': {
          schema: InventoryListResponseSchema,
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

export const routerGetInventoryByIdSchema: RouteConfig = {
  method: Methods.GET,
  path: APIEndPoint.GET_INVENTORY_BY_ID,
  tags: [EntityTags.INVENTORY],
  summary: 'Get inventory by ID (Seller, Admin, Super Admin only)',
  request: {
    params: GetInventoryParamsSchema,
  },
  responses: {
    200: {
      description: MESSAGE.INVENTORY_FETCHED_SUCCESS,
      content: {
        'application/json': {
          schema: InventoryResponseSchema,
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

export const routerUpdateInventorySchema: RouteConfig = {
  method: Methods.PUT,
  path: APIEndPoint.UPDATE_INVENTORY,
  tags: [EntityTags.INVENTORY],
  summary: 'Update inventory (Seller, Admin, Super Admin only)',
  request: {
    body: {
      content: {
        'application/json': {
          schema: UpdateInventoryBodySchema,
        },
      },
    },
    params: UpdateInventoryParamsSchema,
  },
  responses: {
    200: {
      description: MESSAGE.INVENTORY_UPDATED_SUCCESS,
      content: {
        'application/json': {
          schema: InventoryResponseSchema,
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

export const routerDeleteInventorySchema: RouteConfig = {
  method: Methods.DELETE,
  path: APIEndPoint.DELETE_INVENTORY,
  tags: [EntityTags.INVENTORY],
  summary: 'Delete inventory (Seller, Admin, Super Admin only)',
  request: {
    params: DeleteInventoryParamsSchema,
  },
  responses: {
    200: {
      description: MESSAGE.INVENTORY_DELETED_SUCCESS,
      content: {
        'application/json': {
          schema: InventoryResponseSchema,
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

