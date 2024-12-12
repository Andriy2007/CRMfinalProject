import { Router } from "express";

import { authController } from "../controllers/auth.controller";
import { commonMiddleware } from "../middlewares/common.middleware";
import { UserValidator } from "../validators/user.validator";


const router = Router();
router.post("/sign-up", commonMiddleware.isBodyValid(UserValidator.create), authController.signUp,);
router.post("/sign-in", commonMiddleware.isBodyValid(UserValidator.login), authController.signIn,);
router.post("/send-activation-link", authController.sendActivationLink);
router.post("/send-recovery-link", authController.sendRecoveryLink);
router.post("/set-password", authController.setPassword);
router.post("/set-NewPassword", authController.setNewPassword);


export const authRouter = router;
