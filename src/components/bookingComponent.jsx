import { useDispatch } from "react-redux"
import { removeFromCart } from "../features/cart/cartslice"
import axiosInstance from "../utils/axiosInstance"
export default function BookingComponent({bookingid , courtname,size,price,time,date,turfname}) {
    const dispatch = useDispatch()
    const removeBooking = async(id)=>{
        try{
          dispatch(removeFromCart(id))
          const res  = await axiosInstance.delete(`/api/user/deletebooking/${id}`)
        }
        catch(err){
                console.log("error::", err)
        }
     }

    return (
        <>
            <div className="flex flex-col gap-4 border dark:border-gray-950 border-gray-300 p-4 rounded-lg shadow-md dark:bg-gray-950 bg-white">
                <div className="flex flex-row justify-between">
                <h2 className="text-xl dark:text-gray-300 font-semibold text-gray-800">{turfname}</h2>
                <button onClick={()=>{removeBooking(bookingid)}}><span className="material-symbols-outlined text-red-600">delete</span></button></div>
                <div className="flex flex-row justify-between items-center">
                    <span className="dark:text-gray-300 text-lg font-semibold text-gray-800">{courtname}</span>
                     <span className="dark:text-gray-300">{size}</span>
                </div>
                <span className="dark:text-gray-300 text-gray-600">{date}</span>
                <span className="text-gray-600 dark:text-gray-300">{time.start}-{time.end}</span>
                <span className="text-lg font-semibold text-gray-800 dark:text-gray-300">{price}</span>
            </div>
        </>
    );
}
