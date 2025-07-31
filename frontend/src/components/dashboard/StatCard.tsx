export const StatCard: React.FC<{
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