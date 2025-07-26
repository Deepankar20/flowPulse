import { Home, BarChart3, Users, FileText, Settings } from "lucide-react";

// Shared Sidebar component
const ProjectSidebar: React.FC<{ projectId: string; currentPage: string }> = ({
  projectId,
  currentPage,
}) => {
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
  ];

  return (
    <div className="w-64 bg-gray-800 shadow-xl border-r border-gray-700">
      <div className="flex items-center justify-between p-6 border-b border-gray-700">
        <h1 className="text-xl font-bold text-white">Project {projectId}</h1>
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
  );
};
