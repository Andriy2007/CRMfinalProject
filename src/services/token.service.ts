import * as jsonwebtoken from "jsonwebtoken";

import { config } from "../configs/config";
import { ApiError } from "../errors/api-error";
import { IJWTPayload } from "../interfaces/jwt-payload.interface";
import { ITokenResponse } from "../interfaces/token.interface";


class TokenService {
  public generatePair(payload: IJWTPayload): ITokenResponse {
    const accessToken = jsonwebtoken.sign(payload, config.JWT_ACCESS_SECRET, {
      expiresIn: config.JWT_ACCESS_EXPIRES_IN,
    });
    const refreshToken = jsonwebtoken.sign(payload, config.JWT_REFRESH_SECRET, {
      expiresIn: config.JWT_REFRESH_EXPIRES_IN,
    });
    return {
      accessToken,
      accessExpiresIn: config.JWT_ACCESS_EXPIRES_IN,
      refreshToken,
      refreshExpiresIn: config.JWT_REFRESH_EXPIRES_IN,
    };
  }

  public checkToken(token: string): IJWTPayload {
    try {
      return jsonwebtoken.verify(token, config.JWT_ACCESS_SECRET) as IJWTPayload;
    } catch (error) {
      throw new ApiError("Token is not valid", 401);
    }
  }

  public generateActivationToken(userId: string): string {
    return jsonwebtoken.sign(
        { userId },
        config.JWT_ACTIVATION_SECRET,
        { expiresIn: '30m' }
    );
  }

  public checkActivationToken(token: string): { userId: string } {
    try {
      return jsonwebtoken.verify(token, config.JWT_ACTIVATION_SECRET) as { userId: string };
    } catch (error) {
      throw new ApiError("Activation token is not valid", 401);
    }
  }

  public checkRefreshToken(token: string): IJWTPayload {
    try {
      return jsonwebtoken.verify(token, config.JWT_REFRESH_SECRET) as IJWTPayload;
    } catch (error) {
      throw new ApiError("Refresh token is not valid", 401);
    }
  }
}

export const tokenService = new TokenService();
