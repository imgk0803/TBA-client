export default function ShowMessage({ message, onclick }) {
  return (
    <div className="flex flex-col justify-center items-center w-1/2 p-4 sm:p-6 border border-gray-300 rounded-lg shadow-md bg-white dark:bg-gray-800 max-w-xs sm:max-w-sm md:max-w-md">
      <p className="text-base sm:text-lg text-gray-800 dark:text-white mb-4 text-center">{message}</p>
      <button
        onClick={onclick}
        className="bg-red-500 h-10 w-32 sm:w-16 md:w-32 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
      >
        Close
      </button>
    </div>
  );
  
}
