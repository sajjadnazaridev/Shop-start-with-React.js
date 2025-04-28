import { emptyImage } from "../assets";
import BasketCard from "../components/Templates/Checkout/BasketCard";
import CheckoutSidePayment from "../components/Templates/Checkout/CheckoutSidePayment";
import useCart from "../hooks/useCart";

function CheckoutPage() {
  const [state, dispatch] = useCart();
  // console.log(state);

  if (!state.selectedItems.length) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <img src={emptyImage} alt="empty image" />
        <p className="text-secondary text-4xl font-bold text-center">
          Your cart is empty!
        </p>
        ;
      </div>
    );
  }

  return (
    <div className="flex justify-between items-start h-screen m-4">
      <div className="w-1/3 mr-4">
        <CheckoutSidePayment data={state} dispatch={dispatch} />
      </div>

      <div className="w-2/3 h-full border-l pl-4 border-gray-400 overflow-auto">
        {state.selectedItems.map((item) => (
          <BasketCard key={item.id} data={item} dispatch={dispatch} />
        ))}
      </div>
    </div>
  );
}

export default CheckoutPage;
