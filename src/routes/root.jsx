import { Outlet, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";
import { getSortedTurfs } from "../features/sortedTurfs/sortedTurfsSlice";
import { switchTheme } from "../features/theme/themeSlice";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import GoogleIcon from "@mui/icons-material/Google";

export default function Root() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = localStorage.getItem("role");
  const geoApi = "150def1d6924f8d2b980f4c1de64506b";
  const [city, setCity] = useState("");
  const [cityresults, setCityResults] = useState([]);
  const sorted = useSelector((state) => state.turfs.SortedTurf);
  const theme = useSelector((state) => state.theme.theme);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleSubmit = async (e) => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=10&appid=${geoApi}`
      );
      setCityResults(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const darkMode = () => {
    dispatch(switchTheme());
  };

  const handleCityClick = (city) => {
    dispatch(getSortedTurfs(city));
    setCity("");
    setCityResults([]);
    navigate("/root/home");
  };

  const roleBasedRoute = () => {
    if (user === "user") {
      navigate("/root/profile");
    } else if (user === "manager") {
      navigate("/root/profilemanager");
    } else {
      navigate("/root/profileadmin");
    }
  };

  return (
    <div>
      <header className="z-10 h-44 md:h-16 flex md:flex-row flex-col items-center justify-between px-4 py-2 fixed bg-white dark:bg-gray-950 w-full shadow-md">
        <h1 className="text-2xl mt-2 md:m-0 md:text-2xl font-mono text-green-500">
          BOOKmyTURF
        </h1>

        <div className="relative flex flex-col w-full max-w-xs dark:bg-gray-900">
          <div className="flex flex-row items-center w-full h-10 border border-gray-300 dark:border-gray-700 shadow-sm rounded-md">
            <input
              onChange={(e) => setCity(e.target.value)}
              className="outline-none w-full text-sm p-2 rounded-md dark:bg-gray-900 dark:text-gray-300"
              placeholder="Enter location"
              type="text"
            />
            <button onClick={handleSubmit}>
              <span className="material-symbols-outlined text-xs  dark:bg-gray-900 text-slate-500">
                location_on
              </span>
            </button>
          </div>

          {cityresults.length > 0 && (
            <ul className="absolute bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md mt-2 w-full max-h-40 overflow-y-auto">
              {cityresults.map((city) => (
                <li
                  key={city._id}
                  onClick={() => handleCityClick(city)}
                  className="cursor-pointer p-1 text-xs hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300"
                >
                  {city.name}, {city.state}, {city.country}
                </li>
              ))}
            </ul>
          )}
        </div>

        <nav>
          <ul className="flex flex-row items-center gap-8 md:gap-8 text-gray-700 dark:text-gray-300 text-md font-semibold">
            <Link to={"home"}>
              <li className="flex flex-col items-center justify-center hover:text-green-500">
                <span className="material-symbols-outlined">stadium</span>
                <span className="text-xs">Home</span>
              </li>
            </Link>
            <Link to={"mybookings"}>
              <li className="flex flex-col items-center justify-center hover:text-green-500">
                <span className="material-symbols-outlined">sports</span>
                <span className="text-xs">Bookings</span>
              </li>
            </Link>
            <button onClick={roleBasedRoute}>
              <li className="flex flex-col items-center justify-center hover:text-green-500">
                <span className="material-symbols-outlined">person</span>
                <span className="text-xs">Account</span>
              </li>
            </button>
            <button onClick={darkMode}>
              <li className="flex flex-col items-center justify-center hover:text-green-500">
                <span className="material-symbols-outlined">
                  {theme === "light" ? "dark_mode" : "light_mode"}
                </span>
                <span className="text-xs">
                  {theme === "light" ? "Dark mode" : "Light mode"}
                </span>
              </li>
            </button>
          </ul>
        </nav>
      </header>

      <main className="pt-20 px-4 min-h-screen dark:bg-gray-900 w-full">
        <Outlet />
      </main>
      <hr className="dark:text-slate-700" />
      <footer className="bg-white dark:bg-gray-900 py-6">
        <div className="w-full max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <h1 className="text-2xl font-mono text-green-500 mb-4 md:mb-0">
            BOOKmyTURF
          </h1>

          <ul className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
            <li>
              <a href="#" className="hover:underline">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Licensing
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>

          <ul className="flex gap-4 text-gray-500 dark:text-gray-400">
            <li>
              <InstagramIcon />
            </li>
            <li>
              <FacebookIcon />
            </li>
            <li>
              <XIcon />
            </li>
            <li>
              <GoogleIcon />
            </li>
          </ul>
        </div>

        <hr className="my-6 border-gray-200 dark:border-gray-700" />

        <span className="block text-center text-sm text-gray-500 dark:text-gray-400">
          © 2024{" "}
          <a href="#" className="hover:underline">
            BOOKmyTURF™
          </a>
          . All Rights Reserved.
        </span>
      </footer>
    </div>
  );
}
