import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Root from './routes/root';
import NoUser from './routes/noUser';
import Unauthorized from './routes/unAuthorized';
import Center from './routes/center';
import LoginAndSignin from './routes/login';
import Signin from './components/signin';
import Signup from './components/signup';
import TurfSingle from './routes/singleturf';
import Booking from './routes/booking';
import Checkout from './routes/checkout';
import MyBookings from './routes/myBookings';
import Account from './routes/account';
import AccountAdmin from './routes/adminAccount';
import Updateturf from './adminRoute/updateTurf';
import AddTurf from './adminRoute/createturf';
import Addcourt from './adminRoute/createcourt';
import AdminDashboard from './adminRoute/adminDashboard';
import AccountManager from './routes/managerAccount';
import ManagerDashboard from './managerRoute/managerDashboard';
import store from './app/store'
import { Provider } from 'react-redux'
import ProtectedRoutes from './routes/protectedRoutes';
import ErrorComponent from './components/errorComponent';
import TurfReview from './routes/turfReviews';

const router = createBrowserRouter([
  {
    path:"/",
    element:<LoginAndSignin/>,
    children:[
      {
        path:"",
        element:<Signin/>
      },
      {
      path:"signin",
      element:<Signin/>
    },
    {
      path:"signup",
      element:<Signup/>
    }  
    ] //login children ends here
  },
  {
    path: "root",
    element: <Root/>,
    children: [
      {
        path : "nouserfound",
        element : <NoUser/>
      },
      {
        path: "unauthorized",
        element: <Unauthorized />,
      },      
      {
        path: "home",
        element: <Center />,
        errorElement : <ErrorComponent/>
      },
      {
        path:"turf/:turfid",
        element:<TurfSingle/>,
        errorElement : <ErrorComponent/>
      },
      {
        path:"booking/:turfid",
        element:<Booking/>,
        errorElement : <ErrorComponent/>
      },
      {
        path:'checkout/',
        element:<Checkout/>,
        errorElement : <ErrorComponent/>
      },
      {
         path : 'mybookings',
         element : <MyBookings/>,
         errorElement : <ErrorComponent/>
      },
      {
         path : 'reviews',
         element : <TurfReview/>,
         
      },
      {
        path:'profile',
        element: <Account/>,
        errorElement : <ErrorComponent/>
      },

      {
        path:'profileadmin',
        element :(<ProtectedRoutes allowedRole={'admin'} element={<AccountAdmin/>}/>)
      },
      {
          path : 'profilemanager',
          element :(<ProtectedRoutes allowedRole={'manager'} element={<AccountManager/>}/>)
      },
      {
          path : 'updateturf/:turfid',
          element :(
            <ProtectedRoutes allowedRole={'admin'} element={<Updateturf/>}/>
         )
      },
      {
          path : 'createturf',
          element :(
            <ProtectedRoutes allowedRole={"admin"} element={<AddTurf/>}/>
          ) 
      },
      {
          path:'addcourt/:turfid',
          element:(<ProtectedRoutes allowedRole={'admin'} element={<Addcourt/>}/>)
      },
      {
        path:'admindashboard',
        element:(<ProtectedRoutes allowedRole={'admin'} element={<AdminDashboard/>}/>)
      },
      {
        path:'managerdashboard',
        element:(<ProtectedRoutes allowedRole={'manager'} element={<ManagerDashboard/>}/>)
               
      }
        
      

    ], // root children ends here
  },

]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
