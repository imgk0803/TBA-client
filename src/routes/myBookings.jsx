import { useEffect, useState, lazy, Suspense } from "react";
import axiosInstance from "../utils/axiosInstance";
const SportsFootballIcon = lazy(() =>
  import("@mui/icons-material/SportsFootball")
);
const CalendarMonthIcon = lazy(() =>
  import("@mui/icons-material/CalendarMonth")
);
const CurrencyRupeeIcon = lazy(() =>
  import("@mui/icons-material/CurrencyRupee")
);
const AccessTimeIcon = lazy(() => import("@mui/icons-material/AccessTime"));

export default function MyBookings() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [loading, setLoading] = useState(true);
  const [bookings, setbookings] = useState([]);
  useEffect(() => {
    axiosInstance.get("/api/user/bookings").then((res) => {
      console.log(res);
      const userBookings = res.data.bookings.filter(
        (item) => user._id === item.user
      );
      setbookings(
        userBookings.filter((booking) => booking.status === "confirmed")
      );
      setLoading(false);
    });
  }, []);
  return (
    <div className="flex flex-col gap-5 p-5">
      <h2 className="text-3xl font-bold text-center mb-4 dark:text-slate-300 sm:text-2xl md:text-3xl">
        My Bookings
      </h2>
      <div className="flex flex-col gap-4">
        {loading ? (
          Array(3)
            .fill(0)
            .map((_, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-col border border-gray-300 p-4 rounded-lg shadow-md dark:bg-gray-800 bg-gray-200 animate-pulse"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
                    <div className="w-48 h-6 bg-gray-400 rounded-md"></div>
                    <div className="flex flex-col md:items-end gap-1 text-right">
                      <div className="w-24 h-6 bg-gray-400 rounded-md"></div>
                      <div className="w-16 h-4 bg-gray-300 rounded-md"></div>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row justify-between items-center mb-2">
                    <div className="w-24 h-4 bg-gray-300 rounded-md"></div>
                    <div className="w-12 h-6 bg-gray-400 rounded-md"></div>
                  </div>
                  <div className="flex flex-row justify-between items-start md:items-center text-center">
                    <div className="w-32 h-4 bg-gray-300 rounded-md"></div>
                    <div className="flex flex-row gap-3 justify-center items-center">
                      <div className="w-12 h-6 bg-gray-400 rounded-md"></div>
                      <div className="w-32 h-4 bg-gray-300 rounded-md"></div>
                    </div>
                  </div>
                </div>
              );
            })
        ) : bookings && bookings.length > 0 ? (
          bookings.map((item, index) => {
            const formatTime = (time) => {
              if (time === 12) return "12 pm";
              return time > 12 ? time - 12 + " pm" : time + " am";
            };
            const start = formatTime(item.timeslot.start);
            const end = formatTime(item.timeslot.end);

            return (
              <div
                key={index}
                className="flex flex-col border border-gray-300 p-4 rounded-lg shadow-md dark:bg-gray-900 bg-white transition-transform duration-300 hover:shadow-lg"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
                  <h3 className="text-xl font-semibold dark:text-gray-300 text-gray-800 sm:text-lg md:text-xl">
                    {index + 1}. {item.court.turf.title}
                  </h3>
                  <div className="flex flex-col md:items-end gap-1 text-right">
                    <Suspense fallback={<div>Loading...</div>}>
                      <span className="text-lg font-semibold dark:text-gray-300 text-gray-800 sm:text-base md:text-lg">
                        <SportsFootballIcon /> {item.court.sport}
                      </span>
                    </Suspense>
                    <span className="text-gray-600 dark:text-gray-400 sm:text-sm">
                      Size: {item.court.size}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-center mb-2">
                  <Suspense fallback={<div>Loading...</div>}>
                    <span className="text-gray-600 dark:text-gray-400 sm:text-sm">
                      <CalendarMonthIcon /> {item.date.slice(0, 10)}
                    </span>
                  </Suspense>
                  <Suspense fallback={<div>Loading...</div>}>
                    <span className="text-lg font-semibold text-gray-800 dark:text-gray-300 sm:text-base">
                      <CurrencyRupeeIcon /> {item.price}
                    </span>
                  </Suspense>
                </div>
                <div className="flex flex-row justify-between items-start md:items-center text-center">
                  <Suspense fallback={<div>Loading...</div>}>
                    <span className="text-gray-600 dark:text-gray-400 sm:text-sm">
                      <AccessTimeIcon /> {start} - {end}
                    </span>
                  </Suspense>
                  <div className="flex flex-row gap-3 justify-center items-center">
                    <span
                      className={`text-lg font-semibold ${
                        item.status === "confirmed"
                          ? "text-green-600"
                          : "text-red-600"
                      } sm:text-base`}
                    >
                      {item.status}
                    </span>
                    <span className="text-sm text-gray-800 dark:text-gray-300">
                      Payment ID: {item.payment}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex justify-center items-center p-5">
            <p className="text-lg text-gray-600 sm:text-base">
              No bookings found
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
