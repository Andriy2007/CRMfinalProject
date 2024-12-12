import {IGroup} from "../interfaces/group.interface";
import {groupRepository} from "../repositories/group.repository";


class GroupService {
    public async getList(): Promise<IGroup[]> {
        return await groupRepository.getList();
    }
    public async create(dto: Partial<IGroup>): Promise<IGroup> {
        return await groupRepository.create(dto);
    }
}

export const groupService = new GroupService();