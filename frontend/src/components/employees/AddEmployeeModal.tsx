import React, { useState } from "react";
import { Modal } from "../common/Modal";
import { Button } from "../common/Button";
import { Input } from "../common/Input";
import { useCreateEmployee } from "../../hooks/queries/useEmployeeQueries";

interface AddEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type FieldErrors = {
  [key: string]: string;
};
type FieldName = keyof FieldErrors;

export const AddEmployeeModal = ({
  isOpen,
  onClose,
}: AddEmployeeModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const createEmployeeMutation = useCreateEmployee();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createEmployeeMutation.mutateAsync(formData);
      setFormData({ name: "", email: "", password: "" });
      onClose();
    } catch (error: any) {
      if (error.response?.status === 422) {
        const errors: FieldErrors = {};

        error.response.data.errors.forEach(
          (err: { field: FieldName; message: string; rule: string }) => {
            errors[err.field] = err.message;
          }
        );

        setFieldErrors(errors);
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Employee">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Full Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Jane Smith"
          required
        />
        {fieldErrors.name && (
          <p className="text-sm text-red-600 mt-1">{fieldErrors.name}</p>
        )}

        <Input
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="jane@company.com"
          required
        />
        {fieldErrors.email && (
          <p className="text-sm text-red-600 mt-1">{fieldErrors.email}</p>
        )}

        <Input
          label="Password"
          type="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          placeholder="••••••••"
          minLength={6}
          required
        />
        {fieldErrors.password && (
          <p className="text-sm text-red-600 mt-1">{fieldErrors.password}</p>
        )}

        <div className="flex space-x-3 pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            isLoading={createEmployeeMutation.isPending}
            className="flex-1"
          >
            Add Employee
          </Button>
        </div>
      </form>
    </Modal>
  );
};
