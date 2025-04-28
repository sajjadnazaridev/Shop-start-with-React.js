import PropTypes from "prop-types";
import { AiOutlineProduct } from "react-icons/ai";
import { MdPayment } from "react-icons/md";
import { TbBrandCashapp } from "react-icons/tb";

function CheckoutSidePayment({ data, dispatch }) {
  const clickHandler = (type) => {
    if (type === "CHECKOUT") {
      dispatch({ type });
    }
  };

  return (
    <div className="p-3 border-3 border-dashed border-gray-300 rounded-sm">
      <p className="flex items-center text-xl text-primary">
        <TbBrandCashapp size={22} className="mr-1" />
        Total:
        <span className="text-xl text-gray-500">{data.totalPrices}$</span>
      </p>
      <p className="flex items-center text-xl text-primary">
        <AiOutlineProduct size={22} className="mr-1" />
        Quantity:
        <span className="text-xl text-gray-500">{data.counterItems}</span>
      </p>
      <p className="flex items-center text-xl text-primary">
        <MdPayment size={22} className="mr-1" />
        Status:
        <span className="text-xl text-gray-500">
          {data.checkout === false && "pending..."}
        </span>
      </p>
      <button
        className="mt-4 bg-primary text-light p-2 w-full rounded-md cursor-pointer"
        onClick={() => clickHandler("CHECKOUT")}
      >
        Pay
      </button>
    </div>
  );
}

CheckoutSidePayment.propTypes = {
  data: PropTypes.object.isRequired,
  dispatch: PropTypes.func,
};

export default CheckoutSidePayment;
