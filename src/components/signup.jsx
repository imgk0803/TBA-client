import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import LoadingScreen from "./loadingScreen";

export default function Signup() {
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [password, setpassword] = useState("");
  const [confirm, confirmpwd] = useState("");
  const [message, setmessage] = useState("");
  const [isloading, setLoading] = useState(false);
  const navigate = useNavigate();
  const closeLoadingScreen = () => {
    setLoading(false);
    setmessage(null);
  };
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      if (password !== confirm) {
        setmessage("password doesn't match");
      } else {
        const body = { username, email, phone, password };
        const response = await axiosInstance.post("/api/user/signin", body);
        setmessage(`${response.data.message}`);
      }
    } catch (err) {
      setmessage("sometihng went wrong");
      console.log("error ::", err);
    }
  };

  return (
    <>
      {isloading ? (
        <LoadingScreen message={message} onclick={closeLoadingScreen} />
      ) : (
        <form
          className="flex flex-col gap-2"
          action="submit"
          onSubmit={handleSubmit}
        >
          <label htmlFor="name">
            Name<span className="text-red-600"> *</span>
          </label>
          <input
            onChange={(e) => setusername(e.target.value)}
            className="px-1 shadow-md rounded-md outline-none"
            type="text"
          />
          <label htmlFor="email">
            Email<span className="text-red-600"> *</span>
          </label>
          <input
            onChange={(e) => setemail(e.target.value)}
            className="px-1 shadow-md rounded-md outline-none"
            type="text"
          />
          <label htmlFor="phone">Phone</label>
          <input
            onChange={(e) => setphone(e.target.value)}
            className="px-1 shadow-md rounded-md outline-none"
            type="text"
          />
          <label htmlFor="password">
            Password<span className="text-red-600"> *</span>
          </label>
          <input
            onChange={(e) => setpassword(e.target.value)}
            className="px-1 shadow-md rounded-md outline-none"
            type="text"
          />
          <label htmlFor="confirm password">
            Confirm Password<span className="text-red-600"> *</span>
          </label>
          <input
            onChange={(e) => confirmpwd(e.target.value)}
            className="px-1 shadow-md rounded-md outline-none"
            type="password"
          />
          <button className="bg-green-500 rounded-md mt-2 p-1 text-white hover:bg-green-600">
            SignUP
          </button>
        </form>
      )}
    </>
  );
}
