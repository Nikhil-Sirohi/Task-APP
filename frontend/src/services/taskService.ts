import api from "./api";
import { Task } from "../types/task";

export const getTasks = async (
  page: number,
  filters: { priority?: number; status?: string },
  sortBy?: "startTime" | "endTime"
) => {
  const response = await api.get<{
    tasks: Task[];
    total: number;
    pages: number;
  }>("/tasks", {
    params: { page, ...filters, sortBy },
  });
  return response.data;
};

export const getTaskById = async (id: string) => {
  const response = await api.get<Task>(`/tasks/${id}`);
  return response.data;
};

export const createTask = async (task: Omit<Task, "_id">) => {
  const response = await api.post<Task>("/tasks", task);
  return response.data;
};

export const updateTask = async (id: string, task: Partial<Task>) => {
  const response = await api.put<Task>(`/tasks/${id}`, task);
  return response.data;
};

export const deleteTask = async (id: string) => {
  await api.delete(`/tasks/${id}`);
};
