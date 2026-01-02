import React, { useState } from "react";
import type { Screenshot } from "../../types/screenshot.types";
import { formatDateTime } from "../../utils/formatters";

interface ScreenshotThumbnailProps {
  screenshot: Screenshot;
}

export const ScreenshotThumbnail: React.FC<ScreenshotThumbnailProps> = ({
  screenshot,
}) => {
  // console.log(screenshot.filePath);
  const [open, setOpen] = useState(false);
  const imageUrl = `${screenshot.filePath}`;
  // console.log(imageUrl);

  return (
    <>
      <div
        className="group relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
        onClick={() => setOpen(true)}
      >
        <div className="aspect-video bg-gray-200 relative">
          <img
            src={imageUrl}
            alt={`Screenshot ${screenshot.id}`}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src =
                'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="150"%3E%3Crect fill="%23e5e7eb" width="200" height="150"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" fill="%239ca3af" font-size="14"%3ENo Image%3C/text%3E%3C/svg%3E';
            }}
          />
          {/* <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity" /> */}
        </div>
        <div className="p-3">
          {screenshot.user && (
            <p className="text-sm font-medium text-gray-900 truncate">
              {screenshot.user.fullName}
            </p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            {formatDateTime(screenshot.capturedAt)}
          </p>
        </div>
      </div>
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
          onClick={() => setOpen(false)}
        >
          <div
            className="max-w-6xl max-h-[90vh] p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={imageUrl}
              alt="Screenshot preview"
              className="max-h-[90vh] max-w-full rounded-lg shadow-2xl object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
};
