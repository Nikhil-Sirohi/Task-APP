import mongoose, { Schema, Document } from "mongoose";

export interface IBlacklist extends Document {
  token: string;
  createdAt: Date;
}

const blacklistSchema: Schema = new Schema({
  token: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now, expires: "1h" },
});

export const Blacklist = mongoose.model<IBlacklist>(
  "Blacklist",
  blacklistSchema
);
