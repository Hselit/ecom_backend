import {Router,Request,Response,NextFunction} from 'express';
import container from '../../dependencyManager/inversify.config.js';
import TYPES from '../../dependencyManager/inversifyTypes.js';
import { UserController } from '../controller/userController.js';
import validatorMiddleware from '../../middleware/validatorMiddleware.js';
import { createUserDto, updateUserDto, getUserQueryDto, getUserParamsDto, deleteUserParamsDto } from '../dto/user.dto.js';

const router = Router();

const userController = container.get<UserController>(TYPES.UserController);

router.post("/", validatorMiddleware(createUserDto), (req,res,next)=>userController.createUser(req,res,next));

router.get("/", validatorMiddleware(getUserQueryDto), (req,res,next)=>userController.getUsers(req,res,next));

router.get("/:id", validatorMiddleware(getUserParamsDto), (req,res,next)=>userController.getUserById(req,res,next));

router.put("/:id", validatorMiddleware(updateUserDto), (req,res,next)=>userController.updateUser(req,res,next));

router.delete("/:id", validatorMiddleware(deleteUserParamsDto), (req,res,next)=>userController.deleteUser(req,res,next));

export default router;