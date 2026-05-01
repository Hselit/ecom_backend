import { z } from 'zod';

export const getCartDto = z.object({}).openapi('GetCartDto');

export const createCartDto = z.object({}).openapi('CreateCartDto');

export const updateCartDto = z.object({}).openapi('UpdateCartDto');

export const deleteCartDto = z.object({}).openapi('DeleteCartDto');

