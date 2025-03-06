import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import { useStats } from "../hooks/useStats";

const DashboardPage: React.FC = () => {
  const { stats, loading } = useStats();

  if (loading)
    return <div className="text-gray-600 text-center py-20">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-teal-50">
      <Navbar />
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-extrabold text-teal-600 mb-8 text-center animate-fade-in">
          Dashboard
        </h1>
        {stats && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatCard
              title="Total Tasks"
              value={stats.totalTasks}
              className="bg-white hover:bg-teal-50 border-teal-200"
            />
            <StatCard
              title="Completed (%)"
              value={`${stats.completedPercent.toFixed(1)}%`}
              className="bg-white hover:bg-green-50 border-green-200"
            />
            <StatCard
              title="Pending (%)"
              value={`${stats.pendingPercent.toFixed(1)}%`}
              className="bg-white hover:bg-orange-50 border-orange-200"
            />
            <StatCard
              title="Avg Completion Time (hrs)"
              value={stats.avgCompletionTime.toFixed(2)}
              className="bg-white hover:bg-purple-50 border-purple-200"
            />
            {stats.pendingStats.map((stat) => (
              <StatCard
                key={stat.priority}
                title={`Priority ${stat.priority} (Lapsed/Balance)`}
                value={`${stat.timeLapsed.toFixed(
                  2
                )} / ${stat.balanceTime.toFixed(2)} hrs`}
                className="bg-white hover:bg-blue-50 border-blue-200"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
