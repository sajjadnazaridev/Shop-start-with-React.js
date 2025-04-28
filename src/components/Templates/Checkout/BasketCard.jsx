import PropTypes from "prop-types";
import { FaTrash } from "react-icons/fa";
import { IoIosRemove, IoMdAdd } from "react-icons/io";
import { shortenText } from "../../../helpers/helper";
import { Link } from "react-router-dom";

function BasketCard({ data, dispatch }) {
  const clickHandler = (type) => {
    if (type === "REMOVE_FROM_CART") {
      dispatch({ type, payload: data });
    } else if (type === "INCREASE_QUANTITY") {
      dispatch({ type, payload: data });
    } else if (type === "DECREASE_QUANTITY") {
      dispatch({ type, payload: data });
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-3 p-4 bg-white border-b border-gray-400">
        <Link to={`/products/${data.id}`}>
          <img
            src={data.image}
            alt={data.title}
            className="w-24 p-4 mb-4 bg-white"
          />
        </Link>

        <Link to={`/products/${data.id}`}>
          <h3 className="font-bold">{shortenText(data.title)}</h3>
        </Link>
        <p className="text-center">{data.price}$</p>
        <div className="flex justify-end items-center w-fit mt-2 text-light">
          {data.quantity > 1 ? (
            <button
              onClick={() => clickHandler("DECREASE_QUANTITY")}
              className="p-2 bg-primary rounded-md cursor-pointer"
            >
              <IoIosRemove size={16} />
            </button>
          ) : (
            <button
              onClick={() => clickHandler("REMOVE_FROM_CART")}
              className="p-2 bg-primary rounded-md cursor-pointer"
            >
              <FaTrash size={16} />
            </button>
          )}

          <p className="mx-4 text-dark">{data.quantity}</p>

          <button
            onClick={() => clickHandler("INCREASE_QUANTITY")}
            className="p-2 bg-primary rounded-md cursor-pointer"
          >
            <IoMdAdd size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

BasketCard.propTypes = {
  data: PropTypes.object.isRequired,
  dispatch: PropTypes.func,
};

export default BasketCard;
