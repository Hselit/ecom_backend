import { Router, Request, Response, NextFunction } from 'express';
import container from '../../dependencyManager/inversify.config.js';
import TYPES from '../../dependencyManager/inversifyTypes.js';
import { AccessTypeController } from '../controller/accessTypeController.js';
import validatorMiddleware from '../../middleware/validatorMiddleware.js';
import { createAccessTypeDto, updateAccessTypeDto, getAccessTypeParamsDto, getAccessTypeQueryDto, deleteAccessTypeParamsDto } from '../dto/accessType.dto.js';
import { z } from 'zod';

const router = Router();

const accessTypeController = container.get<AccessTypeController>(TYPES.AccessTypeController);

router.post("/", validatorMiddleware(createAccessTypeDto), (req: Request, res: Response, next: NextFunction) => 
    accessTypeController.createAccessType(req, res, next)
);

router.get("/", validatorMiddleware(getAccessTypeQueryDto), (req: Request, res: Response, next: NextFunction) => 
    accessTypeController.getAccessTypes(req, res, next)
);

router.get("/:id", validatorMiddleware(getAccessTypeParamsDto), (req: Request, res: Response, next: NextFunction) => 
    accessTypeController.getAccessTypeById(req, res, next)
);

router.put("/:id", validatorMiddleware(updateAccessTypeDto), (req: Request, res: Response, next: NextFunction) => 
    accessTypeController.updateAccessType(req, res, next)
);

router.delete("/:id", validatorMiddleware(deleteAccessTypeParamsDto), (req: Request, res: Response, next: NextFunction) => 
    accessTypeController.deleteAccessType(req, res, next)
);

export default router;

