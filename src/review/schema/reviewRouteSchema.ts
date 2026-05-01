import { RouteConfig, getDefaultDocsResponses } from '../../types/routeConfig.js';
import { Methods } from '../../constants/methods.js';
import { APIEndPoint } from '../../constants/apiEndpoints.js';
import { EntityTags } from '../../constants/entityTags.js';
import { MESSAGE } from '../../constants/messages.js';
import { CreateReviewBodySchema, UpdateReviewBodySchema, GetReviewQuerySchema, GetReviewParamsSchema, UpdateReviewParamsSchema, DeleteReviewParamsSchema } from '../dto/review.dto.js';
import { z } from 'zod';

export const ReviewDataSchema = z.object({
  id: z.number(),
  rating: z.number(),
  comment: z.string().nullable(),
  userId: z.number(),
  productId: z.number(),
  user: z.any().optional(),
  product: z.any().optional(),
  createdAt: z.date()
}).openapi('ReviewData');

export const ReviewResponseSchema = z.object({
  message: z.string(),
  data: ReviewDataSchema
}).openapi('ReviewResponse');

export const ReviewListResponseSchema = z.object({
  message: z.string(),
  data: z.array(ReviewDataSchema)
}).openapi('ReviewListResponse');

export const routerCreateReviewSchema: RouteConfig = {
  method: Methods.POST,
  path: APIEndPoint.CREATE_REVIEW,
  tags: [EntityTags.REVIEWS],
  summary: 'Create a new review',
  request: {
    body: {
      content: {
        'application/json': {
          schema: CreateReviewBodySchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: MESSAGE.REVIEW_CREATED_SUCCESS,
      content: {
        'application/json': {
          schema: ReviewResponseSchema,
        },
      },
    },
    ...getDefaultDocsResponses([400, 401, 500]),
  },
  security: [{ BearerAuth: [] }],
};

export const routerGetReviewsSchema: RouteConfig = {
  method: Methods.GET,
  path: APIEndPoint.GET_REVIEWS,
  tags: [EntityTags.REVIEWS],
  summary: 'Get list of reviews',
  request: {
    query: GetReviewQuerySchema,
  },
  responses: {
    200: {
      description: MESSAGE.REVIEW_FETCHED_SUCCESS,
      content: {
        'application/json': {
          schema: ReviewListResponseSchema,
        },
      },
    },
    ...getDefaultDocsResponses([401, 500]),
  },
  security: [{ BearerAuth: [] }],
};

export const routerGetReviewByIdSchema: RouteConfig = {
  method: Methods.GET,
  path: APIEndPoint.GET_REVIEW_BY_ID,
  tags: [EntityTags.REVIEWS],
  summary: 'Get review by ID',
  request: {
    params: GetReviewParamsSchema,
  },
  responses: {
    200: {
      description: MESSAGE.REVIEW_FETCHED_SUCCESS,
      content: {
        'application/json': {
          schema: ReviewResponseSchema,
        },
      },
    },
    ...getDefaultDocsResponses([401, 404, 500]),
  },
  security: [{ BearerAuth: [] }],
};

export const routerUpdateReviewSchema: RouteConfig = {
  method: Methods.PUT,
  path: APIEndPoint.UPDATE_REVIEW,
  tags: [EntityTags.REVIEWS],
  summary: 'Update review',
  request: {
    body: {
      content: {
        'application/json': {
          schema: UpdateReviewBodySchema,
        },
      },
    },
    params: UpdateReviewParamsSchema,
  },
  responses: {
    200: {
      description: MESSAGE.REVIEW_UPDATED_SUCCESS,
      content: {
        'application/json': {
          schema: ReviewResponseSchema,
        },
      },
    },
    ...getDefaultDocsResponses([400, 401, 404, 500]),
  },
  security: [{ BearerAuth: [] }],
};

export const routerDeleteReviewSchema: RouteConfig = {
  method: Methods.DELETE,
  path: APIEndPoint.DELETE_REVIEW,
  tags: [EntityTags.REVIEWS],
  summary: 'Delete review',
  request: {
    params: DeleteReviewParamsSchema,
  },
  responses: {
    200: {
      description: MESSAGE.REVIEW_DELETED_SUCCESS,
      content: {
        'application/json': {
          schema: ReviewResponseSchema,
        },
      },
    },
    ...getDefaultDocsResponses([401, 404, 500]),
  },
  security: [{ BearerAuth: [] }],
};

