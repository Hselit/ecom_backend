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
      
      // Update request object with validated/transformed data
      if (validatedData.body) req.body = validatedData.body;
      if (validatedData.query) req.query = validatedData.query;
      if (validatedData.params) req.params = validatedData.params;
      
      next();
    } catch (error) {
      next(error);
    }
  };

export default validatorMiddleware;
