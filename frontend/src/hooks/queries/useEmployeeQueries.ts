// src/hooks/queries/useEmployeeQueries.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { employeeApi } from "../../api/employee.api";
import { queryKeys } from "../../lib/react-query";
import type { CreateEmployeeData } from "../../types/employee.types";
import toast from "react-hot-toast";

interface UseEmployeesParams {
  search?: string;
  currentPage?: number;
  perPage?: number;
  // enabled?: boolean;
}
export const useEmployees = ({
  search,
  currentPage,
  perPage,
}: // options = {}
UseEmployeesParams) => {
  return useQuery({
    queryKey: queryKeys.employees.all(search, currentPage, perPage),
    queryFn: () => employeeApi.getAll(search, currentPage, perPage),
    // ...options,
  });
};

export const useCreateEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateEmployeeData) => employeeApi.create(data),
    retry: false,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      toast.success("Employee added successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to add employee");
    },
  });
};

export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => employeeApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      toast.success("Employee deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to delete employee");
    },
  });
};
