import { Link } from "react-router-dom";

export const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>

        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Page not found
        </h2>

        <p className="text-gray-600 mb-6">
          The page you are looking for does not exist or has been moved.
        </p>

        <Link
          to="/dashboard"
          className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};
