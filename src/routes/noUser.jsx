import { Link } from "react-router-dom";

export default function NoUser() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-950 p-4">
      <h1 className="text-4xl dark:text-gray-300 font-semibold text-gray-800 mb-4 text-center">
        Unauthorized - Please Login First
      </h1>
      <p className="text-lg dark:text-gray-400 text-gray-700 mb-6 text-center">
        You need to be logged in to access this page.
      </p>
      <Link
        to={"/signin"}
        className="px-4 py-2 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition duration-300"
      >
        Back to Login
      </Link>
    </div>
  );
}
