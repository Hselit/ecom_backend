import { OpenAPIRegistry, OpenApiGeneratorV3 } from '@asteasolutions/zod-to-openapi';
import config from 'config';
import { routerLoginSchema } from './login/schema/loginRouteSchema.js';
import { routerCreateUserSchema, routerGetUsersSchema, routerGetUserByIdSchema, routerUpdateUserSchema, routerDeleteUserSchema } from './user/schema/userRouteSchema.js';
import { routerGetRolesSchema, routerCreateRoleSchema, routerDeleteRoleSchema } from './role/schema/roleRouteSchema.js';
import { routerCreateAccessTypeSchema, routerGetAccessTypesSchema, routerGetAccessTypeByIdSchema, routerUpdateAccessTypeSchema, routerDeleteAccessTypeSchema } from './access/schema/accessTypeRouteSchema.js';
import { routerCreateAccessRoleSchema, routerGetAccessRolesSchema, routerGetAccessRoleByIdSchema, routerUpdateAccessRoleSchema, routerDeleteAccessRoleSchema, routerAssignAccessToRoleSchema } from './access/schema/accessRoleRouteSchema.js';
import { LoginResponseSchema, LoginUserSchema, LoginDataSchema } from './login/schema/loginRouteSchema.js';
import { UserResponseSchema, UserListResponseSchema, UserDataSchema, UserRoleSchema } from './user/schema/userRouteSchema.js';
import { RoleResponseSchema, RoleListResponseSchema, RoleDataSchema } from './role/schema/roleRouteSchema.js';
import { AccessTypeResponseSchema, AccessTypeListResponseSchema, AccessTypeDataSchema } from './access/schema/accessTypeRouteSchema.js';
import { AccessRoleResponseSchema, AccessRoleListResponseSchema, AssignAccessToRoleResponseSchema, AccessRoleDataSchema, AccessRoleRoleSchema, AccessRoleAccessTypeSchema } from './access/schema/accessRoleRouteSchema.js';
import { LoginBodySchema } from './login/dto/login.dto.js';
import { CreateUserBodySchema, UpdateUserBodySchema, GetUserQuerySchema, GetUserParamsSchema, UpdateUserParamsSchema, DeleteUserParamsSchema } from './user/dto/user.dto.js';
import { CreateRoleBodySchema, GetRolesQuerySchema, DeleteRoleParamsSchema } from './role/dto/role.dto.js';
import { CreateAccessTypeBodySchema, UpdateAccessTypeBodySchema, GetAccessTypeQuerySchema, GetAccessTypeParamsSchema, UpdateAccessTypeParamsSchema, DeleteAccessTypeParamsSchema } from './access/dto/accessType.dto.js';
import { CreateAccessRoleBodySchema, UpdateAccessRoleBodySchema, GetAccessRoleQuerySchema, GetAccessRoleParamsSchema, UpdateAccessRoleParamsSchema, DeleteAccessRoleParamsSchema, AssignAccessToRoleBodySchema } from './access/dto/accessRole.dto.js';

type OpenApiConfig = {
  openapi: string;
  info: {
    swagger: string;
    version: string;
    title: string;
    description: string;
  };
  servers: {
    url: string;
  }[];
};

