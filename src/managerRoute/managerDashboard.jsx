import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { filterTimeslots } from "../hooks/useAvailableSlots";
import LoadingScreen from "../components/loadingScreen";
export default function ManagerDashboard() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [timeSlot, setTimeslot] = useState("");
  const [seen, setSeen] = useState(false);
  const [confrim, setConfirm] = useState(false);
  const [courtid, setCourtId] = useState("");
  const [selectedBooking, setOneBooking] = useState("");
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const [date, setdate] = useState("");
  const [time, setTime] = useState();
  const [allbookings, setAllBookings] = useState();
  const [isLoading, setLoading] = useState(false);
  const [message, setMessage] = useState();
  const currentDate = new Date();
  const hours = currentDate.getHours();
  const formattedDate = new Date(currentDate).toISOString().split("T")[0];
  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    Promise.all([
      axiosInstance.get(`/api/manager/getmanagerbookings/${user._id}`, {
        headers,
      }),
      axiosInstance.get("/api/user/bookings"),
    ])
      .then(([managerBookings, allBookings]) => {
        setBookings(managerBookings.data.bookings);
        setAllBookings(allBookings.data.bookings);
      })
      .catch((err) => console.error("Error fetching bookings:", err));
  }, [isLoading, seen]);

  const bookingToday = bookings.filter(
    (booking) => booking.date.slice(0, 10) === date
  );
  const togglePop = async (booking) => {
    setOneBooking(booking._id);
    setCourtId(booking.court._id);
    const confirmedBookings = allbookings.filter((booking) => {
      return booking.status !== "canceled";
    });
    const courtBooking = confirmedBookings.filter((booking) => {
      return booking.court._id === courtid;
    });
    const todaysbookings = courtBooking.filter((item) => {
      const bookingDate = new Date(item.date).toISOString().split("T")[0];
      return bookingDate === date;
    });
    const modTodaysBooking = todaysbookings.map((book) => ({
      start: book.timeslot.start,
      end: book.timeslot.end,
    }));
    const allTimeslots = [
      { start: 6, end: 7 },
      { start: 7, end: 8 },
      { start: 8, end: 9 },
      { start: 9, end: 10 },
      { start: 10, end: 11 },
      { start: 11, end: 12 },
      { start: 12, end: 13 },
      { start: 13, end: 14 },
      { start: 14, end: 15 },
      { start: 15, end: 16 },
      { start: 16, end: 17 },
      { start: 17, end: 18 },
      { start: 18, end: 19 },
      { start: 19, end: 20 },
      { start: 20, end: 21 },
      { start: 21, end: 22 },
      { start: 22, end: 23 },
      { start: 23, end: 24 },
    ];
    let timeslots = allTimeslots;
    if (date === formattedDate) {
      timeslots = allTimeslots.filter((ts) => ts.start >= hours);
    }
    const newArray = filterTimeslots(timeslots, modTodaysBooking);
    setTimeslot(newArray);
    setSeen(!seen);
  };
  const handleDate = (e) => {
    e.preventDefault();
    try {
      setdate(e.target.value);
    } catch (err) {
      console.log(err.message);
    }
  };
  function confirmcancel(id) {
    setOneBooking(id);
    setConfirm(!confrim);
  }
  function closeLoading() {
    setLoading(false);
    setMessage(null);
  }
  function close() {
    setSeen(!seen);
  }
  const updateBooking = async () => {
    setLoading(!isLoading);
    try {
      const { start, end } = time;
      const body = {
        start,
        end,
        date,
      };
      axiosInstance
        .patch(
          `/api/manager/court/${courtid}/booking/${selectedBooking}`,
          body,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setMessage(res.data.message);
        });
      setSeen(!seen);
    } catch (err) {
      setMessage(err.response.data.message);
    }
  };
  const cancelBooking = async (id) => {
    setLoading(true);
    try {
      await axiosInstance
        .patch(
          `/api/manager/cancelbooking/${selectedBooking}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setTimeout(() => {
            setMessage(res.data.message);
          }, 5000);
        });
      setConfirm(!confirm);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      {isLoading ? (
        <LoadingScreen message={message} onclick={closeLoading} />
      ) : (
        <>
          <button
            onClick={() => navigate(-1)}
            className="bg-green-500 text-white w-16 pt-1 rounded-md shadow-md hover:bg-green-600 transition duration-200"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <section className="flex flex-col items-center dark:bg-gray-900 gap-6 p-5 sm:p-10">
            <h1 className="text-4xl font-bold text-center dark:text-gray-300 mb-4">
              Manage Bookings
            </h1>
            <div className="flex flex-col items-center justify-center gap-3">
              <label className="text-md font-semibold dark:text-gray-300">
                Choose a date
              </label>
              <input
                onChange={handleDate}
                onBlur={handleDate}
                value={date}
                className="outline-none rounded-md border-gray-300 p-2 dark:bg-gray-700 dark:text-gray-300"
                type="date"
              />
            </div>
            <div className="flex flex-col w-full gap-4">
              {bookingToday && bookingToday.length > 0 ? (
                bookingToday.map((item, index) => {
                  let start = item.timeslot.start + "am";
                  let end = item.timeslot.end + "am";

                  if (item.timeslot.start > 12) {
                    start = item.timeslot.start - 12 + "pm";
                    end = item.timeslot.end - 12 + "pm";
                  } else if (item.timeslot.start === 12) {
                    end = item.timeslot.end - 12 + "pm";
                    start = item.timeslot.start + "am";
                  }

                  return (
                    <div
                      key={item._id}
                      className="flex flex-col sm:flex-row gap-6 border border-gray-300 p-4 rounded-lg shadow-md bg-white dark:bg-gray-800 justify-between items-center"
                    >
                      <div className="flex flex-col sm:flex-row justify-center sm:justify-start items-center sm:items-center text-center sm:text-left gap-4">
                        <p className="text-lg font-semibold text-gray-800 dark:text-gray-300 flex items-center gap-1">
                          {index + 1}.
                          <span className="material-symbols-outlined text-base">
                            sports_football
                          </span>
                          {item.court.sport} ({item.court.size})
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 flex items-center gap-1">
                          <span className="material-symbols-outlined text-base">
                            calendar_month
                          </span>{" "}
                          {item.date.slice(0, 10)}
                        </p>
                      </div>

                      <div className="flex-1 text-center sm:text-left flex flex-col sm:flex-row gap-4 justify-center sm:justify-start items-center">
                        <p className="text-gray-600 dark:text-gray-300 flex items-center gap-1">
                          <span className="material-symbols-outlined text-base">
                            schedule
                          </span>{" "}
                          {start} - {end}
                        </p>
                        <p
                          className={`text-lg font-semibold ${
                            item.status === "confirmed"
                              ? "text-green-500 dark:text-green-300"
                              : item.status === "pending"
                              ? "text-yellow-500 dark:bg-yellow-300"
                              : "text-red-500 dark:text-red-400"
                          } dark:text-gray-300`}
                        >
                          {item.status}
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-end items-center text-center sm:text-right">
                        <p className="text-gray-600 dark:text-gray-300">
                          Payment ID: {item.payment || "No Payment Found"}
                        </p>
                        <p className="text-lg font-semibold text-gray-800 dark:text-gray-300 flex items-center gap-1">
                          <span className="material-symbols-outlined text-base">
                            currency_rupee
                          </span>{" "}
                          {item.price}
                        </p>
                      </div>

                      <div className="flex gap-2 mt-3 sm:mt-0 justify-center sm:justify-end">
                        <button
                          onClick={() => togglePop(item)}
                          className="bg-green-500 text-xs text-white rounded-md p-2 hover:bg-green-600 transition duration-300"
                        >
                          Reschedule
                        </button>
                        <button
                          onClick={() => confirmcancel(item._id)}
                          className="bg-red-500 text-xs text-white rounded-md p-2 hover:bg-red-600 transition duration-300"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="flex justify-center items-center p-5">
                  <p className="text-lg text-gray-600 dark:text-gray-300">
                    No bookings found
                  </p>
                </div>
              )}
              {confrim && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
                  <div className="flex flex-col gap-3 dark:bg-gray-700 bg-white w-80 p-6 rounded-md">
                    <h1 className="text-xl dark:text-gray-300 text-center mb-4">
                      Are you sure you want to cancel?
                    </h1>
                    <div className="flex justify-around">
                      <button
                        onClick={cancelBooking}
                        className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors duration-300"
                      >
                        YES
                      </button>
                      <button
                        onClick={() => setConfirm(!confirm)}
                        className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors duration-300"
                      >
                        NO
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {seen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
                  <div className="flex flex-col gap-3 dark:bg-gray-700 bg-white w-80 p-6 rounded-md">
                    <div className="flex justify-between items-center">
                      <h1 className="text-xl p-1 dark:text-slate-300">
                        Update the timeslot
                      </h1>
                      <button
                        onClick={close}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        <span class="material-symbols-outlined dark:text-red-600">
                          close
                        </span>
                      </button>
                    </div>

                    <select
                      onChange={(e) => setTime(JSON.parse(e.target.value))}
                      className="p-2 rounded-md dark:bg-gray-700 dark:text-gray-300"
                    >
                      <option value="placeholder">Select a Time</option>
                      {timeSlot &&
                        timeSlot.map((ts, index) => {
                          let start = ts.start + "am";
                          let end = ts.end + "am";

                          if (ts.start > 12) {
                            start = ts.start - 12 + "pm";
                            end = ts.end === 24 ? "12am" : ts.end - 12 + "pm";
                          } else if (ts.start === 12) {
                            start = ts.start + "pm";
                            end = ts.end - 12 + "pm";
                          }

                          return (
                            <option
                              key={index}
                              value={JSON.stringify(ts)}
                              className="p-1 text-sm hover:bg-green-400"
                            >
                              {start} - {end}
                            </option>
                          );
                        })}
                    </select>
                    <button
                      onClick={updateBooking}
                      className="bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-300"
                    >
                      Update
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>
        </>
      )}
    </>
  );
}
