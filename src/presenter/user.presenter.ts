import {IPublicUser, IUser, IUserListQuery, IUserResponse, IUserResponseList} from "../interfaces/user.interface";


export class UserPresenter {
  public static toPublicResponseDto(user: IUser): IUserResponse  {
    return {
      _id: user._id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      role: user.role,
      isDeleted: user.isDeleted,
      isVerified: user.isVerified,
      isBanned: user.isBanned,

    };
  }

  public static toPublicResponseListDto(users: IUser[]): IPublicUser[] {
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
