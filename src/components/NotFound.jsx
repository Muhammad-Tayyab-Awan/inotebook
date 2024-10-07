/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Link } from "react-router-dom";

const NotFound = (prop) => {
  useEffect(() => {
    document.title = "iNotebook - Oops! Page Not Found";
    prop.notify.error("Oops! Page Not Found");
  }, []);
  return (
    <div className="min-h-[calc(100vh-9.5rem)] selection:bg-[#111827] dark:selection:bg-yellow-500 dark:selection:text-black selection:text-white bg-blue-200 flex flex-col items-center justify-center p-4">
      <h1 className="text-6xl font-bold text-red-800">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold text-red-600 mt-4">
        Oops! Page Not Found
      </h2>
      <p className="text-red-500 mt-2 text-center font-semibold">
        The page you are looking for might have been removed or is temporarily
        unavailable.
      </p>
      <Link
        to="/"
        className="mt-6 px-3 py-1 bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-600 transition duration-300 ease-in-out"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
