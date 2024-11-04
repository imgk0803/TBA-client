import { createSlice } from "@reduxjs/toolkit"
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
    },
    clearTurfs : (state)=>{
      state.SortedTurf = null;
      state.city = null;
    }
  }
})
export const{setSortedTurfs , clearTurfs} = sortedTurfSlice.actions;

export const getSortedTurfs = (city) => async (dispatch) => {
  try {
    const { lat, lon } = city;
    const response = await axiosInstance.get(
      `/api/user/turfs?lat=${lat}&lon=${lon}`
    );
    const activeTurfs = response.data.turfs.filter(item=>item.isActive === true)
    
    dispatch(setSortedTurfs({sorted : activeTurfs,
      city : city
    }));
  } catch (err) {
    console.error(err);
  }
};
export default sortedTurfSlice.reducer ; 