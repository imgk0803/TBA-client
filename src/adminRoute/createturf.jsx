import { Link, useNavigate } from "react-router-dom"
import { useState } from "react";
import axios from "axios"
import axiosInstance from "../utils/axiosInstance";
export default function AddTurf(){
    const navigate = useNavigate()
    const[manager , setManager]= useState('')
    const [title , setTitle]=useState('')
    const [description , setDescription]=useState('')
    const [city , setCity]=useState('')
    const [dist , setDist]=useState('')
    const [latitude , setLatitude]=useState()
    const [longitude , setLongitude]=useState()
    const[image , setImage]=useState(null)
    const handleSubmit=async(e)=>{
        e.preventDefault();
     try{
        const formdata = new FormData(); 
          formdata.append("title",title)
          formdata.append("manager",manager)
          formdata.append("description",description)
          formdata.append ("city",city)
          formdata.append("dist",dist)
          formdata.append("lat",latitude)
          formdata.append("long",longitude)
          if(image){
          formdata.append("image",image)       
          }
        const token = localStorage.getItem('token')
        await axiosInstance.post("/api/admin/turf",formdata,{
            headers : {
                "Authorization" : `Bearer ${token}`,
                "Content-Type" : 'multipart/form-data'
            }
        })
        .then(res=>console.log("turf added"))
     }
     catch(err){
        console.log(err)
     }
    }
    return(
        <>
            <section className="p-5 dark:bg-gray-900">
                <button onClick={()=>{navigate(-1)}} className="p-1 bg-green-500 rounded-md text-white">Back</button>
            <div className="max-w-md mx-auto bg-white shadow-md rounded-md dark:bg-gray-950 p-6">
            <h2 className="text-2xl font-semibold dark:text-gray-300 text-center mb-6">Create New Turf</h2>
            <form className="space-y-4 dark:bg-gray-950" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-sm dark:text-gray-300  font-medium text-gray-700">
                        Name:
                    </label>
                    <input
                        type="text"
                        name = 'turfname'
                        onChange={(e)=>{setTitle(e.target.value)}}
                        value={title}
                        className="mt-1 block w-full border dark:bg-gray-900 border-gray-300 rounded-md p-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Manager (email):
                    </label>
                    <input
                        type="text"
                        name="manager"
                        onChange={(e)=>{setManager(e.target.value)}}
                        value={manager}
                        className="mt-1  dark:bg-gray-900 block w-full border border-gray-300 rounded-md p-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        City:
                    </label>
                    <input
                        type="text"
                        name = 'location'
                        onChange={(e)=>{setCity(e.target.value)}}
                        value={city}

                        className="mt-1  dark:bg-gray-900 block w-full border border-gray-300 rounded-md p-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm dark:text-gray-300 font-medium text-gray-700">
                        District:
                    </label>
                    <input
                        type="text"
                        name="price"
                        onChange={(e)=>{setDist(e.target.value)}}
                        value={dist}

                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 dark:bg-gray-900"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium dark:text-gray-300 text-gray-700">
                        Latitude:
                    </label>
                    <input
                        type="number"
                        name="latitude"
                        onChange={(e)=>{setLatitude(e.target.value)}}
                        value={latitude}

                        className="mt-1 block w-full border dark:bg-gray-900 border-gray-300 rounded-md p-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium dark:text-gray-300 text-gray-700">
                        Longitude:
                    </label>
                    <input
                        type="number"
                        name="longitude"
                        onChange={(e)=>{setLongitude(e.target.value)}}
                        value={longitude}

                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 dark:bg-gray-900"
                        required
                    />
                </div>
                <div>
                    <label className="block dark:text-gray-300 text-sm font-medium text-gray-700">
                        Description:
                    </label>
                    <textarea
                    name="desc"
                    onChange={(e)=>{setDescription(e.target.value)}}
                    value={description}

                        className="mt-1 block w-full border border-gray-300 dark:bg-gray-900 rounded-md p-2"
                        rows="3"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium dark:text-gray-300 text-gray-700">
                        Image:
                    </label>
                    <input
                        type="file"
                       name="image"
                       onChange={(e)=>{setImage(e.target.files[0])}}
                       
                        className="mt-1 block w-full border dark:bg-gray-900 border-gray-300 rounded-md p-2"
                        required
                    />
                </div>
                <button type="submit" className=" bg-green-500 text-white p-2 rounded-md font-semibold hover:bg-green-600">Create Turf</button>
            </form>
        </div>
            </section>
        </>
    )
}