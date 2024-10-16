import { Link, Outlet } from "react-router-dom";


export default function LoginAndSignin(){
    
    return(
        <>
        
           <section className="w-screen h-screen sm:grid grid-cols-2 flex flex-col "
            style={{
                backgroundImage: `url('https://res.cloudinary.com/dpxgeasl4/image/upload/v1725910594/hotktr7e8u7loenmbnts.jpg')`,
                backgroundSize: 'cover', 
                backgroundPosition: 'center', 
              }}>
            <div className="sm:h-screen flex justify-center pt-10 sm:items-center sm:justify-center p-3">
               
               <h1 className="text-white font-custom text-xl sm:text-4xl">Welcome to <span className="text-white">BOOKmyTURF</span></h1>
                
            </div>
            <div>
             <div className="w-48 flex flex-row justify-between items-center gap-2 mx-auto p-5 ">
             <Link to="signup"className="border-b border-green-500 text-white hover:scale-105 hover:rounded-md">SignUP</Link>
             <Link to="signin" className="border-b border-green-500 text-white hover:scale-105 hover:rounded-md" >LogIn</Link>
              </div>
             <div className="max-w-80 min-h-80 shadow-2xl mx-auto bg-white rounded-md p-5">
              <Outlet/>
             </div>
            </div>
           </section>
        </>
    )
}