import { createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import axiosInstance from "../../utils/axiosInstance";
export const sortedTurfSlice = createSlice({
  name : 'turfs',
  initialState :{
       SortedTurf : [],
       city : ''
  } ,
  reducers : {
    setSortedTurfs : (state,action)=>{
         state.SortedTurf = action.payload.sorted
         state.city = action.payload.city.name
    }
  }
})
export const{setSortedTurfs} = sortedTurfSlice.actions;

export const getSortedTurfs = (city) => async (dispatch) => {
  try {
    const { lat, lon } = city;
    const response = await axiosInstance.get(
      `/api/user/turfs?lat=${lat}&lon=${lon}`
    );
    
    dispatch(setSortedTurfs({sorted : response.data.turfs,
      city : city
    }));
  } catch (err) {
    console.error(err);
  }
};
export default sortedTurfSlice.reducer ; 