export function generateOpenAPIDocument() {
  const openApiConfig = config.get<OpenApiConfig>('openApi');

  const registry = new OpenAPIRegistry();

  registry.register('LoginResponse', LoginResponseSchema);
  registry.register('LoginUser', LoginUserSchema);
  registry.register('LoginData', LoginDataSchema);
  registry.register('UserResponse', UserResponseSchema);
  registry.register('UserListResponse', UserListResponseSchema);
  registry.register('UserData', UserDataSchema);
  registry.register('UserRole', UserRoleSchema);
  registry.register('RoleResponse', RoleResponseSchema);
  registry.register('RoleListResponse', RoleListResponseSchema);
  registry.register('RoleData', RoleDataSchema);
  registry.register('AccessTypeResponse', AccessTypeResponseSchema);
  registry.register('AccessTypeListResponse', AccessTypeListResponseSchema);
  registry.register('AccessTypeData', AccessTypeDataSchema);
  registry.register('AccessRoleResponse', AccessRoleResponseSchema);
  registry.register('AccessRoleListResponse', AccessRoleListResponseSchema);
  registry.register('AssignAccessToRoleResponse', AssignAccessToRoleResponseSchema);
  registry.register('AccessRoleData', AccessRoleDataSchema);
  registry.register('AccessRoleRole', AccessRoleRoleSchema);
  registry.register('AccessRoleAccessType', AccessRoleAccessTypeSchema);

  // Register request schemas
  registry.register('LoginBody', LoginBodySchema);
  registry.register('CreateUserBody', CreateUserBodySchema);
  registry.register('UpdateUserBody', UpdateUserBodySchema);
  registry.register('GetUserQuery', GetUserQuerySchema);
  registry.register('GetUserParams', GetUserParamsSchema);
  registry.register('UpdateUserParams', UpdateUserParamsSchema);
  registry.register('DeleteUserParams', DeleteUserParamsSchema);
  registry.register('CreateRoleBody', CreateRoleBodySchema);
  registry.register('GetRolesQuery', GetRolesQuerySchema);
  registry.register('DeleteRoleParams', DeleteRoleParamsSchema);
  registry.register('CreateAccessTypeBody', CreateAccessTypeBodySchema);
  registry.register('UpdateAccessTypeBody', UpdateAccessTypeBodySchema);
  registry.register('GetAccessTypeQuery', GetAccessTypeQuerySchema);
  registry.register('GetAccessTypeParams', GetAccessTypeParamsSchema);
  registry.register('UpdateAccessTypeParams', UpdateAccessTypeParamsSchema);
  registry.register('DeleteAccessTypeParams', DeleteAccessTypeParamsSchema);
  registry.register('CreateAccessRoleBody', CreateAccessRoleBodySchema);
  registry.register('UpdateAccessRoleBody', UpdateAccessRoleBodySchema);
  registry.register('GetAccessRoleQuery', GetAccessRoleQuerySchema);
  registry.register('GetAccessRoleParams', GetAccessRoleParamsSchema);
  registry.register('UpdateAccessRoleParams', UpdateAccessRoleParamsSchema);
  registry.register('DeleteAccessRoleParams', DeleteAccessRoleParamsSchema);
  registry.register('AssignAccessToRoleBody', AssignAccessToRoleBodySchema);

  const registerRoute = (routeConfig: any) => {
    const pathConfig: any = {
      method: routeConfig.method,
      path: routeConfig.path,
      tags: routeConfig.tags,
      summary: routeConfig.summary,
    };
    
    if (routeConfig.description) {
      pathConfig.description = routeConfig.description;
    }
    
    if (routeConfig.request) {
      pathConfig.request = routeConfig.request;
    }
    
    if (routeConfig.responses) {
      pathConfig.responses = routeConfig.responses;
    }
    
    if (routeConfig.security) {
      pathConfig.security = routeConfig.security;
    }
    
    registry.registerPath(pathConfig);
  };

  registerRoute(routerLoginSchema);
  registerRoute(routerCreateUserSchema);
  registerRoute(routerGetUsersSchema);
  registerRoute(routerGetUserByIdSchema);
  registerRoute(routerUpdateUserSchema);
  registerRoute(routerDeleteUserSchema);
  registerRoute(routerGetRolesSchema);
  registerRoute(routerCreateRoleSchema);
  registerRoute(routerDeleteRoleSchema);
  registerRoute(routerCreateAccessTypeSchema);
  registerRoute(routerGetAccessTypesSchema);
  registerRoute(routerGetAccessTypeByIdSchema);
  registerRoute(routerUpdateAccessTypeSchema);
  registerRoute(routerDeleteAccessTypeSchema);
  registerRoute(routerCreateAccessRoleSchema);
  registerRoute(routerGetAccessRolesSchema);
  registerRoute(routerGetAccessRoleByIdSchema);
  registerRoute(routerUpdateAccessRoleSchema);
  registerRoute(routerDeleteAccessRoleSchema);
  registerRoute(routerAssignAccessToRoleSchema);

  registry.registerComponent('securitySchemes', 'BearerAuth', {
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
  });

  const generator = new OpenApiGeneratorV3(registry.definitions);

  return generator.generateDocument({
    openapi: openApiConfig.openapi,
    info: {
      title: openApiConfig.info.title,
      version: openApiConfig.info.version,
      description: openApiConfig.info.description,
    },
    servers: openApiConfig.servers,
  });
}

