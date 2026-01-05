// src/hooks/queries/useAuthQueries.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "../../api/auth.api";
import { queryKeys } from "../../lib/react-query";
import type { LoginCredentials, RegisterData } from "../../types/auth.types";
// import { saveToken, removeToken } from "../../utils/storage";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => authApi.login(credentials),
    retry: false,
    onSuccess: (data) => {
      // Save token
      // saveToken(data.token.token);

      // Update React Query cache with user data
      queryClient.setQueryData(queryKeys.auth.me, data.user);

      toast.success("Login successful!");
      navigate("/dashboard");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Login failed");
    },
  });
};

export const useRegister = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: RegisterData) => authApi.register(data),
    retry: false,
    onSuccess: (data) => {
      // Save token
      // saveToken(data.token.token);

      // Update React Query cache with user data
      queryClient.setQueryData(queryKeys.auth.me, data.user);

      toast.success("Registration successful!");
      navigate("/dashboard");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Registration failed");
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      // Remove token
      // removeToken();

      // Clear all React Query cache
      queryClient.setQueryData(queryKeys.auth.me, null);
      queryClient.removeQueries({ queryKey: queryKeys.auth.me });

      queryClient.clear();
      toast.success("Logged out successfully");
      navigate("/login");
    },
  });
};
