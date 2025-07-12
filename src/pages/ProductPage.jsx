import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import CardProduct from "../components/CardProduct";
import SearchBox from "../components/Templates/Products/SearchBox";
import Sidebar from "../components/Templates/Products/Sidebar";
import Loader from "../components/ui/Loader";
import { fetchProducts } from "../features/product/ProductSlice";
import {
  filterProducts,
  getInitialQuery,
  searchProducts,
} from "../helpers/helper";

function ProductPage() {
  const dispatch = useDispatch();

  const { error, isPending, products } = useSelector((state) => state.products);

  const [search, setSearch] = useState();
  const [placeholderSearch, setPlaceholderSearch] = useState("");
  const [productsLoaded, setProductsLoaded] = useState([]);
  const [query, setQuery] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();

  // console.log(products);
  // console.log(searchParams);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    setQuery(getInitialQuery(searchParams));
  }, [searchParams]);

  useEffect(() => {
    setProductsLoaded(products);
  }, [products]);

  useEffect(() => {
    setSearchParams(query);
    setPlaceholderSearch(query.search || "");
    let finalProducts = searchProducts(products, query.search);
    finalProducts = filterProducts(finalProducts, query.category);

    setProductsLoaded(finalProducts);
  }, [products, query, setSearchParams]);

  return (
    <>
      <SearchBox
        setSearch={setSearch}
        placeholderSearch={placeholderSearch}
        setPlaceholderSearch={setPlaceholderSearch}
        setQuery={setQuery}
        search={search}
      />
      <div className="flex justify-between w-full p-4">
        <div className="flex flex-wrap justify-between w-4/5">
          {!isPending.length && isPending && <Loader />}
          {error.length > 0 && <div>{error}</div>}
          {productsLoaded.map((product) => (
            <CardProduct key={product.id} data={product} />
          ))}
        </div>
        <div className="h-fit w-1/5 ml-3 flex sticky top-5">
          <Sidebar query={query} setQuery={setQuery} />
        </div>
      </div>
    </>
  );
}

export default ProductPage;
