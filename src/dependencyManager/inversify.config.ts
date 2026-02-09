import { Container } from "inversify";
import TYPES from "./inversifyTypes.js";
import { UserService } from "../user/service/userService.js";
import { UserRepository } from "../user/repository/userRepository.js";
import { UserController } from "../user/controller/userController.js";
import { RoleRepository } from "../role/repository/roleRepository.js";
import { RoleController } from "../role/controller/roleController.js";
import { RoleService } from "../role/service/roleService.js";
import { LoginRepository } from "../login/repository/loginRepository.js";
import { LoginService } from "../login/service/loginService.js";
import { LoginController } from "../login/controller/loginController.js";
import { AccessTypeRepository } from "../access/repository/accessTypeRepository.js";
import { AccessTypeService } from "../access/service/accessTypeService.js";
import { AccessTypeController } from "../access/controller/accessTypeController.js";
import { AccessRoleRepository } from "../access/repository/accessRoleRepository.js";
import { AccessRoleService } from "../access/service/accessRoleService.js";
import { AccessRoleController } from "../access/controller/accessRoleController.js";
import { CategoryRepository } from "../category/repository/categoryRepository.js";
import { CategoryService } from "../category/service/categoryService.js";
import { CategoryController } from "../category/controller/categoryController.js";
import { ProductRepository } from "../product/repository/productRepository.js";
import { ProductService } from "../product/service/productService.js";
import { ProductController } from "../product/controller/productController.js";
import { ProductImageRepository } from "../productImage/repository/productImageRepository.js";
import { ProductImageService } from "../productImage/service/productImageService.js";
import { ProductImageController } from "../productImage/controller/productImageController.js";
import { CartRepository } from "../cart/repository/cartRepository.js";
import { CartService } from "../cart/service/cartService.js";
import { CartController } from "../cart/controller/cartController.js";
import { CartItemRepository } from "../cart/repository/cartItemRepository.js";
import { CartItemService } from "../cart/service/cartItemService.js";
import { CartItemController } from "../cart/controller/cartItemController.js";
import { OrderRepository } from "../order/repository/orderRepository.js";
import { OrderService } from "../order/service/orderService.js";
import { OrderController } from "../order/controller/orderController.js";
import { PaymentRepository } from "../order/repository/paymentRepository.js";
import { PaymentService } from "../order/service/paymentService.js";
import { PaymentController } from "../order/controller/paymentController.js";
import { ReviewRepository } from "../review/repository/reviewRepository.js";
import { ReviewService } from "../review/service/reviewService.js";
import { ReviewController } from "../review/controller/reviewController.js";
import { PrismaClient } from "@prisma/client";


const container = new Container();

// PrismaClient binding
const prismaClient = new PrismaClient();
container.bind<PrismaClient>(TYPES.PrismaClient).toConstantValue(prismaClient);

//User binding
container.bind<UserService>(TYPES.UserService).to(UserService);
container.bind<UserRepository>(TYPES.UserRepository).to(UserRepository);
container.bind<UserController>(TYPES.UserController).to(UserController);

//Role binding
container.bind<RoleRepository>(TYPES.RoleRepository).to(RoleRepository);
container.bind<RoleController>(TYPES.RoleController).to(RoleController);
container.bind<RoleService>(TYPES.RoleService).to(RoleService);

//Login binding
container.bind<LoginRepository>(TYPES.LoginRepository).to(LoginRepository);
container.bind<LoginService>(TYPES.LoginService).to(LoginService);
container.bind<LoginController>(TYPES.LoginController).to(LoginController);

//AccessType binding
container.bind<AccessTypeRepository>(TYPES.AccessTypeRepository).to(AccessTypeRepository);
container.bind<AccessTypeService>(TYPES.AccessTypeService).to(AccessTypeService);
container.bind<AccessTypeController>(TYPES.AccessTypeController).to(AccessTypeController);

//AccessRole binding
container.bind<AccessRoleRepository>(TYPES.AccessRoleRepository).to(AccessRoleRepository);
container.bind<AccessRoleService>(TYPES.AccessRoleService).to(AccessRoleService);
container.bind<AccessRoleController>(TYPES.AccessRoleController).to(AccessRoleController);

//Category binding
container.bind<CategoryRepository>(TYPES.CategoryRepository).to(CategoryRepository);
container.bind<CategoryService>(TYPES.CategoryService).to(CategoryService);
container.bind<CategoryController>(TYPES.CategoryController).to(CategoryController);

//Product binding
container.bind<ProductRepository>(TYPES.ProductRepository).to(ProductRepository);
container.bind<ProductService>(TYPES.ProductService).to(ProductService);
container.bind<ProductController>(TYPES.ProductController).to(ProductController);

//ProductImage binding
container.bind<ProductImageRepository>(TYPES.ProductImageRepository).to(ProductImageRepository);
container.bind<ProductImageService>(TYPES.ProductImageService).to(ProductImageService);
container.bind<ProductImageController>(TYPES.ProductImageController).to(ProductImageController);

//Cart binding
container.bind<CartRepository>(TYPES.CartRepository).to(CartRepository);
container.bind<CartService>(TYPES.CartService).to(CartService);
container.bind<CartController>(TYPES.CartController).to(CartController);

//CartItem binding
container.bind<CartItemRepository>(TYPES.CartItemRepository).to(CartItemRepository);
container.bind<CartItemService>(TYPES.CartItemService).to(CartItemService);
container.bind<CartItemController>(TYPES.CartItemController).to(CartItemController);

//Order binding
container.bind<OrderRepository>(TYPES.OrderRepository).to(OrderRepository);
container.bind<OrderService>(TYPES.OrderService).to(OrderService);
container.bind<OrderController>(TYPES.OrderController).to(OrderController);

//Payment binding
container.bind<PaymentRepository>(TYPES.PaymentRepository).to(PaymentRepository);
container.bind<PaymentService>(TYPES.PaymentService).to(PaymentService);
container.bind<PaymentController>(TYPES.PaymentController).to(PaymentController);

//Review binding
container.bind<ReviewRepository>(TYPES.ReviewRepository).to(ReviewRepository);
container.bind<ReviewService>(TYPES.ReviewService).to(ReviewService);
container.bind<ReviewController>(TYPES.ReviewController).to(ReviewController);




export default container;