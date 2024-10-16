import { Outlet, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";
import { getSortedTurfs } from "../features/sortedTurfs/sortedTurfsSlice";
import { switchTheme } from "../features/theme/themeSlice";

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
    <header className="z-10 h-16 flex flex-row dark:bg-gray-900 dark:text-slate-500 justify-between items-center  p-2 shadow-sm fixed bg-white w-full">
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
                <span className="material-symbols-outlined dark:text-gray-300 ">stadium</span>
                <span className="text-xs font-light  dark:text-gray-300">Home</span></li></Link>
                <Link to={'mybookings'}>
                <li className="flex flex-col items-center justify-center ">

                  <span className="material-symbols-outlined  dark:text-gray-300">sports</span>
                  <span className="text-xs font-light  dark:text-gray-300">Bookings</span>
                  </li></Link>
                <button onClick={roleBasedRoute}>
                <li className="flex flex-col items-center justify-center ">

                      <span className="material-symbols-outlined  dark:text-gray-300">person</span>
                      <span className="text-xs font-light  dark:text-gray-300">Account</span>
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
    <main className="pl-4 min-h-screen pt-20 dark:bg-gray-900 dark:text-white w-screen">
    <Outlet/>
    </main>
    <footer className="h-16 flex justify-between items-center p-4 border-t-2 dark:bg-gray-900 dark:border-slate-600 w-screen ">
  {/* Left Section: App Name */}
  <div className="flex flex-col">
    <h1 className="text-2xl font-mono dark:text-green-400 text-green-600 m-0">BOOKmyTURF</h1>
    <span className="text-sm text-slate-500">A sports community app</span>
  </div>

  {/* Right Section: Social Media Links */}
  <div className="flex items-center space-x-4">
    {/* Font Awesome Social Media Icons */}
    <a
      href="https://www.facebook.com"
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-400 hover:text-blue-500"
    >
      <i class="fab fa-facebook">facebook</i>
    </a>
    <a
      href="https://www.twitter.com"
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-400 hover:text-blue-400"
    >
      <i class="fab fa-twitter">twitter</i>
    </a>
    <a
      href="https://www.instagram.com"
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-400 hover:text-pink-500"
    >
     <i class="fab fa-instagram">instagram</i>
    </a>
    <a
      href="https://www.linkedin.com"
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-400 hover:text-blue-700"
    >
       <i class="fab fa-linkedin">linkedin</i>
    </a>
  </div>
</footer>




    </div>
  )
}