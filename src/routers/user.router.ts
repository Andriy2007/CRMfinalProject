import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import {commonMiddleware} from "../middlewares/common.middleware";

const router = Router();

router.get("/",userController.getList);
router.get("/:userId", authMiddleware.checkAccessToken,commonMiddleware.isUserIdValid, userController.getById);
router.put("/:userId",commonMiddleware.isUserIdValid,userController.updateById);
router.delete("/:userId",commonMiddleware.isUserIdValid, userController.deleteById);
router.patch("/ban/:id", authMiddleware.checkAccessToken,userController.banUser);
router.patch("/unban/:id", authMiddleware.checkAccessToken,userController.unbanUser);


export const userRouter = router;
