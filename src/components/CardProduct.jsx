import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { shortenText } from "../helpers/helper";

function CardProduct({ data }) {
  const { id, title, image, price } = data;
  return (
    <div className="flex flex-col items-start justify-end w-[270px] m-3 p-4 bg-white border-dashed border-2 border-gray-400 rounded-2xl">
      <img src={image} alt={title} className="size-56 p-4 mb-4 bg-white" />
      <h3 className="font-bold">{shortenText(title)}</h3>
      <p>{price}</p>
      <div className="">
        <Link to={`/products/${id}`}>Details</Link>

        <div>
          <button>Add to cart</button>
        </div>
      </div>
    </div>
  );
}

CardProduct.propTypes = {
  data: PropTypes.object.isRequired,
};

export default CardProduct;
