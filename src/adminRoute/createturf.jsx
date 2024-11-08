import { Link, useNavigate } from "react-router-dom"
import LoadingScreen from "../components/loadingScreen";
import { useState } from "react";
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
    const [isLoading , setLoading] = useState(false)
    const[message , setmessage] = useState()
    const closeLoadingScreen=()=>{
      setLoading(false)
      setmessage(null)
    }
    const handleSubmit=async(e)=>{
        setLoading(true)
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
        .then(res=>{
          setmessage(res.data.message)
        })
     }
     catch(err){
        console.log(err)
     }
    }
    return (
        <>{isLoading ? <LoadingScreen message={message} onclick={closeLoadingScreen} /> :

          <section className="p-5 dark:bg-gray-900 min-h-screen mt-24 md:mt-0">
            <button
                onClick={() => navigate(-1)}
                className="bg-green-500 text-white w-16 pt-1 rounded-md shadow-md hover:bg-green-600 transition duration-200">
                <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg dark:bg-gray-950 p-6 mt-8">
              <h2 className="text-2xl font-semibold dark:text-gray-300 text-center mb-6">
                Create New Turf
              </h2>
              <form className="space-y-5 dark:bg-gray-950" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm dark:text-gray-300 font-medium text-gray-700">
                    Name:
                  </label>
                  <input
                    type="text"
                    name="turfname"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    className="mt-1 block w-full border dark:bg-gray-900 border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter Turf Name"
                    required
                  />
                </div>
      
                <div>
                  <label className="block text-sm dark:text-gray-300 font-medium text-gray-700">
                    Manager (email):
                  </label>
                  <input
                    type="text"
                    name="manager"
                    onChange={(e) => setManager(e.target.value)}
                    value={manager}
                    className="mt-1 block w-full border dark:bg-gray-900 border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Manager's Email"
                    required
                  />
                </div>
      
                <div>
                  <label className="block text-sm dark:text-gray-300 font-medium text-gray-700">
                    City:
                  </label>
                  <input
                    type="text"
                    name="location"
                    onChange={(e) => setCity(e.target.value)}
                    value={city}
                    className="mt-1 block w-full border dark:bg-gray-900 border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="City Name"
                    required
                  />
                </div>
      
                <div>
                  <label className="block text-sm dark:text-gray-300 font-medium text-gray-700">
                    District:
                  </label>
                  <input
                    type="text"
                    name="district"
                    onChange={(e) => setDist(e.target.value)}
                    value={dist}
                    className="mt-1 block w-full border dark:bg-gray-900 border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="District"
                    required
                  />
                </div>
      
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm dark:text-gray-300 font-medium text-gray-700">
                      Latitude:
                    </label>
                    <input
                      type="number"
                      name="latitude"
                      onChange={(e) => setLatitude(e.target.value)}
                      value={latitude}
                      className="mt-1 block w-full border dark:bg-gray-900 border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Latitude"
                      required
                    />
                  </div>
      
                  <div>
                    <label className="block text-sm dark:text-gray-300 font-medium text-gray-700">
                      Longitude:
                    </label>
                    <input
                      type="number"
                      name="longitude"
                      onChange={(e) => setLongitude(e.target.value)}
                      value={longitude}
                      className="mt-1 block w-full border dark:bg-gray-900 border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Longitude"
                      required
                    />
                  </div>
                </div>
      
                <div>
                  <label className="block text-sm dark:text-gray-300 font-medium text-gray-700">
                    Description:
                  </label>
                  <textarea
                    name="desc"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    className="mt-1 block w-full border dark:bg-gray-900 border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                    rows="3"
                    placeholder="Describe the turf"
                  />
                </div>
      
                <div>
                  <label className="block text-sm dark:text-gray-300 font-medium text-gray-700">
                    Image:
                  </label>
                  <input
                    type="file"
                    name="image"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="mt-1 block w-full border dark:bg-gray-900 border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
      
                <button
                  type="submit"
                  className="w-full bg-green-500 text-white p-3 rounded-md font-semibold hover:bg-green-600 transition-colors"
                >
                  Create Turf
                </button>
              </form>
            </div>
          </section>
           }
        </>
      );
      
}