export interface Task {
  _id: string;
  title: string;
  startTime: string; // ISO string
  endTime: string; // ISO string
  priority: number;
  status: "pending" | "finished";
}
