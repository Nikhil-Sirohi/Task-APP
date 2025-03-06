import { Task } from "../types/task";
import { Link } from "react-router-dom";

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
      <div>
        <h3 className="text-lg font-semibold">{task.title}</h3>
        <p>Priority: {task.priority}</p>
        <p>Status: {task.status}</p>
        <p>Start: {new Date(task.startTime).toLocaleString()}</p>
        <p>End: {new Date(task.endTime).toLocaleString()}</p>
      </div>
      <div className="space-x-2">
        <Link
          to={`/tasks/${task._id}`}
          className="text-blue-500 hover:underline"
        >
          Edit
        </Link>
        <button
          onClick={() => onDelete(task._id)}
          className="text-red-500 hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
