// src/hooks/queries/useScreenshotQueries.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { screenshotApi } from "../../api/screenshot.api";
import { queryKeys } from "../../lib/react-query";
import type { ScreenshotFilters } from "../../types/screenshot.types";
import toast from "react-hot-toast";

export const useScreenshots = (
  filters: ScreenshotFilters,
  enabled: boolean
) => {
  return useQuery({
    queryKey: queryKeys.screenshots.all(filters),
    queryFn: () => screenshotApi.getAll(filters),
    enabled: !!filters.date && enabled,
  });
};

export const useScreenshotStats = (date?: string, enabled?: boolean) => {
  return useQuery({
    queryKey: queryKeys.screenshots.stats(date),
    queryFn: () => screenshotApi.getStats(date),
    enabled,
  });
};

export const useUploadScreenshot = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ file, capturedAt }: { file: File; capturedAt?: string }) =>
      screenshotApi.upload(file, capturedAt),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["screenshots"] });
      toast.success("Screenshot uploaded successfully");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Failed to upload screenshot"
      );
    },
  });
};
