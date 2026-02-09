import {Router,Request,Response,NextFunction} from 'express';
import container from '../../dependencyManager/inversify.config.js';
import TYPES from '../../dependencyManager/inversifyTypes.js';
import { OrderController } from '../controller/orderController.js';
import { PaymentController } from '../controller/paymentController.js';
import validatorMiddleware from '../../middleware/validatorMiddleware.js';
import { createOrderDto, updateOrderDto, getOrderQueryDto, getOrderParamsDto, deleteOrderParamsDto } from '../dto/order.dto.js';
import { createPaymentDto, updatePaymentDto, getPaymentQueryDto, getPaymentParamsDto } from '../dto/payment.dto.js';

const router = Router();

const orderController = container.get<OrderController>(TYPES.OrderController);
const paymentController = container.get<PaymentController>(TYPES.PaymentController);

router.post("/", validatorMiddleware(createOrderDto), (req,res,next)=>orderController.createOrder(req,res,next));

router.get("/", validatorMiddleware(getOrderQueryDto), (req,res,next)=>orderController.getOrders(req,res,next));

router.get("/:id", validatorMiddleware(getOrderParamsDto), (req,res,next)=>orderController.getOrderById(req,res,next));

router.put("/:id", validatorMiddleware(updateOrderDto), (req,res,next)=>orderController.updateOrder(req,res,next));

router.delete("/:id", validatorMiddleware(deleteOrderParamsDto), (req,res,next)=>orderController.deleteOrder(req,res,next));

router.post("/payment", validatorMiddleware(createPaymentDto), (req,res,next)=>paymentController.createPayment(req,res,next));

router.get("/payment", validatorMiddleware(getPaymentQueryDto), (req,res,next)=>paymentController.getPayments(req,res,next));

router.get("/payment/:id", validatorMiddleware(getPaymentParamsDto), (req,res,next)=>paymentController.getPaymentById(req,res,next));

router.put("/payment/:id", validatorMiddleware(updatePaymentDto), (req,res,next)=>paymentController.updatePayment(req,res,next));

export default router;

