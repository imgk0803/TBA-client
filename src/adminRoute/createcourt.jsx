import axios from "axios"
import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import axiosInstance from "../utils/axiosInstance"

export default function Addcourt(){
    const navigate = useNavigate()
    const {turfid} = useParams()
    const location = useLocation()
    const{turfname} = location.state
    const [sport , setSport]= useState('')
    const [description , setDescription] = useState('')
    const[price , setPrice] =useState()
    const [size , setSize] = useState('')
    const token = localStorage.getItem('token')
    const handleSubmit=async(e)=>{
        e.preventDefault()
    try{
        const body = {
           sport,
           description,
           price,
           size
        }
         axiosInstance.post(`/api/admin/addcourt/${turfid}`,body,{
            headers : {
                'Authorization':`Bearer ${token}`
            }
         })
         .then(res=>console.log("court added"))
    }
    catch(err){
        console.log(err)
    }

    }
    return(
        <> 
        <section className="p-5 dark:bg-gray-900">
        <button className="bg-green-500 p-1 text-white rounded-md" onClick={()=>{navigate(-1)}}>Back</button>
        <div className="max-w-md mx-auto dark:bg-gray-950 bg-white shadow-md rounded-md p-6">
            <h2 className="text-2xl font-semibold text-center mb-6">Add Court to <span>{turfname}</span></h2>
            <form onSubmit={handleSubmit} className="space-y-4 dark:text-gray-300">
                <div>
                    <label className="block dark:text-gray-300 text-sm font-medium text-gray-700">
                        Sport:
                    </label>
                   <select onChange={(e)=>{setSport(e.target.value)}}  className="mt-1 dark:text-gray-300 outline-none block w-full dark:bg-gray-900 border border-gray-300 rounded-md p-2" name="" id="">
                     <option value="Football">Football</option>
                     <option value="Cricket">Cricket</option>
                     <option value="Badminton">Badminton</option>
                     <option value="Volleyball">Volleyball</option>
                   </select>
                </div>
                <div>
                    <label className="block dark:text-gray-300 text-sm font-medium text-gray-700">
                        Description:
                    </label>
                    <textarea onChange={(e)=>{setDescription(e.target.value)}}
                        className="mt-1 dark:text-gray-300 dark:bg-gray-900 block w-full border border-gray-300 rounded-md p-2"
                        rows="3"
                    />
                </div>
                <div>
                    <label className="block text-sm dark:text-gray-300 font-medium text-gray-700">
                        Price:
                    </label>
                    <input
                    onChange={(e)=>{setPrice(e.target.value)}}
                        type="number"
                        className="mt-1 block dark:text-gray-300 dark:bg-gray-900 w-full border border-gray-300 rounded-md p-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium dark:text-gray-300 text-gray-700">
                        Size:
                    </label>
                    <input
                    onChange={(e)=>{setSize(e.target.value)}}
                        type="text"
                        className="mt-1 block w-full border dark:bg-gray-900 border-gray-300 rounded-md p-2"
                        placeholder="Enter the Size of the Court  eg : 11x11 , 1x1"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-green-500 text-white py-2 rounded-md font-semibold hover:bg-blue-600"
                >
                    Add Court
                </button>
            </form>
        </div>
        </section>
           
        </>
    )
}