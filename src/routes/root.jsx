import { Outlet, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";
import { getSortedTurfs } from "../features/sortedTurfs/sortedTurfsSlice";
import { switchTheme } from "../features/theme/themeSlice";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import GoogleIcon from '@mui/icons-material/Google';

export default function Root(){
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = localStorage.getItem('role');
  const geoApi = '150def1d6924f8d2b980f4c1de64506b'
  const [city , setCity]=useState('') 
  const[cityresults , setCityResults] = useState([])
  const sorted = useSelector(state =>state.turfs.SortedTurf)
  const theme = useSelector(state =>state.theme.theme)
  useEffect(()=>{
    if(theme === 'dark'){
      document.documentElement.classList.add('dark')
    }else{
      document.documentElement.classList.remove('dark')
    }
       
  },[theme])
  const handleSubmit = async(e)=>{
     try{
      const res = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=10&appid=${geoApi}`)
      setCityResults(res.data)
     }
     catch(err){
      console.log(err)
     }
  }
  const darkMode =()=>{
       dispatch(switchTheme())
  }
  const handleCityClick = (city)=>{
    dispatch(getSortedTurfs(city))
    setCity('')
    setCityResults([])
    navigate('/root/home')
  }

  const roleBasedRoute = ()=>{
    
    if(user === 'user'){
        
        navigate('/root/profile')
    }
    else if( user === 'manager'){
       navigate('/root/profilemanager')
    }
    else{
      navigate('/root/profileadmin')
    }
  }
  return(
    <div>
    <header className="z-10 h-16 flex flex-row dark:bg-gray-950 dark:text-slate-500 justify-between items-center  p-2 shadow-sm fixed bg-white w-full">
        <h1 className="text-2xl font-mono pl-5  text-green-500">BOOKmyTURF</h1>
        <div className="relative flex flex-col justify-start items-start">
          <div className="flex flex-row items-center border w-52 shadow-md  dark:border-gray-700 h-6 rounded-md">
            <input onChange={(e)=>{
            setCity(e.target.value)
            }} className="outline-none dark:bg-gray-900 dark:text-gray-300 rounded-md w-full font-light h-5 text-xs p-1" placeholder="Enter location" type="text" />
            <button>
              <span onClick={handleSubmit} className="material-symbols-outlined pt-1 text-xs  text-slate-500">location_on</span>
              </button>
          </div>
          {cityresults.length > 0 && (
          <ul className="absolute bg-white dark:bg-black dark:text-gray-300 border shadow-md mt-1 z-20 w-full max-h-40 overflow-y-auto">
            {cityresults.map((city) => (
              <li 
                key={city._id}
                onClick={()=>{
                  handleCityClick(city);

                }} 
                className="cursor-pointer p-1 text-xs hover:bg-slate-100 dark:hover:bg-slate-800 "
              >
                {city.name}, {city.state}, {city.country}
              </li>
            ))}
          </ul>
        )}
        </div>
        
        <nav>
            <ul className="flex flex-row justify-center items-center text-lg  gap-10 text-md text-slate-500 font-semibold pr-10 ">
                <Link to={'home'}>
                <li className="flex flex-col items-center justify-center ">
                <span className="material-symbols-outlined dark:text-gray-300 hover:text-green-500 ">stadium</span>
                <span className="text-xs font-light  dark:text-gray-300   ">Home</span></li></Link>
                <Link to={'mybookings'}>
                <li className="flex flex-col items-center justify-center ">

                  <span className="material-symbols-outlined  dark:text-gray-300  hover:text-green-500 ">sports</span>
                  <span className="text-xs font-light  dark:text-gray-300 ">Bookings</span>
                  </li></Link>
                <button onClick={roleBasedRoute}>
                <li className="flex flex-col items-center justify-center ">

                      <span className="material-symbols-outlined  dark:text-gray-300  hover:text-green-500 ">person</span>
                      <span className="text-xs font-light  dark:text-gray-300   ">Account</span>
                    </li>
                </button>
                <button onClick={darkMode}>
                <li className="flex flex-col items-center justify-center ">
                  {
                    theme && theme === 'light' ? (<>
                      <span className="material-symbols-outlined  dark:text-gray-300">dark_mode</span>
                      <span className="text-xs font-light  dark:text-gray-300">Dark mode</span>
                      </>):(
                        <>
                        <span className="material-symbols-outlined  dark:text-gray-300">light_mode</span>
                        <span className="text-xs font-light  dark:text-slate-300">Light mode</span>
                        </>
                      )
                  }
                      
                </li>
                </button>
            </ul>
        </nav>
    </header>
    <main className="pl-4 min-h-screen pt-20 dark:bg-gray-900 dark:text-white w-screen ">
    <Outlet/>
    </main>
    <hr className=" border-gray-200  dark:border-gray-700 " />

      <footer className="bg-white  shadow dark:bg-gray-900 pt-3">
          <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
              <div className="sm:flex sm:items-center sm:justify-between">
                  <a href="#" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                  <h1 className="text-2xl font-mono pl-5  text-green-500">BOOKmyTURF</h1>
                  </a>
                  <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                      <li>
                          <a href="#" className="hover:underline me-4 md:me-6">About</a>
                      </li>
                      <li>
                          <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
                      </li>
                      <li>
                          <a href="#" className="hover:underline me-4 md:me-6">Licensing</a>
                      </li>
                      <li>
                          <a href="#" className="hover:underline">Contact</a>
                      </li>
                  </ul>
                  <ul className="flex flex-wrap items-center mb-6 text-sm font-medium gap-2 text-gray-500 sm:mb-0 dark:text-gray-400">
                       <li>
                             <InstagramIcon/>
                       </li>
                        <li>
                             <FacebookIcon/>
                        </li>
                        <li>
                              <XIcon/>
                        </li>
                        <li>
                              <GoogleIcon/>
                        </li>
                  </ul>
              </div>
              <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
              <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="#" class="hover:underline">BOOKmyTURF™</a>. All Rights Reserved.</span>
          </div>
      </footer>





    </div>
  )
}