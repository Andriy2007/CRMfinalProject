import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { isAdmin } from "../middlewares/userrole.middleware";
import {commonMiddleware} from "../middlewares/common.middleware";

const router = Router();

router.get("/", authMiddleware.checkAccessToken, isAdmin, userController.getList);
router.get("/:userId", authMiddleware.checkAccessToken,commonMiddleware.isUserIdValid, userController.getById);
router.put("/:userId", authMiddleware.checkAccessToken,commonMiddleware.isUserIdValid,userController.updateById);
router.delete("/:userId",authMiddleware.checkAccessToken,commonMiddleware.isUserIdValid, userController.deleteById);

export const userRouter = router;
