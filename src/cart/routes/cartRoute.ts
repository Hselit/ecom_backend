import {Router,Request,Response,NextFunction} from 'express';
import container from '../../dependencyManager/inversify.config.js';
import TYPES from '../../dependencyManager/inversifyTypes.js';
import { CartController } from '../controller/cartController.js';
import { CartItemController } from '../controller/cartItemController.js';
import validatorMiddleware from '../../middleware/validatorMiddleware.js';
import { getCartDto, deleteCartDto } from '../dto/cart.dto.js';
import { addCartItemDto, updateCartItemDto, getCartItemsDto, deleteCartItemParamsDto } from '../dto/cartItem.dto.js';

const router = Router();

const cartController = container.get<CartController>(TYPES.CartController);
const cartItemController = container.get<CartItemController>(TYPES.CartItemController);

router.get("/", validatorMiddleware(getCartDto), (req,res,next)=>cartController.getCart(req,res,next));

router.delete("/", validatorMiddleware(deleteCartDto), (req,res,next)=>cartController.deleteCart(req,res,next));

router.post("/item", validatorMiddleware(addCartItemDto), (req,res,next)=>cartItemController.addCartItem(req,res,next));

router.get("/item", validatorMiddleware(getCartItemsDto), (req,res,next)=>cartItemController.getCartItems(req,res,next));

router.put("/item/:id", validatorMiddleware(updateCartItemDto), (req,res,next)=>cartItemController.updateCartItem(req,res,next));

router.delete("/item/:id", validatorMiddleware(deleteCartItemParamsDto), (req,res,next)=>cartItemController.deleteCartItem(req,res,next));

export default router;

