// Analytics.tsx
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface DataPoint {
  date: string;
  views: number;
}

interface AnalyticsProps {
  data?: DataPoint[];
}

const Analytics: React.FC<AnalyticsProps> = ({ data }) => {
  // Sample data if none provided
  const sampleData = data || [
    { date: "2025-01-01", views: 120 },
    { date: "2025-01-02", views: 135 },
    { date: "2025-01-03", views: 150 },
    { date: "2025-01-04", views: 142 },
    { date: "2025-01-05", views: 168 },
    { date: "2025-01-06", views: 185 },
    { date: "2025-01-07", views: 195 },
    { date: "2025-01-08", views: 210 },
    { date: "2025-01-09", views: 225 },
    { date: "2025-01-10", views: 240 },
    { date: "2025-01-11", views: 255 },
    { date: "2025-01-12", views: 270 },
  ];

  // Transform data for charts
  const chartData = sampleData.map((d: any) => ({
    date: new Date(d.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    views: d.views,
    users: Math.floor(d.views * 0.2), // Derived metric
    revenue: Math.floor(d.views * 2.1), // Derived metric
    sessions: Number((d.views * 0.03).toFixed(1)), // Derived metric
  }));

  return (
    <div className="space-y-6">
      {/* Analytics Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">
          Analytics Dashboard
        </h2>
        <p className="text-gray-400">
          Track your key performance metrics over time
        </p>
      </div>

      {/* Top Row - Main Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        {/* Page Views Chart */}
        <div className="bg-gray-900 p-6 rounded-lg shadow-sm border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">
            Page Views Over Time
          </h3>
          <div style={{ height: "550px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12, fill: "#9CA3AF" }}
                  stroke="#6B7280"
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "#9CA3AF" }}
                  stroke="#6B7280"
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    border: "1px solid #374151",
                    borderRadius: "6px",
                    color: "#F3F4F6",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="views"
                  stroke="#1FB8CD"
                  strokeWidth={3}
                  dot={{ fill: "#1FB8CD", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: "#1FB8CD" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="bg-gray-900 p-6 rounded-lg shadow-sm border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">
            Revenue Growth
          </h3>
          <div style={{ height: "550px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12, fill: "#9CA3AF" }}
                  stroke="#6B7280"
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "#9CA3AF" }}
                  stroke="#6B7280"
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    border: "1px solid #374151",
                    borderRadius: "6px",
                    color: "#F3F4F6",
                  }}
                  formatter={(value: any) => [`$${value}k`, "Revenue"]}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#10B981"
                  strokeWidth={3}
                  dot={{ fill: "#10B981", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: "#10B981" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Row - Secondary Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Users Chart */}
        <div className="bg-gray-900 p-6 rounded-lg shadow-sm border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">User Growth</h3>
          <div style={{ height: "350px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12, fill: "#9CA3AF" }}
                  stroke="#6B7280"
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "#9CA3AF" }}
                  stroke="#6B7280"
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    border: "1px solid #374151",
                    borderRadius: "6px",
                    color: "#F3F4F6",
                  }}
                  formatter={(value: any) => [`${value}k`, "Users"]}
                />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#8B5CF6"
                  strokeWidth={3}
                  dot={{ fill: "#8B5CF6", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: "#8B5CF6" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Session Duration Chart */}
        <div className="bg-gray-900 p-6 rounded-lg shadow-sm border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">
            Average Session Duration
          </h3>
          <div style={{ height: "350px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12, fill: "#9CA3AF" }}
                  stroke="#6B7280"
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "#9CA3AF" }}
                  stroke="#6B7280"
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    border: "1px solid #374151",
                    borderRadius: "6px",
                    color: "#F3F4F6",
                  }}
                  formatter={(value: any) => [`${value} min`, "Avg Session"]}
                />
                <Line
                  type="monotone"
                  dataKey="sessions"
                  stroke="#F59E0B"
                  strokeWidth={3}
                  dot={{ fill: "#F59E0B", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: "#F59E0B" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="bg-gray-900 p-6 rounded-lg shadow-sm border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">Key Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-900/20 rounded-lg border border-blue-800">
            <div className="text-2xl font-bold text-blue-400">
              {chartData[chartData.length - 1]?.users}k
            </div>
            <div className="text-sm text-gray-400">Total Users</div>
            <div className="text-xs text-green-400">
              +13.2% from last period
            </div>
          </div>
          <div className="text-center p-4 bg-green-900/20 rounded-lg border border-green-800">
            <div className="text-2xl font-bold text-green-400">
              ${chartData[chartData.length - 1]?.revenue}k
            </div>
            <div className="text-sm text-gray-400">Total Revenue</div>
            <div className="text-xs text-green-400">
              +15.2% from last period
            </div>
          </div>
          <div className="text-center p-4 bg-purple-900/20 rounded-lg border border-purple-800">
            <div className="text-2xl font-bold text-purple-400">
              {chartData[chartData.length - 1]?.sessions} min
            </div>
            <div className="text-sm text-gray-400">Avg Session</div>
            <div className="text-xs text-green-400">+3.6% from last period</div>
          </div>
          <div className="text-center p-4 bg-amber-900/20 rounded-lg border border-amber-800">
            <div className="text-2xl font-bold text-amber-400">
              {chartData[chartData.length - 1]?.views}
            </div>
            <div className="text-sm text-gray-400">Page Views</div>
            <div className="text-xs text-green-400">+7.4% from last period</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
