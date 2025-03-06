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
    await addTask(data);
    setShowForm(false);
    fetchTasks(page, filters, sortBy);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-teal-600 mb-6">Tasks</h1>
        <button
          onClick={() => setShowForm(true)}
          className="mb-6 px-6 py-3 bg-teal-400 text-white rounded-full hover:bg-teal-500 transition duration-300 shadow-md"
        >
          Add New Task
        </button>
        {showForm && (
          <div className="mb-6 p-6 bg-white rounded-lg shadow-xl">
            <TaskForm onSubmit={handleAddTask} />
            <button
              onClick={() => setShowForm(false)}
              className="mt-4 px-6 py-2 bg-gray-300 text-gray-800 rounded-full hover:bg-gray-400 transition duration-300"
            >
              Cancel
            </button>
          </div>
        )}
        <FilterBar onFilter={handleFilter} />
        <SortControls onSort={handleSort} />
        {loading ? (
          <div className="text-gray-600 text-center">Loading...</div>
        ) : (
          <div className="space-y-6">
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
