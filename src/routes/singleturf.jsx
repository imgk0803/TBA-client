import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import MapComponent from "../components/mapComponent";
import Review from "../components/addReview";
import { averageRating } from "../hooks/useAverageRating";
import axiosInstance from "../utils/axiosInstance";

export default function TurfSingle() {
  const navigate = useNavigate();
  const { turfid } = useParams();
  const [turf, setTurf] = useState({});
  const [seen, setSeen] = useState(false);
  const [review, setReview] = useState([]);
  const [noOfReviews, setNoOfReviews] = useState();
  const [averageStarRating, setRating] = useState();
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [isLoading, setLoading] = useState(true);
  const [sports, setSports] = useState();

  function togglePop() {
    setSeen(!seen);
  }

  useEffect(() => {
    axiosInstance.get(`/api/user/getoneturf/${turfid}`).then((res) => {
      setTurf(res.data.turf);
      setSports(res.data.turf.court.map((c) => c.sport));
      setLatitude(res.data.turf.location.coordinates[1]);
      setLongitude(res.data.turf.location.coordinates[0]);
    });
    axiosInstance.get("/api/user/getreview").then((res) => {
      const turfreview = res.data.review.filter((rev) => rev.turf === turfid);
      setReview(turfreview);
      setNoOfReviews(turfreview.length);
      setRating(averageRating(turfreview));
      setLoading(false)
    });
  }, [seen]);
  const sport = [...new Set(sports)];

  return (
    <>
      {isLoading ? (
        <div className="flex flex-col md:flex-row gap-3 p-5 mt-36 md:mt-0 animate-pulse">
          <div className="w-full md:w-1/2 pl-4 md:pl-16 text-slate-600 flex flex-col gap-2">
            <div className="h-10 bg-gray-300 rounded-md w-3/4"></div>
            <div className="h-6 bg-gray-300 rounded-md w-1/4"></div>
            <div className="h-4 bg-gray-300 rounded-md w-1/2"></div>
            <div className="h-64 md:h-80 bg-gray-300 rounded-md w-full"></div>
            <div className="pt-5">
              <span className="text-lg font-semibold dark:text-gray-400 p-1">
                Sports Available
              </span>
              <ul className="flex flex-wrap gap-3 mt-3">
                <li className="h-8 bg-gray-300 rounded-xl w-1/4"></li>
                <li className="h-8 bg-gray-300 rounded-xl w-1/4"></li>
              </ul>
            </div>
            <div className="pt-5">
              <span className="text-lg font-semibold dark:text-gray-400 p-1">
                Facilities
              </span>
              <ul className="flex flex-wrap gap-3">
                <li className="h-8 bg-gray-300 rounded-xl w-1/4"></li>
                <li className="h-8 bg-gray-300 rounded-xl w-1/4"></li>
              </ul>
            </div>
          </div>
          <div className="w-full md:w-1/3 pt-8 md:pt-16 pl-0 md:pl-20 flex flex-col gap-6 pr-3">
            <div className="h-10 bg-gray-300 rounded-md w-80"></div>
            <div>
              <h4 className="dark:text-gray-400">Timing</h4>
              <div className="h-4 bg-gray-300 rounded-md w-1/4"></div>
            </div>
            <div>
              <h4 className="dark:text-gray-400">Location</h4>
              <div className="h-4 bg-gray-300 rounded-md w-1/2"></div>
            </div>
            <div className="border min-h-60 bg-gray-300"></div>
            <div className="h-10 bg-gray-300 rounded-md w-80"></div>
          </div>
        </div>
      ) : (
        <>
        <div className="mt-28 md:mt-0">
          <button
            onClick={() => navigate(-1)}
            className="bg-green-500 text-white border-green-500 dark:hover:bg-gray-900 hover:bg-white hover:text-green-500 w-16 pt-1 rounded-md transition-colors duration-200 mb-4"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <section className="flex flex-col lg:flex-row gap-8 p-4 md:p-8">
            <div className="w-full lg:w-1/2 text-slate-600 flex flex-col gap-4 p-4 rounded-lg shadow-md bg-white dark:bg-gray-800">
              <h1 className="text-2xl md:text-3xl font-semibold dark:text-gray-200">
                {turf.title}
              </h1>
              <div className="flex items-center gap-4">
                <span className="text-lg font-semibold dark:text-gray-400">
                  {turf.city}
                </span>
                <Link to={"/root/reviews"} state={{ review }}>
                  <div className="flex items-center gap-1 text-yellow-500">
                    <span className="text-black dark:text-white">
                      {averageStarRating}
                    </span>
                    <span className="material-symbols-outlined text-sm">
                      star
                    </span>
                    <span className="text-black dark:text-white">
                      ({noOfReviews})
                    </span>
                  </div>
                </Link>
              </div>
              <p className="text-gray-500">{turf.description}</p>
              <img
                className="w-full h-60 md:h-80 object-cover rounded-md"
                src={turf.image}
                alt=""
              />
              <div>
                <h3 className="text-lg font-semibold dark:text-gray-200">
                  Sports Available
                </h3>
                <ul className="flex flex-wrap gap-2 mt-2">
                  {sport &&
                    sport.map((c) => (
                      <li
                        key={c._id}
                        className="px-3 py-1 bg-green-100 text-green-700 rounded-xl dark:bg-green-900 dark:text-green-200"
                      >
                        {c}
                      </li>
                    ))}
                </ul>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold dark:text-gray-200">
                  Facilities
                </h3>
                <ul className="flex gap-2 mt-2">
                  <li className="px-3 py-1 bg-blue-100 text-blue-700 rounded-xl dark:bg-blue-900 dark:text-blue-200">
                    Drinking
                  </li>
                  <li className="px-3 py-1 bg-blue-100 text-blue-700 rounded-xl dark:bg-blue-900 dark:text-blue-200">
                    Restroom
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-full lg:w-1/3 flex flex-col gap-6">
              <Link
                to={"/root/booking/" + turfid}
                className="block p-3 text-center text-white bg-green-500 rounded-md hover:bg-green-600 transition-colors duration-200"
              >
                Book Now
              </Link>
              <div className="p-4 rounded-lg shadow-md bg-white dark:bg-gray-800">
                <h4 className="text-lg font-semibold dark:text-gray-200">
                  Timing
                </h4>
                <p className="dark:text-gray-400">6AM-12PM</p>
              </div>
              <div className="p-4 rounded-lg shadow-md bg-white dark:bg-gray-800">
                <h4 className="text-lg font-semibold dark:text-gray-200">
                  Location
                </h4>
                <p className="dark:text-gray-400">
                  {turf.city}, {turf.dist}, Kerala
                </p>
              </div>
              <div className="hidden md:block p-4 rounded-lg shadow-md bg-white dark:bg-gray-800 min-h-60">
                {latitude && longitude && !seen ? (
                  <MapComponent latitude={latitude} longitude={longitude} />
                ) : null}
              </div>
              <button
                onClick={togglePop}
                className="p-3 text-center text-white bg-green-500 rounded-md hover:bg-green-600 transition-colors duration-200"
              >
                Add Review
              </button>
              {seen && <Review toggle={togglePop} turf_id={turfid} />}
            </div>
          </section>
        </div>
        </>
      )}
    </>
  );
}
