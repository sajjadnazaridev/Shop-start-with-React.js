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
    <div className="flex items-stretch size-full p-4">
      <input
        type="text"
        placeholder="Search..."
        className="mr-3 p-1 rounded-md border border-primary outline outline-primary"
        value={placeholderSearch}
        onChange={(e) => {
          setSearch(e.target.value.toLowerCase().trim());
          setPlaceholderSearch(e.target.value);
        }}
      />
      <button onClick={searchHandler} className="px-2 text-light rounded-md bg-primary transition-all cursor-pointer hover:bg-secondary">
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
