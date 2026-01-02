// src/lib/react-query.ts
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
      refetchOnWindowFocus: false,
      retry: 1,
    },
    mutations: {
      retry: 1,
    },
  },
});

// Query Keys
export const queryKeys = {
  auth: {
    me: ["auth", "me"] as const,
  },
  employees: {
    all: (search?: string) => ["employees", { search }] as const,
    detail: (id: number) => ["employees", id] as const,
  },
  screenshots: {
    all: (filters: any) => ["screenshots", filters] as const,
    stats: (date?: string) => ["screenshots", "stats", { date }] as const,
  },
  plans: {
    all: ["plans"] as const,
    detail: (id: number) => ["plans", id] as const,
  },
};
