import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 5000;
export const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/task-manager";
export const JWT_SECRET = process.env.JWT_SECRET || "12747HTFG%^FD%89HJ";
