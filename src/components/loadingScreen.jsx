import ShowMessage from "./showMessage";

export default function LoadingScreen({ message, onclick }) {
  return (
    <div className="fixed inset-0 flex flex-col  items-center justify-center bg-black bg-opacity-70 z-50">
      {message ? (
        <ShowMessage message={message} onclick={onclick} />
      ) : (
        <div className="flex flex-col justify-center items-center rounded-md p-5 bg-white dark:bg-gray-800">
          <div className="loading-spinner"></div>
          <span className="text-xl p-2 text-slate-800 dark:text-white">
            Please wait....
          </span>
        </div>
      )}
    </div>
  );
}
