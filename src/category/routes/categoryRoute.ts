import {Router,Request,Response,NextFunction} from 'express';
import container from '../../dependencyManager/inversify.config.js';
import TYPES from '../../dependencyManager/inversifyTypes.js';
import { CategoryController } from '../controller/categoryController.js';
import validatorMiddleware from '../../middleware/validatorMiddleware.js';
import { createCategoryDto, updateCategoryDto, getCategoryQueryDto, getCategoryParamsDto, deleteCategoryParamsDto } from '../dto/category.dto.js';

const router = Router();

const categoryController = container.get<CategoryController>(TYPES.CategoryController);

router.post("/", validatorMiddleware(createCategoryDto), (req,res,next)=>categoryController.createCategory(req,res,next));

router.get("/", validatorMiddleware(getCategoryQueryDto), (req,res,next)=>categoryController.getCategories(req,res,next));

router.get("/:id", validatorMiddleware(getCategoryParamsDto), (req,res,next)=>categoryController.getCategoryById(req,res,next));

router.put("/:id", validatorMiddleware(updateCategoryDto), (req,res,next)=>categoryController.updateCategory(req,res,next));

router.delete("/:id", validatorMiddleware(deleteCategoryParamsDto), (req,res,next)=>categoryController.deleteCategory(req,res,next));

export default router;

