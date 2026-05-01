import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

const validatorMiddleware =
  (schema: z.Schema<any>) =>
  (req: Request, _res: Response, next: NextFunction) => {
    try {
      const validatedData = schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      req.validated = req.validated ?? {};

      if (validatedData.body !== undefined) {
        req.validated.body = validatedData.body;
        req.body = validatedData.body;
      }
      if (validatedData.query !== undefined) {
        req.validated.query = validatedData.query;
        try {
          Object.assign(req.query as object, validatedData.query as object);
        } catch {
          // Express 5: `req.query` is a getter-only property; use `validatedQuery(req)`.
        }
      }
      if (validatedData.params !== undefined) {
        req.validated.params = validatedData.params as Request['params'];
        try {
          Object.assign(req.params, validatedData.params as object);
        } catch {
          // If in-place assign fails, handlers should use `validatedParams(req)`.
        }
      }

      next();
    } catch (error) {
      next(error);
    }
  };

export default validatorMiddleware;
