import { RoleEnum } from "../enums/role.enum";

export interface IUser {
  _id: string;
  name: string;
  surname: string;
  email: string;
  password: string;
  role: RoleEnum;
  isDeleted: boolean;
  isVerified: boolean;
}

export interface IUserListQuery {
  limit?: number;
  page?: number;
}
export interface IUserResponseList extends IUserListQuery {
  data: IUser[];
  total: number;
}

export interface UserDocument extends IUser, Document {}
