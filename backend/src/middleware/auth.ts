import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config";
import { Blacklist } from "../models/blacklist";

export interface AuthRequest extends Request {
  user?: { id: string };
}

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return next(new Error("No token provided"));
    }

    const isBlacklisted = await Blacklist.findOne({ token });
    if (isBlacklisted) {
      return next(new Error("Token is invalid (logged out)"));
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    req.user = { id: decoded.id };
    next();
  } catch (error) {
    next(error);
  }
};
