import { Container } from "inversify";
import TYPES from "./inversifyTypes.js";
import { UserService } from "../user/service/userService.js";
import { UserRepository } from "../user/repository/userRepository.js";
import { UserController } from "../user/controller/userController.js";


const container = new Container();


//User binding
container.bind<UserService>(TYPES.UserService).to(UserService);
container.bind<UserRepository>(TYPES.UserRepository).to(UserRepository);
container.bind<UserController>(TYPES.UserController).to(UserController);


export default container;