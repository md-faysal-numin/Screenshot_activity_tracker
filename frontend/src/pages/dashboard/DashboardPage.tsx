import React, { useState } from "react";
import { Layout } from "../../components/layout/Layout";
import { DashboardStats } from "../../components/dashboard/DashboardStats";
import { UploadScreenshot } from "../../components/dashboard/UploadScreenshot";
import { ScreenshotFilters } from "../../components/dashboard/ScreenshotFilters";
import { ScreenshotGrouped } from "../../components/dashboard/ScreenshotGrouped";
import { ScreenshotGrid } from "../../components/dashboard/ScreenshotGrid";
import { useAuth } from "../../context/AuthContext";
import {
  useScreenshots,
  useScreenshotStats,
} from "../../hooks/queries/useScreenshotQueries";
import { useEmployees } from "../../hooks/queries/useEmployeeQueries";
import { getDateString, getUserTimezone } from "../../utils/formatters";
import { Spinner } from "../../components/common/Spinner";
import type {
  ScreenshotGroup,
  Screenshot,
  ScreenshotFilters as IScreenshotFilters,
} from "../../types/screenshot.types";

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const isOwner = user?.role === "owner";

  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const [selectedDate, setSelectedDate] = useState(getDateString(new Date()));
  const [groupBy, setGroupBy] = useState<"5min" | "10min" | "all">("5min");

  // Fetch employees (owner only)
  const { data } = useEmployees({ enabled: isOwner });
  const employees = data?.data || [];

  // Build filters
  const filters: IScreenshotFilters = {
    date: selectedDate,
    ...(selectedEmployeeId && { userId: parseInt(selectedEmployeeId) }),
    ...(groupBy !== "all" && { groupBy }),
    // timezone: getUserTimezone(),
  };

  // Fetch screenshots
  const { data: screenshots = [], isLoading: screenshotsLoading } =
    useScreenshots(filters, isOwner);

  // Fetch stats
  const { data: stats } = useScreenshotStats(selectedDate, isOwner);

  const isGrouped = groupBy !== "all";

  // console.log(screenshots);

  return (
    <Layout>
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {isOwner ? "Admin Dashboard" : "My Dashboard"}
        </h1>
        <p className="text-gray-600 mb-6">
          {isOwner
            ? "Monitor team activity and manage screenshots"
            : "Upload your screenshots and track your activity"}
        </p>

        {/* Stats */}
        {stats && <DashboardStats stats={stats} />}

        <div className="grid grid-cols-1 gap-6 mb-6">
          {/* Employee Upload Section */}
          {!isOwner && (
            <div>
              <UploadScreenshot />
            </div>
          )}

          {/* Owner Filters Section */}
          {isOwner && (
            <div>
              <ScreenshotFilters
                employees={employees}
                selectedEmployeeId={selectedEmployeeId}
                selectedDate={selectedDate}
                groupBy={groupBy}
                onEmployeeChange={setSelectedEmployeeId}
                onDateChange={setSelectedDate}
                onGroupByChange={(value) =>
                  setGroupBy(value as "5min" | "10min" | "all")
                }
              />
            </div>
          )}
        </div>

        {/* Screenshots Display */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {isOwner ? "Team Screenshots" : "My Screenshots"}
          </h2>

          {screenshotsLoading ? (
            <div className="flex justify-center py-12">
              <Spinner size="lg" />
            </div>
          ) : isGrouped ? (
            <ScreenshotGrouped groups={screenshots as ScreenshotGroup[]} />
          ) : (
            <ScreenshotGrid screenshots={screenshots as Screenshot[]} />
          )}
        </div>
      </div>
    </Layout>
  );
};
