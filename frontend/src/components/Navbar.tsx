import { Home, Bell, User, Settings } from "lucide-react";
import ClerkButton from "./ClerkButton";

export const Navbar = () => {
  return (
    <nav className="bg-gray-800 border-b border-gray-700 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">FP</span>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              flowPulse
            </h1>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <a
              href="#"
              className="flex items-center space-x-2 text-blue-400 font-medium"
            >
              <Home size={18} />
              <span>Projects</span>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Analytics
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Team
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Reports
            </a>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-lg hover:bg-gray-700 text-gray-400 hover:text-white transition-colors relative">
            <Bell size={20} />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
              3
            </div>
          </button>

          <div className="relative">
            <ClerkButton/>
          </div>
        </div>
      </div>
    </nav>
  );
};
