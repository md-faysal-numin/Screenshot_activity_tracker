import React from "react";
import { Search, Calendar } from "lucide-react";
import type { Employee } from "../../types/employee.types";
import { Select } from "../common/Select";
import { Input } from "../common/Input";
import { GROUPBY_OPTIONS } from "../../utils/constants";

interface ScreenshotFiltersProps {
  employees: Employee[];
  selectedEmployeeId: string;
  selectedDate: string;
  groupBy: string;
  onEmployeeChange: (employeeId: string) => void;
  onDateChange: (date: string) => void;
  onGroupByChange: (groupBy: string) => void;
}

export const ScreenshotFilters: React.FC<ScreenshotFiltersProps> = ({
  employees,
  selectedEmployeeId,
  selectedDate,
  groupBy,
  onEmployeeChange,
  onDateChange,
  onGroupByChange,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Search size={16} className="inline mr-2" />
            Employee
          </label>
          <Select
            value={selectedEmployeeId}
            onChange={(e) => onEmployeeChange(e.target.value)}
            options={[
              { value: "", label: "All Employees" },
              ...employees.map((emp) => ({
                value: emp.id.toString(),
                label: emp.fullName,
              })),
            ]}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Calendar size={16} className="inline mr-2" />
            Date
          </label>
          <Input
            type="date"
            value={selectedDate}
            onChange={(e) => onDateChange(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Group By
          </label>
          <Select
            value={groupBy}
            onChange={(e) => onGroupByChange(e.target.value)}
            options={GROUPBY_OPTIONS.map((opt) => ({
              value: opt.value,
              label: opt.label,
            }))}
          />
        </div>
      </div>
    </div>
  );
};
