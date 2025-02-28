import { useState } from "react";
import CardProduct from "../components/CardProduct";
import Loader from "../components/ui/Loader";
import useProducts from "../hooks/useProducts";
import { ImSearch } from "react-icons/im";

function ProductPage() {
  const [search, setSearch] = useState();
  const [resultSearch, setResultSearch] = useState("");
  const products = useProducts();

  const searchHandler = () => {
    console.log(search);
  };

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Search..."
          value={resultSearch}
          onChange={(e) => {
            setSearch(e.target.value.toLowerCase().trim());
            setResultSearch(e.target.value);
          }}
        />
        <button onClick={searchHandler}>
          <ImSearch />
        </button>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-wrap justify-between w-full">
          {!products.length && <Loader />}
          {products.map((product) => (
            <CardProduct key={product.id} data={product} />
          ))}
        </div>
        <div>Sidebar</div>
      </div>
    </>
  );
}

export default ProductPage;
