import { RouteConfig, getDefaultDocsResponses } from '../../types/routeConfig.js';
import { Methods } from '../../constants/methods.js';
import { APIEndPoint } from '../../constants/apiEndpoints.js';
import { EntityTags } from '../../constants/entityTags.js';
import { MESSAGE } from '../../constants/messages.js';
import { CreateProductImageBodySchema, UpdateProductImageBodySchema, GetProductImageParamsSchema, UpdateProductImageParamsSchema, DeleteProductImageParamsSchema, CreateProductImageParamsSchema, GetProductImagesByProductParamsSchema } from '../dto/productImage.dto.js';
import { z } from 'zod';

export const ProductImageProductSchema = z.object({
  id: z.number().openapi({ example: 1 }),
  name: z.string().openapi({ example: 'iPhone 15' }),
  slug: z.string().openapi({ example: 'iphone-15' }),
  sku: z.string().openapi({ example: 'IPH15-001' }),
  price: z.number().openapi({ example: 999.99 }),
  stock: z.number().openapi({ example: 100 }),
}).openapi('ProductImageProduct');

export const ProductImageDataSchema = z.object({
  id: z.number().openapi({ example: 1 }),
  imageUrl: z.string().openapi({ example: 'https://example.com/image.jpg' }),
  isPrimary: z.boolean().openapi({ example: true }),
  productId: z.number().openapi({ example: 1 }),
  product: ProductImageProductSchema.optional(),
}).openapi('ProductImageData');

export const ProductImageResponseSchema = z.object({
  message: z.string().openapi({ example: 'Product image fetched successfully' }),
  data: ProductImageDataSchema,
}).openapi('ProductImageResponse');

export const ProductImageListResponseSchema = z.object({
  message: z.string().openapi({ example: 'Product images fetched successfully' }),
  data: z.array(ProductImageDataSchema),
}).openapi('ProductImageListResponse');

export const routerCreateProductImageSchema: RouteConfig = {
  method: Methods.POST,
  path: APIEndPoint.CREATE_PRODUCT_IMAGE,
  tags: [EntityTags.PRODUCT_IMAGES],
  summary: 'Create a new product image',
  request: {
    body: {
      content: {
        'application/json': {
          schema: CreateProductImageBodySchema,
        },
      },
    },
    params: CreateProductImageParamsSchema,
  },
  responses: {
    201: {
      description: MESSAGE.PRODUCT_IMAGE_CREATED_SUCCESS,
      content: {
        'application/json': {
          schema: ProductImageResponseSchema,
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

export const routerGetProductImagesSchema: RouteConfig = {
  method: Methods.GET,
  path: APIEndPoint.GET_PRODUCT_IMAGES,
  tags: [EntityTags.PRODUCT_IMAGES],
  summary: 'Get product images by product ID',
  request: {
    params: GetProductImagesByProductParamsSchema,
  },
  responses: {
    200: {
      description: MESSAGE.PRODUCT_IMAGE_FETCHED_SUCCESS,
      content: {
        'application/json': {
          schema: ProductImageListResponseSchema,
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

export const routerGetProductImageByIdSchema: RouteConfig = {
  method: Methods.GET,
  path: APIEndPoint.GET_PRODUCT_IMAGE_BY_ID,
  tags: [EntityTags.PRODUCT_IMAGES],
  summary: 'Get product image by ID',
  request: {
    params: GetProductImageParamsSchema,
  },
  responses: {
    200: {
      description: MESSAGE.PRODUCT_IMAGE_FETCHED_SUCCESS,
      content: {
        'application/json': {
          schema: ProductImageResponseSchema,
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

export const routerUpdateProductImageSchema: RouteConfig = {
  method: Methods.PUT,
  path: APIEndPoint.UPDATE_PRODUCT_IMAGE,
  tags: [EntityTags.PRODUCT_IMAGES],
  summary: 'Update product image',
  request: {
    body: {
      content: {
        'application/json': {
          schema: UpdateProductImageBodySchema,
        },
      },
    },
    params: UpdateProductImageParamsSchema,
  },
  responses: {
    200: {
      description: MESSAGE.PRODUCT_IMAGE_UPDATED_SUCCESS,
      content: {
        'application/json': {
          schema: ProductImageResponseSchema,
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

export const routerDeleteProductImageSchema: RouteConfig = {
  method: Methods.DELETE,
  path: APIEndPoint.DELETE_PRODUCT_IMAGE,
  tags: [EntityTags.PRODUCT_IMAGES],
  summary: 'Delete product image',
  request: {
    params: DeleteProductImageParamsSchema,
  },
  responses: {
    200: {
      description: MESSAGE.PRODUCT_IMAGE_DELETED_SUCCESS,
      content: {
        'application/json': {
          schema: ProductImageResponseSchema,
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

