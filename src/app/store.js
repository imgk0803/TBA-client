import { configureStore } from '@reduxjs/toolkit'
import { thunk } from 'redux-thunk'
import userReducer from '../features/user/userSlice'
import cartReducer from '../features/cart/cartslice'
import sortedTurfReducer from '../features/sortedTurfs/sortedTurfsSlice'
import themeReducer from '../features/theme/themeSlice'



const store =  configureStore({
  reducer: {
    user : userReducer,
    cart : cartReducer,
    turfs : sortedTurfReducer,
    theme : themeReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk)


})
export default store;

