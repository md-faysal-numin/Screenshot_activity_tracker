import React, { useState } from "react";
import { useRegister } from "../../hooks/queries/useAuthQueries";
import { usePlans } from "../../hooks/queries/usePlanQueries";
import { Button } from "../common/Button";
import { Input } from "../common/Input";
import { Select } from "../common/Select";
// import toast from "react-hot-toast";

type FieldErrors = {
  [key: string]: string;
};
type FieldName = keyof FieldErrors;
export const RegisterForm: React.FC = () => {
  const { data: plans = [], isLoading: plansLoading } = usePlans();
  const registerMutation = useRegister();

  const [formData, setFormData] = useState({
    ownerName: "",
    ownerEmail: "",
    ownerPassword: "",
    companyName: "",
    planId: "",
  });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  React.useEffect(() => {
    if (plans.length > 0 && !formData.planId) {
      setFormData((prev) => ({ ...prev, planId: plans[0].id.toString() }));
    }
  }, [plans, formData.planId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    registerMutation.mutate(
      {
        ...formData,
        planId: parseInt(formData.planId),
      },
      {
        onError: (error) => {
        // console.log(error, "asi form a");
          if (error.response?.status === 422) {
            const errors: FieldErrors = {};

            error.response.data.errors.forEach(
              (err: { field: FieldName; message: string; rule: string }) => {
                errors[err.field] = err.message;
              }
            );

            setFieldErrors(errors);
          }
        },
      }
    );
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (plansLoading) {
    return <div className="text-center py-4">Loading plans...</div>;
  }
  console.log(fieldErrors);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Your Name"
        name="ownerName"
        value={formData.ownerName}
        onChange={handleChange}
        placeholder="John Doe"
        required
      />
      {fieldErrors.ownerName && (
        <p className="text-sm text-red-600 mt-1">{fieldErrors.fullName}</p>
      )}
      <Input
        label="Email"
        type="email"
        name="ownerEmail"
        value={formData.ownerEmail}
        onChange={handleChange}
        placeholder="john@company.com"
        required
      />
      {fieldErrors.ownerEmail && (
        <p className="text-sm text-red-600 mt-1">{fieldErrors.ownerEmail}</p>
      )}

      <Input
        label="Password"
        type="password"
        name="ownerPassword"
        value={formData.ownerPassword}
        onChange={handleChange}
        placeholder="••••••••"
        minLength={6}
        required
      />
      {fieldErrors.ownerPassword && (
        <p className="text-sm text-red-600 mt-1">{fieldErrors.ownerPassword}</p>
      )}

      <Input
        label="Company Name"
        name="companyName"
        value={formData.companyName}
        onChange={handleChange}
        placeholder="Tech Solutions Inc"
        required
      />
      {fieldErrors.companyName && (
        <p className="text-sm text-red-600 mt-1">{fieldErrors.companyName}</p>
      )}

      <Select
        label="Select Plan"
        name="planId"
        value={formData.planId}
        onChange={handleChange}
        options={plans.map((plan) => ({
          value: plan.id,
          label: `${plan.name} - ${plan.pricePerEmployee}/employee`,
        }))}
        required
      />
      {fieldErrors.planId && (
        <p className="text-sm text-red-600 mt-1">{fieldErrors.planId}</p>
      )}

      <Button
        type="submit"
        className="w-full"
        isLoading={registerMutation.isPending}
      >
        Create Account
      </Button>
    </form>
  );
};
