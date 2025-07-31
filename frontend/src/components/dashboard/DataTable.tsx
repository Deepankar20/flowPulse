import type { TableData } from "../../types";

export const DataTable: React.FC<{
  title: string;
  data: TableData[] | undefined;
}> = ({ title, data }) => (
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
              {data && data.length > 0 && data[0].views ? "Views" : ""}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Visitors
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-800 divide-y divide-gray-700">
          {data &&
            data.map((item) => (
              <tr key={item.id} className="hover:bg-gray-700 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-200">
                  {item.path?.trim()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {item.views}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
                  {item.visitors}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  </div>
);
