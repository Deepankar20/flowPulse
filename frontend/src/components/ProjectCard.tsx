import { MoreVertical, Calendar, Clock, Eye, Edit } from "lucide-react";
import type { Project } from "../types";

const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-900 text-green-300 border-green-700";
      case "Completed":
        return "bg-blue-900 text-blue-300 border-blue-700";
      case "On Hold":
        return "bg-gray-700 text-gray-300 border-gray-600";
      case "Pending":
        return "bg-yellow-900 text-yellow-300 border-yellow-700";
      default:
        return "bg-gray-700 text-gray-300 border-gray-600";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "text-red-400";
      case "Medium":
        return "text-yellow-400";
      case "Low":
        return "text-green-400";
      default:
        return "text-gray-400";
    }
  };

export const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
    <div className="bg-gray-800 rounded-xl border border-gray-700 hover:border-gray-600 transition-all duration-300 group overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-gray-100 transition-colors">
              {project.name}
            </h3>
            <p className="text-gray-400 text-sm mb-3 line-clamp-2">
              {project.description}
            </p>
          </div>
          <div className="relative">
            <button className="p-2 rounded-lg hover:bg-gray-700 text-gray-400 hover:text-white transition-colors">
              <MoreVertical size={16} />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <span
            className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(
              project.status
            )}`}
          >
            {project.status}
          </span>
          <span
            className={`text-xs font-medium ${getPriorityColor(
              project.priority
            )}`}
          >
            {project.priority} Priority
          </span>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Progress</span>
            <span className="text-sm font-medium text-white">
              {project.progress}%
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Calendar size={14} className="text-gray-400" />
            <span className="text-xs text-gray-400">
              Due: {project.dueDate}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock size={14} className="text-gray-400" />
            <span className="text-xs text-gray-400">{project.lastUpdated}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex -space-x-2">
            {project.team.slice(0, 3).map((member, index) => (
              <div
                key={index}
                className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-medium border-2 border-gray-800"
              >
                {member}
              </div>
            ))}
            {project.team.length > 3 && (
              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-gray-300 text-xs font-medium border-2 border-gray-800">
                +{project.team.length - 3}
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <button className="p-2 rounded-lg hover:bg-gray-700 text-gray-400 hover:text-white transition-colors">
              <Eye size={16} />
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-700 text-gray-400 hover:text-white transition-colors">
              <Edit size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );