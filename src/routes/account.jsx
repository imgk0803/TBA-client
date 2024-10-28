import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../features/user/userSlice";
import { clearCart } from "../features/cart/cartslice";
import axiosInstance from "../utils/axiosInstance";
import LoadingScreen from "../components/loadingScreen";

export default function Account() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [message, setmessage] = useState("");
  const [view, setview] = useState("transaction");
  const [payments, setpayments] = useState([]);
  const [confirm, setconfirm] = useState("");
  const [password, setpassword] = useState("");
  const [current, setcurrent] = useState("");
  const [userName, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isloading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    axiosInstance
      .get("/api/user/payments")
      .then((res) =>
        setpayments(res.data.filter((item) => user._id === item.user))
      )
      .catch((err) => alert("something went wrong"));
    setUsername(user.username);
    setEmail(user.email);
    setPhone(user.phone);
  }, []);
  const closeLoadingScreen = () => {
    setLoading(false);
    setmessage(null);
  };
  const logOut = () => {
    localStorage.setItem("user", "");
    localStorage.setItem("role", "");
    localStorage.setItem("token", null);
    dispatch(logout());
    dispatch(clearCart());
    navigate("/signin");
  };
  const updatePassword = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const body = {
        userid: user._id,
        current: current,
        password: password,
        confirm: confirm,
      };
      const res = await axiosInstance.patch("/api/user/updatepwd", body);
      setmessage(res.data.message);
      setTimeout(() => {
        setconfirm("");
        setcurrent("");
        setpassword("");
        setmessage("");
      }, 2000);
    } catch (err) {
      setmessage("something went wrong..");
    }
  };
  const editProfile = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const body = {
        userid: user._id,
        username: userName,
        email: email,
        phone: phone,
      };
      const res = await axiosInstance.patch("/api/user/updateprofile", body);
      setmessage(res.data.message);
      localStorage.setItem("user", JSON.stringify(res.data.updateduser));
    } catch (err) {
      setmessage("something went wrong..");
    }
  };
  return (
    <>
      {isloading ? (
        <LoadingScreen message={message} onclick={closeLoadingScreen} />
      ) : (
        <section className="flex flex-col md:flex-row p-3 gap-4 min-h-screen bg-white dark:bg-gray-900">
          <div className="flex flex-col gap-6 md:w-1/4 w-full items-center border-r-2 md:p-5 p-3 bg-white dark:bg-gray-800 shadow-md rounded-lg">
            <span className="material-symbols-outlined text-4xl text-green-600">
              mood
            </span>
            <span className="font-semibold text-xl dark:text-white">
              {user.username}
            </span>
            <span className="text-gray-500 dark:text-gray-300">
              {user.email}
            </span>
            <span className="text-gray-500 dark:text-gray-300">
              {user.phone}
            </span>
            <button
              onClick={() => setview("transaction")}
              className="bg-green-500 hover:bg-green-600 transition-all duration-300 text-white font-medium py-2 px-6 rounded-full shadow-md w-full text-center"
            >
              Transactions
            </button>
            <button
              onClick={() => setview("editprofile")}
              className="bg-green-500 hover:bg-green-600 transition-all duration-300 text-white font-medium py-2 px-6 rounded-full shadow-md w-full text-center"
            >
              Edit Profile
            </button>
            <button
              onClick={logOut}
              className="bg-red-500 hover:bg-red-600 transition-all duration-300 text-white font-medium py-2 px-6 rounded-full shadow-md w-full text-center"
            >
              Logout
            </button>
          </div>
          <div className="flex-grow w-full md:p-5 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg">
            {view === "transaction" && (
              <div className="flex flex-col gap-4 p-3 dark:bg-gray-900">
                {payments && payments.length > 0 ? (
                  payments.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-row justify-between items-center border shadow-lg rounded-md p-4 bg-white dark:bg-gray-700"
                    >
                      <div className="flex flex-col justify-center items-start">
                        <span className="font-semibold text-gray-600 dark:text-gray-300">
                          Date
                        </span>
                        <div className="flex flex-row justify-center items-center gap-1">
                          <span className="material-symbols-outlined">
                            calendar_month
                          </span>
                          <span className="dark:text-gray-300">
                            {item.created && item.created.slice(0, 10)}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-row justify-between items-center gap-4">
                        <div className="flex flex-col justify-center items-start">
                          <span className="font-semibold text-gray-600 dark:text-gray-300">
                            Price
                          </span>
                          <div className="flex flex-row justify-center items-center">
                            <span className="dark:text-gray-300">
                              {item.amount}
                            </span>
                            <span className="material-symbols-outlined">
                              currency_rupee
                            </span>
                          </div>
                        </div>
                        <span className="font-semibold text-gray-600 dark:text-gray-300">
                          Status
                        </span>
                        <span className="text-green-700 dark:text-green-300">
                          {item.p_status}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex justify-center items-center p-5">
                    <p className="text-lg text-gray-500 dark:text-gray-300">
                      No Payments found..!
                    </p>
                  </div>
                )}
              </div>
            )}

            {view === "editprofile" && (
              <div className="flex flex-col gap-6 p-5">
                <div className="w-full bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6">
                  <h2 className="text-2xl font-semibold mb-4 dark:text-white">
                    Update Password
                  </h2>
                  <form
                    onSubmit={updatePassword}
                    className="flex flex-col gap-4"
                  >
                    <label htmlFor="current" className="dark:text-gray-300">
                      Current Password
                    </label>
                    <input
                      onChange={(e) => setcurrent(e.target.value)}
                      value={current}
                      type="password"
                      className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:text-white"
                    />
                    <label htmlFor="password" className="dark:text-gray-300">
                      New Password
                    </label>
                    <input
                      onChange={(e) => setpassword(e.target.value)}
                      value={password}
                      type="password"
                      className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:text-white"
                    />
                    <label htmlFor="confirm" className="dark:text-gray-300">
                      Confirm Password
                    </label>
                    <input
                      onChange={(e) => setconfirm(e.target.value)}
                      value={confirm}
                      type="password"
                      className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:text-white"
                    />
                    <span
                      className={`${
                        message === "password changed successfully"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {message}
                    </span>
                    <button
                      type="submit"
                      className="bg-green-500 text-white py-2 rounded-md shadow-md hover:bg-green-600 transition-all duration-300"
                    >
                      Update Password
                    </button>
                  </form>
                </div>
                <div className="w-full bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6">
                  <h2 className="text-2xl font-semibold mb-4 dark:text-white">
                    Update Profile
                  </h2>
                  <form onSubmit={editProfile} className="flex flex-col gap-4">
                    <label htmlFor="username" className="dark:text-gray-300">
                      Username
                    </label>
                    <input
                      onChange={(e) => setUsername(e.target.value)}
                      value={userName}
                      type="text"
                      className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:text-white"
                    />
                    <label htmlFor="email" className="dark:text-gray-300">
                      Email
                    </label>
                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      type="email"
                      className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:text-white"
                    />
                    <label htmlFor="phone" className="dark:text-gray-300">
                      Phone
                    </label>
                    <input
                      onChange={(e) => setPhone(e.target.value)}
                      value={phone}
                      type="text"
                      className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:text-white"
                    />
                    <button
                      type="submit"
                      className="bg-green-500 text-white py-2 rounded-md shadow-md hover:bg-green-600 transition-all duration-300"
                    >
                      Update Details
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
}
