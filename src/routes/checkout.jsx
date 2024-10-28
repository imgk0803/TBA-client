import { useDispatch, useSelector } from "react-redux";
import BookingComponent from "../components/bookingComponent";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { clearCart } from "../features/cart/cartslice";
import axiosInstance from "../utils/axiosInstance";
import LoadingScreen from "../components/loadingScreen";
export default function Checkout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [razorpaykey, setKey] = useState("");
  const [message, setMessage] = useState();
  const [isLoading, setLoading] = useState(false);
  const bookings = useSelector((state) => state.cart.items);
  const totalPrice =
    bookings && bookings.reduce((sum, item) => sum + item.price, 0);
  const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();
  const closeLoadingScreen = () => {
    setLoading(false);
    setMessage(null);
  };
  useEffect(() => {
    axiosInstance
      .get("/api/user/razorpaykey")
      .then((res) => {
        setKey(res.data);
      })
      .catch((err) => console.log(err));
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);
  const addPayment = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const bookingids = bookings.map((item) => item.bookingid);
      const reqbody = {
        total: totalPrice,
      };
      const response = await axiosInstance.post(
        "/api/user/createorder",
        reqbody
      );
      if (!response) {
        alert("Failed to create order. Please try again.");
        return;
      }
      const options = {
        key: razorpaykey,
        amount: response.data.amount.toString(),
        currency: response.data.currency,
        name: "Turf Booking",
        description: "Test Transaction",
        order_id: response.data.id,

        handler: async (response) => {
          try {
            const verificationResponse = await axiosInstance.post(
              "/api/user/verifypayment",
              {
                pay_id: response.razorpay_payment_id,
                order_id: response.razorpay_order_id,
                signature: response.razorpay_signature,
                user: user._id,
                bookingsid: bookingids,
              }
            );
            if (verificationResponse.status === 200) {
              setMessage("Payment Successfull..!");
              dispatch(clearCart());
            } else {
              alert("Payment verification failed");
            }
          } catch (err) {
            console.log("Error verifying payment:", err);
            alert("An error occurred while verifying the payment.");
          }
        },
        prefill: {
          name: user.username,
          email: user.email,
          contact: user.phone,
        },
        theme: {
          color: "#F37254",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.log("errorr>>", err);
    }
  };
  return (
    <>
      {isLoading ? (
        <LoadingScreen message={message} onclick={closeLoadingScreen} />
      ) : (
        <>
          <button
            onClick={(e) => {
              navigate(-1);
            }}
            className="bg-green-500 text-white w-16 pt-1 rounded-md shadow-md hover:bg-green-600 transition duration-200"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 p-3 gap-4">
            <div className="flex flex-col gap-3 pt-2 px-5">
              {bookings && bookings.length > 0 ? (
                bookings.map((item) => (
                  <BookingComponent key={item.bookingid} {...item} />
                ))
              ) : (
                <div className="text-center p-10">
                  <h2 className="text-2xl text-gray-700 dark:text-gray-300">
                    Sorry, there are no bookings
                  </h2>
                </div>
              )}
            </div>

            {bookings.length > 0 && (
              <table className="w-full md:w-1/2 mx-auto border-collapse border-slate-300 shadow-md dark:bg-gray-900">
                <tbody>
                  <tr className="bg-gray-100 dark:bg-gray-900">
                    <td className="p-4 dark:text-gray-300 text-gray-700">
                      Court Price
                    </td>
                    <td className="dark:text-gray-300 p-4 text-right text-gray-700">
                      {totalPrice} INR
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 dark:text-gray-300 text-gray-700">
                      Convenience Fee
                    </td>
                    <td className="p-4 dark:text-gray-300 text-right text-gray-700">
                      INR 8.97
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 dark:text-gray-300 text-gray-700 font-bold">
                      Total Amount
                    </td>
                    <td className="p-4 dark:text-gray-300 text-right text-gray-700 font-bold">
                      {totalPrice + 8.97} INR
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2" className="p-0">
                      <button
                        onClick={addPayment}
                        className="w-full border rounded-md bg-green-500 text-white shadow-md hover:bg-green-600 transition duration-200"
                      >
                        Pay {totalPrice + 8.97} INR
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
    </>
  );
}
