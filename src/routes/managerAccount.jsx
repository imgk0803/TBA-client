import { useEffect, useState } from "react"
import axios from "axios"
import { logout } from "../features/user/userSlice"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import axiosInstance from "../utils/axiosInstance"


export default function Accountadmin(){
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const[message , setmessage]= useState('')
    const[view , setview] = useState("transaction")
    const [payments, setpayments] = useState([])
    const [confirm , setconfirm] = useState('')
    const[password, setpassword] = useState('')
    const[current ,setcurrent] = useState('')
    const[userName , setUsername] =useState('')
    const[email , setEmail] = useState('')
    const[phone , setPhone] = useState('')
    const user = JSON.parse(localStorage.getItem('user'))
    const token = localStorage.getItem('token')
    useEffect(()=>{
          axiosInstance.get("/api/user/payments")
          .then(res=> setpayments(res.data.filter(item=>user._id === item.user)))
          .catch(err=>alert("something went wrong"))
          setUsername(user.username);
          setEmail(user.email);
          setPhone(user.phone)

          
          
          
    },[]);
    const updatePassword = async(e)=>{
    e.preventDefault()
    try{
            const body = {
                userid : user._id,
                current : current,
                password : password,
                confirm : confirm
            }
            const res = await axiosInstance.patch('/api/user/updatepwd' , body)
            setmessage(res.data)
            setTimeout(()=>{
                setconfirm('');
                setcurrent('')
                setpassword('')
                setmessage('')
            },2000)
            

        }
    catch(err){
            console.log(err)
    }
    };
    const logOut=()=>{
        localStorage.setItem('user','')
        localStorage.setItem('role','')
        localStorage.setItem('token',null)
         dispatch(logout())
         navigate('/signin')

   }
    const editProfile = async(e)=>{
        e.preventDefault();
        try{
           const body = {
            userid : user._id,
            username : userName,
            email : email , 
            phone : phone
           }
           const res = await axiosInstance.patch('https://turfbooking-backend.onrender.com/api/user/updateprofile' , body)
           localStorage.setItem('user',JSON.stringify(res.data.updateduser))
        }
        catch(err){

        }
    }

    return(
    
        <>
            <section className="flex flex-row p-3">
             <div className="flex flex-col gap-5 w-1/3 justify-start items-center border-r-2 p-2 ">
                <span className="material-symbols-outlined text-4xl">mood</span>
                <span className="font-semibold">{user.username}</span>
                <span>{user.email}</span>
                <span>{user.phone}</span>
                <button onClick={()=>setview("transaction")} className="bg-green-500 rounded-md shadow-md text-white  w-40">Transactions</button>
                <button onClick={()=>setview("editprofile")} className="bg-green-500 rounded-md shadow-md text-white w-40">Edit profile</button>
                 <button className="bg-green-500 rounded-md shadow-md text-white  w-40" onClick={()=>{navigate('/root/managerdashboard')}}>Dashboard</button>
                 <button onClick={logOut}  className="bg-green-500 rounded-md shadow-md text-white w-40">Logout</button>
             </div>
             <div className="flex flex-grow m-0 min-h-screen">
                {
                    view === "transaction" && (<>
                    
                           <div className="flex flex-col w-full gap-4 p-3">
                            {
                                payments && payments.length > 0 ? (payments.map(item=>(
                                     
                                <div className="flex flex-row justify-between items-center border shadow-lg rounded-md p-3">
                                    <div className="flex flex-col"><span>date</span><span>{item.created && item.created.slice(0,10)}</span></div>
                                    <div className="flex flex-col"><span>price</span><span>{item.amount}</span></div>
                                    <div className="flex flex-col"><span>status</span>{item.p_status}</div>
                                </div>

                            

                                ))):(
                                    <div className="flex justify-center items-center p-5">
                                    <p className="text-lg text-gray-600">No Payments found..!</p>
                                </div>
                                )
                            }
                           </div>
                          </> )} 
                          { view === "editprofile" && (<>
                                   <div className="flex flex-col gap-3 p-5 justify-center items-center w-full">
                                          <h2 className="p-3 text-2xl border-b-2">Update password</h2>
                                          <form onSubmit={updatePassword} className=" flex flex-col w-1/2 gap-3 p-3  rounded-md shadow-sm items-start justify-center" action="submit">
                                            <label htmlFor="current">current password</label>
                                            <input onChange={(e)=>{setcurrent(e.target.value)}} value={current} type="text" className="w-full  dark:bg-gray-900 outline-none border rounded-md shadow-sm p-1" />
                                            <label htmlFor="password">new password</label>
                                            <input onChange={(e)=>{setpassword(e.target.value)}} value={password} className="w-full  dark:bg-gray-900 border outline-none rounded-md shadow-sm p-1" type="text" />
                                            <label htmlFor="confirm">confirm password</label>
                                            <input onChange={(e)=>{setconfirm(e.target.value)}} value={confirm} className="w-full  dark:bg-gray-900 border rounded-md outline-none shadow-sm p-1" type="text" />
                                            <span className={`
                                                ${message && message === "password changed successfully" ? "text-green-500" : "text-red-500"}`}>
                                                 {message && message}</span>

                                            <button type="submit" className="bg-green-500 text-center mt-2 w-full text-white p-2 rounded-md">update password</button>
                                          </form>
                                          <h2 className="p-3 text-2xl border-b-2">Update profile</h2>
                                         <form onSubmit={editProfile} className="bg-slate-200flex flex-col  w-1/2 gap-2 p-3 border rounded-md shadow-sm items-start justify-center" action="submit">
                                               <label htmlFor="username">username</label>
                                               <input onChange={(e)=>(setUsername(e.target.value))} className="w-full  dark:bg-gray-900 outline-none border rounded-md shadow-sm p-1" value={userName} type="text" />
                                               <label htmlFor="username">email</label>
                                               <input  onChange={(e)=>(setEmail(e.target.value))} className="w-full  dark:bg-gray-900 outline-none border rounded-md shadow-sm p-1" value={email} type="text" />
                                               <label htmlFor="phone">phone</label>
                                               <input  onChange={(e)=>(setPhone(e.target.value))} className="w-full dark:bg-gray-900 outline-none border rounded-md shadow-sm p-1" value={phone} type="text" />
                                               <button className="bg-green-500 mt-2 text-center w-full text-white p-1 rounded-md"  type="submit">update details</button>
                                         </form>

                                   </div>
                           
                          </>)
                }

             </div>
            </section>
        </>
    )
}