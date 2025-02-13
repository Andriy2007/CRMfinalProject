import mongoose from "mongoose";

import { OrderDocument } from "../interfaces/orders.interface";

const orderSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number },
    course: {
      type: String,
      enum: ["FS", "QACX", "JCX", "JSCX", "FE", "PCX"],
    },
    course_format: { type: String, enum: ["static", "online"] },
    course_type: {
      type: String,
      enum: ["pro", "minimal", "premium", "incubator", "vip"],

    },
    status: {
      type: String,
      enum: ["InWork", "New", "Aggre", "Disaggre", "Dubbing"],

    },
    phone: { type: String },
    sum: { type: String },
    alreadyPaid: { type: String },
    group: { type: String },
    created_at: { type: String },
    manager: { type: String },
    msg: { type: String },
    utm: { type: String },
      comment: {
          text: { type: String, required: true },
          author: { type: String, required: true },
          date: { type: String, required: true },
      },
      user_id: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Order = mongoose.model<OrderDocument>("orders", orderSchema);
