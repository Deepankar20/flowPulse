// Analytics.tsx
import { useEffect, useState } from "react";
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
import { TimeRangeSelector } from "./dashboard/TimeRangeSelector";
import type { DateRange } from "../types";
import { useParams } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

interface DataPoint {
  date: string;
  views: number;
}

interface AnalyticsProps {
  data?: DataPoint[];
}

const Analytics: React.FC<AnalyticsProps> = ({ data }) => {
  const { projectId } = useParams<{ projectId: string }>();
  const { userId } = useAuth();

  const [viewsChart, setViewsChart] =
    useState<{ date: string; views: number }[]>();

  const [dateRange, setDateRange] = useState<DateRange>({
    fromDate: new Date(),
    toDate: new Date(),
    rangeId: "1year",
    label: "1 year",
  });

  async function fetchViewsByDay(daterange: DateRange) {
    try {
      const requestData = {
        projectId: parseInt(projectId || "0"),
        fromDate: daterange.fromDate?.toISOString() || null,
        toDate: daterange.toDate.toISOString(),
      };

      const res = await fetch(`${BACKEND_URL}/api/v1/event/getViewsByDay`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${userId}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!res.ok) return;

      const data = await res.json();

      const raw = data.data;

      const viewsChart = raw?.map((d: any) => ({
        date: new Date(d.date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        views: d.views,
      }));

      setViewsChart(viewsChart);
      console.log(viewsChart);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchViewsByDay(dateRange);
  }, [projectId, dateRange]);

  const handleRangeChange = (range: DateRange) => {
    setDateRange(range);
    fetchViewsByDay(range);
  };

  // Transform data for charts

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

      <TimeRangeSelector
        onRangeChange={handleRangeChange}
        selectedRange={dateRange.rangeId}
      />

      {/* Top Row - Main Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Page Views Chart */}
        <div className="bg-gray-900 p-6 rounded-lg shadow-sm border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Page Views</h3>
          <div className="text-white" style={{ height: "450px" }}>
            {viewsChart ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={viewsChart}>
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
            ) : (
              "No data to display"
            )}
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="bg-gray-900 p-6 rounded-lg shadow-sm border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">
            Unique Visitors
          </h3>
          <div style={{ height: "450px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={viewsChart}>
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
          <div style={{ height: "450px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={viewsChart}>
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
              <LineChart data={viewsChart}>
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
    </div>
  );
};

export default Analytics;
