import { Link } from "react-router-dom";
export default function Unauthorized() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <h1 className="text-4xl font-semibold dark:text-gray-300 text-gray-800 mb-4 text-center">
        Unauthorized - You do not have access to this page.
      </h1>
      <p className="text-lg dark:text-gray-400 text-gray-700 mb-6 text-center">
        If you believe this is an error, please contact support.
      </p>
      <Link
        to="/root/home"
        className="px-4 py-2 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition duration-300"
      >
        Go to Homepage
      </Link>
    </div>
  );
}
