import { configureStore } from '@reduxjs/toolkit'
import productReducer from '../features/product/ProductSlice';
import cartReducer from "../features/cart/CartSlice";

export const store = configureStore({
    reducer: {
        products: productReducer,
        cart: cartReducer
    }
});