import { useState , useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import {useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { addToCart, removeFromCart } from "../features/cart/cartslice"
import axiosInstance from "../utils/axiosInstance"
import { Button } from "@mui/material"
import { filterTimeslots } from "../hooks/useAvailableSlots"

export default function Booking(){
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const cartItems = useSelector(state => state.cart) 
    const {turfid} = useParams()
    const [click , setClick] = useState(false)
    const [message , setmessage] = useState('')
    const [turfname , setturfname] = useState('')
    const [courts , setCourts] = useState([])
    const [place , setplace] = useState('')
    const [bookings , setbookings] = useState([])
    const [timeslot ,settimeslot] = useState([])
    const[selectedCourt ,setCourt] = useState('')
    const[date , setdate] = useState('')
    const[time , settime] = useState('')
    const[bookingtoday ,setToday] = useState([])
    const currentDate = new Date()
    const hours = currentDate.getHours()
    const formattedDate = new Date(currentDate).toISOString().split("T")[0];
    useEffect(()=>{
            axiosInstance.get(`/api/user//turf/getcourt/${turfid}`)
            .then(res=>{
              setCourts(res.data.turf.court)
              setplace(res.data.turf.city)
              setturfname(res.data.turf.title)

              
            }
            )
    },[])
    console.log("the courts",courts)
    const handlechange = async(e)=>{
    e.preventDefault()
      try{
            
            const selectedCourt = JSON.parse(e.target.value);
            setCourt(selectedCourt)
            axiosInstance.get("/api/user/bookings")
            .then(res=>{
                const confirmBooking = res.data.bookings.filter(booking =>{
                  return booking.status !== 'canceled'
                })
                const courtbookings = confirmBooking.filter(booking =>{
                  return booking.court._id === selectedCourt._id
                })
              setbookings(courtbookings)
              });
              
      }
      catch(err){
        console.log(err)
      }
    }
    const handleDate = async(e)=>{
      e.preventDefault();
      try{
         
         
          const date = e.target.value;
          setdate(date)
          const todaysbookings = bookings.filter(item=>{
            const bookingDate = new Date(item.date).toISOString().split('T')[0];
            return bookingDate === date})
          const modTodaysBooking = todaysbookings.map(book => ({
            start: book.timeslot.start,
            end: book.timeslot.end
          }));
          setToday(modTodaysBooking)
          const allTimeslots = [
                             
                              { start: 6, end: 7 },
                              { start: 7, end: 8 },
                              { start: 8, end: 9 },
                              { start: 9, end: 10 },
                              { start: 10, end: 11 },
                              { start: 11, end: 12 },
                              { start: 12, end: 13 },
                              { start: 13, end: 14 },
                              { start: 14, end: 15 },
                              { start: 15, end: 16 },
                              { start: 16, end: 17 },
                              { start: 17, end: 18 },
                              { start: 18, end: 19 },
                              { start: 19, end: 20 },
                              { start: 20, end: 21 },
                              { start: 21, end: 22 },
                              { start: 22, end: 23 },
                              { start: 23, end: 24 }
          ];
          let timeslots = allTimeslots
          console.log("hours:::",hours)
          if(date === formattedDate ){
            timeslots = allTimeslots.filter(ts=>ts.start>=hours)
          }
          console.log("timeslot ::: ",timeslots)
          const newArray = filterTimeslots(timeslots , modTodaysBooking)
          settimeslot(newArray)
          
          
      }
      catch(err){
        console.log(err.message)
      }
    }
    console.log("booking toady" ,bookingtoday)
    console.log("bookings", bookings)
    console.log("available ti,eslots",timeslot)
    console.log("seleceted date",date)
    console.log("current date",formattedDate) 
    const handleTime = async(e)=>{
      e.preventDefault()
      try{
        const time = JSON.parse(e.target.value)
        settime(time)
      }
      catch(err){

      }
    }
    console.log(selectedCourt)
    console.log(date)
    console.log(time)
    const addBooking = async(e)=>{
      e.preventDefault()
      if (!selectedCourt || !date || !time) {
        setClick(false)
        setmessage('Please fill out all fields before proceeding.');

        return;
      }
      try{
          console.log("selectedcourt",selectedCourt)
          const courtid = selectedCourt._id
          const userid = JSON.parse(localStorage.getItem('user'))._id
          const price = selectedCourt.price
          const reqbody = {
            date : date,
            timeslot : time,
            price : price
          }

          const response = await axiosInstance.post(`/api/user/${userid}/court/${courtid}`,reqbody)
          const bookingform  = document.getElementsByName('bookingform')
          bookingform.forEach(form=> form.reset())
          console.log("res",response)
         
          if(response.data.success === false){
            setClick(false)
            setmessage(response.data.message)
            
          
          }
          const booking = {
            turfname :turfname,
            courtname : selectedCourt.sport,
            size : selectedCourt.size,
            date : date,
            time : time,
            price : selectedCourt.price,
            bookingid : response.data.booking._id
          }
            setClick(true)
            setmessage(response.data.message)
            dispatch(addToCart(booking))
            settime('')
            

          
         

      }
      catch(err){
       console.log("error::",err)
      }
   }
  console.log("message",message)
  const removeBooking = async(id)=>{
      try{
        console.log(id)
        dispatch(removeFromCart(id))
        const res  = await axiosInstance.delete(`/api/user/deleteBooking/${id}`)
        const bookingform  = document.getElementsByName('bookingform')
        bookingform.forEach(form=> form.reset())
        //setClick(!click)
      }
      catch(err){
              console.log("error::", err)
      }
   }
   
    return(
        <>
        <button onClick={()=>{navigate(-1)}} className="bg-green-500 text-white  w-16 pt-1 rounded-md">
        <span class="material-symbols-outlined">arrow_back</span>
        </button>
        <section className="grid grid-cols-2 p-10 dark:bg-gray-900">
          
             <div>
                <h2 className="p-1 font-semibold text-2xl">{turfname}</h2>
                <span className="p-1 text-lg">{place}</span>
                <form name="bookingform" onSubmit={addBooking} action="submit" className=" dark:bg-gray-950 flex flex-col gap-10 border rounded-md shadow-md py-8">
                    <div className="flex flex-row gap-5 items-center justify-around">
                    <label className="font-semibold dark:text-gray-300" htmlFor="court">Sports:</label>
                    <select onChange={handlechange} name="court" id="court" className=" dark:text-gray-300 dark:bg-gray-900 shadow-md text-slate-600 border border-slate-200 p-1 h-8 rounded-md w-48 outline-none">
                    <option value="placeholder">--choose an option---</option>
                    {courts.map((court) => (
                                <option className="shadow-md font-semibold dark:text-gray-300 dark:bg-gray-900 " key={court._id} value={JSON.stringify(court)}>
                                {court.sport} - {court.size} - {court.description}
                                </option>
                            ))}
                  </select>
                    </div>
                     <div className="flex flex-row gap-5 items-center justify-around">
                     <label className=" dark:text-gray-300 font-semibold" htmlFor="court">Date:</label>
                     <input onChange={handleDate} onBlur={handleDate} className=" dark:text-gray-300 dark:bg-gray-900  shadow-md text-slate-600 border border-slate-200 p-1 h-8 rounded-md w-48 outline-none" type="date" id="bookdate" name="bookdate" 
                      />
                     </div>
                     <div className="flex flex-row gap-5 items-center justify-around">
                       <label className="font-semibold  dark:text-gray-300" htmlFor="court">Timeslot:</label>
                       <select onChange={handleTime} name="timeslot" id="timeslot" className=" dark:text-gray-300 dark:bg-gray-900  shadow-md text-slate-600 border border-slate-200 p-1 h-8 rounded-md w-48 outline-none">
                    <option value="placeholder">--choose an option---</option>
                            {timeslot && timeslot.map((ts,index) =>{
                            let start = ts.start + "am"
                            let end = ts.end + "am"
                           
                            if(ts.start > 12){
                              if(ts.end === 24){
                                 start = ts.start - 12+ "pm"
                                 end = ts.end -12 + "am"
                              }else{
                                   start = ts.start - 12 + "pm"
                                 end = ts.end - 12 + "pm"
                              }
                                
                               
    
                            }
                            else if(ts.start === 12){
                                end = ts.end - 12 + "pm"
                                start = ts.start + "pm"
                            }
                       
                             return (
                          <option
                          className=" dark:text-gray-300 dark:bg-gray-900 text-green-600  p-3 font-semibold   rounded-md" key={index} value={JSON.stringify(ts)}>
                          {start} - {end}
                          </option>
                        )})
                        }
                  </select>
                 
                      </div>
                      {message && (<div>
                        <span className={`flex items-center justify-center p-1 
                          ${click ? 'text-green-500' : 'text-red-500'}`}>
                            {message}
                        </span>
                       </div>)}

                      <div className="grid grid-cols-2" >
                        <div className="flex flex-col  dark:text-gray-300 text-lg font-semibold items-start justify-start gap-3 p-2 pl-20">
                        <h4>{selectedCourt.sport}</h4>
                        <span>{selectedCourt.size}</span>
                        <span>{selectedCourt.description}</span>
                        <span>{selectedCourt.price}</span>
                        </div>
                        <button  className="h-10 w-40 flex flex-row justify-center items-center m-10 dark:bg-green-800 bg-green-500 text-white border shadow-md rounded-md font-semibold">Add to cart<span class="material-symbols-outlined">add_shopping_cart</span>
                       </button>
                    </div>
                </form>
             </div>
             <div className="p-10 ">
              <div className="flex flex-col gap-5 w-72 mx-auto">
                    <div className="flex flex-row justify-between p-3  border-b border-slate-400">
                      <h2 className="font-semibold">CART<span>({cartItems.quantity})</span></h2>
                    </div>
                    {
                      cartItems.items && cartItems.items.map((items,index) =>{
                        return(
                          
                            <div key={index} className="flex flex-col gap-3 ">
                            <div className="flex flex-col gap-4 border border-gray-300 p-4 rounded-lg shadow-md bg-white  dark:text-gray-300 dark:bg-gray-950 ">
                               <div className="flex flex-row justify-between">
                                <h2 className="text-xl font-semibold  dark:text-gray-300 text-gray-800">{items.turfname}</h2>
                                 <button onClick={()=>{removeBooking(items.bookingid)}}><span className="material-symbols-outlined text-red-600">delete</span></button></div>
                              <div className="flex flex-row justify-between items-center dark:text-gray-300">
                                  <span className="text-lg font-semibold  dark:text-gray-300 text-gray-800">{items.courtname}</span>
                                  <span>{items.size}</span>
                              </div>
                              <span className="  dark:text-gray-300 text-gray-600">{items.date}</span>
                              <span className=" dark:text-gray-300 text-gray-600">{items.time.start}-{items.time.end}</span>
                              <span className=" dark:text-gray-300 text-lg font-semibold text-gray-800">{items.price}</span>
                             </div>
                           </div>
                        
                        )
                      })
                    }
                   
                     <Link to={{pathname :"/root/checkout", state:{ turf : turfname }}}className="dark:bg-green-800 font-semibold flex flex-row justify-center items-center gap-1 w-72 p-3 bg-green-500 border text-white rounded-lg">Procced to checkout<span class="material-symbols-outlined">arrow_forward</span></Link>
              </div>
             </div>
        </section>
        </>
    )
}