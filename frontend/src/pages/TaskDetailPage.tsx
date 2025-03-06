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

  if (!task) return <div>Loading...</div>;

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4 max-w-md">
        <h1 className="text-2xl font-bold mb-4">Edit Task</h1>
        <TaskForm task={task} onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default TaskDetailPage;
