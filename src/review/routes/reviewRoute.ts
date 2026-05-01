import {Router,Request,Response,NextFunction} from 'express';
import container from '../../dependencyManager/inversify.config.js';
import TYPES from '../../dependencyManager/inversifyTypes.js';
import { ReviewController } from '../controller/reviewController.js';
import validatorMiddleware from '../../middleware/validatorMiddleware.js';
import { createReviewDto, updateReviewDto, getReviewQueryDto, getReviewParamsDto, deleteReviewParamsDto } from '../dto/review.dto.js';

const router = Router();

const reviewController = container.get<ReviewController>(TYPES.ReviewController);

router.post("/", validatorMiddleware(createReviewDto), (req,res,next)=>reviewController.createReview(req,res,next));

router.get("/", validatorMiddleware(getReviewQueryDto), (req,res,next)=>reviewController.getReviews(req,res,next));

router.get("/:id", validatorMiddleware(getReviewParamsDto), (req,res,next)=>reviewController.getReviewById(req,res,next));

router.put("/:id", validatorMiddleware(updateReviewDto), (req,res,next)=>reviewController.updateReview(req,res,next));

router.delete("/:id", validatorMiddleware(deleteReviewParamsDto), (req,res,next)=>reviewController.deleteReview(req,res,next));

export default router;

