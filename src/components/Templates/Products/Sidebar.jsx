import PropTypes from "prop-types";
import { RiFileList2Fill } from "react-icons/ri";
import { createObjectQuery } from "../../../helpers/helper";

function Sidebar({ setError, query, setQuery }) {
  const { category: selectedCategory } = query;

  const categoryHandler = (e) => {
    const { tagName } = e.target;
    const tagValue = e.target.innerText.toLowerCase();
    // console.log(tagValue);
    setError("");

    if (tagName !== "LI") return;

    setQuery((query) => createObjectQuery(query, { category: tagValue }));
  };

  return (
    <div className="size-full p-4 rounded-2xl bg-gray-100">
      <div>
        <RiFileList2Fill />
      </div>
      <ul className="*:cursor-pointer *:mb-2" onClick={categoryHandler}>
        <li className={!selectedCategory ? "font-bold" : ""}>All</li>
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
  setError: PropTypes.func,
  query: PropTypes.object.isRequired,
  setQuery: PropTypes.func.isRequired,
};

export default Sidebar;
