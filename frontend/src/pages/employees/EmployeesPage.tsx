import React, { useState } from "react";
import { Layout } from "../../components/layout/Layout";
import { EmployeeList } from "../../components/employees/EmployeeList";
import { AddEmployeeModal } from "../../components/employees/AddEmployeeModal";
import { useEmployees } from "../../hooks/queries/useEmployeeQueries";
import { Button } from "../../components/common/Button";
import { Input } from "../../components/common/Input";
import { UserPlus, Search } from "lucide-react";
import { useDebounce } from "../../hooks/useDebounce";
import { PaginationInfo } from "../../components/common/PaginationInfo";
import { Pagination } from "../../components/common/Pagination";

export const EmployeesPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;
  const debouncedSearch = useDebounce(searchTerm, 500);

  const { data, isLoading } = useEmployees(
    debouncedSearch,
    currentPage,
    perPage
  );
  const employees = data?.data || [];
  const meta = data?.meta || null;
 


  
  return (
    <Layout>
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Employees</h1>
            <p className="text-gray-600">Manage your team members</p>
          </div>

          <Button onClick={() => setIsModalOpen(true)}>
            <UserPlus size={20} className="mr-2" />
            Add Employee
          </Button>
        </div>

        <div className="mb-6">
          <div className="relative max-w-md">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <Input
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <EmployeeList employees={employees} isLoading={isLoading} />
        {meta && meta.total > 0 && (
          <>
            <Pagination
              currentPage={meta.currentPage}
              totalPages={meta.lastPage}
              onPageChange={setCurrentPage}
            />
            <PaginationInfo
              currentPage={meta.currentPage}
              perPage={meta.perPage}
              total={meta.total}
            />
          </>
        )}
        <AddEmployeeModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </Layout>
  );
};
