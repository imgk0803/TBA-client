import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../features/cart/cartslice";
import axiosInstance from "../utils/axiosInstance";
import { Button } from "@mui/material";
import { filterTimeslots } from "../hooks/useAvailableSlots";

export default function Booking() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  const { turfid } = useParams();
  const [click, setClick] = useState(false);
  const [message, setmessage] = useState("");
  const [turfname, setturfname] = useState("");
  const [courts, setCourts] = useState([]);
  const [place, setplace] = useState("");
  const [bookings, setbookings] = useState([]);
  const [timeslot, settimeslot] = useState([]);
  const [selectedCourt, setCourt] = useState("");
  const [date, setdate] = useState("");
  const [time, settime] = useState("");
  const [bookingtoday, setToday] = useState([]);
  const currentDate = new Date();
  const hours = currentDate.getHours();
  const formattedDate = new Date(currentDate).toISOString().split("T")[0];
  useEffect(() => {
    axiosInstance.get(`/api/user//turf/getcourt/${turfid}`).then((res) => {
      setCourts(res.data.turf.court);
      setplace(res.data.turf.city);
      setturfname(res.data.turf.title);
    });
  }, []);
  const handlechange = async (e) => {
    e.preventDefault();
    try {
      const selectedCourt = JSON.parse(e.target.value);
      setCourt(selectedCourt);
      axiosInstance.get("/api/user/bookings").then((res) => {
        const confirmBooking = res.data.bookings.filter((booking) => {
          return booking.status !== "canceled";
        });
        const courtbookings = confirmBooking.filter((booking) => {
          return booking.court._id === selectedCourt._id;
        });
        setbookings(courtbookings);
      });
    } catch (err) {
      console.log(err);
    }
  };
  const handleDate = async (e) => {
    e.preventDefault();
    try {
      const date = e.target.value;
      setdate(date);
      const todaysbookings = bookings.filter((item) => {
        const bookingDate = new Date(item.date).toISOString().split("T")[0];
        return bookingDate === date;
      });
      const modTodaysBooking = todaysbookings.map((book) => ({
        start: book.timeslot.start,
        end: book.timeslot.end,
      }));
      setToday(modTodaysBooking);
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
      settimeslot(newArray);
    } catch (err) {
      console.log(err.message);
    }
  };
  const handleTime = async (e) => {
    e.preventDefault();
    try {
      const time = JSON.parse(e.target.value);
      settime(time);
    } catch (err) {}
  };
  const addBooking = async (e) => {
    e.preventDefault();
    if (!selectedCourt || !date || !time) {
      setClick(false);
      setmessage("Please fill out all fields before proceeding.");

      return;
    }
    try {
      const courtid = selectedCourt._id;
      const userid = JSON.parse(localStorage.getItem("user"))._id;
      const price = selectedCourt.price;
      const reqbody = {
        date: date,
        timeslot: time,
        price: price,
      };

      const response = await axiosInstance.post(
        `/api/user/${userid}/court/${courtid}`,
        reqbody
      );
      const bookingform = document.getElementsByName("bookingform");
      bookingform.forEach((form) => form.reset());
      console.log("res", response);

      if (response.data.success === false) {
        setClick(false);
        setmessage(response.data.message);
      }
      const booking = {
        turfname: turfname,
        courtname: selectedCourt.sport,
        size: selectedCourt.size,
        date: date,
        time: time,
        price: selectedCourt.price,
        bookingid: response.data.booking._id,
      };
      setClick(true);
      setmessage(response.data.message);
      dispatch(addToCart(booking));
      settime("");
    } catch (err) {
      console.log("error::", err);
    }
  };
  const removeBooking = async (id) => {
    try {
      dispatch(removeFromCart(id));
      const res = await axiosInstance.delete(`/api/user/deleteBooking/${id}`);
      const bookingform = document.getElementsByName("bookingform");
      bookingform.forEach((form) => form.reset());
      //setClick(!click)
    } catch (err) {
      console.log("error::", err);
    }
  };

  return (
    <>
      <button
        onClick={() => navigate(-1)}
        className="bg-green-500 text-white w-16 pt-1 rounded-md shadow-md hover:bg-green-600 transition duration-200"
      >
        <span className="material-symbols-outlined">arrow_back</span>
      </button>
      <section className="grid grid-cols-1 md:grid-cols-2 p-10 dark:bg-gray-900">
        <div className="p-5 bg-white rounded-lg shadow-lg dark:bg-gray-950">
          <h2 className="p-1 font-semibold text-3xl text-gray-800 dark:text-gray-300">
            {turfname}
          </h2>
          <span className="p-1 text-lg text-gray-600 dark:text-gray-400">
            {place}
          </span>
          <form
            name="bookingform"
            onSubmit={addBooking}
            className="flex flex-col gap-6 rounded-md  py-8 dark:bg-gray-950"
          >
            <div className="flex flex-col">
              <label
                className="font-semibold dark:text-gray-300 mb-1"
                htmlFor="court"
              >
                Sports:
              </label>
              <select
                onChange={handlechange}
                name="court"
                id="court"
                className="dark:text-gray-300 dark:bg-gray-700 shadow-md text-slate-600 border border-slate-200 p-2 rounded-md outline-none"
              >
                <option className="font-semibold" value="placeholder">
                  Select Court
                </option>
                {courts.map((court) => (
                  <option
                    className="font-semibold dark:text-gray-300 dark:bg-gray-700"
                    key={court._id}
                    value={JSON.stringify(court)}
                  >
                    {court.sport} - {court.size} - {court.description}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label
                className="dark:text-gray-300 font-semibold mb-1"
                htmlFor="bookdate"
              >
                Date:
              </label>
              <input
                onChange={handleDate}
                onBlur={handleDate}
                className="dark:text-gray-300 dark:bg-gray-700 shadow-md text-slate-600 border border-slate-200 p-2 rounded-md outline-none"
                type="date"
                id="bookdate"
                name="bookdate"
                min={formattedDate}
              />
            </div>

            <div className="flex flex-col">
              <label
                className="font-semibold dark:text-gray-300 mb-1"
                htmlFor="timeslot"
              >
                Timeslot:
              </label>
              <select
                onChange={handleTime}
                name="timeslot"
                id="timeslot"
                className="dark:text-gray-300 dark:bg-gray-700 shadow-md text-slate-600 border border-slate-200 p-2 rounded-md outline-none"
              >
                <option value="placeholder">Pick a Timeslot</option>
                {timeslot && timeslot.length > 0 ? (
                  timeslot.map((ts, index) => {
                    let start = ts.start;
                    let end = ts.end;
                    let startPeriod = "am";
                    let endPeriod = "am";

                    // Convert 24-hour format to 12-hour format
                    if (start >= 12) {
                      startPeriod = "pm";
                      if (start > 12) start -= 12; // Adjust for PM
                    }
                    if (end > 12) {
                      endPeriod = "pm";
                      if (end > 12) end -= 12; // Adjust for PM
                    }

                    return (
                      <option
                        className="dark:text-gray-300 dark:bg-gray-700 text-green-600 p-3 font-semibold rounded-md"
                        key={index}
                        value={JSON.stringify(ts)}
                      >
                        {start} {startPeriod} - {end} {endPeriod}
                      </option>
                    );
                  })
                ) : (
                  <option
                    className="dark:text-gray-400 dark:bg-gray-800 text-red-700 p-3 font-semibold rounded-md"
                    disabled
                  >
                    No Timeslot Available
                  </option>
                )}
              </select>
            </div>

            {message && (
              <div>
                <span
                  className={`flex items-center justify-center p-1 ${
                    click ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {message}
                </span>
              </div>
            )}

            <div className="flex  justify-end">
              <button className="h-10 w-40 flex flex-row justify-center items-center m-5 dark:bg-green-800 bg-green-500 text-white border shadow-md rounded-md font-semibold hover:bg-green-600 transition duration-200">
                Add to cart
                <span className="material-symbols-outlined">
                  add_shopping_cart
                </span>
              </button>
            </div>
          </form>
        </div>

        <div className="p-10">
          <div className="flex flex-col gap-5 w-full mx-auto">
            <div className="flex flex-row justify-between p-3 border-b border-slate-400">
              <h2 className="font-semibold dark:text-slate-200">
                CART<span>({cartItems.quantity})</span>
              </h2>
            </div>
            {cartItems.items &&
              cartItems.items.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-4 border border-gray-300 p-4 rounded-lg shadow-md bg-white dark:bg-gray-950 transition-transform transform hover:scale-105 duration-200"
                >
                  <div className="flex flex-row justify-between items-center">
                    <h2 className="text-lg font-semibold dark:text-gray-300 text-gray-800">
                      {item.turfname}
                    </h2>
                    <button
                      onClick={() => removeBooking(item.bookingid)}
                      className="text-red-600 hover:text-red-800 transition duration-150"
                      aria-label="Remove from cart"
                    >
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </div>
                  <div className="flex flex-col text-sm gap-1 dark:text-gray-400">
                    <span className="font-medium">
                      Sport:{" "}
                      <span className="font-normal">{item.courtname}</span>
                    </span>
                    <span className="font-medium">
                      Size: <span className="font-normal">{item.size}</span>
                    </span>
                    <span className="font-medium">
                      Date: <span className="font-normal">{item.date}</span>
                    </span>
                    <span className="font-medium">
                      Time:{" "}
                      <span className="font-normal">
                        {item.time.start} - {item.time.end}
                      </span>
                    </span>
                    <span className="font-medium">
                      Price: <span className="font-normal">{item.price}</span>
                    </span>
                  </div>
                </div>
              ))}

            <Link
              to={"/root/checkout"}
              state={{ turf: turfname }}
              className="dark:bg-green-800 font-semibold flex flex-row justify-center items-center gap-1 w-full p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200"
            >
              Proceed to checkout
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
