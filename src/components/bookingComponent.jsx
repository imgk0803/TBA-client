import { useDispatch } from "react-redux";
import { removeFromCart } from "../features/cart/cartslice";
import axiosInstance from "../utils/axiosInstance";
export default function BookingComponent({
  bookingid,
  courtname,
  size,
  price,
  time,
  date,
  turfname,
}) {
  const dispatch = useDispatch();
  const removeBooking = async (id) => {
    try {
      dispatch(removeFromCart(id));
      const res = await axiosInstance.delete(`/api/user/deletebooking/${id}`);
    } catch (err) {
      console.log("error::", err);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4 border border-gray-300 p-4 rounded-lg shadow-md bg-white dark:bg-gray-900 transition-transform transform hover:scale-105 duration-200">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-lg font-semibold dark:text-gray-300 text-gray-800">
            {turfname}
          </h2>
          <button
            onClick={() => removeBooking(bookingid)}
            className="text-red-600 hover:text-red-800 transition duration-150"
            aria-label="Remove from cart"
          >
            <span className="material-symbols-outlined">delete</span>
          </button>
        </div>
        <div className="flex flex-col text-sm gap-1 dark:text-gray-400">
          <span className="font-medium">
            Sport: <span className="font-normal">{courtname}</span>
          </span>
          <span className="font-medium">
            Size: <span className="font-normal">{size}</span>
          </span>
          <span className="font-medium">
            Date: <span className="font-normal">{date}</span>
          </span>
          <span className="font-medium">
            Time:{" "}
            <span className="font-normal">
              {time.start} - {time.end}
            </span>
          </span>
          <span className="font-medium">
            Price: <span className="font-normal">{price}</span>
          </span>
        </div>
      </div>
    </>
  );
}
