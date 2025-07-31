// components/ProjectLayout.tsx
import { useEffect, useState, type ReactNode } from "react";
import { useParams } from "react-router-dom";
import {
  Home,
  BarChart3,
  Users,
  Settings,
  FileText,
  Menu,
  X,
} from "lucide-react";
import ClerkButton from "./ClerkButton";
import { useSocket } from "../context/SocketContext";

interface ProjectLayoutProps {
  children: ReactNode;
  currentPage: string;
  pageTitle: string;
}

const ProjectLayout: React.FC<ProjectLayoutProps> = ({
  children,
  currentPage,
  pageTitle,
}) => {
  const { projectId } = useParams<{ projectId: string }>();
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  // Sample data for tables

  const sidebarItems = [
    {
      id: "dashboard",
      name: "Dashboard",
      icon: <Home size={20} />,
      path: `/project/${projectId}/dashboard`,
    },
    {
      id: "analytics",
      name: "Analytics",
      icon: <BarChart3 size={20} />,
      path: `/project/${projectId}/analytics`,
    },
    {
      id: "users",
      name: "Users",
      icon: <Users size={20} />,
      path: `/project/${projectId}/users`,
    },
    {
      id: "reports",
      name: "Reports",
      icon: <FileText size={20} />,
      path: `/project/${projectId}/reports`,
    },
    {
      id: "settings",
      name: "Settings",
      icon: <Settings size={20} />,
      path: `/project/${projectId}/settings`,
    },
    {
      id: "home",
      name: "home",
      icon: <Home size={20} />,
      path: "/",
    },
  ];

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Sidebar */}
      <div
        className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 shadow-xl border-r border-gray-700 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h1 className="text-xl font-bold text-white">Project {projectId}</h1>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-1 rounded-md hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="mt-6">
          <div className="px-3">
            {sidebarItems.map((item) => (
              <a
                key={item.id}
                href={item.path}
                className={`w-full flex items-center px-3 py-2 mb-1 text-lg font-medium rounded-lg transition-colors ${
                  currentPage === item.id
                    ? "bg-slate-600 text-white shadow-lg"
                    : "text-gray-400 hover:bg-gray-700 hover:text-white"
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </a>
            ))}
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-gray-800 shadow-lg border-b border-gray-700 px-6 py-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
            >
              <Menu size={20} />
            </button>
            <h2 className="text-xl font-semibold text-white">{pageTitle}</h2>
            <ClerkButton />
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-900 p-6">
          {children}
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

export default ProjectLayout;
