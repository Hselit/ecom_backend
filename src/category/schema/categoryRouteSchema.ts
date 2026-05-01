import { RouteConfig, getDefaultDocsResponses } from '../../types/routeConfig.js';
import { Methods } from '../../constants/methods.js';
import { APIEndPoint } from '../../constants/apiEndpoints.js';
import { EntityTags } from '../../constants/entityTags.js';
import { MESSAGE } from '../../constants/messages.js';
import { CreateCategoryBodySchema, UpdateCategoryBodySchema, GetCategoryQuerySchema, GetCategoryParamsSchema, UpdateCategoryParamsSchema, DeleteCategoryParamsSchema } from '../dto/category.dto.js';
import { z } from 'zod';

export const CategoryParentSchema = z.object({
  id: z.number().openapi({ example: 1 }),
  name: z.string().openapi({ example: 'Electronics' }),
  slug: z.string().openapi({ example: 'electronics' }),
  description: z.string().nullable().openapi({ example: 'Electronic products' }),
  isActive: z.boolean().openapi({ example: true }),
  parentId: z.number().nullable().openapi({ example: null }),
  createdAt: z.date().openapi({ example: new Date() }),
  updatedAt: z.date().openapi({ example: new Date() }),
}).openapi('CategoryParent');

export const CategoryDataSchema = z.object({
  id: z.number().openapi({ example: 1 }),
  name: z.string().openapi({ example: 'Electronics' }),
  slug: z.string().openapi({ example: 'electronics' }),
  description: z.string().nullable().openapi({ example: 'Electronic products' }),
  isActive: z.boolean().openapi({ example: true }),
  parentId: z.number().nullable().openapi({ example: null }),
  parent: CategoryParentSchema.nullable().optional(),
  children: z.array(CategoryParentSchema).optional(),
  createdAt: z.date().openapi({ example: new Date() }),
  updatedAt: z.date().openapi({ example: new Date() }),
}).openapi('CategoryData');

export const CategoryResponseSchema = z.object({
  message: z.string().openapi({ example: 'Category fetched successfully' }),
  data: CategoryDataSchema,
}).openapi('CategoryResponse');

export const CategoryListResponseSchema = z.object({
  message: z.string().openapi({ example: 'Categories fetched successfully' }),
  data: z.array(CategoryDataSchema),
}).openapi('CategoryListResponse');

export const routerCreateCategorySchema: RouteConfig = {
  method: Methods.POST,
  path: APIEndPoint.CREATE_CATEGORY,
  tags: [EntityTags.CATEGORIES],
  summary: 'Create a new category',
  request: {
    body: {
      content: {
        'application/json': {
          schema: CreateCategoryBodySchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: MESSAGE.CATEGORY_CREATED_SUCCESS,
      content: {
        'application/json': {
          schema: CategoryResponseSchema,
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

export const routerGetCategoriesSchema: RouteConfig = {
  method: Methods.GET,
  path: APIEndPoint.GET_CATEGORIES,
  tags: [EntityTags.CATEGORIES],
  summary: 'Get list of categories',
  request: {
    query: GetCategoryQuerySchema,
  },
  responses: {
    200: {
      description: MESSAGE.CATEGORY_FETCHED_SUCCESS,
      content: {
        'application/json': {
          schema: CategoryListResponseSchema,
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

export const routerGetCategoryByIdSchema: RouteConfig = {
  method: Methods.GET,
  path: APIEndPoint.GET_CATEGORY_BY_ID,
  tags: [EntityTags.CATEGORIES],
  summary: 'Get category by ID',
  request: {
    params: GetCategoryParamsSchema,
  },
  responses: {
    200: {
      description: MESSAGE.CATEGORY_FETCHED_SUCCESS,
      content: {
        'application/json': {
          schema: CategoryResponseSchema,
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

export const routerUpdateCategorySchema: RouteConfig = {
  method: Methods.PUT,
  path: APIEndPoint.UPDATE_CATEGORY,
  tags: [EntityTags.CATEGORIES],
  summary: 'Update category',
  request: {
    body: {
      content: {
        'application/json': {
          schema: UpdateCategoryBodySchema,
        },
      },
    },
    params: UpdateCategoryParamsSchema,
  },
  responses: {
    200: {
      description: MESSAGE.CATEGORY_UPDATED_SUCCESS,
      content: {
        'application/json': {
          schema: CategoryResponseSchema,
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

export const routerDeleteCategorySchema: RouteConfig = {
  method: Methods.DELETE,
  path: APIEndPoint.DELETE_CATEGORY,
  tags: [EntityTags.CATEGORIES],
  summary: 'Delete category',
  request: {
    params: DeleteCategoryParamsSchema,
  },
  responses: {
    200: {
      description: MESSAGE.CATEGORY_DELETED_SUCCESS,
      content: {
        'application/json': {
          schema: CategoryResponseSchema,
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

