import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import { useTasks } from "../hooks/useTasks";
import { getTaskById } from "../services/taskService";
import { Task } from "../types/task";

const TaskDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { editTask } = useTasks();
  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    if (id) {
      getTaskById(id)
        .then(setTask)
        .catch((error) => console.error(error));
    }
  }, [id]);

  const handleSubmit = (data: Task) => {
    if (id) {
      editTask(id, data).then(() => navigate("/tasks"));
    }
  };

  if (!task) return <div className="text-gray-600 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-6 max-w-md">
        <h1 className="text-3xl font-bold text-teal-600 mb-6">Edit Task</h1>
        <div className="p-6 bg-white rounded-lg shadow-xl">
          <TaskForm task={task} onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default TaskDetailPage;
