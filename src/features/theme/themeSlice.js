import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
    name : 'theme',
    initialState : { 
        theme : 'light',
    },
    reducers : {
        switchTheme : (state)=>{
            state.theme = state.theme === 'light' ? 'dark' : 'light';
        }
    }
})
export const {switchTheme} = themeSlice.actions;
export default themeSlice.reducer;