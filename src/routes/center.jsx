import { useEffect, useState } from "react"
import Turf from "../components/turf"
import { useSelector } from "react-redux";
import axiosInstance from "../utils/axiosInstance";
export default function Center(){
const turfsorted = useSelector(state=>state.turfs.SortedTurf)
const[turfListing , setList] = useState([])
const [turfs,setturf] = useState([]);
const [isLoading , setLoading] = useState(true)
const [searchTerm , setSearchTerm] = useState('')
   useEffect(()=>{
       axiosInstance.get("/api/user/turf")
      .then(res =>{
          setturf(res.data.turfs)
          setList(turfsorted)
          setLoading(false)
          
     
      })
   },[turfsorted])
   const handleSearch =() =>{
       const filtered = turfs.filter(turf=>{
          return  new RegExp(searchTerm, 'i').test(turf.title)
       })
       setList(filtered)
   }
   
   return (
      <>
        {isLoading ? (
          <section className="flex flex-col dark:bg-gray-900">
            <div className="flex flex-row justify-start dark:bg-gray-900 gap-10 items-center mb-5 ml-4 p-4 h-16">
              <div className="flex flex-row justify-between items-center dark:border-slate-700 dark:bg-gray-900 dark:border bg-white shadow-md rounded-md p-2">
                <input
                  className="outline-none dark:bg-gray-900 dark:text-gray-300 p-2"
                  placeholder="Search turfs"
                  type="text"
                  disabled
                />
                <button disabled>
                  <span className="material-symbols-outlined pt-1 text-slate-400">search</span>
                </button>
              </div>
              <div className="flex flex-col items-center justify-center pl-6 text-md dark:text-gray-300 text-slate-600 font-thin">
                <p className="bg-gray-300 dark:bg-gray-700 h-4 w-60 rounded-md"></p>
                <p className="bg-gray-300 dark:bg-gray-700 h-4 w-80 mt-2 rounded-md"></p>
              </div>
            </div>
            <h3 className="text-lg p-5 text-gray-500">All Turfs</h3>
    
            <div className="mx-5 grid grid-cols-3 gap-10 p-5 place-items-center">
               {[...Array(9)].map((_, index) => (
                  <div className="flex flex-col bg-white gap-4 dark:bg-gray-800  dark:border-slate-700 border border-white p-6 rounded-md shadow-md" key={index}>

                     <div className="bg-gray-300 dark:bg-gray-700 h-64 w-72 rounded-md"></div>
                     <p className="bg-gray-300 dark:bg-gray-700 h-3 w-64 rounded-md"></p>
                     <p className="bg-gray-300 dark:bg-gray-700 h-2 w-64 rounded-md"></p>
                     <p className="bg-gray-300 dark:bg-gray-700 h-1 w-64 rounded-md"></p>

                     <div className="bg-gray-300 dark:bg-gray-700 h-10 w-72 rounded-md"></div>
                  </div>
               ))}
               </div>

          </section>
        ) : (
          <section className="flex flex-col dark:bg-gray-900">
            <div className="flex flex-row justify-start dark:bg-gray-900 gap-10 items-center mb-5 ml-4 p-4 h-16">
              <div className="flex flex-row justify-between items-center dark:border-slate-700 dark:bg-gray-900 dark:border bg-white shadow-md rounded-md p-2">
                <input
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="outline-none dark:bg-gray-900 dark:text-gray-300 p-2"
                  placeholder="Search turfs"
                  type="text"
                />
                <button onClick={handleSearch}>
                  <span className="material-symbols-outlined pt-1 text-slate-400">search</span>
                </button>
              </div>
              <div className="flex flex-col items-center justify-center pl-6 text-md dark:text-gray-300 text-slate-600 font-thin">
                <p>Discover the perfect turf for your next game or event! At BookmyTurf,</p>
                <p>we bring you a comprehensive list of top-quality turfs right at your fingertips.</p>
              </div>
            </div>
    
            {turfListing.length > 0 && (
              <>
                <div className="flex flex-row justify-start items-center gap-5 pt-4 px-5">
                  <h3 className="text-lg text-gray-500">Results</h3>
                  <button onClick={() => setList('')} className="text-sm text-gray-500">
                    x
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-8 px-5 pb-5 place-items-center">
                  {turfListing.map((turf) => (
                    <Turf key={turf._id} {...turf} />
                  ))}
                </div>
              </>
            )}
    
            <hr />
            <h3 className="text-lg p-5 text-gray-500">All Turfs</h3>
    
            <div className="grid grid-cols-3 gap-8 p-5 place-items-center">
              {turfs.map((t) => (
                <Turf key={t._id} {...t} />
              ))}
            </div>
          </section>
        )}
      </>
    );
    
    
}