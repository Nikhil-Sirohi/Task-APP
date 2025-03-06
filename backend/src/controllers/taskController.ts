import { Response, NextFunction } from "express";
import { Task, ITask } from "../models/task";
import { validateTask } from "../utils/validator";
import { AuthRequest } from "../middleware/auth";

export const createTask = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { error } = validateTask(req.body);
    if (error) {
      res.status(400).json({ message: error.details[0].message });
      return;
    }

    const task = new Task({
      ...req.body,
      userId: req.user?.id,
    });
    await task.save();

    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

export const getTasks = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { priority, status, sortBy, page = 1, limit = 10 } = req.query;

    const query: any = { userId: req.user?.id };
    if (priority) query.priority = Number(priority);
    if (status) query.status = status;

    const sort: any = {};
    if (sortBy) sort[sortBy as string] = 1;

    const tasks = await Task.find(query)
      .sort(sort)
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    const total = await Task.countDocuments(query);

    res.status(200).json({
      tasks,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
    });
  } catch (error) {
    next(error);
  }
};

export const getTaskById = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.user?.id,
    });
    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { error } = validateTask(req.body, true);
    if (error) {
      res.status(400).json({ message: error.details[0].message });
      return;
    }

    if (req.body.status === "finished") {
      req.body.endTime = new Date();
    }

    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user?.id },
      req.body,
      { new: true }
    );
    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.user?.id,
    });
    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    next(error);
  }
};
