import { Router, Request, Response, NextFunction } from 'express';
import container from '../../dependencyManager/inversify.config.js';
import TYPES from '../../dependencyManager/inversifyTypes.js';
import { AccessRoleController } from '../controller/accessRoleController.js';
import validatorMiddleware from '../../middleware/validatorMiddleware.js';
import { createAccessRoleDto, updateAccessRoleDto, getAccessRoleParamsDto, getAccessRoleQueryDto, deleteAccessRoleParamsDto, assignAccessToRoleDto } from '../dto/accessRole.dto.js';

const router = Router();

const accessRoleController = container.get<AccessRoleController>(TYPES.AccessRoleController);

router.post("/", validatorMiddleware(createAccessRoleDto), (req: Request, res: Response, next: NextFunction) => 
    accessRoleController.createAccessRole(req, res, next)
);

router.get("/", validatorMiddleware(getAccessRoleQueryDto), (req: Request, res: Response, next: NextFunction) => 
    accessRoleController.getAccessRoles(req, res, next)
);

router.get("/:id", validatorMiddleware(getAccessRoleParamsDto), (req: Request, res: Response, next: NextFunction) => 
    accessRoleController.getAccessRoleById(req, res, next)
);

router.put("/:id", validatorMiddleware(updateAccessRoleDto), (req: Request, res: Response, next: NextFunction) => 
    accessRoleController.updateAccessRole(req, res, next)
);

router.delete("/:id", validatorMiddleware(deleteAccessRoleParamsDto), (req: Request, res: Response, next: NextFunction) => 
    accessRoleController.deleteAccessRole(req, res, next)
);

// Special route for admin to assign multiple access types to a role
router.post("/assign", validatorMiddleware(assignAccessToRoleDto), (req: Request, res: Response, next: NextFunction) => 
    accessRoleController.assignAccessToRole(req, res, next)
);

export default router;

