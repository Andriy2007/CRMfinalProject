import {Router} from "express";
import {groupController} from "../controllers/group.controller";



const router = Router();

router.get("/",groupController.getList);
router.post("/",groupController.create);


export const groupRouter = router;
