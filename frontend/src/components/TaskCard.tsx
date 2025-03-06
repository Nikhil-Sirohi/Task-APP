import { Task } from "../types/task";
import { Link } from "react-router-dom";

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete }) => {
  // Calculate total time to finish in hours
  const totalTime =
    (new Date(task.endTime).getTime() - new Date(task.startTime).getTime()) /
    3600000;

  return (
    <div className="bg-gradient-to-br from-white to-teal-50 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-teal-100">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-teal-600 tracking-tight">
            {task.title}
          </h3>
          <div className="text-gray-700 text-sm space-y-1">
            <p>
              <span className="font-medium text-teal-500">Priority:</span>{" "}
              {task.priority}
            </p>
            <p>
              <span className="font-medium text-teal-500">Status:</span>{" "}
              <span
                className={`${
                  task.status === "finished"
                    ? "text-green-500"
                    : "text-orange-500"
                } font-semibold`}
              >
                {task.status}
              </span>
            </p>
            <p>
              <span className="font-medium text-teal-500">Start:</span>{" "}
              {new Date(task.startTime).toLocaleString()}
            </p>
            <p>
              <span className="font-medium text-teal-500">End:</span>{" "}
              {new Date(task.endTime).toLocaleString()}
            </p>
            <p>
              <span className="font-medium text-teal-500">
                Total Time (hrs):
              </span>{" "}
              <span className="text-teal-600 font-semibold">
                {totalTime.toFixed(2)}
              </span>
            </p>
          </div>
        </div>
        <div className="flex space-x-4 items-center">
          <Link
            to={`/tasks/${task._id}`}
            className="px-4 py-1 bg-teal-400 text-white rounded-full hover:bg-teal-500 transition duration-300 shadow-sm text-sm font-medium"
          >
            Edit
          </Link>
          <button
            onClick={() => onDelete(task._id)}
            className="px-4 py-1 bg-red-400 text-white rounded-full hover:bg-red-500 transition duration-300 shadow-sm text-sm font-medium"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
