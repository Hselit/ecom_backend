import {Router,Request,Response,NextFunction} from 'express';
import container from '../../dependencyManager/inversify.config.js';
import TYPES from '../../dependencyManager/inversifyTypes.js';
import { InventoryController } from '../controller/inventoryController.js';
import validatorMiddleware from '../../middleware/validatorMiddleware.js';
import { createInventoryDto, updateInventoryDto, getInventoryQueryDto, getInventoryParamsDto, deleteInventoryParamsDto } from '../dto/inventory.dto.js';

const router = Router();

const inventoryController = container.get<InventoryController>(TYPES.InventoryController);

router.post("/", validatorMiddleware(createInventoryDto), (req,res,next)=>inventoryController.createInventory(req,res,next));

router.get("/", validatorMiddleware(getInventoryQueryDto), (req,res,next)=>inventoryController.getInventories(req,res,next));

router.get("/:id", validatorMiddleware(getInventoryParamsDto), (req,res,next)=>inventoryController.getInventoryById(req,res,next));

router.put("/:id", validatorMiddleware(updateInventoryDto), (req,res,next)=>inventoryController.updateInventory(req,res,next));

router.delete("/:id", validatorMiddleware(deleteInventoryParamsDto), (req,res,next)=>inventoryController.deleteInventory(req,res,next));

export default router;

