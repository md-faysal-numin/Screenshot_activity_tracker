import axios from "./axios.config";
import type { Employee, CreateEmployeeData } from "../types/employee.types";
import type { ApiResponse } from "../types/common.types";

export const employeeApi = {
  getAll: async (search?: string): Promise<Employee[]> => {
    const { data } = await axios.get<ApiResponse<Employee[]>>("/employees", {
      params: { search },
    });
    return data.data;
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
