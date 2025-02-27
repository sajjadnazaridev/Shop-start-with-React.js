import { useContext } from "react";
import { ProductsContext } from "../context/ProductsContext";

const useProducts = () => {
  const { products } = useContext(ProductsContext);
  return products;
};

export default useProducts;
