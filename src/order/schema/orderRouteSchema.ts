import { RouteConfig, getDefaultDocsResponses } from '../../types/routeConfig.js';
import { Methods } from '../../constants/methods.js';
import { APIEndPoint } from '../../constants/apiEndpoints.js';
import { EntityTags } from '../../constants/entityTags.js';
import { MESSAGE } from '../../constants/messages.js';
import { CreateOrderBodySchema, UpdateOrderBodySchema, GetOrderQuerySchema, GetOrderParamsSchema, UpdateOrderParamsSchema, DeleteOrderParamsSchema } from '../dto/order.dto.js';
import { z } from 'zod';

export const OrderItemDataSchema = z.object({
  id: z.number(),
  price: z.number(),
  quantity: z.number(),
  orderId: z.number(),
  productId: z.number(),
  product: z.any().optional()
}).openapi('OrderItemData');

export const OrderDataSchema = z.object({
  id: z.number(),
  orderNumber: z.string(),
  totalAmount: z.number(),
  status: z.enum(['PENDING', 'CONFIRMED', 'CANCELLED', 'DELIVERED']),
  userId: z.number(),
  items: z.array(OrderItemDataSchema),
  payment: z.any().optional(),
  createdAt: z.date(),
  updatedAt: z.date()
}).openapi('OrderData');

export const OrderResponseSchema = z.object({
  message: z.string(),
  data: OrderDataSchema
}).openapi('OrderResponse');

export const OrderListResponseSchema = z.object({
  message: z.string(),
  data: z.array(OrderDataSchema)
}).openapi('OrderListResponse');

export const routerCreateOrderSchema: RouteConfig = {
  method: Methods.POST,
  path: APIEndPoint.CREATE_ORDER,
  tags: [EntityTags.ORDERS],
  summary: 'Create a new order',
  request: {
    body: {
      content: {
        'application/json': {
          schema: CreateOrderBodySchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: MESSAGE.ORDER_CREATED_SUCCESS,
      content: {
        'application/json': {
          schema: OrderResponseSchema,
        },
      },
    },
    ...getDefaultDocsResponses([400, 401, 500]),
  },
  security: [{ BearerAuth: [] }],
};

export const routerGetOrdersSchema: RouteConfig = {
  method: Methods.GET,
  path: APIEndPoint.GET_ORDERS,
  tags: [EntityTags.ORDERS],
  summary: 'Get list of orders',
  request: {
    query: GetOrderQuerySchema,
  },
  responses: {
    200: {
      description: MESSAGE.ORDER_FETCHED_SUCCESS,
      content: {
        'application/json': {
          schema: OrderListResponseSchema,
        },
      },
    },
    ...getDefaultDocsResponses([401, 500]),
  },
  security: [{ BearerAuth: [] }],
};

export const routerGetOrderByIdSchema: RouteConfig = {
  method: Methods.GET,
  path: APIEndPoint.GET_ORDER_BY_ID,
  tags: [EntityTags.ORDERS],
  summary: 'Get order by ID',
  request: {
    params: GetOrderParamsSchema,
  },
  responses: {
    200: {
      description: MESSAGE.ORDER_FETCHED_SUCCESS,
      content: {
        'application/json': {
          schema: OrderResponseSchema,
        },
      },
    },
    ...getDefaultDocsResponses([401, 404, 500]),
  },
  security: [{ BearerAuth: [] }],
};

export const routerUpdateOrderSchema: RouteConfig = {
  method: Methods.PUT,
  path: APIEndPoint.UPDATE_ORDER,
  tags: [EntityTags.ORDERS],
  summary: 'Update order',
  request: {
    body: {
      content: {
        'application/json': {
          schema: UpdateOrderBodySchema,
        },
      },
    },
    params: UpdateOrderParamsSchema,
  },
  responses: {
    200: {
      description: MESSAGE.ORDER_UPDATED_SUCCESS,
      content: {
        'application/json': {
          schema: OrderResponseSchema,
        },
      },
    },
    ...getDefaultDocsResponses([400, 401, 404, 500]),
  },
  security: [{ BearerAuth: [] }],
};

export const routerDeleteOrderSchema: RouteConfig = {
  method: Methods.DELETE,
  path: APIEndPoint.DELETE_ORDER,
  tags: [EntityTags.ORDERS],
  summary: 'Delete order',
  request: {
    params: DeleteOrderParamsSchema,
  },
  responses: {
    200: {
      description: MESSAGE.ORDER_DELETED_SUCCESS,
      content: {
        'application/json': {
          schema: OrderResponseSchema,
        },
      },
    },
    ...getDefaultDocsResponses([401, 404, 500]),
  },
  security: [{ BearerAuth: [] }],
};

