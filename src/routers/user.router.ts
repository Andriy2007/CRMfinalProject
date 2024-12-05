import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { isAdmin } from "../middlewares/userrole.middleware";
import {commonMiddleware} from "../middlewares/common.middleware";

const router = Router();

router.get("/", authMiddleware.checkCredentials, isAdmin, userController.getList);
router.get("/:userId", commonMiddleware.isUserIdValid, userController.getById);
router.put("/:userId", commonMiddleware.isUserIdValid,userController.updateById);
router.delete("/:userId",commonMiddleware.isUserIdValid, userController.deleteById);

export const userRouter = router;
