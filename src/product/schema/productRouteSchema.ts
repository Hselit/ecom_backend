import { RouteConfig, getDefaultDocsResponses } from '../../types/routeConfig.js';
import { Methods } from '../../constants/methods.js';
import { APIEndPoint } from '../../constants/apiEndpoints.js';
import { EntityTags } from '../../constants/entityTags.js';
import { MESSAGE } from '../../constants/messages.js';
import { CreateProductBodySchema, UpdateProductBodySchema, GetProductQuerySchema, GetProductParamsSchema, UpdateProductParamsSchema, DeleteProductParamsSchema } from '../dto/product.dto.js';
import { z } from 'zod';

export const ProductCategorySchema = z.object({
  id: z.number().openapi({ example: 1 }),
  name: z.string().openapi({ example: 'Electronics' }),
  slug: z.string().openapi({ example: 'electronics' }),
  description: z.string().nullable().openapi({ example: 'Electronic products' }),
  isActive: z.boolean().openapi({ example: true }),
  createdAt: z.date().openapi({ example: new Date() }),
  updatedAt: z.date().openapi({ example: new Date() }),
}).openapi('ProductCategory');

export const ProductImageSchema = z.object({
  id: z.number().openapi({ example: 1 }),
  imageUrl: z.string().openapi({ example: 'https://example.com/image.jpg' }),
  isPrimary: z.boolean().openapi({ example: true }),
  productId: z.number().openapi({ example: 1 }),
}).openapi('ProductImage');

export const ProductDataSchema = z.object({
  id: z.number().openapi({ example: 1 }),
  name: z.string().openapi({ example: 'iPhone 15' }),
  slug: z.string().openapi({ example: 'iphone-15' }),
  description: z.string().nullable().openapi({ example: 'Latest iPhone model' }),
  sku: z.string().openapi({ example: 'IPH15-001' }),
  price: z.number().openapi({ example: 999.99 }),
  stock: z.number().openapi({ example: 100 }),
  isActive: z.boolean().openapi({ example: true }),
  categoryId: z.number().openapi({ example: 1 }),
  category: ProductCategorySchema,
  images: z.array(ProductImageSchema),
  createdAt: z.date().openapi({ example: new Date() }),
  updatedAt: z.date().openapi({ example: new Date() }),
}).openapi('ProductData');

export const ProductResponseSchema = z.object({
  message: z.string().openapi({ example: 'Product fetched successfully' }),
  data: ProductDataSchema,
}).openapi('ProductResponse');

export const ProductListResponseSchema = z.object({
  message: z.string().openapi({ example: 'Products fetched successfully' }),
  data: z.array(ProductDataSchema),
}).openapi('ProductListResponse');

export const routerCreateProductSchema: RouteConfig = {
  method: Methods.POST,
  path: APIEndPoint.CREATE_PRODUCT,
  tags: [EntityTags.PRODUCTS],
  summary: 'Create a new product (Seller, Admin, Super Admin only)',
  request: {
    body: {
      content: {
        'application/json': {
          schema: CreateProductBodySchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: MESSAGE.PRODUCT_CREATED_SUCCESS,
      content: {
        'application/json': {
          schema: ProductResponseSchema,
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

export const routerGetProductsSchema: RouteConfig = {
  method: Methods.GET,
  path: APIEndPoint.GET_PRODUCTS,
  tags: [EntityTags.PRODUCTS],
  summary: 'Get list of products',
  request: {
    query: GetProductQuerySchema,
  },
  responses: {
    200: {
      description: MESSAGE.PRODUCT_FETCHED_SUCCESS,
      content: {
        'application/json': {
          schema: ProductListResponseSchema,
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

export const routerGetProductByIdSchema: RouteConfig = {
  method: Methods.GET,
  path: APIEndPoint.GET_PRODUCT_BY_ID,
  tags: [EntityTags.PRODUCTS],
  summary: 'Get product by ID',
  request: {
    params: GetProductParamsSchema,
  },
  responses: {
    200: {
      description: MESSAGE.PRODUCT_FETCHED_SUCCESS,
      content: {
        'application/json': {
          schema: ProductResponseSchema,
        },
      },
    },
    ...getDefaultDocsResponses([401, 404, 500]),
  },
  security: [
    {
      BearerAuth: [],
    },
  ],
};

export const routerUpdateProductSchema: RouteConfig = {
  method: Methods.PUT,
  path: APIEndPoint.UPDATE_PRODUCT,
  tags: [EntityTags.PRODUCTS],
  summary: 'Update product (Seller, Admin, Super Admin only)',
  request: {
    body: {
      content: {
        'application/json': {
          schema: UpdateProductBodySchema,
        },
      },
    },
    params: UpdateProductParamsSchema,
  },
  responses: {
    200: {
      description: MESSAGE.PRODUCT_UPDATED_SUCCESS,
      content: {
        'application/json': {
          schema: ProductResponseSchema,
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

export const routerDeleteProductSchema: RouteConfig = {
  method: Methods.DELETE,
  path: APIEndPoint.DELETE_PRODUCT,
  tags: [EntityTags.PRODUCTS],
  summary: 'Delete product (Seller, Admin, Super Admin only)',
  request: {
    params: DeleteProductParamsSchema,
  },
  responses: {
    200: {
      description: MESSAGE.PRODUCT_DELETED_SUCCESS,
      content: {
        'application/json': {
          schema: ProductResponseSchema,
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

