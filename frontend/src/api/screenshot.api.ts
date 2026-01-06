import axios from "./axios.config";
import type {
  Screenshot,
  ScreenshotGroup,
  ScreenshotFilters,
  ScreenshotStats,
} from "../types/screenshot.types";
import type { ApiResponse } from "../types/common.types";

const convertToLocal = (utcTimestamp: string): string => {
  // Remove timezone offset (+00:00) and parse as UTC
  const cleanTimestamp = utcTimestamp.replace(/\+00:00$/, "Z");
  return cleanTimestamp;
};

const normalizeScreenshot = (screenshot: Screenshot): Screenshot => {
  return {
    ...screenshot,
    capturedAt: convertToLocal(screenshot.capturedAt),
    createdAt: convertToLocal(screenshot.createdAt),
  };
};

const normalizeGroupedScreenshots = (
  groups: ScreenshotGroup[]
): ScreenshotGroup[] => {
  return groups.map((group) => ({
    ...group,
    intervals: group.intervals.map((interval) => ({
      ...interval,
      screenshots: interval.screenshots.map(normalizeScreenshot),
    })),
  }));
};

export const screenshotApi = {
  upload: async (file: File, capturedAt?: string): Promise<Screenshot> => {
    const formData = new FormData();
    formData.append("screenshot", file);
    if (capturedAt) {
      formData.append("capturedAt", capturedAt);
    }
    const { data } = await axios.post<ApiResponse<Screenshot>>(
      "/screenshots/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return data.data;
  },

  getAll: async (
    filters: ScreenshotFilters
  ): Promise<Screenshot[] | ScreenshotGroup[]> => {
    const { data } = await axios.get<
      ApiResponse<Screenshot[] | ScreenshotGroup[]>
    >("/screenshots", {
      params: filters,
    });

    console.log("hi 2");
    if (Array.isArray(data.data) && data.data.length > 0) {
      const firstItem = data.data[0];

      // Check if it's grouped (has 'hour' property)
      if ("hour" in firstItem) {
        return normalizeGroupedScreenshots(data.data as ScreenshotGroup[]);
      } else {
        // Flat array of screenshots
        return (data.data as Screenshot[]).map(normalizeScreenshot);
      }
    }
    // console.log("hi", data.data);
    return data.data;
  },

  getStats: async (date?: string): Promise<ScreenshotStats> => {
    const { data } = await axios.get<ApiResponse<ScreenshotStats>>(
      "/screenshots/stats",
      {
        params: { date },
      }
    );

    return data.data;
  },
};
