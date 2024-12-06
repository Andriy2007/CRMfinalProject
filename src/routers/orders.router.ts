import { Router } from "express";

import { orderController } from "../controllers/orders.conroller";
import { commonMiddleware } from "../middlewares/common.middleware";
import { OrdersValidator } from "../validators/orders.validator";
import {authMiddleware} from "../middlewares/auth.middleware";



const router = Router();

router.get("/", authMiddleware.checkAccessToken,commonMiddleware.isQueryValid(OrdersValidator.listQuery), orderController.getList,);
router.post("/", authMiddleware.checkAccessToken,orderController.create);
router.get("/:orderId",authMiddleware.checkAccessToken,commonMiddleware.isOrderIdValid, orderController.getById,);
router.put("/:orderId",authMiddleware.checkAccessToken,commonMiddleware.isOrderIdValid, orderController.updateById);
router.delete("/:orderId",authMiddleware.checkAccessToken,commonMiddleware.isOrderIdValid, orderController.deleteById);

export const orderRouter = router;
