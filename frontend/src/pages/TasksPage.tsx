import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard";
import FilterBar from "../components/FilterBar";
import SortControls from "../components/SortControls";
import PaginationControls from "../components/PaginationControls";
import TaskForm from "../components/TaskForm";
import { useTasks } from "../hooks/useTasks";
import { Task } from "../types/task";

const TasksPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<{
    priority?: number;
    status?: string;
  }>({});
  const [sortBy, setSortBy] = useState<"startTime" | "endTime" | undefined>(
    undefined
  );
  const [showForm, setShowForm] = useState(false);
  const { tasks, totalPages, loading, fetchTasks, addTask, removeTask } =
    useTasks();

  useEffect(() => {
    fetchTasks(page, filters, sortBy);
  }, [page, filters, sortBy]);

  const handleFilter = (newFilters: { priority?: number; status?: string }) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setPage(1);
  };

  const handleSort = (newSortBy: "startTime" | "endTime") => {
    setSortBy(newSortBy);
  };

  const handleAddTask = async (data: Task) => {
    await addTask(data); // No _id needed for new task
    setShowForm(false);
    fetchTasks(page, filters, sortBy); // Refresh task list
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Tasks</h1>
        <button
          onClick={() => setShowForm(true)}
          className="mb-4 px-4 py-2 bg-green-500 text-white rounded"
        >
          Add New Task
        </button>
        {showForm && (
          <div className="mb-4 p-4 bg-white rounded-lg shadow-md">
            <TaskForm onSubmit={handleAddTask} />
            <button
              onClick={() => setShowForm(false)}
              className="mt-2 px-4 py-2 bg-gray-500 text-white rounded"
            >
              Cancel
            </button>
          </div>
        )}
        <FilterBar onFilter={handleFilter} />
        <SortControls onSort={handleSort} />
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="space-y-4">
            {tasks.map((task) => (
              <TaskCard key={task._id} task={task} onDelete={removeTask} />
            ))}
          </div>
        )}
        <PaginationControls
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default TasksPage;
