import {Router,Request,Response,NextFunction} from 'express';
import container from '../../dependencyManager/inversify.config.js';
import TYPES from '../../dependencyManager/inversifyTypes.js';
import { ProductImageController } from '../controller/productImageController.js';
import validatorMiddleware from '../../middleware/validatorMiddleware.js';
import { createProductImageDto, updateProductImageDto, getProductImageParamsDto, deleteProductImageParamsDto, getProductImagesByProductParamsDto } from '../dto/productImage.dto.js';

const router = Router();

const productImageController = container.get<ProductImageController>(TYPES.ProductImageController);

router.post("/product/:productId/image", validatorMiddleware(createProductImageDto), (req,res,next)=>productImageController.createProductImage(req,res,next));

router.get("/product/:productId/image", validatorMiddleware(getProductImagesByProductParamsDto), (req,res,next)=>productImageController.getProductImages(req,res,next));

router.get("/product/image/:id", validatorMiddleware(getProductImageParamsDto), (req,res,next)=>productImageController.getProductImageById(req,res,next));

router.put("/product/image/:id", validatorMiddleware(updateProductImageDto), (req,res,next)=>productImageController.updateProductImage(req,res,next));

router.delete("/product/image/:id", validatorMiddleware(deleteProductImageParamsDto), (req,res,next)=>productImageController.deleteProductImage(req,res,next));

export default router;

