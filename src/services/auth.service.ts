import bcrypt from "bcrypt";

import { ApiError } from "../errors/api-error";
import { ITokenResponse } from "../interfaces/token.interface";
import {IPublicUser, IUser, IUsers} from "../interfaces/user.interface";
import { tokenRepository } from "../repositories/token.repository";
import { userRepository } from "../repositories/user.repository";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";
import {UserPresenter} from "../presenter/user.presenter";
import {RoleEnum} from "../enums/role.enum";


class AuthService {
  public async signUp(
      dto: Partial<IUser>,
  ): Promise<{ user: IUser; tokens: ITokenResponse }> {
    await this.isEmailExist(dto.email);
    const userRole = dto.role || RoleEnum.Manager;
    const user = await userRepository.create({
      ...dto,
      role: userRole,
      password: '',
    });
    const tokens = tokenService.generatePair({
      userId: user._id.toString(),
      role: user.role,
    });
    const activationToken = tokenService.generateActivationToken(user._id.toString());
    await tokenRepository.create({
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      activationToken,
      userId: user._id.toString(),
    });
    return { user, tokens };
  }

  public async generateActivationLink(userId: string): Promise<string> {
    const activationToken = tokenService.generateActivationToken(userId);
    const activationUrl = `http://localhost:3000/set-password/${activationToken}`;
    return activationUrl;
  }

  public async setPassword(token: string, newPassword: string): Promise<void> {
    const decoded = tokenService.checkActivationToken(token);
    if (!decoded || !decoded.userId) throw new ApiError("Invalid or expired token", 401);
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await userRepository.updateById(decoded.userId, {
      password: hashedPassword,
      isVerified: true,
    });
  }

  public async generateRecoveryLink(userId: string): Promise<string> {
    const recoveryToken = tokenService.generateActivationToken(userId);
    await tokenRepository.updateByUserId(userId, { recoveryToken });
    return `http://localhost:3000/set-password/${recoveryToken}`;
  }

  public async setNewPassword(token: string, newPassword: string): Promise<void> {
    const tokenData = await tokenRepository.findByParams({ recoveryToken: token });
    if (!tokenData) throw new ApiError("Invalid or expired token", 401);
    const user = await userRepository.getById(tokenData.userId);
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await userRepository.updateById(user._id.toString(), { password: hashedPassword });
    await tokenRepository.updateByUserId(user._id.toString(), { recoveryToken: null });
  }

  public async signIn(dto: { email: string; password: string; }): Promise<{ user: IUsers; tokens: ITokenResponse }>{
    const user = await userRepository.getByParams({ email: dto.email });
    if (!user) {
      throw new ApiError("Wrong email or password", 401);
    }
    if (user.isBanned) {
      throw new ApiError("Your account is banned. Contact support.", 403);
    }
    const isCompare = await passwordService.comparePassword(
      dto.password,
      user.password,
    );
    if (!isCompare) {
      throw new ApiError("Wrong email or password", 401);
    }
    const tokens = tokenService.generatePair({
      userId: user._id,
      role: user.role,
    });
    await tokenRepository.create({
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      userId: user._id,
    });
    const publicUser = UserPresenter.toPublicResponseDto(user);
    return { user: publicUser, tokens };
  }

  private async isEmailExist(email: string): Promise<void> {
    const user = await userRepository.getByParams({ email });
    if (user) {
      throw new ApiError("email already exist", 409);
    }
  }

  public async refreshToken(refreshToken: string): Promise<{ tokens: ITokenResponse; user: IPublicUser  }> {
    const payload = tokenService.checkRefreshToken(refreshToken);
    if (!payload) {
      throw new ApiError("Invalid refresh token", 401);
    }
    const existingToken = await tokenRepository.findByParams({ refreshToken });
    if (!existingToken) {
      throw new ApiError("Invalid refresh token", 401);
    }
    const user = await userRepository.getById(payload.userId);
    if (!user) {
      throw new ApiError("User not found", 401);
    }
    await tokenRepository.deleteByParams({ refreshToken });
    const tokens = tokenService.generatePair({
      userId: user._id.toString(),
      role: user.role,
    });
    await tokenRepository.updateByUserId(user._id.toString(), {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    });
    const publicUser = UserPresenter.toPublicResponseDto(user);
    return { tokens, user: publicUser };
  }
}

export const authService = new AuthService();
