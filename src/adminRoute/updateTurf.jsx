import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import UpdateCourt from "./courtUpdate";
import axiosInstance from "../utils/axiosInstance";
import LoadingScreen from "../components/loadingScreen";
export default function UpdateTurf(){
    const location = useLocation()
    const {turfid} = useParams()
    const turf = location.state.turfname
    const navigate = useNavigate()
    const [courts , setCourts] = useState([])
    const [title , setTitle]=useState('')
    const [description , setDescription]=useState('')
    const[isLoading , setLoading ] = useState(false)
    const[message , setMessage] = useState()
    const[image , setImage]=useState(null)
    useEffect(()=>{
        axiosInstance.get(`/api/user/getoneturf/${turfid}`)
        .then(res=>{
            setCourts(res.data.turf.court)
            setTitle(res.data.turf.title)
            setDescription(res.data.turf.description)
            setImage(res.data.turf.image)
            
        })
    },[])
    const closeLoadingScreen=()=>{
      setLoading(false)
      setMessage(null)
    }
    const handleSubmit=async(e)=>{
        setLoading(true)
        e.preventDefault();
     try{
        const formdata = new FormData(); 
        formdata.append("title",title)
        formdata.append("description",description)
        if(image){
        formdata.append("image",image)       
        }
      const token = localStorage.getItem('token')
      await axiosInstance.patch(`/api/admin/updateturf/${turfid}`,formdata,{
          headers : {
              "Authorization" : `Bearer ${token}`,
              "Content-Type" : 'multipart/form-data'
          }
      })
      .then(res=>{
        setMessage(res.data.message)
       })
     }
        
     catch(err){
        setMessage(err.message)
     }
    }
    return (
        <>{isLoading ? <LoadingScreen message={message} onclick={closeLoadingScreen}/> :
          <section className="p-5 dark:bg-gray-900 mt-24 md:mt-0">
          <button
              onClick={() => navigate(-1)}
              className="bg-green-500 text-white w-16 pt-1 rounded-md shadow-md hover:bg-green-600 transition duration-200">
              <span className="material-symbols-outlined">arrow_back</span>
         </button>
      
            <div className="p-4 flex flex-col items-center justify-center">
              <h2 className="text-2xl font-semibold text-center dark:text-gray-300 text-gray-800 mb-6">
                Update Turf
              </h2>
              <span className="text-lg font-medium dark:text-gray-300 text-gray-800">
                {turf}
              </span>
              <form
                className="space-y-6 w-full md:w-1/2 lg:w-1/3 shadow-md dark:text-white dark:bg-gray-800 rounded-md  p-4"
                onSubmit={handleSubmit}
              >
                <div>
                  <label className="block text-sm font-medium dark:text-gray-300 text-gray-700">
                    Name:
                  </label>
                  <input
                    type="text"
                    name="turfname"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    className="mt-1 block w-full border dark:bg-gray-900 border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium dark:text-gray-300 text-gray-700">
                    Description:
                  </label>
                  <textarea
                    name="desc"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    className="mt-1 block w-full border dark:bg-gray-900 border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-green-500"
                    rows="4"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium dark:text-gray-300 text-gray-700">
                    Image:
                  </label>
                  <input
                    type="file"
                    name="image"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="mt-1 block w-full border dark:bg-gray-900 border-gray-300 rounded-md p-3"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-green-500 text-white p-3 rounded-md font-semibold hover:bg-green-600 transition-colors"
                >
                  Update Turf
                </button>
              </form>
            </div>
      
            <div className="p-4">
              <h1 className="text-xl dark:text-gray-300 font-bold">Update Courts</h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-3">
              {courts &&
                courts.map((court) => <UpdateCourt key={court._id} {...court} />)}
            </div>
          </section>
         }
        </>
      );
      
}