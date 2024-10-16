import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

export default function UpdateCourt({_id,sport , description ,size , price}){
    const navigate = useNavigate()
    const [inputPrice , setInputPrice] = useState()
    const token = localStorage.getItem('token')
    const handleSubmit=async(e)=>{
        e.preventDefault();
            try{
                const body = {
                    price : inputPrice,
                    courtid : _id
                }
                axiosInstance.post('/api/admin/updatecourt',body,{
                    headers : {
                        'Authorization' : `Bearer ${token}`
                    }
                })
                
                .then(res=>navigate('/root/admindashboard'))
            }
            catch(err){

            }
    }
    return(
          <article className="p-2 border rounded-md shadow-md font-bold">
              <div className="flex flex-row justify-between gap-3 p-2 ">
                  <span className="dark:text-gray-300">Sport</span>
                  <span className="dark:text-gray-300">:</span>
                  <span className="dark:text-gray-300">{sport}</span>
              </div> 
              <div className="flex flex-row justify-between gap-3 p-2 ">
                  <span className="dark:text-gray-300">Type</span>
                  <span className="dark:text-gray-300">:</span>
                  <span className="dark:text-gray-300">{description}</span>
              </div> 
              <div className="flex flex-row justify-between gap-3 p-2 ">
                  <span className="dark:text-gray-300">Price</span>
                  <span className="dark:text-gray-300">:</span>
                  <span className="dark:text-gray-300">{price}</span>
              </div> 
              <div className="flex flex-row justify-between gap-3 p-2 ">
                  <span className="dark:text-gray-300">size</span>
                  <span className="dark:text-gray-300">:</span>
                  <span className="dark:text-gray-300">{size}</span>
              </div> 
              <div className="flex flex-row justify-between p-2 h-12">
                  <input onChange={(e)=>{setInputPrice(e.target.value)}} value={inputPrice} className=" dark:bg-gray-900 p-2 outline-none border border-gray-300 rounded-md " type="number" />
                  <button onClick={handleSubmit} className=" p-2 rounded-md  text-white text-xs bg-green-500 font-semibold">Update Price</button>
              </div> 
          </article>
    )
}