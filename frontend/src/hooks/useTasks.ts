import { useState, useEffect } from "react";
import { Task } from "../types/task";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from "../services/taskService";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchTasks = async (
    page: number = 1,
    filters: { priority?: number; status?: string } = {},
    sortBy?: "startTime" | "endTime"
  ) => {
    setLoading(true);
    try {
      const { tasks, total, pages } = await getTasks(page, filters, sortBy);
      setTasks(tasks);
      setTotalPages(pages);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (task: Omit<Task, "_id">) => {
    const newTask = await createTask(task);
    setTasks((prev) => [...prev, newTask]);
  };

  const editTask = async (id: string, task: Partial<Task>) => {
    const updatedTask = await updateTask(id, task);
    setTasks((prev) => prev.map((t) => (t._id === id ? updatedTask : t)));
  };

  const removeTask = async (id: string) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t._id !== id));
  };

  return {
    tasks,
    totalPages,
    loading,
    fetchTasks,
    addTask,
    editTask,
    removeTask,
  };
};
