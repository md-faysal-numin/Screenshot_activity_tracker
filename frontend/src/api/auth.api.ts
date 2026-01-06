// src/api/auth.api.ts
import axios from "./axios.config";
import type {
  LoginCredentials,
  RegisterData,
  AuthResponse,
  User,
  ApiResponse,
} from "../types/auth.types";

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const { data } = await axios.post<ApiResponse<AuthResponse>>(
      "/auth/login",
      credentials
    );
    // console.log(data.data);
    return data.data;
  },

  register: async (registerData: RegisterData): Promise<AuthResponse> => {
    const { data } = await axios.post<ApiResponse<AuthResponse>>(
      "/auth/register",
      registerData
    );
    // console.log(data.data);
    return data.data;
  },

  me: async (): Promise<User> => {
    const { data } = await axios.get<ApiResponse<User>>("/auth/me");
    return data.data;
  },

  logout: async (): Promise<void> => {
    await axios.post("/auth/logout");
  },

  rotateToken: async (): Promise<{
    token: { type: string; value: string };
  }> => {
    const { data } = await axios.post("/auth/rotate-token");
    return data.data;
  },
};
