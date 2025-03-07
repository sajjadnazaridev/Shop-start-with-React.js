import PropTypes from "prop-types";
import { RiFileList2Fill } from "react-icons/ri";

function Sidebar({
  setProducts,
  productsFromContext,
  selectedCategory,
  setSelectedCategory,
  setError,
}) {
  const categoryHandler = (e) => {
    const { tagName } = e.target;
    const tagValue = e.target.innerText.toLowerCase();
    // console.log(tagValue);
    setError("");

    if (tagName !== "LI") return;

    setSelectedCategory(tagValue);

    if (tagValue === "all") {
      setProducts(productsFromContext);
    } else {
      setProducts(
        productsFromContext.filter(
          (product) => tagValue === product.category.toLowerCase()
        )
      );
    }
  };

  return (
    <div className="size-full p-4 rounded-2xl bg-gray-100">
      <div>
        <RiFileList2Fill />
      </div>
      <ul className="*:cursor-pointer *:mb-2" onClick={categoryHandler}>
        <li className={selectedCategory === "all" ? "font-bold" : ""}>All</li>
        <li className={selectedCategory === "electronics" ? "font-bold" : ""}>
          Electronics
        </li>
        <li className={selectedCategory === "jewelery" ? "font-bold" : ""}>
          Jewelery
        </li>
        <li
          className={selectedCategory === "men's clothing" ? "font-bold" : ""}
        >
          Men&apos;s clothing
        </li>
        <li
          className={selectedCategory === "women's clothing" ? "font-bold" : ""}
        >
          Women&apos;s clothing
        </li>
      </ul>
    </div>
  );
}

Sidebar.propTypes = {
  setProducts: PropTypes.func.isRequired,
  productsFromContext: PropTypes.array.isRequired,
  selectedCategory: PropTypes.string.isRequired,
  setSelectedCategory: PropTypes.func.isRequired,
  setError: PropTypes.func,
};

export default Sidebar;
