// src/hooks/queries/usePlanQueries.ts
import { useQuery } from "@tanstack/react-query";
import { planApi } from "../../api/plan.api";
import { queryKeys } from "../../lib/react-query";

export const usePlans = () => {
  return useQuery({
    queryKey: queryKeys.plans.all,
    queryFn: planApi.getAll,
    staleTime: 1000 * 60 * 60,
  });
};
