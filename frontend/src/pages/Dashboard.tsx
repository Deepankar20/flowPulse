// ProjectDashboard.tsx
import { useEffect, useState } from "react";
import ProjectLayout from "../components/ProjectLayout";
import { useAuth } from "@clerk/clerk-react";
import { useParams } from "react-router-dom";
import { DataTable } from "../components/dashboard/DataTable";
import { StatCard } from "../components/dashboard/StatCard";
import { TimeRangeSelector } from "../components/dashboard/TimeRangeSelector";
import type { DateRange } from "../types";

import type { TableData } from "../types";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const ProjectDashboard: React.FC = () => {
  const { userId } = useAuth();
  const { projectId } = useParams<{ projectId: string }>();

  const [pathTableData, setPathTableData] = useState<TableData[]>([]);
  const [viewPageCount, setViewPageCount] = useState<number>();
  const [visitorCount, setVisitorCount] = useState<number>();

  const [viewPageTableData, setViewPageTableData] =
    useState<Map<string, TableData[]>>();
  const [dateRange, setDateRange] = useState<DateRange>({
    fromDate: null,
    toDate: new Date(),
    rangeId: "1year",
    label: "1 year",
  });

  

  async function fetchPageViewCount(eventData: DateRange) {
    try {
      const requestData = {
        projectId: parseInt(projectId || "0"),
        fromDate: eventData.fromDate?.toISOString() || null,
        toDate: eventData.toDate.toISOString(),
      };

      const response = await fetch(
        `${BACKEND_URL}/api/v1/event/getPageViewCount`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${userId}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );

      if (!response.ok) return;

      const data = await response.json();
      setViewPageCount(data.data.viewcount);
      setVisitorCount(data.data.visitorCount);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function fetchViewPageEvents(eventData: DateRange, value: string) {
    try {
      const requestData = {
        projectId: parseInt(projectId || "0"), // Ensure it's a number
        value,
        fromDate: eventData.fromDate?.toISOString() || null,
        toDate: eventData.toDate.toISOString(),
        eventType: "viewpage",
      };

      const response = await fetch(
        `${BACKEND_URL}/api/v1/event/getPageViewEvents`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${userId}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );

      if (!response.ok) return;

      const data = await response.json();

      // Update your table data here
      setViewPageTableData((prev) => {
        const updated = new Map(prev);
        updated.set(value, data.data);
        return updated;
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function fetchPathData(eventData: DateRange) {
    try {
      const requestData = {
        projectId: parseInt(projectId || "0"), // Ensure it's a number
        value: "path",
        fromDate: eventData.fromDate?.toISOString() || null,
        toDate: eventData.toDate.toISOString(),
        eventType: "viewpage",
      };

      const response = await fetch(`${BACKEND_URL}/api/v1/event/getPathsInfo`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${userId}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) return;

      const data = await response.json();
      // Update your table data here
      setPathTableData(data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const handleRangeChange = (range: DateRange) => {
    setDateRange(range);
    fetchPathData(range);
    fetchViewPageEvents(range, "timezone");
    fetchViewPageEvents(range, "browser");
    fetchViewPageEvents(range, "language");
    fetchPageViewCount(range);
  };

  useEffect(() => {
    fetchPathData(dateRange);
    fetchViewPageEvents(dateRange, "timezone");
    fetchViewPageEvents(dateRange, "browser");
    fetchViewPageEvents(dateRange, "language");
    fetchPageViewCount(dateRange);
  }, [projectId, dateRange]);

  return (
    <ProjectLayout currentPage="dashboard" pageTitle="Dashboard">
      <div className="space-y-6">
        {/* Time Range Selector - Added at the top */}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Total Page Views"
            value={`${viewPageCount}`}
            change="+12.5%"
            isPositive={true}
          />
          <StatCard
            title="Unique Visitors"
            value={`${visitorCount}`}
            change="+4.3%"
            isPositive={true}
          />
          <StatCard
            title="Avg. Session Duration"
            value="4m 34s"
            change="-2.1%"
            isPositive={false}
          />
        </div>
        <TimeRangeSelector
          onRangeChange={handleRangeChange}
          selectedRange={dateRange.rangeId}
        />

        {/* Tables */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <DataTable title="Paths" data={pathTableData.slice(0, 3)} />
          <DataTable
            title="Timezone"
            data={viewPageTableData?.get("timezone")?.slice(0, 3)}
          />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <DataTable
            title="Browser"
            data={viewPageTableData?.get("browser")?.slice(0, 3)}
          />
          <DataTable
            title="Language"
            data={viewPageTableData?.get("language")?.slice(0, 3)}
          />
        </div>
      </div>
    </ProjectLayout>
  );
};

export default ProjectDashboard;
