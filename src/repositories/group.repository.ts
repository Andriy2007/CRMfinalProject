import {IGroup} from "../interfaces/group.interface";
import {Group} from "../models/group.model";


class GroupRepository {
    public async getList(): Promise<IGroup[]> {
        return await Group.find({});
    }
    public async create(dto: Partial<IGroup>): Promise<IGroup> {
        return await Group.create(dto);
    }
}

export const groupRepository = new GroupRepository();