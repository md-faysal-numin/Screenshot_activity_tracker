import axios from "./axios.config";
import type { Plan } from "../types/auth.types";
import type { ApiResponse } from "../types/common.types";

export const planApi = {
  getAll: async (): Promise<Plan[]> => {
    const { data } = await axios.get<ApiResponse<Plan[]>>("/plans");
    return data.data;
  },

  getById: async (id: number): Promise<Plan> => {
    const { data } = await axios.get<ApiResponse<Plan>>(`/plans/${id}`);
    return data.data;
  },
};
