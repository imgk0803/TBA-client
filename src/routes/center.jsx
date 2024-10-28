import { useEffect, useState } from "react";
import Turf from "../components/turf";
import { useSelector } from "react-redux";
import axiosInstance from "../utils/axiosInstance";
export default function Center() {
  const turfsorted = useSelector((state) => state.turfs.SortedTurf);
  const [turfListing, setList] = useState([]);
  const [turfs, setturf] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    axiosInstance.get("/api/user/turf").then((res) => {
      const activeTurfs = res.data.turfs.filter(
        (turf) => turf.isActive === true
      );
      setturf(activeTurfs);
      setList(turfsorted);
      setLoading(false);
    });
  }, [turfsorted]);
  const handleSearch = () => {
    const filtered = turfs.filter((turf) => {
      return new RegExp(searchTerm, "i").test(turf.title);
    });
    setList(filtered);
  };

  return (
    <>
      {isLoading ? (
        <section className="flex flex-col dark:bg-gray-900  mt-20 md:mt-0 p-4">
          <div className="flex flex-col md:flex-row justify-start gap-5 items-center mb-5 p-4 h-16 dark:bg-gray-900">
            <div className="flex flex-row justify-between items-center dark:border-slate-700 dark:bg-gray-900 bg-white shadow-md rounded-md w-full md:w-1/2 p-2">
              <input
                className="outline-none dark:bg-gray-900 dark:text-gray-300 p-2 w-full"
                placeholder="Search turfs"
                type="text"
                disabled
              />
              <button disabled>
                <span className="material-symbols-outlined text-slate-400">
                  search
                </span>
              </button>
            </div>
            <div className="hidden md:flex flex-col items-center justify-center text-md dark:text-gray-300 text-slate-600 font-thin">
              <p className="bg-gray-300 dark:bg-gray-700 h-4 w-40 md:w-60 rounded-md"></p>
              <p className="bg-gray-300 dark:bg-gray-700 h-4 w-60 md:w-80 mt-2 rounded-md"></p>
            </div>
          </div>
          <h3 className="text-lg p-5 text-gray-500">All Turfs</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 p-5">
            {[...Array(9)].map((_, index) => (
              <div
                className="flex flex-col bg-white dark:bg-gray-800 dark:border-slate-700 border border-white p-6 rounded-md shadow-md gap-4"
                key={index}
              >
                <div className="bg-gray-300 dark:bg-gray-700 h-48 sm:h-56 md:h-64 w-full rounded-md"></div>
                <p className="bg-gray-300 dark:bg-gray-700 h-3 w-full rounded-md"></p>
                <p className="bg-gray-300 dark:bg-gray-700 h-2 w-full rounded-md"></p>
                <p className="bg-gray-300 dark:bg-gray-700 h-1 w-full rounded-md"></p>
                <div className="bg-gray-300 dark:bg-gray-700 h-10 w-full rounded-md"></div>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <section className="flex flex-col dark:bg-gray-900  mt-20 md:mt-0 p-4">
          <div className="flex flex-col md:flex-row justify-start gap-5 items-center mb-5 p-4 h-16 dark:bg-gray-900">
            <div className="flex flex-row justify-between items-center dark:border-slate-700 dark:bg-gray-800 bg-white shadow-md rounded-md w-full md:w-1/2 p-2">
              <input
                onChange={(e) => setSearchTerm(e.target.value)}
                className="outline-none dark:bg-gray-800 dark:text-gray-300 p-2 w-full"
                placeholder="Search turfs"
                type="text"
              />
              <button onClick={handleSearch}>
                <span className="material-symbols-outlined text-slate-400">
                  search
                </span>
              </button>
            </div>
            <div className="hidden md:flex flex-col  items-center justify-center text-md dark:text-gray-300 text-slate-600 font-thin">
              <p className="text-xs md:text-md"> 
                Discover the perfect turf for your next game or event! At
                BookmyTurf,
              </p>
              <p className="text-xs md:text-md">
                we bring you a comprehensive list of top-quality turfs right at
                your fingertips.
              </p>
            </div>
          </div>

          {turfListing.length > 0 && (
            <>
              <div className="flex justify-between items-center gap-5 py-4 px-5">
                <h3 className="text-lg text-gray-500">Results</h3>
                <button
                  onClick={() => setList("")}
                  className="text-sm text-gray-500"
                >
                  Clear Search
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 px-5 pb-5">
                {turfListing.map((t) => (
                  <div className="flex items-center justify-center">
                    <Turf key={t._id} {...t} />
                  </div>
                ))}
              </div>
            </>
          )}

          <hr className="my-5" />
          <h3 className="text-lg p-5 text-gray-500">All Turfs</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 ">
            {turfs.map((t) => (
              <div className="flex items-center justify-center">
                <Turf key={t._id} {...t} />
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
