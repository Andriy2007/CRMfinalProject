import {Router} from "express";

import {groupController} from "../controllers/group.controller";
import {authMiddleware} from "../middlewares/auth.middleware";


const router = Router();
router.get("/",authMiddleware.checkAccessToken,groupController.getList);
router.post("/",authMiddleware.checkAccessToken,groupController.create);

export const groupRouter = router;
