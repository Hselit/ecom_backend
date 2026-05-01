import { RouteConfig, getDefaultDocsResponses } from '../../types/routeConfig.js';
import { Methods } from '../../constants/methods.js';
import { APIEndPoint } from '../../constants/apiEndpoints.js';
import { EntityTags } from '../../constants/entityTags.js';
import { MESSAGE } from '../../constants/messages.js';
import { z } from 'zod';

export const CartItemDataSchema = z.object({
  id: z.number(),
  quantity: z.number(),
  cartId: z.number(),
  productId: z.number(),
  product: z.any().optional()
}).openapi('CartItemData');

export const CartDataSchema = z.object({
  id: z.number(),
  userId: z.number(),
  items: z.array(CartItemDataSchema),
  createdAt: z.date(),
  updatedAt: z.date()
}).openapi('CartData');

export const CartResponseSchema = z.object({
  message: z.string(),
  data: CartDataSchema
}).openapi('CartResponse');

export const routerGetCartSchema: RouteConfig = {
  method: Methods.GET,
  path: APIEndPoint.GET_CART,
  tags: [EntityTags.CARTS],
  summary: 'Get user cart',
  responses: {
    200: {
      description: MESSAGE.CART_FETCHED_SUCCESS,
      content: {
        'application/json': {
          schema: CartResponseSchema,
        },
      },
    },
    ...getDefaultDocsResponses([401, 500]),
  },
  security: [{ BearerAuth: [] }],
};

export const routerDeleteCartSchema: RouteConfig = {
  method: Methods.DELETE,
  path: APIEndPoint.DELETE_CART,
  tags: [EntityTags.CARTS],
  summary: 'Delete user cart',
  responses: {
    200: {
      description: MESSAGE.CART_DELETED_SUCCESS,
      content: {
        'application/json': {
          schema: CartResponseSchema,
        },
      },
    },
    ...getDefaultDocsResponses([401, 404, 500]),
  },
  security: [{ BearerAuth: [] }],
};

