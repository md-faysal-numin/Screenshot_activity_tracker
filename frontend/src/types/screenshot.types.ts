export interface Screenshot {
  id: number;
  userId: number;
  companyId: number;
  filePath: string;
  capturedDate: string;
  capturedAt: string;
  user?: {
    id: number;
    fullName: string;
    email: string;
  };
}

export interface ScreenshotGroup {
  hour: number;
  intervals: {
    interval: string;
    startTime: string;
    endTime: string;
    screenshots: Screenshot[];
  }[];
}

export interface ScreenshotFilters {
  userId?: number;
  date?: string;
  startDate?: string;
  endDate?: string;
  groupBy?: "5min" | "10min" | "all";
  timezone?: string;
}

export interface ScreenshotStats {
  total: number;
  active_employees: number;
}
