export default function ShowMessage({ message, onclick }) {
  return (
    <div className="flex flex-col justify-center items-center p-4 border border-gray-300 rounded-lg shadow-md bg-white dark:bg-gray-800">
      <p className="text-lg text-gray-800 dark:text-white mb-4">{message}</p>
      <button
        onClick={onclick}
        className="bg-red-500 h-10 w-30 text-white  px-4 py-2 rounded hover:bg-red-600 transition duration-300"
      >
        Close
      </button>
    </div>
  );
}
