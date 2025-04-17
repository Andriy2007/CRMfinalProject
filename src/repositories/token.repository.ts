import { FilterQuery } from "mongoose";

import { IToken } from "../interfaces/token.interface";
import { Token } from "../models/token.model";


class TokenRepository {
  public async create(dto: IToken): Promise<IToken> {
    return await Token.create(dto);
  }

  public async findByParams(params: FilterQuery<IToken>): Promise<IToken> {
    return await Token.findOne(params);
  }

  public async deleteByParams(filter: object) {
    await Token.deleteOne(filter);
  }

  public async updateByUserId(userId: string, dto: Partial<IToken>): Promise<void> {
    await Token.findOneAndUpdate({ userId }, dto, { upsert: true });
  }
}

export const tokenRepository = new TokenRepository();
