import { useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import axiosInstance from "../utils/axiosInstance"
import LoadingScreen from "../components/loadingScreen"

export default function Addcourt(){
    const navigate = useNavigate()
    const {turfid} = useParams()
    const location = useLocation()
    const{turfname} = location.state
    const [sport , setSport]= useState('')
    const [description , setDescription] = useState('')
    const[price , setPrice] =useState()
    const [size , setSize] = useState('')
    const [message , setmessage] = useState()
    const [isLoading , setLoading] = useState(false)
    const token = localStorage.getItem('token')
    const closeLoadingScreen=()=>{
      setLoading(false)
      setmessage(null)
    }
    const handleSubmit=async(e)=>{
        e.preventDefault()
    try{
        setLoading(true)
        const body = {
           sport,
           description,
           price,
           size
        }
         await axiosInstance.post(`/api/admin/addcourt/${turfid}`,body,{
            headers : {
                'Authorization':`Bearer ${token}`
            }
         })
         .then(res=>{
          setmessage(res.data.message)
          setDescription('')
          setSize('')
          setSport('')
          setPrice('')
    })
    }
    catch(err){
        console.log(err)
        setLoading(false)
    }

    }
    return (
        <>
          {isLoading ? (
            <LoadingScreen message={message} onclick={closeLoadingScreen} />
          ) : (
            <section className="p-5 dark:bg-gray-900 min-h-screen mt-24 md:mt-0">
              <button
                onClick={() => navigate(-1)}
                className="bg-green-500 text-white w-16 pt-1 rounded-md shadow-md hover:bg-green-600 transition duration-200">
                <span className="material-symbols-outlined">arrow_back</span>
             </button>
      
              <div className="max-w-lg mx-auto mt-8 dark:bg-gray-950 bg-white shadow-lg rounded-md p-6">
                <h2 className="text-2xl font-semibold text-center mb-6 dark:text-gray-300 text-gray-800">
                  Add Court to <span className="font-bold">{turfname}</span>
                </h2>
      
                <form onSubmit={handleSubmit} className="space-y-5 dark:text-gray-300">
                  <div>
                    <label className="block text-sm font-medium dark:text-gray-300 text-gray-700">
                      Sport:
                    </label>
                    <select
                      onChange={(e) => setSport(e.target.value)}
                      className="mt-1 block w-full border dark:bg-gray-900 border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                      autoFocus
                    >
                      <option value="Football">Football</option>
                      <option value="Cricket">Cricket</option>
                      <option value="Badminton">Badminton</option>
                      <option value="Volleyball">Volleyball</option>
                    </select>
                  </div>
      
                  <div>
                    <label className="block text-sm font-medium dark:text-gray-300 text-gray-700">
                      Description:
                    </label>
                    <textarea
                      onChange={(e) => setDescription(e.target.value)}
                      className="mt-1 block w-full border dark:bg-gray-900 border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                      rows="3"
                      placeholder="Enter court description"
                    />
                  </div>
      
                  <div>
                    <label className="block text-sm font-medium dark:text-gray-300 text-gray-700">
                      Price:
                    </label>
                    <input
                      onChange={(e) => setPrice(e.target.value)}
                      type="number"
                      className="mt-1 block w-full border dark:bg-gray-900 border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Enter the price"
                      required
                    />
                  </div>
      
                  <div>
                    <label className="block text-sm font-medium dark:text-gray-300 text-gray-700">
                      Size:
                    </label>
                    <input
                      onChange={(e) => setSize(e.target.value)}
                      type="text"
                      className="mt-1 block w-full border dark:bg-gray-900 border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Enter the Size of the Court (e.g., 11x11, 1x1)"
                      required
                    />
                  </div>
      
                  <button
                    type="submit"
                    className="w-full bg-green-500 text-white py-3 rounded-md font-semibold hover:bg-green-600 transition-colors"
                  >
                    Add Court
                  </button>
                </form>
              </div>
            </section>
          )}
        </>
      );
      
}