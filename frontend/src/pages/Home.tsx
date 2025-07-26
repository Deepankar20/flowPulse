// HomePage.tsx
import { useState } from "react";
import {
  Home,
  Plus,
  Search,
  Filter,
  Grid,
  List,
  Bell,
  Settings,
  User,
  Calendar,
  Clock,
  Users,
  Star,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
} from "lucide-react";
import type { Project } from "../types";
import { ProjectCard } from "../components/ProjectCard";
import { ProjectListItem } from "../components/ProjectListItem";
import { Navbar } from "../components/Navbar";

const HomePage: React.FC = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Sample projects data
  const projects: Project[] = [
    {
      id: 1,
      name: "E-commerce Platform",
      description:
        "Modern React-based e-commerce solution with advanced features",
      status: "Active",
      progress: 75,
      dueDate: "2024-02-15",
      team: ["JD", "SM", "RP", "AK"],
      priority: "High",
      category: "Web Development",
      lastUpdated: "2 hours ago",
    },
  ];

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filterStatus === "all" ||
      project.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-[#0B192C]">
      {/* Navbar */}
      <Navbar />
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">My Projects</h1>
          <p className="text-gray-400">
            Manage and track all your projects in one place
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center space-x-4 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <Search
                size={20}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-80 pl-10 pr-4 py-2 bg-[#000000] border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-[#000000] border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="on hold">On Hold</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center bg-[#000000] rounded-lg border border-gray-700 p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === "grid"
                    ? "bg-blue-600 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <Grid size={18} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === "list"
                    ? "bg-blue-600 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <List size={18} />
              </button>
            </div>

            <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
              <Plus size={18} />
              <span>New Project</span>
            </button>
          </div>
        </div>

        {/* Projects Grid/List */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {/* List Header */}
            <div className="bg-[#000000] rounded-xl border border-gray-700 p-6">
              <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-400">
                <div className="col-span-3">Project</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-2">Progress</div>
                <div className="col-span-2">Team</div>
                <div className="col-span-2">Due Date</div>
                <div className="col-span-1">Actions</div>
              </div>
            </div>

            {filteredProjects.map((project) => (
              <ProjectListItem key={project.id} project={project} />
            ))}
          </div>
        )}

        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-[#000000] rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">
              No projects found
            </h3>
            <p className="text-gray-400">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>

      {/* Click outside to close user menu */}
      {showUserMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </div>
  );
};

export default HomePage;
