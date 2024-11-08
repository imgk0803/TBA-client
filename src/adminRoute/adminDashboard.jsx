import { Link } from "react-router-dom"
import { useEffect ,useState } from "react";
import TurfAdmin from "../components/turfadmin";
import AddManager from "../components/addManager";
import axiosInstance from "../utils/axiosInstance";
import LoadingScreen from "../components/loadingScreen";
export default function AdminDashboard(){
    const role = localStorage.getItem('role')
    const [turfs,setturf] = useState([]);
    const[turfListing , setList] = useState([])
    const [searchTerm , setSearchTerm] = useState('')
    const [seen , setSeen] = useState(false);
    const[isLoading , setLoading] = useState(false)
    const [message , setMessage] = useState('')
    const [confirm , setconfirm ] = useState(false)
    const [turfId , setTurtId] = useState()
    const token = localStorage.getItem('token')
    const togglePop=()=>{
        setSeen(!seen)
    }
    const closeLoadingScreen=()=>{
        setLoading(false)
        setMessage(null)
        setTurtId(null)
    }
    const deleteTurf = async(id) =>{
        setconfirm(false)
        setLoading(true)
        try{
             const res = await axiosInstance.patch(`/api/admin/deleteturf/${id}`,{},{
                headers : {
                    'Authorization' : `Bearer ${token}`
                }
                })
             setMessage(res.data.message)
             
        }
        catch(err){
            setMessage(err.message)
        }

    }
    const deleteConfirm = (id) => {
        setTurtId(id)
        setconfirm(true)
    }
    useEffect(()=>{
       axiosInstance.get("/api/user/turf")
       .then(res =>{
            const acitveTurfs = res.data.turfs.filter(turf=>turf.isActive === true)
           setturf(acitveTurfs)
       })
    },[confirm])
    const handleSearch =() =>{
        const filtered = turfs.filter(turf=>{
           return  new RegExp(searchTerm, 'i').test(turf.title)
        })
        setList(filtered)
    }
    return (
        <>{isLoading ? <LoadingScreen message={ message } onclick={closeLoadingScreen}/> :
            <section className="flex flex-col gap-5 p-4">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between mt-24 md:mt-0">
                    <div className="flex flex-row w-full  md:w-1/2 border dark:border-gray-600 shadow-md dark:bg-gray-900 rounded-md overflow-hidden">
                        <input 
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="p-2 w-full dark:bg-gray-900 outline-none" 
                            type="text" 
                            placeholder="Search turf..."
                        />
                        <button 
                            onClick={handleSearch} 
                            className="p-2 bg-green-500 text-white">
                            <span className="material-symbols-outlined">search</span>
                        </button>
                    </div>
                    <div className="flex flex-col w-full md:w-1/5 md:flex-row md:justify-between md:items-center gap-2 md:gap-3">
                    <Link 
                        to={'/root/createturf'} 
                        className="p-2 w-full md:w-auto text-center bg-green-500 hover:bg-green-600 rounded-md text-white">
                        Add Turf
                    </Link>
                    <button 
                        disabled={role !== 'admin'} 
                        onClick={togglePop} 
                        className={`p-2 w-full  md:w-auto  md:text-center ${role === 'admin' ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-400'} rounded-md text-white`}
                    >
                        Add Manager
                    </button>
                    </div>
                   
                </div>
    
                
                {turfListing.length > 0 && (
                    <>
                        <div className="flex items-center justify-between pt-5 px-5">
                            <h3 className="text-lg font-semibold text-gray-600">Results</h3>
                            <button 
                                onClick={() => setList('')} 
                                className="text-sm text-gray-500 hover:text-gray-700">
                                Clear Results
                            </button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-5">
                            {turfListing.map(turf => (
                                <div className="flex justify-center items-center"> 
                                      <TurfAdmin key={turf._id} {...turf} onClick={()=>deleteConfirm(turf._id)}  />
                                </div>
                               
                            ))}
                        </div>
                    </>
                )}
         
                {seen && <AddManager toggle={togglePop} />}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {turfs.map(turf => (
                        <div className="flex justify-center items-center">
                                <TurfAdmin key={turf._id} {...turf} onClick={()=>deleteConfirm(turf._id)}  />
                        </div>
                      
                    ))}
                </div>
                {confirm && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
                  <div className="flex flex-col gap-3 dark:bg-gray-700 bg-white w-80 p-6 rounded-md">
                    <h1 className="text-xl dark:text-gray-300 text-center mb-4">Are you sure you want to cancel?</h1>
                    <div className="flex justify-around">
                      <button
                        onClick={()=>deleteTurf(turfId)}
                        className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors duration-300"
                      >
                        YES
                      </button>
                      <button
                        onClick={() =>{ 
                            setTurtId(null)
                            setconfirm(false)}}
                        className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors duration-300"
                      >
                        NO
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </section>
          }
        </>
    );
}    

