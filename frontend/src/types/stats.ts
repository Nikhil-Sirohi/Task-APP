export interface DashboardStats {
  totalTasks: number;
  completedPercent: number;
  pendingPercent: number;
  pendingStats: { priority: number; timeLapsed: number; balanceTime: number }[];
  avgCompletionTime: number;
}
