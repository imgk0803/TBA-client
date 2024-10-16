import { useEffect ,useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MapComponent from "../components/mapComponent"
import { useParams } from "react-router-dom"
import Review from "../components/addReview";
import { averageRating } from "../hooks/useAverageRating";
import axiosInstance from "../utils/axiosInstance";
export default function TurfSingle(){
     const navigate = useNavigate();
     const{turfid} = useParams();
     const[turf ,setturf] = useState([])
     const [seen, setSeen] = useState(false)
     const [review , setReview] = useState([]) 
     const [noOfReviews ,setNoOfReviews]=useState()
     const [averageStarRating , setRating] =useState()
     const [latitude , setLatitude] = useState()
     const[longitude , setLongitude] = useState()
     const [ isLoading , setLoading] = useState(true) 
    function togglePop () {
        setSeen(!seen);
    };

     useEffect(()=>{
          axiosInstance.get(`/api/user/getoneturf/${turfid}`)
          .then(res=>{
            setturf(res.data.turf)
            setLatitude(res.data.turf.location.coordinates[1])
            setLongitude(res.data.turf.location.coordinates[0])
            setLoading(false)

          })  
          axiosInstance.get('/api/user/getreview')
          .then(res=>{
            const turfreview = res.data.review.filter(rev => rev.turf === turfid)
            console.log(turfreview)
            setReview(turfreview)
            setNoOfReviews(turfreview.length)
            setRating(averageRating(turfreview))
           })
     },[seen])
 
    return(
        <>
        {isLoading ? (
            <div className="flex flex-row gap-3 p-5">
              <div className="w-1/2 pl-16 text-slate-600 flex flex-col gap-2">
                <div className="h-10 bg-gray-300 rounded-md w-3/4"></div>
                <div className="h-6 bg-gray-300 rounded-md w-1/4"></div>
                <div className="h-4 bg-gray-300 rounded-md w-1/2"></div>
                <div className="h-80 bg-gray-300 rounded-md w-full"></div>
                <div className="pt-5">
                  <span className="text-lg font-semibold dark:text-gray-400 p-1">Sports Available</span>
                  <ul className="flex flex-row gap-3 mt-3">
                    <li className="h-8 bg-gray-300 rounded-xl w-1/4"></li>
                    <li className="h-8 bg-gray-300 rounded-xl w-1/4"></li>
                  </ul>
                </div>
                <div className="pt-5">
                  <span className="text-lg font-semibold dark:text-gray-400 p-1">Facilities</span>
                  <ul className="flex flex-row gap-3">
                    <li className="h-8 bg-gray-300 rounded-xl w-1/4"></li>
                    <li className="h-8 bg-gray-300 rounded-xl w-1/4"></li>
                  </ul>
                </div>
              </div>
              <div className="w-1/3 pt-16 pl-20 flex flex-col gap-6 pr-3">
                <div className="h-10 bg-gray-300 rounded-md w-80"></div>
                <div><h4 className="dark:text-gray-400">Timing</h4><div className="h-4 bg-gray-300 rounded-md w-1/4"></div></div>
                <div><h4 className="dark:text-gray-400">Location</h4><div className="h-4 bg-gray-300 rounded-md w-1/2"></div></div>
                <div className="border min-h-60 bg-gray-300"></div>
                <div className="h-10 bg-gray-300 rounded-md w-80"></div>
              </div>
            </div>):(<>
              <button onClick={()=>{navigate(-1)}} className=" dark:bg-green-800 bg-green-500 text-white m-2 p-1 rounded-md">Back</button>
         <section className="flex flex-row gap-3 p-5 ">
            <div className="w-1/2 pl-16 text-slate-600 flex flex-col gap-2">
              <h1 className="p-1 font-semibold dark:text-gray-400 text-3xl">{turf.title}</h1>
              <div className="p-2 flex flex-row">  
              <span className="mr-10 font-semibold  dark:text-gray-400">{turf.city}</span>
                <Link to={'/root/reviews'} state={{review}}>
                  <span className="flex flex-row items-center">
                  <span>{averageStarRating}</span><span className="material-symbols-outlined text-yellow-500 text-sm pt-1">star</span>({noOfReviews})
                  </span>
                </Link> 
                
               
              </div>
              <div className="p-1 font-light  dark:text-gray-500">
                <span>{turf.description}</span>
              </div>
              <img className="w-full h-80 object-cover border rounded-md"src={turf.image} alt="" />
               <div className="pt-5">
               <span className="text-lg font-semibold  dark:text-gray-400 p-1">sports available</span>
               <ul className="flex flex-row gap-3 mt-3">
               {
               turf.court && turf.court.map(c=>(
                  <li className="border  dark:text-gray-200 border-slate-500 rounded-xl text-sm p-1" key={c._id}>{c.sport}</li>
                ))
               }
              </ul>
               </div>
              <div className="pt-5">
              <span className="text-lg font-semibold  dark:text-gray-400 p-1">fecilities</span>
              <ul className="flex flex-row gap-3">
                <li  className="border border-slate-500 rounded-xl  dark:text-gray-400 text-sm p-1">drinking</li>
                <li  className="border border-slate-500 rounded-xl  dark:text-gray-400 text-sm p-1">restroom</li>
              </ul>
              </div>
            </div>
            <div className="w-1/3 pt-16 pl-20 flex flex-col gap-6 pr-3">
              <Link to={"/root/booking/"+turfid}  className="p-2 text-white bg-green-500 w-80 border rounded-md">Book now</Link>
             <div><h4 className=" dark:text-gray-400">timing</h4>
             <span className=" dark:text-gray-400">6AM-12PM</span></div> 
              <div><h4 className=" dark:text-gray-400">location</h4>
              <span className=" dark:text-gray-400">{turf.city} ,{turf.dist} ,</span>
              <span className=" dark:text-gray-400">kerala</span></div>
              <div className="border min-h-60 ">
              {latitude && longitude && !seen ? (
              <MapComponent latitude={latitude} longitude={longitude} />
                ) : (
              <p></p>
               )}
              </div>
              <button onClick={togglePop} className="p-2 text-white bg-green-500 w-80 border rounded-md">Add review</button>
              {seen ? <Review toggle={togglePop} turf_id={turfid}/> : null}
            </div>
         </section>
        </>)}
        
        </>
    )
}