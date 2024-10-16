import axios from "axios";
import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";


export default function Review({toggle,turf_id}){
    const[rating,setRating] = useState(0);
    const [review,setReview] = useState('')
    const userid = JSON.parse(localStorage.getItem('user'))._id
    const handleRating = (rate) => {
        setRating(rate);
      };
    const handleSubmit = async(e) =>{
        e.preventDefault()
   try{
    
    const res = await axiosInstance.post('/api/user/turf/addreview',{
      rating : rating,
      turfreview : review,
      turfid : turf_id,
      userid : userid
    })
    toggle();
   }
   catch(err){

   }
           
    }
 return(
    <>
          <div className="fixed inset-0 w-full h-full flex items-center justify-center bg-black bg-opacity-70 z-50 ">
            <div className="w-1/2 bg-white dark:bg-gray-700 p-5 rounded-lg">
            <h2 className="text-2xl dark:text-gray-300 text-center">rate turfname</h2>
            <div className="flex items-center mb-4 dark:bg-gray-700 bg-white">
               <span className="mr-2 dark:bg-gray-700 dark:text-gray-300">Rating:</span>
                 {[1, 2, 3, 4, 5].map((star) => (
               <svg
              key={star}
              className={`w-6 dark:bg-gray-700 h-6 cursor-pointer ${rating >= star ? 'text-yellow-500' : 'text-gray-300'}`}
              onClick={() => handleRating(star)}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.555 4.785a1 1 0 00.95.69h5.036c.969 0 1.371 1.24.588 1.81l-4.074 2.96a1 1 0 00-.364 1.118l1.555 4.786c.3.92-.755 1.688-1.54 1.117l-4.075-2.961a1 1 0 00-1.175 0l-4.075 2.96c-.785.571-1.84-.196-1.54-1.117l1.555-4.786a1 1 0 00-.364-1.117l-4.074-2.96c-.783-.57-.381-1.81.588-1.81h5.036a1 1 0 00.95-.69l1.555-4.786z" />
            </svg>
          ))}
        </div>
        <textarea
          className="w-full h-24 p-2 border rounded dark:bg-gray-700 mb-4"
          placeholder="Enter your review..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
          
          
        />
        <div className="flex flex-row justify-between items-center">
             <button className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded" onClick={toggle}>close</button>  
             <button className="bg-green-500 hover:bg-emerald-500 text-white font-bold py-2 px-4 rounded" onClick={handleSubmit}
          >
            Submit
          </button>  
        </div>
        
            </div> 
        </div>
    </>
 )
}