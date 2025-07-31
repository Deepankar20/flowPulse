import { MoreVertical, Calendar, Eye, Edit } from "lucide-react";
import type { Project } from "../types";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketContext";
import { formatDistanceToNow } from "date-fns";

const formatRelativeTime = (dateString: string) => {
  return formatDistanceToNow(new Date(dateString), { addSuffix: true });
};

export const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const navigate = useNavigate();
  const { setApiKey } = useSocket();

  function handleClick() {
    const newKey = project.apiKey;
    setApiKey(newKey);
    if (newKey) {
      localStorage.setItem("apiKey", newKey);
    } else {
      localStorage.removeItem("apiKey");
    }

    navigate(`/project/${project.id}/dashboard`);
  }

  return (
    <div
      onClick={handleClick}
      className="bg-gray-800 rounded-xl border border-gray-700 hover:border-gray-600 transition-all duration-300 group overflow-hidden"
    >
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
          <div className="flex items-center space-x-2">
            <Calendar size={14} className="text-gray-400" />
            <span className="text-xs text-gray-400">
              created {formatRelativeTime(project.createdAt)}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
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
};
