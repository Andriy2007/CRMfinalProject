import { ApiError } from "../errors/api-error";
import { IUser, IUserListQuery } from "../interfaces/user.interface";
import { UserPresenter } from "../presenter/user.presenter";
import { userRepository } from "../repositories/user.repository";


class UserService {
  public async getList(query: IUserListQuery): Promise<any> {
    const [orders, total] = await userRepository.getList(query);
    return UserPresenter.toResponseList(orders, total, query);
  }
  public async create(dto: Partial<IUser>): Promise<IUser> {
    return await userRepository.create(dto);
  }
  public async getById(userId: string): Promise<IUser> {
    return await this.findUserOrThrow(userId);
  }
  public async updateById(userId: string, dto: Partial<IUser>): Promise<IUser> {
    await this.findUserOrThrow(userId);
    return await userRepository.updateById(userId, dto);
  }
  public async deleteById(userId: string): Promise<void> {
    await this.findUserOrThrow(userId);
    return await userRepository.deleteById(userId);
  }
  public async getByEmail(email: string): Promise<IUser | null> {
    return await userRepository.getByParams({ email });
  }
  private async findUserOrThrow(userId: string): Promise<IUser> {
    const user = await userRepository.getById(userId);
    if (!user) {
      throw new ApiError("user not found", 404);
    }
    return user;
  }
}

export const userService = new UserService();
