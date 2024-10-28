import { Link, Outlet } from "react-router-dom";

export default function LoginAndSignin() {
  return (
    <>
      <section
        className="w-screen h-screen sm:grid grid-cols-2 flex flex-col bg-cover bg-center"
        style={{
          backgroundImage: `url('https://res.cloudinary.com/dpxgeasl4/image/upload/v1725910594/hotktr7e8u7loenmbnts.jpg')`,
        }}
      >
        <div className="flex items-center justify-center sm:h-screen p-6 sm:p-0">
          <h1 className="text-white font-custom text-3xl sm:text-5xl text-center tracking-wide">
            Welcome to <span className="text-white">BOOKmyTURF</span>
          </h1>
        </div>

        <div className="flex flex-col justify-center p-6 space-y-8">
          <div className="flex justify-center gap-6">
            <Link
              to="signup"
              className="text-lg sm:text-xl border-b-2 border-green-400 text-white hover:bg-green-500 hover:text-white py-1 px-4 transition-transform transform hover:scale-105 rounded-md"
            >
              Sign Up
            </Link>
            <Link
              to="signin"
              className="text-lg sm:text-xl border-b-2 border-green-400 text-white hover:bg-green-500 hover:text-white py-1 px-4 transition-transform transform hover:scale-105 rounded-md"
            >
              Log In
            </Link>
          </div>

          <div className="w-full max-w-md mx-auto shadow-xl rounded-md bg-white p-6">
            <Outlet />
          </div>
        </div>
      </section>
    </>
  );
}
