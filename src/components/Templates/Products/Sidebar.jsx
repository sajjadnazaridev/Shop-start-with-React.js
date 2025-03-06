import PropTypes from "prop-types";
import { RiFileList2Fill } from "react-icons/ri";

function Sidebar({ setProducts, products }) {
  const categoryHandler = (e) => {
    const { tagName } = e.target;
    const tagValue = e.target.innerText.toLowerCase();
    console.log(tagValue);

    if (tagName !== "LI") return;

    const categoryByFilter = products.filter((product) => {
      if (tagValue === product.category.toLowerCase()) {
        return product;
      }
    });

    // console.log(categoryByFilter);
    setProducts(categoryByFilter);
  };

  return (
    <div className="size-full p-4 rounded-2xl bg-gray-100">
      <div>
        <RiFileList2Fill />
      </div>
      <ul className="*:cursor-pointer *:mb-2" onClick={categoryHandler}>
        <li>All</li>
        <li>Electronics</li>
        <li>Jewelery</li>
        <li>Men&apos;s clothing</li>
        <li>Women&apos;s clothing</li>
      </ul>
    </div>
  );
}

Sidebar.propTypes = {
  setProducts: PropTypes.func.isRequired,
  products: PropTypes.array.isRequired,
};

export default Sidebar;
