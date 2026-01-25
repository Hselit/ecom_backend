import { Router, Request, Response, NextFunction } from 'express';
import container from '../../dependencyManager/inversify.config.js';
import TYPES from '../../dependencyManager/inversifyTypes.js';
import { LoginController } from '../controller/loginController.js';
import validatorMiddleware from '../../middleware/validatorMiddleware.js';
import { loginDto } from '../dto/login.dto.js';

const router = Router();

const loginController = container.get<LoginController>(TYPES.LoginController);

router.post("/", validatorMiddleware(loginDto), (req: Request, res: Response, next: NextFunction) => 
    loginController.login(req, res, next)
);

export default router;

