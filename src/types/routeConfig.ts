import { Methods } from '../constants/methods.js';

export interface RouteConfig {
  method: Methods;
  path: string;
  tags: string[];
  summary: string;
  description?: string;
  request?: {
    body?: {
      content: {
        [key: string]: {
          schema: any;
        };
      };
    };
    params?: any;
    query?: any;
  };
  responses: {
    [statusCode: number]: {
      description: string;
      content?: {
        [key: string]: {
          schema: any;
        };
      };
    };
  };
  security?: Array<{
    [key: string]: string[];
  }>;
}

export const getDefaultDocsResponses = (statusCodes: number[]) => {
  const responses: RouteConfig['responses'] = {};
  
  statusCodes.forEach(code => {
    if (code === 401) {
      responses[401] = {
        description: 'Unauthorized',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                statusCode: { type: 'number', example: 401 },
                message: { type: 'string', example: 'Unauthorized access' },
              },
            },
          },
        },
      };
    } else if (code === 403) {
      responses[403] = {
        description: 'Forbidden',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                statusCode: { type: 'number', example: 403 },
                message: { type: 'string', example: 'Forbidden - Insufficient permissions' },
              },
            },
          },
        },
      };
    } else if (code === 404) {
      responses[404] = {
        description: 'Not Found',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                statusCode: { type: 'number', example: 404 },
                message: { type: 'string', example: 'Resource not found' },
              },
            },
          },
        },
      };
    } else if (code === 500) {
      responses[500] = {
        description: 'Internal Server Error',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                statusCode: { type: 'number', example: 500 },
                message: { type: 'string', example: 'Internal server error' },
              },
            },
          },
        },
      };
    }
  });
  
  return responses;
};

