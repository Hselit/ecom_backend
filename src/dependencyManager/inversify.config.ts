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




export default container;