export default function LoadingScreen(){
return(
    <div className="loading-screen dark:bg-slate-800">
        <div className="loading-spinner"></div>
        <span className="text-xl p-2 text-slate-800 dark:text-white">Please wait....</span>
    </div>
)
}