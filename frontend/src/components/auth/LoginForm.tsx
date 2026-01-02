// src/components/auth/LoginForm.tsx
import React, { useState } from "react";
import { useLogin } from "../../hooks/queries/useAuthQueries";
import { Button } from "../common/Button";
import { Input } from "../common/Input";

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginMutation = useLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="john@company.com"
        required
      />

      <Input
        label="Password"
        type="password"
        value={password}
        autoComplete="current-password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="••••••••"
        required
      />

      <Button
        type="submit"
        className="w-full"
        isLoading={loginMutation.isPending}
      >
        Sign In
      </Button>
    </form>
  );
};
