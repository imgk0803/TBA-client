
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { filterTimeslots } from "../hooks/useAvailableSlots";
export default function ManagerDashboard(){
    const navigate = useNavigate()
    const[bookings , setBookings] =useState([])
    const [timeSlot , setTimeslot] = useState('')
    const [seen, setSeen] = useState(false)
    const [confrim , setConfirm] = useState(false)
    const[courtid , setCourtId] = useState('')
    const[selectedBooking , setOneBooking] = useState('')
    const token = localStorage.getItem('token')
    const user = JSON.parse(localStorage.getItem('user'))
    const [date ,setdate] = useState('')
    const [time , setTime ] = useState()
    const [allbookings , setAllBookings] = useState()
    const [reload , setReload] = useState(false)
    const currentDate = new Date()
    const hours = currentDate.getHours()
    const formattedDate = new Date(currentDate).toISOString().split("T")[0];
    useEffect(()=>{
            axiosInstance.get(`/api/manager/getmanagerbookings/${user._id}`,{
               headers : {
               "Authorization" : `Bearer ${token}`
           }})
           .then(res=>{setBookings(res.data)
           })
           .catch(err=>console.log(err));
           axiosInstance.get("/api/user/bookings")
           .then(res=>setAllBookings(res.data.bookings))
           .catch(err=>console.log(err))
      
    },[reload])
    const bookingToday = bookings.filter(booking=>booking.date.slice(0,10) === date)
    const togglePop = async (booking)=> {
        setOneBooking(booking._id)
        setCourtId(booking.court._id)
        const confirmedBookings = allbookings.filter(booking => {
            return booking.status !== 'canceled'
        })
       const courtBooking = confirmedBookings.filter(booking =>{
            return booking.court._id === courtid
          })
        const todaysbookings = courtBooking.filter(item=>{
        const bookingDate = new Date(item.date).toISOString().split('T')[0];
        return bookingDate === date})
      const modTodaysBooking = todaysbookings.map(book => ({
        start: book.timeslot.start,
        end: book.timeslot.end
      }));
      console.log("courtbooking" , courtBooking)
      console.log("todays booking", todaysbookings)
      console.log("modtodays booking", modTodaysBooking)
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
      if(date === formattedDate ){
        timeslots = allTimeslots.filter(ts=>ts.start>=hours)
      }
      const newArray = filterTimeslots(timeslots , modTodaysBooking)
      console.log("timeslot ::: ",newArray)
      setTimeslot(newArray)
      setSeen(!seen)
       
  
    }
    const handleDate =(e)=>{
        e.preventDefault();
        try{
            console.log("e",e.target.value)
            setdate(e.target.value)
            
            
        }
        catch(err){
          console.log(err.message)
        }
    }
    console.log("date:::",date)
    console.log("formatted ::: ", formattedDate)
    console.log("timeselected::" , time)
    function confirmcancel(id){
        setOneBooking(id)
        setConfirm(!confrim)

    }
    function close(){
            setSeen(!seen)
    }
    const updateBooking=async()=>{
      try{
        const {start ,end } = time;
        const body = {
            
                start,
                 end,
                 date
            
        }
        axiosInstance.patch(`/api/manager/court/${courtid}/booking/${selectedBooking}`,body,{
            headers : {
                'Authorization' : `Bearer ${token}`
            }
        })
        .then(res=>{
            if(res.data.success === false){
                alert(res.data.message)
            }
            console.log(res.data.message)
            setReload(!reload)
        })
        setSeen(!seen)
      }
      catch(err){

      }

    }
    const cancelBooking = async(id)=>{

        try{
            await axiosInstance.patch(`/api/manager/cancelbooking/${selectedBooking}`,{},{
                headers : {
                    'Authorization' : `Bearer ${token}`
                }
            })
            .then(res=>{
                alert(res.data.message)
                setReload(!reload)
            })
            setConfirm(!confirm)
        
        }
        catch(err){
             console.log(err)
        }
    }
    return(
        <> <button onClick={()=>{navigate(-1)}} className=" text-white bg-green-500 rounded-md p-1 m-2 ">Back</button>
           <section className="flex flex-col items-center gap-3 p-5">
           <h1 className="text-4xl">Manage Bookings</h1>
            <div className="flex flex-col items-center justify-center gap-2">
            <label className="p-1 text-md font-semibold dark:text-gray-300">Choose a date</label>
            <input onChange={handleDate} onBlur={handleDate} value={date}   className="outline-gray-400  rounded-md outline-none dark:bg-gray-700 dark:text-gray-300" type="date" />
            </div>
          
            <div className="flex flex-col p-3 w-full  gap-3">
            {
                    bookingToday && bookingToday.length > 0 ?( bookingToday.map((item,index)=>{

                        let start = item.timeslot.start + "am"
                        let end = item.timeslot.end + "am"
                       
                        if(item.timeslot.start> 12){
                             start = item.timeslot.start - 12 + "pm"
                             end = item.timeslot.end - 12 + "pm"
                           

                        }
                        else if(item.timeslot.start === 12){
                            end = item.timeslot.end - 12 + "pm"
                            start = item.timeslot.start + "am"
                        }
                       return (
                        <div key={item._id} className="flex flex-col dark:bg-gray-950 gap-4 border border-gray-300 p-4 rounded-lg shadow-md bg-white">
                        <div className="flex flex-row justify-between items-center">
                        <h2 className="text-xl  font-semibold text-gray-800">{index+1}. {item.court.turf.title}</h2>
                        <span>{item.user.username}</span>                     
                        <div className="flex flex-col justify-between items-center">
                        <span className="dark:text-gray-300 text-lg font-semibold text-gray-800">{item.court.sport}</span>
                        <span className=" dark:text-gray-300">Size: {item.court.size}</span>
                        </div>
                        <span className=" dark:text-gray-300 text-gray-600">{item.date.slice(0,10)}</span>
                        <span className=" dark:text-gray-300 text-gray-600">{start}-{end}</span>
                        <span className="text-lg font-semibold  dark:text-gray-300 text-gray-800">{item.price}</span>
                         <div className="flex flex-col justify-center items-center">
                          <span className="text-lg font-semibold text-gray-800  dark:text-gray-300">{item.status}</span>                
                          <span className="text-sm  text-gray-800  dark:text-gray-300">payment id : {item.payment}</span>
                        </div>
                        <div className="flex flex-col justify-center items-center gap-1" >
                                <button onClick={()=>{togglePop(item)}} className="bg-green-500 text-xs text-white rounded-md p-1 w-full">Reschedule</button>
                                <button onClick={()=>{confirmcancel(item._id)}} className="bg-red-500 text-xs text-white rounded-md p-1 w-full">Cancel</button>  
                        </div>
                        </div>
                        </div> 
                        
                    )})):(
                        <div className="flex justify-center items-center p-5">
                        <p className="text-lg text-gray-600">No bookings found</p>
                    </div>

                    )
                }
                {
                    confrim && (
                        <>
                        <div className="fixed inset-0 w-full h-full flex items-center justify-center bg-black bg-opacity-70 z-50">
                        <div className="flex flex-col gap-3 dark:bg-gray-700 bg-white w-96 p-5 rounded-md"> 
                    
                         <h1 className="text-xl dark:text-gray-300 p-1">Are you sure to cancel ?</h1>
                         <div className="flex flex-row justify-around p-5">
                         <button onClick={cancelBooking} className="bg-green-400 text-white p-1 w-1/3 rounded-md">YES</button>
                         <button onClick={()=>{setConfirm(!confirm)}} className="bg-red-400 text-white w-1/3 p-1 rounded-md">NO</button>
                         </div>
                        
                        </div>
                        </div>
                 </>
                    )
                }               
            {seen &&( <>
                                   <div className="fixed inset-0 w-full h-full flex items-center justify-center bg-black bg-opacity-70 z-50">
                                   <div className="flex flex-col gap-3 dark:bg-gray-700 bg-white w-96 p-5 rounded-md"> 
                                    <div className="flex flex-row justify-between">
                                    <h1 className="text-xl p-1">update the timeslot</h1>
                                    <button onClick={close}>x</button>
                                    </div>
                                  
                                    <select onChange={(e)=>{setTime(JSON.parse(e.target.value))}} className="p-1 dark:bg-gray-700" name="timslot" id="">
                                        <option value="placeholder">Select a Time</option>
                                        {timeSlot && timeSlot.map((ts,index) =>{
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
                       
                          className="p-1 text-sm font-mono hover:bg-green-400 rounded-md" key={index} value={JSON.stringify(ts)}>
                          {start} - {end}
                          </option>
                        )})
                        }
                                    </select>
                                    <button onClick={updateBooking} className="bg-green-400 text-white p-1 rounded-md">update</button>
                                   </div>
                                   </div>
                            </>)}    
            </div>
          
           </section>  
        </>
    )
}