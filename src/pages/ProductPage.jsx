import CardProduct from "../components/CardProduct";
import Loader from "../components/ui/Loader";
import useProducts from "../hooks/useProducts";

function ProductPage() {
  const products = useProducts();
  console.log(products);
  return (
    <div className="flex justify-between">
      <div className="flex flex-wrap justify-between w-full">
        {!products.length && <Loader />}
        {products.map((product) => (
          <CardProduct key={product.id} data={product} />
        ))}
      </div>
      <div>Sidebar</div>
    </div>
  );
}

export default ProductPage;
