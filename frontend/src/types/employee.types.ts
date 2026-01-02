// src/types/employee.types.ts
export interface Employee {
  id: number;
  fullName: string;
  email: string;
  role: string;
  createdAt: string;
}

export interface CreateEmployeeData {
  name: string;
  email: string;
  password: string;
}
