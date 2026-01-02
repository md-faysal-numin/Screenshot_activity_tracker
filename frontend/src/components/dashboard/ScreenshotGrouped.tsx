import React from "react";
import type { ScreenshotGroup } from "../../types/screenshot.types";
import { parseTimeString } from "../../utils/formatters";
// import { API_BASE_URL } from "../../utils/constants";
import { Card } from "../common/Card";
import { ScreenshotThumbnail } from "./ScreenshotThumbnail";

interface ScreenshotGroupedProps {
  groups: ScreenshotGroup[];
}

export const ScreenshotGrouped: React.FC<ScreenshotGroupedProps> = ({
  groups,
}) => {
  if (groups.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No screenshots found</p>
        <p className="text-gray-400 text-sm mt-2">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {groups.map((group) => (
        <div key={group.hour} className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900 flex items-center">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-lg">
              {group.hour.toString().padStart(2, "0")}:00
            </span>
            <span className="ml-3 text-gray-600">Hour {group.hour}</span>
          </h3>

          {group.intervals.map((interval) => (
            <Card key={interval.interval} className="mb-4">
              <div className="mb-4">
                <h4 className="text-lg font-medium text-gray-700">
                  {parseTimeString(interval.startTime)} -{" "}
                  {parseTimeString(interval.endTime)}
                </h4>
                <p className="text-sm text-gray-500 mt-1">
                  {interval.screenshots.length} screenshot
                  {interval.screenshots.length !== 1 ? "s" : ""}
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {interval.screenshots.map((screenshot) => (
                  <ScreenshotThumbnail
                    key={screenshot.id}
                    screenshot={screenshot}
                  />
                ))}
              </div>
            </Card>
          ))}
        </div>
      ))}
    </div>
  );
};
