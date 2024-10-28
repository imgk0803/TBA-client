import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function ErrorComponent() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen dark:bg-gray-900 bg-gray-100">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Oops!</h1>
      <p className="text-lg dark:text-gray-300 text-gray-700 mb-6">
        Something went wrong. Please try again.
      </p>
      <button
        onClick={() => {
          navigate(-1);
        }}
        className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
      >
        Go Back
      </button>
    </div>
  );
}
