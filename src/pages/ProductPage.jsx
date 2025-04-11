import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CardProduct from "../components/CardProduct";
import SearchBox from "../components/Templates/Products/SearchBox";
import Sidebar from "../components/Templates/Products/Sidebar";
import Loader from "../components/ui/Loader";
import {
  filterProducts,
  getInitialQuery,
  searchProducts
} from "../helpers/helper";
import useProducts from "../hooks/useProducts";

function ProductPage() {
  const [search, setSearch] = useState();
  const [placeholderSearch, setPlaceholderSearch] = useState("");
  const productsFromContext = useProducts();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(true);
  const [query, setQuery] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();

  // console.log(products);

  useEffect(() => {
    setProducts(productsFromContext);
    setLoader(false);

    setQuery(getInitialQuery(searchParams));
  }, [productsFromContext]);

  useEffect(() => {
    setSearchParams(query);
    setPlaceholderSearch(query.search || "");
    let finalProducts = searchProducts(productsFromContext, query.search);
    finalProducts = filterProducts(finalProducts, query.category);

    setProducts(finalProducts);
  }, [productsFromContext, query]);

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
          {!products.length && loader && <Loader />}
          {error.length > 0 && <div>{error}</div>}
          {products.map((product) => (
            <CardProduct key={product.id} data={product} />
          ))}
        </div>
        <div className="h-fit w-1/5 ml-3 flex sticky top-5">
          <Sidebar query={query} setQuery={setQuery} setError={setError} />
        </div>
      </div>
    </>
  );
}

export default ProductPage;
