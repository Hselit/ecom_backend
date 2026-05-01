import { RouteConfig, getDefaultDocsResponses } from '../../types/routeConfig.js';
import { Methods } from '../../constants/methods.js';
import { APIEndPoint } from '../../constants/apiEndpoints.js';
import { EntityTags } from '../../constants/entityTags.js';
import { MESSAGE } from '../../constants/messages.js';
import { AddCartItemBodySchema, UpdateCartItemBodySchema, UpdateCartItemParamsSchema, DeleteCartItemParamsSchema } from '../dto/cartItem.dto.js';
import { z } from 'zod';

export const CartItemDataSchema = z.object({
  id: z.number(),
  quantity: z.number(),
  cartId: z.number(),
  productId: z.number(),
  product: z.any().optional()
}).openapi('CartItemData');

export const CartItemResponseSchema = z.object({
  message: z.string(),
  data: CartItemDataSchema
}).openapi('CartItemResponse');

export const CartItemListResponseSchema = z.object({
  message: z.string(),
  data: z.array(CartItemDataSchema)
}).openapi('CartItemListResponse');

export const routerAddCartItemSchema: RouteConfig = {
  method: Methods.POST,
  path: APIEndPoint.ADD_CART_ITEM,
  tags: [EntityTags.CART_ITEMS],
  summary: 'Add item to cart',
  request: {
    body: {
      content: {
        'application/json': {
          schema: AddCartItemBodySchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: MESSAGE.CART_ITEM_ADDED_SUCCESS,
      content: {
        'application/json': {
          schema: CartItemResponseSchema,
        },
      },
    },
    ...getDefaultDocsResponses([400, 401, 404, 500]),
  },
  security: [{ BearerAuth: [] }],
};

export const routerGetCartItemsSchema: RouteConfig = {
  method: Methods.GET,
  path: APIEndPoint.GET_CART_ITEMS,
  tags: [EntityTags.CART_ITEMS],
  summary: 'Get cart items',
  responses: {
    200: {
      description: MESSAGE.CART_ITEM_FETCHED_SUCCESS,
      content: {
        'application/json': {
          schema: CartItemListResponseSchema,
        },
      },
    },
    ...getDefaultDocsResponses([401, 500]),
  },
  security: [{ BearerAuth: [] }],
};

export const routerUpdateCartItemSchema: RouteConfig = {
  method: Methods.PUT,
  path: APIEndPoint.UPDATE_CART_ITEM,
  tags: [EntityTags.CART_ITEMS],
  summary: 'Update cart item',
  request: {
    body: {
      content: {
        'application/json': {
          schema: UpdateCartItemBodySchema,
        },
      },
    },
    params: UpdateCartItemParamsSchema,
  },
  responses: {
    200: {
      description: MESSAGE.CART_ITEM_UPDATED_SUCCESS,
      content: {
        'application/json': {
          schema: CartItemResponseSchema,
        },
      },
    },
    ...getDefaultDocsResponses([400, 401, 404, 500]),
  },
  security: [{ BearerAuth: [] }],
};

export const routerDeleteCartItemSchema: RouteConfig = {
  method: Methods.DELETE,
  path: APIEndPoint.DELETE_CART_ITEM,
  tags: [EntityTags.CART_ITEMS],
  summary: 'Delete cart item',
  request: {
    params: DeleteCartItemParamsSchema,
  },
  responses: {
    200: {
      description: MESSAGE.CART_ITEM_DELETED_SUCCESS,
      content: {
        'application/json': {
          schema: CartItemResponseSchema,
        },
      },
    },
    ...getDefaultDocsResponses([401, 404, 500]),
  },
  security: [{ BearerAuth: [] }],
};

