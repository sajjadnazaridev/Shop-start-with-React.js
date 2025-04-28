import PropTypes from "prop-types";
import { useReducer } from "react";
import { CartContext } from "./CartContext";
import { sumProduct } from "../helpers/helper";

const initialState = {
  selectedItems: [],
  counterItems: 0,
  totalPrices: 0,
  checkout: false,
};

const reducer = (state, action) => {
    // console.log({ action, state });

  switch (action.type) {
    case "ADD_TO_CART": {
      // Preventing mutated state
      const updatedItems = [...state.selectedItems];
      const index = updatedItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (index === -1) {
        updatedItems.push({ ...action.payload, quantity: 1 });
      }

      return {
        selectedItems: updatedItems,
        ...sumProduct(updatedItems),
        checkout: false,
      };
    }

    case "REMOVE_FROM_CART": {
      const updatedItems = [...state.selectedItems];

      const newSelectedItems = updatedItems.filter(
        (item) => item.id !== action.payload.id
      );

      return {
        ...state,
        selectedItems: newSelectedItems,
        ...sumProduct(newSelectedItems),
      };
    }

    case "INCREASE_QUANTITY": {
      const updatedItems = [...state.selectedItems];
      const index = updatedItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (index !== -1) {
        updatedItems[index].quantity++;
      }

      return {
        ...state,
        selectedItems: updatedItems,
        ...sumProduct(updatedItems),
      };
    }

    case "DECREASE_QUANTITY": {
      const updatedItems = [...state.selectedItems];
      const index = updatedItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (index !== -1) {
        updatedItems[index].quantity--;
      }

      return {
        ...state,
        selectedItems: updatedItems,
        ...sumProduct(updatedItems),
      };
    }

    case "CHECKOUT":
      return {
        selectedItems: [],
        counterItems: 0,
        totalPrices: 0,
        checkout: true,
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CartProvider;
