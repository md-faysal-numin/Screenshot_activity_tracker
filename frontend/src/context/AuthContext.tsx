import React, { createContext, useContext, type ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { authApi } from "../api/auth.api";
import { queryKeys } from "../lib/react-query";
import type { User } from "../types/auth.types";


interface AuthContextType {
  user: User | null | undefined;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Use React Query to fetch current user
  const { data: user, isLoading } = useQuery({
    queryKey: queryKeys.auth.me,
    queryFn: authApi.me,

    retry: false,
    staleTime: Infinity, // Keep user data fresh
  });

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
