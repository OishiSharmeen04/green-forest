import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ErrorPage = () => {
  const navigate = useNavigate();

  useEffect(() => {

  }, [navigate]);

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 via-white to-green-100 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Animated Plant Illustration */}
        <div className="relative">
          <div className="text-9xl font-bold text-green-600/20 select-none">
            404
          </div>
        </div>

        {/* Error Message */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
            Oops! Page Not Found
          </h1>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            Looks like this plant got lost in the garden. The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Decorative Elements */}
        <div className="flex justify-center gap-4 text-4xl">
          <span className="animate-pulse">🍃</span>
          <span className="animate-pulse delay-100">🌿</span>
          <span className="animate-pulse delay-200">🌾</span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/"
            className="btn btn-primary btn-lg gap-2 min-w-[200px]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Go Home
          </Link>

          <button
            onClick={() => navigate(-1)}
            className="btn btn-outline btn-primary btn-lg gap-2 min-w-[200px]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Go Back
          </button>
        </div>

      </div>
    </div>
  );
};

export default ErrorPage;