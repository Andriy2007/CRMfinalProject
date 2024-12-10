import mongoose from "mongoose";


import {GroupDocument} from "../interfaces/group.interface";

const groupSchema = new mongoose.Schema(
    {
        name: { type: String },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export const Group = mongoose.model<GroupDocument>("groups", groupSchema);
