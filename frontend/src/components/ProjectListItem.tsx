import { Eye, Edit, MoreVertical } from "lucide-react";
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

export const ProjectListItem: React.FC<{ project: Project }> = ({
  project,
}) => (
  <div className="bg-gray-800 rounded-xl border border-gray-700 hover:border-gray-600 transition-all duration-300 p-6">
    <div className="flex items-center justify-between">
      <div className="flex-1 grid grid-cols-12 gap-4 items-center">
        <div className="col-span-3">
          <h3 className="text-lg font-semibold text-white mb-1">
            {project.name}
          </h3>
          <p className="text-gray-400 text-sm">{project.category}</p>
        </div>

        <div className="col-span-2">
          <span
            className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(
              project.status
            )}`}
          >
            {project.status}
          </span>
        </div>

        <div className="col-span-2">
          <div className="flex items-center space-x-2">
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${project.progress}%` }}
              />
            </div>
            <span className="text-sm text-white whitespace-nowrap">
              {project.progress}%
            </span>
          </div>
        </div>

        <div className="col-span-2">
          <div className="flex -space-x-2">
            {project.team.slice(0, 3).map((member, index) => (
              <div
                key={index}
                className="w-7 h-7 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-medium border-2 border-gray-800"
              >
                {member}
              </div>
            ))}
            {project.team.length > 3 && (
              <div className="w-7 h-7 bg-gray-700 rounded-full flex items-center justify-center text-gray-300 text-xs font-medium border-2 border-gray-800">
                +{project.team.length - 3}
              </div>
            )}
          </div>
        </div>

        <div className="col-span-2">
          <p className="text-sm text-gray-400">{project.dueDate}</p>
        </div>

        <div className="col-span-1">
          <div className="flex items-center space-x-2">
            <button className="p-2 rounded-lg hover:bg-gray-700 text-gray-400 hover:text-white transition-colors">
              <Eye size={16} />
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-700 text-gray-400 hover:text-white transition-colors">
              <Edit size={16} />
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-700 text-gray-400 hover:text-white transition-colors">
              <MoreVertical size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);
