import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import CardProduct from "../components/CardProduct";
import SearchBox from "../components/Templates/Products/SearchBox";
import Sidebar from "../components/Templates/Products/Sidebar";
import Loader from "../components/ui/Loader";
import { fetchProducts } from "../features/product/productSlice";
import {
  filterProducts,
  getInitialQuery,
  searchProducts,
} from "../helpers/helper";

function ProductPage() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((store) => store.product);

  const [search, setSearch] = useState();
  const [placeholderSearch, setPlaceholderSearch] = useState("");
  const [mainProducts, setMainProducts] = useState([]);
  const [query, setQuery] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    setMainProducts(products);
    setQuery(getInitialQuery(searchParams));
  }, [products]);

  useEffect(() => {
    setSearchParams(query);
    setPlaceholderSearch(query.search || "");
    let finalProducts = searchProducts(products, query.search);
    finalProducts = filterProducts(finalProducts, query.category);

    setMainProducts(finalProducts);
  }, [products, query]);

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
          {loading && <Loader />}
          {error.length > 0 && <div>{error}</div>}
          {mainProducts.map((product) => (
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
