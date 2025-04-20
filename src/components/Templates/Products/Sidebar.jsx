import PropTypes from "prop-types";
import { RiFileList2Fill } from "react-icons/ri";
import { createObjectQuery } from "../../../helpers/helper";
import { categories } from "../../../constants/categories";

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
        {categories.map((item) => (
          <li
            key={item.id}
            className={
              selectedCategory === item.name.toLocaleLowerCase() ||
              (!selectedCategory && item.name.toLocaleLowerCase() === "all")
                ? "font-bold"
                : null
            }
          >
            {item.name}
          </li>
        ))}
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
