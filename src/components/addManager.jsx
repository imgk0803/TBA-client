import axios from "axios";
import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";

export default function AddManager({toggle}){
const [email,setEmail]=useState('');
const[username , setUserName] = useState('');
const[phone , setPhone] = useState();
const[password , setPassword] = useState('') 
const token = localStorage.getItem('token')
const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
       const body = {
        email,
        username,
        phone,
        role : "manager",
        password,
       }
       const response = await axiosInstance.post('/api/admin/addmanager',body, {
        headers: {
          Authorization: `Bearer ${token}`
        }
    })
       if(response){
        alert('Manager Added Successfully!.')
        toggle();
       }
    }
    catch(err){

    }
}
return(
<>
<div className="fixed inset-0 bg-black bg-opacity-50 z-40 " id="popup-overlay"></div>


<div className="fixed inset-0 flex items-center justify-center z-50">
  <div className="bg-slate-50 dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md mx-auto relative">
    
    
    <button onClick={toggle} id="close-btn" className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
      &times;
    </button>

    
    <h2 className="text-xl dark:text-gray-300 font-semibold mb-4 text-center">Create Manager</h2>


    <form onSubmit={handleSubmit}>
    
      <div className="mb-4">
        <label for="username" className="block dark:text-gray-300 text-sm font-medium text-gray-700">Username</label>
        <input onChange={(e)=>{setUserName(e.target.value)}} type="text" id="username" className="mt-1 dark:bg-gray-600 block w-full px-3 py-2  rounded-md shadow-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required/>
      </div>

     
      <div className="mb-4">
        <label for="email" className="block text-sm dark:text-gray-300 font-medium text-gray-700">Email</label>
        <input  onChange={(e)=>{setEmail(e.target.value)}} type="email" id="email" className="mt-1 block dark:bg-gray-600 w-full px-3 py-2 rounded-md shadow-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required/>
      </div>

     
      <div className="mb-4">
        <label for="phone" className="block text-sm dark:text-gray-300 font-medium text-gray-700">Phone</label>
        <input  onChange={(e)=>{setPhone(e.target.value)}} type="tel" id="phone" className="mt-1 block dark:bg-gray-600 w-full px-3 py-2 rounded-md shadow-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required/>
      </div>

      <div className="mb-4">
        <label for="password" className="block dark:text-gray-300 text-sm font-medium text-gray-700">Password</label>
        <input  onChange={(e)=>{setPassword(e.target.value)}} type="password" id="password" className="mt-1 dark:bg-gray-600 block w-full px-3 py-2  rounded-md shadow-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required/>
      </div>

      <div className="flex justify-end">
        <button  type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md">
          Submit
        </button>
      </div>
    </form>
  </div>
</div>
</>
)
}