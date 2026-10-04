import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name:"cart",
    initialState:[],
    reducers:{
         addItem: (state, action)=>{
            state.push(action.payload)
         },
         removeItem: (state, action)=>{
            state.pop();
         },
         clearCart: (state, action)=>{
            state.length = 0;
         }
    }
})


export const { addItem, removeItem, clearCart} = cartSlice.actions;

export default cartSlice.reducer;