import React from "react";
import { User, Mail, Calendar } from "lucide-react";
import type { Employee } from "../../types/employee.types";
import { Card } from "../common/Card";
import { formatDate } from "../../utils/formatters";

interface EmployeeCardProps {
  employee: Employee;
}

export const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee }) => {
  return (
    <Card>
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="text-blue-600" size={24} />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {employee.fullName}
            </h3>
            <div className="flex items-center space-x-2 mt-1 text-sm text-gray-600">
              <Mail size={14} />
              <span>{employee.email}</span>
            </div>
            <div className="flex items-center space-x-2 mt-1 text-sm text-gray-500">
              <Calendar size={14} />
              <span>Joined {formatDate(employee.createdAt)}</span>
            </div>
          </div>
        </div>

        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
          Active
        </span>
      </div>
    </Card>
  );
};
