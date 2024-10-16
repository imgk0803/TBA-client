import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name : 'cart',
    initialState : {
     items :[],
     quantity : 0

    },
    reducers:{
    addToCart : (state ,action) => {
             
             state.items.push(
                {...action.payload 
                } 
             );
             state.quantity = state.quantity+1
             
    },
    removeFromCart : (state,action) =>{       
               state.items = state.items.filter(item => item.bookingid !== action.payload)
               state.quantity = state.quantity -1 
              
             
    },
    clearCart : (state)=>{
        state.items = [],
        state.quantity = 0
    }
}

})
export const {addToCart,removeFromCart , clearCart} = cartSlice.actions
export default cartSlice.reducer 