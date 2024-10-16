import { Link } from "react-router-dom";
export default function NoUser() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen  dark:bg-gray-950 bg-gray-100">
        <h1 className="text-4xl dark:text-gray-300 font-semibold text-gray-800">
          Unauthorized - Please Login first
        </h1>
        <Link to={'/signin'} className=" text-lg text-blue-900 hover:underline hover:text-blue-500">Back to Login</Link>
      </div>
    );
  }