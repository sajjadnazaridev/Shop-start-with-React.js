import { FaListUl, FaStar, FaTrash } from "react-icons/fa";
import { IoIosRemove, IoMdAdd } from "react-icons/io";
import { IoArrowBackSharp } from "react-icons/io5";
import { LuChartLine } from "react-icons/lu";
import { MdFavoriteBorder, MdOutlineNotificationsActive } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Loader from "../components/ui/Loader";
import { productQuantity, starConvertor } from "../helpers/helper";
import {
  addToCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../features/cart/CartSlice";
import { useEffect } from "react";
import { fetchProducts } from "../features/product/ProductSlice";

function DetailsPage() {
  const { id } = useParams();
  const { products } = useSelector((state) => state.products);
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const productDetail = products.find((product) => product.id === +id);

  useEffect(() => {
    if (!productDetail && products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, productDetail, products]);

  if (!productDetail) return <Loader />;

  const quantity = productQuantity(cart, productDetail.id);

  const clickHandler = (type) => {
    if (type === "ADD_TO_CART") {
      dispatch(addToCart(productDetail));
    } else if (type === "REMOVE_FROM_CART") {
      dispatch(removeFromCart(productDetail));
    } else if (type === "INCREASE_QUANTITY") {
      dispatch(increaseQuantity(productDetail));
    } else if (type === "DECREASE_QUANTITY") {
      dispatch(decreaseQuantity(productDetail));
    }
  };

  const totalStars = 5;
  const starConverted = starConvertor(productDetail.rating.rate);

  return (
    <div className="flex-col items-center m-4">
      <div className="flex justify-between items-stretch w-full">
        <div className="w-fit h-full mr-4 *:text-xl *:mb-3 *:cursor-pointer">
          <Link to="/">
            <div className="p-2 bg-gray-200 rounded-md mb-3">
              <IoArrowBackSharp />
            </div>
          </Link>

          <MdFavoriteBorder />
          <LuChartLine />
          <MdOutlineNotificationsActive />
          <FaListUl />
        </div>

        <div className="w-2/6">
          <img
            src={productDetail.image}
            alt={productDetail.title}
            className="w-full"
          />
        </div>

        <div className="flex-col justify-between w-2/7 mx-4 p-4 bg-gray-100 rounded-md border border-gray-500">
          <div className="w-full mb-4 text-left">
            <p className="text-primary text-xs">{productDetail.category}</p>
            <h1 className="font-bold">{productDetail.title}</h1>
          </div>

          <div>
            <div className="flex mb-5">
              {Array.from({ length: totalStars }).map((_, index) => (
                <FaStar
                  key={index}
                  color={index < starConverted ? "#facc15" : "#d1d5db"}
                  size={20}
                />
              ))}
            </div>

            <p>Price ${productDetail.price}</p>
            <div className="flex justify-between items-center mt-4 text-light">
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

              {quantity != 0 && <p className="text-dark">{quantity}</p>}

              {quantity === 0 ? (
                <button
                  className="w-full py-2 text-light bg-primary rounded-md cursor-pointer transition-all hover:bg-theme-dark-primary"
                  onClick={() => clickHandler("ADD_TO_CART")}
                >
                  Buy
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

        <div className="flex items-center mx-4">
          <div className="h-full w-[1px] bg-primary"></div>
        </div>

        <div className="w-2/6 ml-4">
          <div>
            <h3 className="text-primary mb-3">Description</h3>
            <p>{productDetail.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailsPage;
