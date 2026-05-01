import {Router,Request,Response,NextFunction} from 'express';
import container from '../../dependencyManager/inversify.config.js';
import TYPES from '../../dependencyManager/inversifyTypes.js';
import { RoleController } from '../controller/roleController.js';
import validatorMiddleware from '../../middleware/validatorMiddleware.js';
import { createRoleDto, getRolesQueryDto, deleteRoleParamsDto } from '../dto/role.dto.js';

const router = Router();

const roleController = container.get<RoleController>(TYPES.RoleController);

router.get("/", validatorMiddleware(getRolesQueryDto), (req,res,next)=> roleController.getRoles(req,res,next));

router.post("/", validatorMiddleware(createRoleDto), (req,res,next)=> roleController.createRole(req,res,next));

router.delete("/:id", validatorMiddleware(deleteRoleParamsDto), (req,res,next)=> roleController.deleteRole(req,res,next));

export default router;