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
  manager?: string;
  isBanned: boolean;
}

export interface IPublicUser {
  _id: string;
  name: string;
  surname: string;
  email: string;
  role: RoleEnum;
  isDeleted: boolean;
  isVerified: boolean;
}

export interface IUsers {
  _id: string;
  name: string;
  surname: string;
  email: string;
  role: RoleEnum;
  isDeleted: boolean;
  isVerified: boolean;
}

export interface IUserResponse
    extends Pick<
        IUser,
        | "_id"
        | "name"
        | "surname"
        | "email"
        | "role"
        | "isDeleted"
        | "isVerified"
        | "isBanned"
    >{}

export interface IUserListQuery {
  limit?: number;
  page?: number;
}

export interface IUserResponseList extends IUserListQuery {
  data: IUsers[];
  total: number;
}

export interface UserDocument extends IUser, Document {}
