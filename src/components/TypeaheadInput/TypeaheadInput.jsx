import { useCallback, useState } from "react";
import CustomInput from "../CustomInput/CustomInput";
import { useSearch } from "../../hooks/useSearch";
import { debounce } from "../../utils/utils";
import { useMovies } from "../../hooks/useMovies";
import Loading from "../Loading/Loading";

export default function TypeaheadInput({ onClickSuggestion }) {
  const { search, updateSearch } = useSearch();
  const { movies, loading, getMoviesBySearch } = useMovies({ search });
  const [isSugegstionSelected, setIsSuggestionSelected] = useState(true);

  const debouncedGetMovies = useCallback(
    debounce((search) => {
      if (search === "") return null;
      getMoviesBySearch({ search });
    }, 300),
    [getMoviesBySearch]
  );

  const handleChange = async (event) => {
    const { value } = event.target;
    updateSearch(value);
    debouncedGetMovies(value);
    setIsSuggestionSelected((prevsState) => !prevsState);
  };

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
        {isSugegstionSelected &&
          movies.map(({ id, title }) => (
            <div
              key={id}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                onClickSuggestion(movies);
                setIsSuggestionSelected((prevsState) => !prevsState);
              }}
            >
              {title}
            </div>
          ))}
      </div>
    </div>
  );
}
