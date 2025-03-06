import { useState } from "react";
import CardProduct from "../components/CardProduct";
import Loader from "../components/ui/Loader";
import useProducts from "../hooks/useProducts";
import { ImSearch } from "react-icons/im";
import Sidebar from "../components/Templates/Products/Sidebar";

function ProductPage() {
  const [search, setSearch] = useState();
  const [placeholderSearch, setPlaceholderSearch] = useState("");
  const products = useProducts();

  const searchHandler = () => {
    console.log(search);
  };

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
          {!products.length && <Loader />}
          {products.map((product) => (
            <CardProduct key={product.id} data={product} />
          ))}
        </div>
        <div className="h-fit w-1/5 ml-3 flex sticky top-5">
          <Sidebar />
        </div>
      </div>
    </>
  );
}

export default ProductPage;
