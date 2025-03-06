import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import { useStats } from "../hooks/useStats";

const DashboardPage: React.FC = () => {
  const { stats, loading } = useStats();

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard title="Total Tasks" value={stats.totalTasks} />
            <StatCard
              title="Completed (%)"
              value={`${stats.completedPercent.toFixed(1)}%`}
            />
            <StatCard
              title="Pending (%)"
              value={`${stats.pendingPercent.toFixed(1)}%`}
            />
            <StatCard
              title="Avg Completion Time (hrs)"
              value={stats.avgCompletionTime.toFixed(2)}
            />
            {stats.pendingStats.map((stat) => (
              <StatCard
                key={stat.priority}
                title={`Priority ${stat.priority} (Lapsed/Balance)`}
                value={`${stat.timeLapsed.toFixed(
                  2
                )} / ${stat.balanceTime.toFixed(2)} hrs`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
