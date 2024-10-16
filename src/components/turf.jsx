import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { averageRating } from "../hooks/useAverageRating"
import axiosInstance from "../utils/axiosInstance"
export default function Turf({_id,title,city,dist,image,court}){
    const [review ,setReview] = useState([])
    const [ratings ,setRatings] = useState()
    const newCourt = court.map(c=>c.sport)
    const sports = [... new Set(newCourt) ]
    useEffect(()=>{
         axiosInstance.get(`/api/user/getreview`)
         .then(res => {
            const turfreview = res.data.review.filter(rev => rev.turf === _id)
            setReview(averageRating(turfreview));
            setRatings(turfreview.length)

         })

    })
    return(
        <>
           <article className=" flex flex-col gap-2 p-5 bg-inherit dark:bg-gray-950 text-slate-800 border  dark:border-slate-800 shadow-lg  rounded-md w-72 mt-4 hover:scale-110 transition-all duration-300" >
            
            <img className="h-52 object-cover rounded-lg"src={image} alt="" />
            <div className="flex flex-row justify-between font-semibold items-center">
            <h3 className="text-lg dark:text-gray-300">{title}</h3>
            <span className="text-xs  dark:text-gray-300"><span className="material-symbols-outlined text-yellow-500 text-sm pt-1">star</span>{review}(<span>{ratings}</span>)</span></div>
            <span className=" dark:text-gray-300">{city},{dist}</span>
            <ul className="flex flex-row justify-start items-center gap-1 ">
                {
                    sports.map((sport,index)=>(
                        <li className="border shadow-lg rounded-xl text-xs  dark:text-gray-300 p-1" key={index}>{sport}</li>   
                    ))
                   
                }</ul>
            <Link to={"/root/turf/"+_id}className="border rounded-md dark:bg-green-800 bg-green-500 p-1 text-white text-center">View</Link>
        
        
           </article>
        </>
    )
}