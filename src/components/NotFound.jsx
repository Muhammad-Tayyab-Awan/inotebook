/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Link } from "react-router-dom";

const NotFound = (prop) => {
  useEffect(() => {
    document.title = "iNotebook - Oops! Page Not Found";
    prop.notify.error("Oops! Page Not Found");
  }, []);
  return (
    <div className="flex min-h-[calc(100vh-9.5rem)] flex-col items-center justify-center bg-blue-200 p-4 selection:bg-[#111827] selection:text-white dark:selection:bg-yellow-500 dark:selection:text-black">
      <h1 className="text-6xl font-bold text-red-800">404</h1>
      <h2 className="mt-4 text-2xl font-semibold text-red-600 md:text-3xl">
        Oops! Page Not Found
      </h2>
      <p className="mt-2 text-center font-semibold text-red-500">
        The page you are looking for might have been removed or is temporarily
        unavailable.
      </p>
      <Link
        to="/"
        className="mt-6 rounded-lg bg-red-500 px-3 py-1 text-white shadow-lg transition duration-300 ease-in-out hover:bg-red-600"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
