import axios from "axios"
import {useState } from "react"
import { useNavigate } from "react-router-dom"
import axiosInstance from "../utils/axiosInstance"


export default function Signup(){
    const [username , setusername] = useState('')
    const [ email ,setemail] = useState('')
    const [phone , setphone] =useState('')
    const [password , setpassword] = useState('')
    const [confirm , confirmpwd] = useState('')
    const[message ,setmessage] =useState('')
    const navigate = useNavigate()
    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{

                         
              if(password !== confirm){
                setmessage('password doesn\'t match')
              }
              else{
                const body = {username , email , phone , password}
                const response = await axiosInstance.post('/api/user/signin',body)
                alert(`please Login.. ${username}`)
                navigate('/signin')
              }
               

        }
        catch(err){
            setmessage('please fill the fields')
            console.log('error ::',err)
        }
    }

    
    return( 
        <>
           <form className="flex flex-col gap-2" action="submit" onSubmit={handleSubmit}>
           <label htmlFor="name">Name<span className="text-red-600"> *</span></label>
            <input onChange={(e)=>setusername(e.target.value)} className="px-1 shadow-md rounded-md outline-none" type="text" />
            <label htmlFor="email">Email<span className="text-red-600"> *</span></label>
            <input onChange={(e)=>setemail(e.target.value)} className="px-1 shadow-md rounded-md outline-none" type="text" />
            <label htmlFor="phone">Phone</label>
            <input onChange={(e)=>setphone(e.target.value)} className="px-1 shadow-md rounded-md outline-none" type="text" />
            <label htmlFor="password">Password<span className="text-red-600"> *</span></label>
            <input onChange={(e)=>setpassword(e.target.value)} className="px-1 shadow-md rounded-md outline-none" type="text" />
            <label htmlFor="confirm password">Confirm Password<span className="text-red-600"> *</span></label>
            <input onChange={(e)=>confirmpwd(e.target.value)} className="px-1 shadow-md rounded-md outline-none" type="password" />
             {message && (<span className="text-red-600">{message}</span>)}
           <button className="bg-green-500 rounded-md mt-2 p-1 text-white hover:bg-green-600">SignUP</button>
           </form>
        </>
    )
}