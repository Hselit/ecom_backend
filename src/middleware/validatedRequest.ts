import type { Request } from 'express';

/** Use after `validatorMiddleware` when handlers need coerced query (Express 5 `req.query` is read-only). */
export function validatedQuery(req: Request): Request['query'] {
  return (req.validated?.query ?? req.query) as Request['query'];
}

/** Use after `validatorMiddleware` when params are transformed (e.g. numeric ids). */
export function validatedParams(req: Request): Request['params'] {
  return (req.validated?.params ?? req.params) as Request['params'];
}
