import {
  IUser,
  IUserListQuery,
  IUserResponseList,
} from "../interfaces/user.interface";

export class UserPresenter {
  public static toPublicResponseDto(user: IUser): IUser {
    return {
      _id: user._id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      password: user.password,
      role: user.role,
      isDeleted: user.isDeleted,
      isVerified: user.isVerified,
    };
  }

  public static toPublicResponseListDto(users: IUser[]): IUser[] {
    return users.map(UserPresenter.toPublicResponseDto);
  }

  public static toResponseList(
    data: IUser[],
    total: number,
    query: IUserListQuery,
  ): IUserResponseList {
    return {
      data: data.map((item) => this.toPublicResponseDto(item)),
      total,
      ...query,
    };
  }
}
