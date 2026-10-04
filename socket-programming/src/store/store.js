import {configureStore }from "@reduxjs/toolkit"
import cartReducer from "./slice"

export const appStore = configureStore({
    reducer: {
        cart: cartReducer
    }
})