import PropTypes from "prop-types";
import { CgDetailsMore } from "react-icons/cg";
import { FaCartArrowDown, FaTrash } from "react-icons/fa";
import { IoIosRemove, IoMdAdd } from "react-icons/io";
import { Link } from "react-router-dom";
import { productQuantity, shortenText } from "../helpers/helper";
import useCart from "../hooks/useCart";

function CardProduct({ data }) {
  const { id, title, image, price } = data;

  const [state, dispatch] = useCart();

  const quantity = productQuantity(state, id);

  // console.log(state);

  const clickHandler = (type) => {
    if (type === "ADD_TO_CART") {
      dispatch({ type, payload: data });
    } else if (type === "REMOVE_FROM_CART") {
      dispatch({ type, payload: data });
    } else if (type === "INCREASE_QUANTITY") {
      dispatch({ type, payload: data });
    } else if (type === "DECREASE_QUANTITY") {
      dispatch({ type, payload: data });
    }
  };

  return (
    <div className="flex flex-col items-start justify-end w-[270px] mb-3 p-4 bg-white border-dashed border-2 border-gray-400 rounded-2xl">
      <img src={image} alt={title} className="size-56 p-4 mb-4 bg-white" />
      <h3 className="font-bold">{shortenText(title)}</h3>
      <p>{price}$</p>
      <div className="flex justify-between items-center w-full mt-2 text-light">
        <Link to={`/products/${id}`} className="text-primary">
          <CgDetailsMore size={19} />
        </Link>

        <div className="flex items-center gap-2">
          {quantity > 1 && (
            <button
              onClick={() => clickHandler("DECREASE_QUANTITY")}
              className="p-2 bg-primary rounded-md cursor-pointer"
            >
              <IoIosRemove size={16} />
            </button>
          )}

          {quantity == 1 && (
            <button
              onClick={() => clickHandler("REMOVE_FROM_CART")}
              className="p-2 bg-primary rounded-md cursor-pointer"
            >
              <FaTrash size={16} />
            </button>
          )}

          {!!quantity && <p className="mx-2 text-neutral-900">{quantity}</p>}

          {quantity == 0 ? (
            <button
              onClick={() => clickHandler("ADD_TO_CART")}
              className="p-2 bg-primary rounded-md cursor-pointer"
            >
              <FaCartArrowDown size={16} />
            </button>
          ) : (
            <button
              onClick={() => clickHandler("INCREASE_QUANTITY")}
              className="p-2 bg-primary rounded-md cursor-pointer"
            >
              <IoMdAdd size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

CardProduct.propTypes = {
  data: PropTypes.object.isRequired,
};

export default CardProduct;
