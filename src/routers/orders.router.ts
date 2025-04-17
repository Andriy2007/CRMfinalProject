import { Router } from "express";

import { orderController } from "../controllers/orders.conroller";
import { commonMiddleware } from "../middlewares/common.middleware";

import {authMiddleware} from "../middlewares/auth.middleware";
import {OrdersValidator} from "../validators/orders.validator";

const router = Router();
router.get("/", authMiddleware.checkAccessToken, commonMiddleware.isQueryValid(OrdersValidator.listQuery), orderController.getList);
router.get("/export",authMiddleware.checkAccessToken, orderController.exportToExcel);
router.get("/:orderId",authMiddleware.checkAccessToken,commonMiddleware.isOrderIdValid, orderController.getById,);
router.put("/:orderId",authMiddleware.checkAccessToken,commonMiddleware.isOrderIdValid, orderController.updateById);

export const orderRouter = router;
