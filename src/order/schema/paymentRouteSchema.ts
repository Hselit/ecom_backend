import { RouteConfig, getDefaultDocsResponses } from '../../types/routeConfig.js';
import { Methods } from '../../constants/methods.js';
import { APIEndPoint } from '../../constants/apiEndpoints.js';
import { EntityTags } from '../../constants/entityTags.js';
import { MESSAGE } from '../../constants/messages.js';
import { CreatePaymentBodySchema, UpdatePaymentBodySchema, GetPaymentQuerySchema, GetPaymentParamsSchema, UpdatePaymentParamsSchema } from '../dto/payment.dto.js';
import { z } from 'zod';

export const PaymentDataSchema = z.object({
  id: z.number(),
  paymentMethod: z.string(),
  transactionId: z.string().nullable(),
  amount: z.number(),
  status: z.enum(['PENDING', 'SUCCESS', 'FAILED', 'REFUNDED']),
  orderId: z.number(),
  order: z.any().optional(),
  createdAt: z.date(),
  updatedAt: z.date()
}).openapi('PaymentData');

export const PaymentResponseSchema = z.object({
  message: z.string(),
  data: PaymentDataSchema
}).openapi('PaymentResponse');

export const PaymentListResponseSchema = z.object({
  message: z.string(),
  data: z.array(PaymentDataSchema)
}).openapi('PaymentListResponse');

export const routerCreatePaymentSchema: RouteConfig = {
  method: Methods.POST,
  path: '/order/payment',
  tags: [EntityTags.PAYMENTS],
  summary: 'Create a new payment',
  request: {
    body: {
      content: {
        'application/json': {
          schema: CreatePaymentBodySchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: MESSAGE.PAYMENT_CREATED_SUCCESS,
      content: {
        'application/json': {
          schema: PaymentResponseSchema,
        },
      },
    },
    ...getDefaultDocsResponses([400, 401, 404, 500]),
  },
  security: [{ BearerAuth: [] }],
};

export const routerGetPaymentsSchema: RouteConfig = {
  method: Methods.GET,
  path: '/order/payment',
  tags: [EntityTags.PAYMENTS],
  summary: 'Get list of payments',
  request: {
    query: GetPaymentQuerySchema,
  },
  responses: {
    200: {
      description: MESSAGE.PAYMENT_FETCHED_SUCCESS,
      content: {
        'application/json': {
          schema: PaymentListResponseSchema,
        },
      },
    },
    ...getDefaultDocsResponses([401, 500]),
  },
  security: [{ BearerAuth: [] }],
};

export const routerGetPaymentByIdSchema: RouteConfig = {
  method: Methods.GET,
  path: '/order/payment/:id',
  tags: [EntityTags.PAYMENTS],
  summary: 'Get payment by ID',
  request: {
    params: GetPaymentParamsSchema,
  },
  responses: {
    200: {
      description: MESSAGE.PAYMENT_FETCHED_SUCCESS,
      content: {
        'application/json': {
          schema: PaymentResponseSchema,
        },
      },
    },
    ...getDefaultDocsResponses([401, 404, 500]),
  },
  security: [{ BearerAuth: [] }],
};

export const routerUpdatePaymentSchema: RouteConfig = {
  method: Methods.PUT,
  path: '/order/payment/:id',
  tags: [EntityTags.PAYMENTS],
  summary: 'Update payment',
  request: {
    body: {
      content: {
        'application/json': {
          schema: UpdatePaymentBodySchema,
        },
      },
    },
    params: UpdatePaymentParamsSchema,
  },
  responses: {
    200: {
      description: MESSAGE.PAYMENT_UPDATED_SUCCESS,
      content: {
        'application/json': {
          schema: PaymentResponseSchema,
        },
      },
    },
    ...getDefaultDocsResponses([400, 401, 404, 500]),
  },
  security: [{ BearerAuth: [] }],
};

