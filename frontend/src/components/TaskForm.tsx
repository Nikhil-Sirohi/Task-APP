import { useForm, SubmitHandler } from "react-hook-form";
import { Task } from "../types/task";

interface TaskFormProps {
  task?: Task;
  onSubmit: (data: Task) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ task, onSubmit }) => {
  const { register, handleSubmit } = useForm<Task>({
    defaultValues: task || {
      title: "",
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      priority: 1,
      status: "pending",
    },
  });

  const onFormSubmit: SubmitHandler<Task> = (data) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      <div>
        <label className="block text-gray-700">Title</label>
        <input
          {...register("title", { required: true, maxLength: 100 })}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block text-gray-700">Start Time</label>
        <input
          type="datetime-local"
          {...register("startTime", { required: true })}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block text-gray-700">End Time</label>
        <input
          type="datetime-local"
          {...register("endTime", { required: true })}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block text-gray-700">Priority</label>
        <select
          {...register("priority", { required: true })}
          className="w-full p-2 border rounded"
        >
          {[1, 2, 3, 4, 5].map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-gray-700">Status</label>
        <select
          {...register("status", { required: true })}
          className="w-full p-2 border rounded"
        >
          <option value="pending">Pending</option>
          <option value="finished">Finished</option>
        </select>
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        {task ? "Update Task" : "Create Task"}
      </button>
    </form>
  );
};

export default TaskForm;
