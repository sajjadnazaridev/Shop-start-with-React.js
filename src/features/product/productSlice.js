import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/config";

const initialState = {
    isPending: false,
    products: [],
    error: ""
};

const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {   
    const response = await api.get("/products");    
    return response;
});

const productSlice = createSlice({
    name: "products",
    initialState,
    extraReducers: builder => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.isPending = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.isPending = false;
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.isPending = false;
                state.error = action.error.message;
            });
    }
});

export default productSlice.reducer;
export { fetchProducts };