import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import {commonMiddleware} from "../middlewares/common.middleware";
import {UserValidator} from "../validators/user.validator";



const router = Router();
router.get("/",authMiddleware.checkAccessToken,commonMiddleware.isQueryValid(UserValidator.listQuery),userController.getList);
router.get("/:userId",authMiddleware.checkAccessToken,commonMiddleware.isUserIdValid, userController.getById);
router.put("/:userId",authMiddleware.checkAccessToken,commonMiddleware.isUserIdValid,userController.updateById);
router.delete("/:userId",authMiddleware.checkAccessToken,commonMiddleware.isUserIdValid, userController.deleteById);
router.patch("/ban/:id",authMiddleware.checkAccessToken,userController.banUser);
router.patch("/unban/:id", authMiddleware.checkAccessToken,userController.unbanUser);

export const userRouter = router;
