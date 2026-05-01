import { OpenAPIRegistry, OpenApiGeneratorV3 } from '@asteasolutions/zod-to-openapi';
import config from 'config';
import { routerLoginSchema } from './login/schema/loginRouteSchema.js';
import { routerCreateUserSchema, routerGetUsersSchema, routerGetUserByIdSchema, routerUpdateUserSchema, routerDeleteUserSchema, routerResendVerificationCodeSchema, routerVerifyEmailSchema, routerForgotPasswordSchema, VerificationResponseSchema } from './user/schema/userRouteSchema.js';
import { routerGetRolesSchema, routerCreateRoleSchema, routerDeleteRoleSchema } from './role/schema/roleRouteSchema.js';
import { routerCreateAccessTypeSchema, routerGetAccessTypesSchema, routerGetAccessTypeByIdSchema, routerUpdateAccessTypeSchema, routerDeleteAccessTypeSchema } from './access/schema/accessTypeRouteSchema.js';
import { routerCreateAccessRoleSchema, routerGetAccessRolesSchema, routerGetAccessRoleByIdSchema, routerUpdateAccessRoleSchema, routerDeleteAccessRoleSchema, routerAssignAccessToRoleSchema } from './access/schema/accessRoleRouteSchema.js';
import { LoginResponseSchema, LoginUserSchema, LoginDataSchema } from './login/schema/loginRouteSchema.js';
import { UserResponseSchema, UserListResponseSchema, UserDataSchema, UserRoleSchema } from './user/schema/userRouteSchema.js';
import { RoleResponseSchema, RoleListResponseSchema, RoleDataSchema } from './role/schema/roleRouteSchema.js';
import { AccessTypeResponseSchema, AccessTypeListResponseSchema, AccessTypeDataSchema } from './access/schema/accessTypeRouteSchema.js';
import { AccessRoleResponseSchema, AccessRoleListResponseSchema, AssignAccessToRoleResponseSchema, AccessRoleDataSchema, AccessRoleRoleSchema, AccessRoleAccessTypeSchema } from './access/schema/accessRoleRouteSchema.js';
import { LoginBodySchema } from './login/dto/login.dto.js';
import { CreateUserBodySchema, UpdateUserBodySchema, GetUserQuerySchema, GetUserParamsSchema, UpdateUserParamsSchema, DeleteUserParamsSchema, ResendVerificationCodeBodySchema, VerifyEmailBodySchema, ForgotPasswordBodySchema } from './user/dto/user.dto.js';
import { CreateRoleBodySchema, GetRolesQuerySchema, DeleteRoleParamsSchema } from './role/dto/role.dto.js';
import { CreateAccessTypeBodySchema, UpdateAccessTypeBodySchema, GetAccessTypeQuerySchema, GetAccessTypeParamsSchema, UpdateAccessTypeParamsSchema, DeleteAccessTypeParamsSchema } from './access/dto/accessType.dto.js';
import { CreateAccessRoleBodySchema, UpdateAccessRoleBodySchema, GetAccessRoleQuerySchema, GetAccessRoleParamsSchema, UpdateAccessRoleParamsSchema, DeleteAccessRoleParamsSchema, AssignAccessToRoleBodySchema } from './access/dto/accessRole.dto.js';
import { routerCreateCategorySchema, routerGetCategoriesSchema, routerGetCategoryByIdSchema, routerUpdateCategorySchema, routerDeleteCategorySchema } from './category/schema/categoryRouteSchema.js';
import { routerCreateProductSchema, routerGetProductsSchema, routerGetProductByIdSchema, routerUpdateProductSchema, routerDeleteProductSchema } from './product/schema/productRouteSchema.js';
import { routerCreateProductImageSchema, routerGetProductImagesSchema, routerGetProductImageByIdSchema, routerUpdateProductImageSchema, routerDeleteProductImageSchema } from './productImage/schema/productImageRouteSchema.js';
import { routerGetCartSchema, routerDeleteCartSchema } from './cart/schema/cartRouteSchema.js';
import { routerAddCartItemSchema, routerGetCartItemsSchema, routerUpdateCartItemSchema, routerDeleteCartItemSchema } from './cart/schema/cartItemRouteSchema.js';
import { routerCreateOrderSchema, routerGetOrdersSchema, routerGetOrderByIdSchema, routerUpdateOrderSchema, routerDeleteOrderSchema } from './order/schema/orderRouteSchema.js';
import { routerCreatePaymentSchema, routerGetPaymentsSchema, routerGetPaymentByIdSchema, routerUpdatePaymentSchema } from './order/schema/paymentRouteSchema.js';
import { routerCreateReviewSchema, routerGetReviewsSchema, routerGetReviewByIdSchema, routerUpdateReviewSchema, routerDeleteReviewSchema } from './review/schema/reviewRouteSchema.js';
import { routerCreateInventorySchema, routerGetInventoriesSchema, routerGetInventoryByIdSchema, routerUpdateInventorySchema, routerDeleteInventorySchema } from './inventory/schema/inventoryRouteSchema.js';
import { CategoryDataSchema, CategoryResponseSchema, CategoryListResponseSchema } from './category/schema/categoryRouteSchema.js';
import { ProductDataSchema, ProductResponseSchema, ProductListResponseSchema } from './product/schema/productRouteSchema.js';
import { ProductImageDataSchema, ProductImageResponseSchema, ProductImageListResponseSchema } from './productImage/schema/productImageRouteSchema.js';
import { CartDataSchema, CartResponseSchema } from './cart/schema/cartRouteSchema.js';
import { CartItemDataSchema, CartItemResponseSchema, CartItemListResponseSchema } from './cart/schema/cartItemRouteSchema.js';
import { OrderDataSchema, OrderResponseSchema, OrderListResponseSchema } from './order/schema/orderRouteSchema.js';
import { PaymentDataSchema, PaymentResponseSchema, PaymentListResponseSchema } from './order/schema/paymentRouteSchema.js';
import { ReviewDataSchema, ReviewResponseSchema, ReviewListResponseSchema } from './review/schema/reviewRouteSchema.js';
import { InventoryDataSchema, InventoryResponseSchema, InventoryListResponseSchema } from './inventory/schema/inventoryRouteSchema.js';
import { CreateCategoryBodySchema, UpdateCategoryBodySchema, GetCategoryQuerySchema, GetCategoryParamsSchema, UpdateCategoryParamsSchema, DeleteCategoryParamsSchema } from './category/dto/category.dto.js';
import { CreateProductBodySchema, UpdateProductBodySchema, GetProductQuerySchema, GetProductParamsSchema, UpdateProductParamsSchema, DeleteProductParamsSchema } from './product/dto/product.dto.js';
import { CreateProductImageBodySchema, UpdateProductImageBodySchema, GetProductImageParamsSchema, UpdateProductImageParamsSchema, DeleteProductImageParamsSchema, CreateProductImageParamsSchema, GetProductImagesByProductParamsSchema } from './productImage/dto/productImage.dto.js';
import { AddCartItemBodySchema, UpdateCartItemBodySchema, UpdateCartItemParamsSchema, DeleteCartItemParamsSchema } from './cart/dto/cartItem.dto.js';
import { CreateOrderBodySchema, UpdateOrderBodySchema, GetOrderQuerySchema, GetOrderParamsSchema, UpdateOrderParamsSchema, DeleteOrderParamsSchema } from './order/dto/order.dto.js';
import { CreatePaymentBodySchema, UpdatePaymentBodySchema, GetPaymentQuerySchema, GetPaymentParamsSchema, UpdatePaymentParamsSchema } from './order/dto/payment.dto.js';
import { CreateReviewBodySchema, UpdateReviewBodySchema, GetReviewQuerySchema, GetReviewParamsSchema, UpdateReviewParamsSchema, DeleteReviewParamsSchema } from './review/dto/review.dto.js';
import { CreateInventoryBodySchema, UpdateInventoryBodySchema, GetInventoryQuerySchema, GetInventoryParamsSchema, UpdateInventoryParamsSchema, DeleteInventoryParamsSchema } from './inventory/dto/inventory.dto.js';

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
  registry.register('VerificationResponse', VerificationResponseSchema);
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
  registry.register('CategoryResponse', CategoryResponseSchema);
  registry.register('CategoryListResponse', CategoryListResponseSchema);
  registry.register('CategoryData', CategoryDataSchema);
  registry.register('ProductResponse', ProductResponseSchema);
  registry.register('ProductListResponse', ProductListResponseSchema);
  registry.register('ProductData', ProductDataSchema);
  registry.register('ProductImageResponse', ProductImageResponseSchema);
  registry.register('ProductImageListResponse', ProductImageListResponseSchema);
  registry.register('ProductImageData', ProductImageDataSchema);
  registry.register('CartResponse', CartResponseSchema);
  registry.register('CartData', CartDataSchema);
  registry.register('CartItemResponse', CartItemResponseSchema);
  registry.register('CartItemListResponse', CartItemListResponseSchema);
  registry.register('CartItemData', CartItemDataSchema);
  registry.register('OrderResponse', OrderResponseSchema);
  registry.register('OrderListResponse', OrderListResponseSchema);
  registry.register('OrderData', OrderDataSchema);
  registry.register('PaymentResponse', PaymentResponseSchema);
  registry.register('PaymentListResponse', PaymentListResponseSchema);
  registry.register('PaymentData', PaymentDataSchema);
  registry.register('ReviewResponse', ReviewResponseSchema);
  registry.register('ReviewListResponse', ReviewListResponseSchema);
  registry.register('ReviewData', ReviewDataSchema);
  registry.register('InventoryResponse', InventoryResponseSchema);
  registry.register('InventoryListResponse', InventoryListResponseSchema);
  registry.register('InventoryData', InventoryDataSchema);

  // Register request schemas
  registry.register('LoginBody', LoginBodySchema);
  registry.register('CreateUserBody', CreateUserBodySchema);
  registry.register('UpdateUserBody', UpdateUserBodySchema);
  registry.register('ResendVerificationCodeBody', ResendVerificationCodeBodySchema);
  registry.register('VerifyEmailBody', VerifyEmailBodySchema);
  registry.register('ForgotPasswordBody', ForgotPasswordBodySchema);
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
  registry.register('CreateCategoryBody', CreateCategoryBodySchema);
  registry.register('UpdateCategoryBody', UpdateCategoryBodySchema);
  registry.register('GetCategoryQuery', GetCategoryQuerySchema);
  registry.register('GetCategoryParams', GetCategoryParamsSchema);
  registry.register('UpdateCategoryParams', UpdateCategoryParamsSchema);
  registry.register('DeleteCategoryParams', DeleteCategoryParamsSchema);
  registry.register('CreateProductBody', CreateProductBodySchema);
  registry.register('UpdateProductBody', UpdateProductBodySchema);
  registry.register('GetProductQuery', GetProductQuerySchema);
  registry.register('GetProductParams', GetProductParamsSchema);
  registry.register('UpdateProductParams', UpdateProductParamsSchema);
  registry.register('DeleteProductParams', DeleteProductParamsSchema);
  registry.register('CreateProductImageBody', CreateProductImageBodySchema);
  registry.register('UpdateProductImageBody', UpdateProductImageBodySchema);
  registry.register('GetProductImageParams', GetProductImageParamsSchema);
  registry.register('UpdateProductImageParams', UpdateProductImageParamsSchema);
  registry.register('DeleteProductImageParams', DeleteProductImageParamsSchema);
  registry.register('CreateProductImageParams', CreateProductImageParamsSchema);
  registry.register('GetProductImagesByProductParams', GetProductImagesByProductParamsSchema);
  registry.register('AddCartItemBody', AddCartItemBodySchema);
  registry.register('UpdateCartItemBody', UpdateCartItemBodySchema);
  registry.register('UpdateCartItemParams', UpdateCartItemParamsSchema);
  registry.register('DeleteCartItemParams', DeleteCartItemParamsSchema);
  registry.register('CreateOrderBody', CreateOrderBodySchema);
  registry.register('UpdateOrderBody', UpdateOrderBodySchema);
  registry.register('GetOrderQuery', GetOrderQuerySchema);
  registry.register('GetOrderParams', GetOrderParamsSchema);
  registry.register('UpdateOrderParams', UpdateOrderParamsSchema);
  registry.register('DeleteOrderParams', DeleteOrderParamsSchema);
  registry.register('CreatePaymentBody', CreatePaymentBodySchema);
  registry.register('UpdatePaymentBody', UpdatePaymentBodySchema);
  registry.register('GetPaymentQuery', GetPaymentQuerySchema);
  registry.register('GetPaymentParams', GetPaymentParamsSchema);
  registry.register('UpdatePaymentParams', UpdatePaymentParamsSchema);
  registry.register('CreateReviewBody', CreateReviewBodySchema);
  registry.register('UpdateReviewBody', UpdateReviewBodySchema);
  registry.register('GetReviewQuery', GetReviewQuerySchema);
  registry.register('GetReviewParams', GetReviewParamsSchema);
  registry.register('UpdateReviewParams', UpdateReviewParamsSchema);
  registry.register('DeleteReviewParams', DeleteReviewParamsSchema);
  registry.register('CreateInventoryBody', CreateInventoryBodySchema);
  registry.register('UpdateInventoryBody', UpdateInventoryBodySchema);
  registry.register('GetInventoryQuery', GetInventoryQuerySchema);
  registry.register('GetInventoryParams', GetInventoryParamsSchema);
  registry.register('UpdateInventoryParams', UpdateInventoryParamsSchema);
  registry.register('DeleteInventoryParams', DeleteInventoryParamsSchema);

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
  registerRoute(routerResendVerificationCodeSchema);
  registerRoute(routerVerifyEmailSchema);
  registerRoute(routerForgotPasswordSchema);
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
  registerRoute(routerCreateCategorySchema);
  registerRoute(routerGetCategoriesSchema);
  registerRoute(routerGetCategoryByIdSchema);
  registerRoute(routerUpdateCategorySchema);
  registerRoute(routerDeleteCategorySchema);
  registerRoute(routerCreateProductSchema);
  registerRoute(routerGetProductsSchema);
  registerRoute(routerGetProductByIdSchema);
  registerRoute(routerUpdateProductSchema);
  registerRoute(routerDeleteProductSchema);
  registerRoute(routerCreateProductImageSchema);
  registerRoute(routerGetProductImagesSchema);
  registerRoute(routerGetProductImageByIdSchema);
  registerRoute(routerUpdateProductImageSchema);
  registerRoute(routerDeleteProductImageSchema);
  registerRoute(routerGetCartSchema);
  registerRoute(routerDeleteCartSchema);
  registerRoute(routerAddCartItemSchema);
  registerRoute(routerGetCartItemsSchema);
  registerRoute(routerUpdateCartItemSchema);
  registerRoute(routerDeleteCartItemSchema);
  registerRoute(routerCreateOrderSchema);
  registerRoute(routerGetOrdersSchema);
  registerRoute(routerGetOrderByIdSchema);
  registerRoute(routerUpdateOrderSchema);
  registerRoute(routerDeleteOrderSchema);
  registerRoute(routerCreatePaymentSchema);
  registerRoute(routerGetPaymentsSchema);
  registerRoute(routerGetPaymentByIdSchema);
  registerRoute(routerUpdatePaymentSchema);
  registerRoute(routerCreateReviewSchema);
  registerRoute(routerGetReviewsSchema);
  registerRoute(routerGetReviewByIdSchema);
  registerRoute(routerUpdateReviewSchema);
  registerRoute(routerDeleteReviewSchema);
  registerRoute(routerCreateInventorySchema);
  registerRoute(routerGetInventoriesSchema);
  registerRoute(routerGetInventoryByIdSchema);
  registerRoute(routerUpdateInventorySchema);
  registerRoute(routerDeleteInventorySchema);

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

