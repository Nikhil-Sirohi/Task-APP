import api from "./api";
import { DashboardStats } from "../types/stats";

export const getStats = async () => {
  const response = await api.get<DashboardStats>("/dashboard/stats");
  return response.data;
};
