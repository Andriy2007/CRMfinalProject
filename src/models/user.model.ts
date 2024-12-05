import mongoose from "mongoose";

import { UserDocument } from "../interfaces/user.interface";

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    surname: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["Manager", "ADMIN"] },
    isDeleted: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const User = mongoose.model<UserDocument>("users", userSchema);
