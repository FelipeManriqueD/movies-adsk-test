import PropTypes from 'prop-types';
import CustomInput from "../CustomInput/CustomInput";
import Loading from "../Loading/Loading";

export default function TypeaheadInput({
  search,
  handleChange,
  movies,
  isSugegstionSelected,
  loading,
  onClickSuggestion,
}) {

  return (
    <div className="relative">
      <CustomInput
        value={search}
        onChange={handleChange}
        name="query"
        placeholder="Search..."
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
      />
      <div
        className={`${
          movies.length > 0
            ? "absolute z-10 bg-white w-full mt-1 border border-gray-300 rounded"
            : ""
        }`}
      >
        {loading && !movies.length && <Loading type="spinner" />}
        {isSugegstionSelected && search &&
          movies.map(({ id, title }) => (
            <div
              key={id}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => onClickSuggestion(movies, title)}
              role="list"
            >
              {title}
            </div>
          ))}
      </div>
    </div>
  );
}

TypeaheadInput.propTypes = {
  search: PropTypes.string,
  handleChange: PropTypes.func,
  movies: PropTypes.array,
  isSugegstionSelected: PropTypes.bool,
  loading: PropTypes.bool,
  onClickSuggestion: PropTypes.func
};