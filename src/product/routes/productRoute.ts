import {Router,Request,Response,NextFunction} from 'express';
import container from '../../dependencyManager/inversify.config.js';
import TYPES from '../../dependencyManager/inversifyTypes.js';
import { ProductController } from '../controller/productController.js';
import validatorMiddleware from '../../middleware/validatorMiddleware.js';
import {
  optionalProductImageMultipart,
  normalizeProductMultipartBody
} from '../../middleware/productMultipartMiddleware.js';
import { createProductDto, updateProductDto, getProductQueryDto, getProductParamsDto, deleteProductParamsDto } from '../dto/product.dto.js';

const router = Router();

const productController = container.get<ProductController>(TYPES.ProductController);

router.post(
  "/",
  optionalProductImageMultipart,
  normalizeProductMultipartBody,
  validatorMiddleware(createProductDto),
  (req,res,next)=>productController.createProduct(req,res,next));

router.get("/", validatorMiddleware(getProductQueryDto), (req,res,next)=>productController.getProducts(req,res,next));

router.get("/:id", validatorMiddleware(getProductParamsDto), (req,res,next)=>productController.getProductById(req,res,next));

router.put(
  "/:id",
  optionalProductImageMultipart,
  normalizeProductMultipartBody,
  validatorMiddleware(updateProductDto),
  (req,res,next)=>productController.updateProduct(req,res,next));

router.delete("/:id", validatorMiddleware(deleteProductParamsDto), (req,res,next)=>productController.deleteProduct(req,res,next));

export default router;

