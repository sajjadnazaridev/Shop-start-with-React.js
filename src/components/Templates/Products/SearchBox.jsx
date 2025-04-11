import PropTypes from "prop-types";
import { ImSearch } from "react-icons/im";
import { createObjectQuery } from "../../../helpers/helper";

function SearchBox({
  search,
  setQuery,
  setSearch,
  placeholderSearch,
  setPlaceholderSearch,
}) {
  const searchHandler = () => {
    setQuery((query) => createObjectQuery(query, { search }));
  };

  return (
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
  );
}

SearchBox.propTypes = {
  setSearch: PropTypes.func.isRequired,
  placeholderSearch: PropTypes.string.isRequired,
  setPlaceholderSearch: PropTypes.func.isRequired,
  setQuery: PropTypes.func.isRequired,
  search: PropTypes.string,
};

export default SearchBox;
