import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import LoadingScreen from "../components/loadingScreen";

export default function UpdateCourt({_id,sport , description ,size , price}){
    const navigate = useNavigate()
    const[isLoading , setLoading ] = useState(false)
    const[message , setMessage] = useState()
    const [inputPrice , setInputPrice] = useState()
    const token = localStorage.getItem('token')
    const handleSubmit=async(e)=>{
      setLoading(true)
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
                
                .then(res=>{
                  setMessage(res.data.message)
                })
            }
            catch(err){

            }
    }
    const closeLoadingScreen=()=>{
      setLoading(false)
      setMessage(null)
    }
    return (
    <>
      {isLoading ? <LoadingScreen message={message} onclick={closeLoadingScreen}/> : (
        <article className="p-4 border rounded-md shadow-md font-semibold dark:bg-gray-800 dark:border-gray-700">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex justify-between">
              <span className="dark:text-gray-300">Sport</span>
              <span className="dark:text-gray-300">:</span>
            </div>
            <span className="dark:text-gray-300">{sport}</span>
      
            <div className="flex justify-between">
              <span className="dark:text-gray-300">Type</span>
              <span className="dark:text-gray-300">:</span>
            </div>
            <span className="dark:text-gray-300">{description}</span>
      
            <div className="flex justify-between">
              <span className="dark:text-gray-300">Price</span>
              <span className="dark:text-gray-300">:</span>
            </div>
            <span className="dark:text-gray-300">{price}</span>
      
            <div className="flex justify-between">
              <span className="dark:text-gray-300">Size</span>
              <span className="dark:text-gray-300">:</span>
            </div>
            <span className="dark:text-gray-300">{size}</span>
          </div>
      
          <div className="flex items-center gap-4">
            <input 
              onChange={(e) => setInputPrice(e.target.value)} 
              value={inputPrice} 
              className="dark:bg-gray-900 p-2 w-full outline-none border border-gray-300 rounded-md dark:border-gray-600" 
              type="number" 
              placeholder="Enter new price"
            />
            <button 
              onClick={handleSubmit} 
              className="px-4 py-2 rounded-md text-white text-xs bg-green-500 hover:bg-green-600 transition-colors font-semibold">
              Update Price
            </button>
          </div>
        </article>
)}
</>);
      
}