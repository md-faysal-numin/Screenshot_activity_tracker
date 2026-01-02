import React from "react";

import { LogOut, User } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../common/Button";
import { useLogout } from "../../hooks/queries/useAuthQueries";
import { Link } from "react-router-dom";
export const Navbar: React.FC = () => {
  const { user } = useAuth();
  const logout = useLogout();

  const handleLogout = async () => {
    logout.mutate();
    // navigate("/login");
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/">
          <h1 className="text-2xl font-bold text-blue-600">ScreenTracker</h1>
          </Link>
          {user?.company && (
            <span className="text-gray-600">| {user.company.name}</span>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <User size={20} className="text-gray-600" />
            <div className="text-sm">
              <p className="font-medium text-gray-900">{user?.fullName}</p>
              <p className="text-gray-500 capitalize">{user?.role}</p>
            </div>
          </div>

          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut size={18} className="mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
};
