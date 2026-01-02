import React from "react";
import type { Employee } from "../../types/employee.types";
import { EmployeeCard } from "./EmployeeCard";
import { Spinner } from "../common/Spinner";

interface EmployeeListProps {
  employees: Employee[];
  isLoading: boolean;
}

export const EmployeeList: React.FC<EmployeeListProps> = ({
  employees,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner size="lg" />
      </div>
    );
  }

  if (employees.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No employees found</p>
        <p className="text-gray-400 text-sm mt-2">
          Add your first employee to get started
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {employees.map((employee) => (
        <EmployeeCard key={employee.id} employee={employee} />
      ))}
    </div>
  );
};
