import axios from "./axios.config";
import type {
  Screenshot,
  ScreenshotGroup,
  ScreenshotFilters,
  ScreenshotStats,
} from "../types/screenshot.types";
import type { ApiResponse } from "../types/common.types";

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
