import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { averageRating } from "../hooks/useAverageRating";
import axiosInstance from "../utils/axiosInstance";
export default function TurfAdmin({
  _id,
  city,
  dist,
  title,
  image,
  court,
  onClick,
}) {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const [review, setReview] = useState([]);
  const [ratings, setRatings] = useState();
  const newCourt = court.map((c) => c.sport);
  const sports = [...new Set(newCourt)];
  useEffect(() => {
    axiosInstance.get(`/api/user/getreview`).then((res) => {
      const turfreview = res.data.review.filter((rev) => rev.turf === _id);
      setReview(averageRating(turfreview));
      setRatings(turfreview.length);
    });
  });
  return (
    <>
      <article className=" flex flex-col gap-2 p-5 text-sm bg-slate-50 dark:bg-gray-950 text-slate-800 border border-slate-100 shadow-lg rounded-md w-72 mt-4 hover:scale-110 transition-all duration-300">
        <img className="h-52 object-cover rounded-lg" src={image} alt="" />
        <div className="flex flex-row justify-between font-semibold items-center">
          <h3 className="text-lg dark:text-gray-300">{title}</h3>
          <span className="text-xs dark:text-gray-300">
            <span className="material-symbols-outlined text-yellow-500 text-sm pt-1">
              star
            </span>
            {review}({ratings})
          </span>
        </div>
        <span className="dark:text-gray-300">
          {city},{dist}
        </span>
        <ul className="flex flex-row justify-start items-center gap-1 ">
          {sports.map((sport, index) => (
            <li
              className="border dark:text-gray-300 shadow-lg rounded-xl text-xs p-1"
              key={index}
            >
              {sport}
            </li>
          ))}
        </ul>
        <div className="flex flex-col gap-2">
          <Link
            to={"/root/updateturf/" + _id}
            state={{ turfname: title }}
            className="border rounded-md text-xs bg-green-500 p-1 w-full text-white text-center"
          >
            update
          </Link>
          <button
            onClick={() => {
              navigate(`/root/addcourt/${_id}`, { state: { turfname: title } });
            }}
            className="border rounded-md text-xs bg-green-500 p-1 text-white text-center w-full"
          >
            Add Court
          </button>
          <button
            onClick={onClick}
            className="border rounded-md text-xs bg-red-500 p-1 text-white text-center w-full"
          >
            Delete Turf
          </button>
        </div>
      </article>
    </>
  );
}
