import React from "react";
import { Camera, Users } from "lucide-react";
import type { ScreenshotStats } from "../../types/screenshot.types";
import { Card } from "../common/Card";

interface DashboardStatsProps {
  stats: ScreenshotStats | null | undefined;
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({ stats }) => {
  if (!stats) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <Card>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Total Screenshots</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">
              {stats.total || 0}
            </p>
          </div>
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <Camera className="text-blue-600" size={24} />
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Active Employees</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">
              {stats.active_employees || 0}
            </p>
          </div>
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <Users className="text-green-600" size={24} />
          </div>
        </div>
      </Card>
    </div>
  );
};
