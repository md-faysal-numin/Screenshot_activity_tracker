// src/components/employees/DeleteEmployeeModal.tsx
import React from "react";
import { Modal } from "../common/Modal";
import { Button } from "../common/Button";
import { AlertTriangle } from "lucide-react";
import { useDeleteEmployee } from "../../hooks/queries/useEmployeeQueries";
import type { Employee } from "../../types/employee.types";

interface DeleteEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  employee: Employee | null;
}

export const DeleteEmployeeModal: React.FC<DeleteEmployeeModalProps> = ({
  isOpen,
  onClose,
  employee,
}) => {
  const deleteEmployeeMutation = useDeleteEmployee();

  //   console.log(employee);
  const handleDelete = async () => {
    if (!employee) return;

    try {
      await deleteEmployeeMutation.mutateAsync(employee.id);
      onClose();
    } catch (error) {
      // Error handled by mutation
    }
  };

  if (!employee) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Employee" size="sm">
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <div className="shrink-0">
            <AlertTriangle className="text-red-600" size={24} />
          </div>
          <div>
            <p className="text-gray-900">
              Are you sure you want to delete{" "}
              <span className="font-semibold">{employee.fullName}</span>?
            </p>
            <p className="text-sm text-gray-600 mt-2">
              This action cannot be undone. All screenshots and data associated
              with this employee will be permanently deleted.
            </p>
          </div>
        </div>

        <div className="flex space-x-3 pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            className="flex-1"
            disabled={deleteEmployeeMutation.isPending}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="danger"
            onClick={handleDelete}
            isLoading={deleteEmployeeMutation.isPending}
            className="flex-1"
          >
            Delete Employee
          </Button>
        </div>
      </div>
    </Modal>
  );
};
