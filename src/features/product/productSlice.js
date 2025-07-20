import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/config";

const initialState = {
    loading: false,
    products: [],
    error: ""
}

const fetchProducts = createAsyncThunk("product/fetchProducts", () => {
    return api.get("/products");
});

const refetchProduct = createAsyncThunk("product/refetchProduct", (id) => {
    return api.get(`/products/${id}`);
});

const productSlice = createSlice({
    name: "product",
    initialState,
    extraReducers: builder => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
            })

            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
                state.error = "";
            })

            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.products = [];
                state.error = action.error.message;
            })

            .addCase(refetchProduct.pending, (state) => {
                state.loading = true;
            })

            .addCase(refetchProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products = [action.payload];
                state.error = "";
            })

            .addCase(refetchProduct.rejected, (state, action) => {
                state.loading = false;
                state.products = [];
                state.error = action.error.message;
            })
    }
})

export default productSlice.reducer;
export { fetchProducts, refetchProduct };
