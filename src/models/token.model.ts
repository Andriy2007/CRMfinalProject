import mongoose, { Types } from "mongoose";

import { IToken } from "../interfaces/token.interface";
import { User } from "./user.model";


const tokenSchema = new mongoose.Schema(
  {
    accessToken: { type: String, },
    refreshToken: { type: String, },
      activationToken: { type: String, required: false },
    userId: { type: Types.ObjectId, required: true, ref: User },
      recoveryToken: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Token = mongoose.model<IToken>("tokens", tokenSchema);
