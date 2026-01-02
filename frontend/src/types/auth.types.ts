// src/types/auth.types.ts
export interface User {
  id: number;
  fullName: string;
  role: "owner" | "employee";
  company?: Company;
}

export interface Company {
  id: number;
  name: string;
  plan: Plan;
}

export interface Plan {
  id: number;
  name: string;
  pricePerEmployee: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  ownerName: string;
  ownerEmail: string;
  ownerPassword: string;
  companyName: string;
  planId: number;
}

export interface AuthResponse {
  user: User;
  token: {
    token: string;
    type: string;
  };
}

export interface ApiResponse<T = any> {
  message?: string;
  data: T;
  errors?: any[];
}
