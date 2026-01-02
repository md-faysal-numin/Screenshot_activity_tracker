import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import clsx from "clsx";

export const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const isOwner = user?.role === "owner";

  const navItems = [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard, show: true },
    // { to: "/screenshots", label: "Screenshots", icon: Camera, show: true },
    { to: "/employees", label: "Employees", icon: Users, show: isOwner },
  ];

  return (
    <aside className="w-64 bg-gray-50 border-r border-gray-200 min-h-[calc(100vh-73px)]">
      <nav className="p-4 space-y-2">
        {navItems
          .filter((item) => item.show)
          .map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                clsx(
                  "flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors",
                  isActive
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100"
                )
              }
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
      </nav>
    </aside>
  );
};
