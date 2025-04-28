import PropTypes from "prop-types";
import { useContext } from "react";
import { ProductsContext } from "../context/ProductsContext";

const useProductDetails = (id) => {
  const { products } = useContext(ProductsContext);
  const findProduct = products.find((product) => product.id === id);
  return findProduct;
};

useProductDetails.propTypes = {
  id: PropTypes.number.isRequired,
};

export default useProductDetails;
