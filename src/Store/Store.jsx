import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './Slices/AddToCartSlice';
import allProducts from './Slices/ProductSlice';
const store = configureStore({
    reducer: {
        cart: cartReducer,
        product: allProducts
    }
})

export default store