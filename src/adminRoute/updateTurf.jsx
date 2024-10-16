import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import axios from "axios"
import UpdateCourt from "./courtUpdate";
import axiosInstance from "../utils/axiosInstance";
export default function UpdateTurf(){
    const location = useLocation()
    const {turfid} = useParams()
    const turf = location.state.turfname
    const navigate = useNavigate()
    const [courts , setCourts] = useState([])
    const [title , setTitle]=useState('')
    const [description , setDescription]=useState('')
    const[image , setImage]=useState(null)
    useEffect(()=>{
        axiosInstance.get(`/api/user/getoneturf/${turfid}`)
        .then(res=>{
            setCourts(res.data.court)
            setTitle(res.data.title)
            setDescription(res.data.description)
            setImage(res.data.image)
            
        })
    },[])
    const handleSubmit=async(e)=>{
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
      .then(res=>console.log('turf updated'))
     }
        
     catch(err){
        
     }
    }
    return(
        <>
            <section className="p-5 dark:bg-gray-900">
                <button onClick={()=>{navigate(-1)}} className="p-1 bg-green-500 rounded-md text-white">Back</button>
                
                <div className="p-2 flex flex-col items-center justify-center">
                <h2 className="text-2xl font-semibold text-center dark:text-gray-300 mb-6">Update Turf</h2>
                <span className="text-lg">{turf}</span>
                         <form className="space-y-4 w-1/2" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-sm font-medium dark:text-gray-300 text-gray-700">
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
                    <label className="block text-sm font-medium dark:text-gray-300 text-gray-700">
                        Description:
                    </label>
                    <textarea
                    name="desc"
                    onChange={(e)=>{setDescription(e.target.value)}}
                    value={description}

                        className="mt-1 block w-full border dark:bg-gray-900 border-gray-300 rounded-md p-2"
                        rows="3"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium dark:bg-gray-900 dark:text-gray-300 text-gray-700">
                        Image:
                    </label>
                    <input
                        
                        type="file"
                       name="image"
                       onChange={(e)=>{setImage(e.target.files[0])}}
                       
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                </div>
                <button type="submit" className=" bg-green-500 text-white p-2 w-full rounded-md font-semibold hover:bg-green-600">Update Turf</button>
                         </form>
                </div>
             


             <div className="p-2">
                <h1 className="text-xl dark:text-gray-300 font-bold ">Update Courts</h1>
             </div>
            <div className="grid grid-cols-3 gap-4 p-3">
            { courts && courts.map(court=>(
                            <UpdateCourt key={court._id} {...court}/>
                        )
                      )}
                </div>
            </section>
        </>
    )
}