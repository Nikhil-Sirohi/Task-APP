import { Response, NextFunction } from "express";
import { Task } from "../models/task";
import { calculateTimeLapsed, calculateBalanceTime } from "../utils/timeCalc";
import { AuthRequest } from "../middleware/auth";

export const getStats = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user?.id;

    const totalTasks = await Task.countDocuments({ userId });
    const completedTasks = await Task.countDocuments({
      userId,
      status: "finished",
    });
    const pendingTasks = totalTasks - completedTasks;

    const completedPercent = totalTasks
      ? (completedTasks / totalTasks) * 100
      : 0;
    const pendingPercent = totalTasks ? (pendingTasks / totalTasks) * 100 : 0;

    const pendingByPriority = await Task.aggregate([
      { $match: { userId, status: "pending" } },
      {
        $group: {
          _id: "$priority",
          tasks: { $push: "$$ROOT" },
        },
      },
    ]);

    const pendingStats = pendingByPriority.map((group) => ({
      priority: group._id,
      timeLapsed:
        group.tasks.reduce(
          (sum: number, task: any) => sum + calculateTimeLapsed(task.startTime),
          0
        ) / 3600000,
      balanceTime:
        group.tasks.reduce(
          (sum: number, task: any) => sum + calculateBalanceTime(task.endTime),
          0
        ) / 3600000,
    }));

    const completed = await Task.find({ userId, status: "finished" });
    const avgCompletionTime =
      completed.length > 0
        ? completed.reduce(
            (sum, task) =>
              sum + (task.endTime.getTime() - task.startTime.getTime()),
            0
          ) /
          completed.length /
          3600000
        : 0;

    res.status(200).json({
      totalTasks,
      completedPercent,
      pendingPercent,
      pendingStats,
      avgCompletionTime,
    });
  } catch (error) {
    next(error);
  }
};
