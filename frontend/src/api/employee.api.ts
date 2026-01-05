import axios from "./axios.config";
import type { Employee, CreateEmployeeData } from "../types/employee.types";
import type { ApiResponse, PaginatedResponse } from "../types/common.types";

export const employeeApi = {
  getAll: async (search?: string, currentPage?: number, perPage?: number) => {
    const { data } = await axios.get<PaginatedResponse<Employee>>(
      "/employees",
      {
        params: { search, currentPage, perPage },
      }
    );
    // console.log(data);
    return data;
  },

  create: async (employeeData: CreateEmployeeData): Promise<Employee> => {
    const { data } = await axios.post<ApiResponse<Employee>>(
      "/employees",
      employeeData
    );
    return data.data;
  },

  getById: async (id: number): Promise<Employee> => {
    const { data } = await axios.get<ApiResponse<Employee>>(`/employees/${id}`);
    return data.data;
  },

  delete: async (id: number): Promise<void> => {
    await axios.delete(`/employees/${id}`);
  },
};
