import { useEffect, useState } from "react";
import CardProduct from "../components/CardProduct";
import Loader from "../components/ui/Loader";
import useProducts from "../hooks/useProducts";
import { ImSearch } from "react-icons/im";
import Sidebar from "../components/Templates/Products/Sidebar";

function ProductPage() {
  const [search, setSearch] = useState();
  const [placeholderSearch, setPlaceholderSearch] = useState("");
  const productsFromContext = useProducts();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const searchHandler = () => {
    setError("");

    if (search) {
      const resultSearchFilter = productsFromContext.filter((product) =>
        selectedCategory === "all" ||
        product.category.toLowerCase() === selectedCategory
          ? product.title.toLowerCase().trim().includes(search)
          : false
      );

      if (resultSearchFilter.length) {
        setError("");
        setProducts(resultSearchFilter);
      } else {
        setProducts([]);
        setError("Product not found!");
      }
    } else {
      if (selectedCategory === "all") {
        setProducts(productsFromContext);
      } else {
        setProducts(
          productsFromContext.filter(
            (product) => product.category.toLowerCase() === selectedCategory
          )
        );
      }
    }
  };

  // console.log(products);

  useEffect(() => {
    setProducts(productsFromContext);
    setLoader(false);
  }, [productsFromContext]);

  return (
    <>
      <div className="size-full p-4">
        <input
          type="text"
          placeholder="Search..."
          value={placeholderSearch}
          onChange={(e) => {
            setSearch(e.target.value.toLowerCase().trim());
            setPlaceholderSearch(e.target.value);
          }}
        />
        <button onClick={searchHandler}>
          <ImSearch />
        </button>
      </div>
      <div className="flex justify-between w-full p-4">
        <div className="flex flex-wrap justify-between w-4/5">
          {!products.length && loader && <Loader />}
          {error.length > 0 && <div>{error}</div>}
          {products.map((product) => (
            <CardProduct key={product.id} data={product} />
          ))}
        </div>
        <div className="h-fit w-1/5 ml-3 flex sticky top-5">
          <Sidebar
            productsFromContext={productsFromContext}
            setProducts={setProducts}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            setError={setError}
          />
        </div>
      </div>
    </>
  );
}

export default ProductPage;
