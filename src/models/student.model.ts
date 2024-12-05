import mongoose from "mongoose";

import { OrderDocument } from "../interfaces/student.interface";

const orderSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number },
    course: {
      type: String,
      enum: ["FS", "QACX", "JCX", "JSCX", "FE", "PCX"],
      required: true,
    },
    course_format: { type: String, enum: ["static", "online"], required: true },
    course_type: {
      type: String,
      enum: ["pro", "minimal", "premium", "incubator", "vip"],
      required: true,
    },
    status: {
      type: String,
      enum: ["Inwork", "New", "Aggre", "Disaggre", "Dubbing"],
      required: true,
    },
    phone: { type: String },
    sum: { type: String },
    alreadyPaid: { type: String },
    group: { type: String },
    created_at: { type: String },
    manager: { type: String },
    msg: { type: String },
    utm: { type: String },
    comment: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Order = mongoose.model<OrderDocument>("orders", orderSchema);
