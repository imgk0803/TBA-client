import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isAuthenticated : false ,
    user : null,
    token : null,
    role : null
  },
  reducers: {
    login :(state ,action)=>{
        state.isAuthenticated = true;
       state.user = action.payload.user;
        state.token = action.payload.token;
        state.role = action.payload.role;
    },
    logout : (state)=>{
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.role = null;
    }
  }
})


export const { login , logout } = userSlice.actions

export default userSlice.reducer