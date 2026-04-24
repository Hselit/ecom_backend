import {Router,Request,Response,NextFunction} from 'express';
import container from '../../dependencyManager/inversify.config.js';
import TYPES from '../../dependencyManager/inversifyTypes.js';
import { UserController } from '../controller/userController.js';
import validatorMiddleware from '../../middleware/validatorMiddleware.js';
import { authenticateToken } from '../../middleware/authMiddleware.js';
import { createUserDto, updateUserDto, getUserQueryDto, getUserParamsDto, deleteUserParamsDto, resendVerificationCodeDto, verifyEmailDto, forgotPasswordDto } from '../dto/user.dto.js';

const router = Router();

const userController = container.get<UserController>(TYPES.UserController);

// Public routes (no authentication required)
router.post("/register", validatorMiddleware(createUserDto), (req,res,next)=>userController.createUser(req,res,next));
router.post("/verify/resend", validatorMiddleware(resendVerificationCodeDto), (req,res,next)=>userController.resendVerificationCode(req,res,next));
router.post("/verify", validatorMiddleware(verifyEmailDto), (req,res,next)=>userController.verifyEmail(req,res,next));
router.post("/forgot-password", validatorMiddleware(forgotPasswordDto), (req,res,next)=>userController.forgotPassword(req,res,next));

// Protected routes (authentication required)
router.get("/", authenticateToken, validatorMiddleware(getUserQueryDto), (req,res,next)=>userController.getUsers(req,res,next));

router.get("/:id", authenticateToken, validatorMiddleware(getUserParamsDto), (req,res,next)=>userController.getUserById(req,res,next));

router.put("/:id", authenticateToken, validatorMiddleware(updateUserDto), (req,res,next)=>userController.updateUser(req,res,next));

router.delete("/:id", authenticateToken, validatorMiddleware(deleteUserParamsDto), (req,res,next)=>userController.deleteUser(req,res,next));

export default router;