import React from "react";
import type { Screenshot } from "../../types/screenshot.types";
import { ScreenshotThumbnail } from "./ScreenshotThumbnail";

interface ScreenshotGridProps {
  screenshots: Screenshot[];
}

export const ScreenshotGrid: React.FC<ScreenshotGridProps> = ({
  screenshots,
}) => {
  if (screenshots.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No screenshots found</p>
        <p className="text-gray-400 text-sm mt-2">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {screenshots.map((screenshot) => (
        <ScreenshotThumbnail key={screenshot.id} screenshot={screenshot} />
      ))}
    </div>
  );
};
