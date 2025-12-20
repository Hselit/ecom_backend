import {Router,Request,Response,NextFunction} from 'express';
import container from '../../dependencyManager/inversify.config.js';
import TYPES from '../../types/inversifyTypes.js';
import { UserController } from '../controller/userController.js';

const router = Router();

const userController = container.get<UserController>(TYPES.UserController);

router.get("/",(req,res,next)=>userController.getUsers(req,res,next));

export default router;