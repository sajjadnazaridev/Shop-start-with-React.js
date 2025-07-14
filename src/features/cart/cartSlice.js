import { createSlice } from "@reduxjs/toolkit";
import { sumProduct } from "../../helpers/helper";

const initialState = {
    selectedItems: [],
    counterItems: 0,
    totalPrices: 0,
    checkout: false,
};


const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const index = state.selectedItems.findIndex(
                (item) => item.id === action.payload.id
            );

            if (index === -1) {
                state.selectedItems.push({ ...action.payload, quantity: 1 });
            }

            const result = sumProduct(state.selectedItems);
            state.counterItems = result.counterItems;
            state.totalPrices = result.totalPrices;
            state.checkout = false;
        },

        increaseQuantity: (state, action) => {
            const index = state.selectedItems.findIndex((item) => item.id === action.payload.id);

            if (index !== -1) {
                state.selectedItems[index].quantity++;
            }

            const result = sumProduct(state.selectedItems);
            state.counterItems = result.counterItems;
            state.totalPrices = result.totalPrices;
            state.checkout = false;
        },

        removeFromCart: (state, action) => {
            const index = state.selectedItems.findIndex((item) => item.id === action.payload.id);

            if (index !== -1) {
                state.selectedItems = state.selectedItems.filter((item) => item.id !== action.payload.id);
            }

            const result = sumProduct(state.selectedItems);
            state.counterItems = result.counterItems;
            state.totalPrices = result.totalPrices;
            state.checkout = false;
        },

        decreaseQuantity: (state, action) => {
            const index = state.selectedItems.findIndex((item) => item.id === action.payload.id);

            if (index !== -1) {
                state.selectedItems[index].quantity--;
            }

            const result = sumProduct(state.selectedItems);
            state.counterItems = result.counterItems;
            state.totalPrices = result.totalPrices;
            state.checkout = false;
        },

        checkout: (state) => {
            state.selectedItems = [];
            state.counterItems = 0;
            state.totalPrices = 0;
            state.checkout = false;
        }
    }
});

export default cartSlice.reducer;
export const { addToCart, increaseQuantity, removeFromCart, decreaseQuantity, checkout } = cartSlice.actions;