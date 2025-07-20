import { createSlice } from "@reduxjs/toolkit";
import { sumPrice, sumQuantity } from "../../helpers/helper";

const initialState = {
    selectedItems: [],
    itemsCounter: 0,
    totalPrices: 0,
    checkout: false,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            if (state.selectedItems.findIndex(
                (item) => item.id === action.payload.id
            ) === -1) {
                state.selectedItems.push({ ...action.payload, quantity: 1 });
                state.totalPrices = sumPrice(state.selectedItems);
                state.itemsCounter = sumQuantity(state.selectedItems);
                state.checkout = false;
            }
        },

        removeItem: (state, action) => {
            const newSelectedItems = state.selectedItems.filter(item => item.id !== action.payload.id);
            state.selectedItems = newSelectedItems;
            state.totalPrices = sumPrice(state.selectedItems);
            state.itemsCounter = sumQuantity(state.selectedItems);
        },

        increaseQuantity: (state, action) => {
            const index = state.selectedItems.findIndex(item => item.id == action.payload.id);

            if (index !== -1) {
                state.selectedItems[index].quantity++;
                state.totalPrices = sumPrice(state.selectedItems);
                state.itemsCounter = sumQuantity(state.selectedItems);
            }
        },

        decreaseQuantity: (state, action) => {
            const index = state.selectedItems.findIndex(item => item.id == action.payload.id);

            if (index !== -1) {
                state.selectedItems[index].quantity--;
                state.totalPrices = sumPrice(state.selectedItems);
                state.itemsCounter = sumQuantity(state.selectedItems);
            }
        },

        checkout: (state) => {
            state.selectedItems = [];
            state.itemsCounter = 0;
            state.totalPrices = 0;
            state.checkout = true;
        }
    }
});

export default cartSlice.reducer;
export const { addToCart, removeItem, increaseQuantity, decreaseQuantity, checkout } = cartSlice.actions;