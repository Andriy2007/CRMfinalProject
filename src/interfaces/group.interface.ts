export interface IGroup {
    _id: string;
    name: string;
}
export interface GroupDocument extends IGroup, Document {}