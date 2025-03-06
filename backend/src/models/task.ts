import mongoose, { Schema, Document } from "mongoose";

export interface ITask extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  startTime: Date;
  endTime: Date;
  priority: number;
  status: "pending" | "finished";
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  priority: { type: Number, enum: [1, 2, 3, 4, 5], required: true },
  status: { type: String, enum: ["pending", "finished"], required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

taskSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

export const Task = mongoose.model<ITask>("Task", taskSchema);
