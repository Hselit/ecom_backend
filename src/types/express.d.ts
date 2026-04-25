declare module 'express-serve-static-core' {
  interface Request {
    /** Populated by `validatorMiddleware` when Zod transforms query/params/body. */
    validated?: {
      body?: unknown;
      query?: unknown;
      params?: Record<string, unknown>;
    };
  }
}

export {};
