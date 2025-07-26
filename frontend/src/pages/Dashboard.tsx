// ProjectDashboard.tsx
import { useState } from "react";
import ProjectLayout from "../components/ProjectLayout";

interface TableData {
  id: number;
  name: string;
  status: string;
  date: string;
  value: number;
}

const ProjectDashboard: React.FC = () => {
  // Sample data for tables
  const sampleData: TableData[] = [
    {
      id: 1,
      name: "Project Alpha",
      status: "Active",
      date: "2024-01-15",
      value: 1250,
    },
    {
      id: 2,
      name: "Project Beta",
      status: "Pending",
      date: "2024-01-14",
      value: 890,
    },
    {
      id: 3,
      name: "Project Gamma",
      status: "Completed",
      date: "2024-01-13",
      value: 2340,
    },
    {
      id: 4,
      name: "Project Delta",
      status: "Active",
      date: "2024-01-12",
      value: 1560,
    },
    {
      id: 5,
      name: "Project Epsilon",
      status: "On Hold",
      date: "2024-01-11",
      value: 720,
    },
  ];

  const StatCard: React.FC<{
    title: string;
    value: string;
    change: string;
    isPositive: boolean;
  }> = ({ title, value, change, isPositive }) => (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 hover:border-gray-600 transition-colors">
      <h3 className="text-sm font-medium text-gray-400 mb-2">{title}</h3>
      <div className="flex items-end justify-between">
        <div className="text-2xl font-bold text-white">{value}</div>
        <div
          className={`text-sm font-medium ${
            isPositive ? "text-green-400" : "text-red-400"
          }`}
        >
          {change}
        </div>
      </div>
    </div>
  );

  const DataTable: React.FC<{ title: string; data: TableData[] }> = ({
    title,
    data,
  }) => (
    <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-700">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Value
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-gray-700 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-200">
                  {item.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      item.status === "Active"
                        ? "bg-green-900 text-green-300 border border-green-700"
                        : item.status === "Pending"
                        ? "bg-yellow-900 text-yellow-300 border border-yellow-700"
                        : item.status === "Completed"
                        ? "bg-blue-900 text-blue-300 border border-blue-700"
                        : "bg-gray-700 text-gray-300 border border-gray-600"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {item.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
                  ${item.value.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <ProjectLayout currentPage="dashboard" pageTitle="Dashboard">
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Total Page Views"
            value="120"
            change="+12.5%"
            isPositive={true}
          />
          <StatCard
            title="Unique Visitors"
            value="24"
            change="+4.3%"
            isPositive={true}
          />
          <StatCard
            title="Avg. Session Duration"
            value="4m 34s"
            change="-2.1%"
            isPositive={false}
          />
        </div>

        {/* Tables */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <DataTable title="Paths" data={sampleData.slice(0, 3)} />
          <DataTable title="Top Performers" data={sampleData.slice(2, 5)} />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <DataTable title="Pending Tasks" data={sampleData.slice(1, 4)} />
          <DataTable
            title="Revenue Breakdown"
            data={sampleData.slice(0, 4)}
          />
        </div>
      </div>
    </ProjectLayout>
  );
};

export default ProjectDashboard;
