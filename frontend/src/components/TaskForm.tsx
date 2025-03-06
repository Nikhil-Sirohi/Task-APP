import { useForm, SubmitHandler } from "react-hook-form";
import { Task } from "../types/task";

interface TaskFormProps {
  task?: Task;
  onSubmit: (data: Task) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ task, onSubmit }) => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<Task>({
    defaultValues: task || {
      title: "",
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      priority: 1,
      status: "pending",
    },
  });

  const startTime = watch("startTime");
  const endTime = watch("endTime");

  const onFormSubmit: SubmitHandler<Task> = (data) => {
    if (new Date(data.endTime) <= new Date(data.startTime)) {
      setError("endTime", {
        type: "manual",
        message: "End time must be after start time",
      });
      return;
    }
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      <div>
        <label className="block text-gray-700 font-medium">Title</label>
        <input
          {...register("title", { required: true, maxLength: 100 })}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
        />
        {errors.title && (
          <p className="text-red-500 text-sm">
            Title is required, max 100 chars
          </p>
        )}
      </div>
      <div>
        <label className="block text-gray-700 font-medium">Start Time</label>
        <input
          type="datetime-local"
          {...register("startTime", { required: true })}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
        />
        {errors.startTime && (
          <p className="text-red-500 text-sm">Start time is required</p>
        )}
      </div>
      <div>
        <label className="block text-gray-700 font-medium">End Time</label>
        <input
          type="datetime-local"
          {...register("endTime", { required: true })}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
        />
        {errors.endTime && (
          <p className="text-red-500 text-sm">
            {errors.endTime.message || "End time is required"}
          </p>
        )}
      </div>
      <div>
        <label className="block text-gray-700 font-medium">Priority</label>
        <select
          {...register("priority", { required: true })}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
        >
          {[1, 2, 3, 4, 5].map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-gray-700 font-medium">Status</label>
        <select
          {...register("status", { required: true })}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
        >
          <option value="pending">Pending</option>
          <option value="finished">Finished</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full p-3 bg-teal-400 text-white rounded-lg hover:bg-teal-500 transition duration-300 shadow-md"
      >
        {task ? "Update Task" : "Create Task"}
      </button>
    </form>
  );
};

export default TaskForm;
