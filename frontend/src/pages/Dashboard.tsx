// Dashboard.tsx
import { useState } from "react";
import {
  Home,
  BarChart3,
  Users,
  Settings,
  FileText,
  Menu,
  X,
} from "lucide-react";
import ClerkButton from "../components/ClerkButton";

interface SidebarItem {
  id: string;
  name: string;
  icon: React.ReactNode;
}

interface TableData {
  id: number;
  name: string;
  status: string;
  date: string;
  value: number;
}

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  

  const sidebarItems: SidebarItem[] = [
    { id: "overview", name: "Overview", icon: <Home size={20} /> },
    { id: "analytics", name: "Analytics", icon: <BarChart3 size={20} /> },
    { id: "users", name: "Users", icon: <Users size={20} /> },
    { id: "reports", name: "Reports", icon: <FileText size={20} /> },
    { id: "settings", name: "Settings", icon: <Settings size={20} /> },
  ];

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
  }> = ({ title, value, change, isPositive }: any) => (
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
  }: any) => (
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
            {data.map((item: any) => (
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

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard
                title="Total Revenue"
                value="$12,426"
                change="+12.5%"
                isPositive={true}
              />
              <StatCard
                title="Active Projects"
                value="24"
                change="+4.3%"
                isPositive={true}
              />
              <StatCard
                title="Completion Rate"
                value="89.2%"
                change="-2.1%"
                isPositive={false}
              />
            </div>

            {/* Tables */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <DataTable
                title="Recent Projects"
                data={sampleData.slice(0, 3)}
              />
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
        );

      case "analytics":
        return (
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-4">Analytics</h2>
            <p className="text-gray-400">
              Analytics content will be displayed here.
            </p>
          </div>
        );

      case "users":
        return (
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-4">Users</h2>
            <p className="text-gray-400">
              User management content will be displayed here.
            </p>
          </div>
        );

      case "reports":
        return (
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-4">Reports</h2>
            <p className="text-gray-400">
              Reports content will be displayed here.
            </p>
          </div>
        );

      case "settings":
        return (
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-4">Settings</h2>
            <p className="text-gray-400">
              Settings content will be displayed here.
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Sidebar */}
      <div
        className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 shadow-xl border-r border-gray-700 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        {/* Project Name Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h1 className="text-xl font-bold text-white">My Dashboard</h1>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-1 rounded-md hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-6">
          <div className="px-3">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center px-3 py-2 mb-1 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === item.id
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-gray-400 hover:bg-gray-700 hover:text-white"
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </button>
            ))}
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-gray-800 shadow-lg border-b border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
            >
              <Menu size={20} />
            </button>
            <h2 className="text-lg font-semibold text-white capitalize">
              {activeTab}
            </h2>
            <div className="flex items-center space-x-4">
              <ClerkButton />
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-900 p-6">
          {renderContent()}
        </main>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;
