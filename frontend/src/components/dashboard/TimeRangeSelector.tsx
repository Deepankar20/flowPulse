import { useState } from "react";

export const TimeRangeSelector = ({
    onRangeChange,
    selectedRange = "alltime",
  }: {
    onRangeChange: any;
    selectedRange: string;
  }) => {
    const [activeRange, setActiveRange] = useState(selectedRange);

    const timeRanges = [
      { id: "1day", label: "1 Day", days: 1 },
      { id: "1week", label: "1 Week", days: 7 },
      { id: "1month", label: "1 Month", days: 30 },
      { id: "90days", label: "90 Days", days: 90 },
      { id: "alltime", label: "All Time", days: null },
    ];

    const calculateFromDate = (days: number | null) => {
      if (days === null) return null;

      const now = new Date();
      const fromDate = new Date(now);
      fromDate.setDate(now.getDate() - days);
      return fromDate;
    };

    const handleRangeSelect = (range: any) => {
      setActiveRange(range.id);
      const fromDate = calculateFromDate(range.days);
      const toDate = new Date();

      onRangeChange({
        fromDate,
        toDate,
        rangeId: range.id,
        label: range.label,
      });
    };

    return (
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-4 mb-6">
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-white mb-1">Time Range</h3>
          <p className="text-gray-400 text-sm">Filter data by time period</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {timeRanges.map((range) => (
            <button
              key={range.id}
              onClick={() => handleRangeSelect(range)}
              className={`
                py-2 px-3 rounded-lg font-medium text-sm transition-all duration-200 border
                ${
                  activeRange === range.id
                    ? "bg-blue-600 text-white border-blue-500"
                    : "bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600 hover:text-white"
                }
              `}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>
    );
  };
  
