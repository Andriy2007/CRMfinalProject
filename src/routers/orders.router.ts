import { Router } from "express";

import { orderController } from "../controllers/orders.conroller";
import { commonMiddleware } from "../middlewares/common.middleware";
import { OrdersValidator } from "../validators/orders.validator";



const router = Router();

router.get(
  "/",
  commonMiddleware.isQueryValid(OrdersValidator.listQuery),
  orderController.getList,
);
router.post("/", orderController.create);
router.get("/:orderId",commonMiddleware.isOrderIdValid, orderController.getById,);
router.put("/:orderId",commonMiddleware.isOrderIdValid, orderController.updateById);
router.delete("/:orderId",commonMiddleware.isOrderIdValid, orderController.deleteById);

export const orderRouter = router;
