import {NextFunction, Request, Response} from "express";

import {IGroup} from "../interfaces/group.interface";
import {groupService} from "../services/group.service";


class GroupController {
    public async getList(req: Request, res: Response, next: NextFunction) {
        try {
            const groups = await groupService.getList();
            res.json(groups);
        } catch (e) {
            next(e);
        }
    }

    public async create(req: Request, res: Response, next: NextFunction) {
        try {
            const dto = req.body as Partial<IGroup>;
            const newGroup = await groupService.create(dto);
            res.status(201).json(newGroup);
        } catch (e) {
            next(e);
        }
    }
}

export const groupController = new GroupController();