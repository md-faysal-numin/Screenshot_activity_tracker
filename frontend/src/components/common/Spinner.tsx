import React from "react";
import clsx from "clsx";
export const Spinner: React.FC<{ size?: "sm" | "md" | "lg" }> = ({
  size = "md",
}) => {
  const sizes = {
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-3",
    lg: "w-12 h-12 border-4",
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={clsx(
          "border-blue-600 border-t-transparent rounded-full animate-spin",
          sizes[size]
        )}
      />
    </div>
  );
};
