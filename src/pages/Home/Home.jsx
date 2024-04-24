import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import Card from "../../components/Card/Card";
import { debounce, truncateText } from "../../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import TypeaheadInput from "../../components/TypeaheadInput/TypeaheadInput";
import { useMovies } from "../../hooks/useMovies";
import { useSearch } from "../../hooks/useSearch";

export default function Home() {
  const favoriteMovies = useSelector((state) => state.movies);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const { search, updateSearch } = useSearch();
  const [isMovieListSelected, setIsMovieListSelected] = useState(false);
  const {
    movies,
    moviesSuggest,
    loading,
    error,
    getAllMovies,
    getMoviesFiltered,
    getMoviesBySearch,
  } = useMovies({ search });

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

    if (!value) {
      getAllMovies({ page, reset: true });
    }

    setIsMovieListSelected((prevsState) => !prevsState);
  };

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    if (scrollY + windowHeight >= documentHeight) {
      setPage((prevPage) => prevPage + 1);
    }
  }, []);

  function addToFavoriteHandler(event, movieID) {
    event.preventDefault();
    const movieSelected = movies.find(({ id }) => id === movieID);
    dispatch({
      type: "FAVORITE_MOVIE",
      payload: movieSelected,
    });
  }

  function hasFavoriteBtn(movieID) {
    return !(
      favoriteMovies?.movies?.filter(({ id }) => id === movieID).length > 0
    );
  }

  function onClickSuggestion(moviesFiltered, title) {
    updateSearch(title);
    getMoviesFiltered({ moviesFiltered });
    setIsMovieListSelected((prevsState) => !prevsState);
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    getAllMovies({ page });
  }, [page]);

  if (loading && !movies.length) {
    return <Loading />;
  }

  if (!loading && !movies.length && error) {
    return <p>Error</p>;
  }

  return (
    <>
      <div className="flex items-center mb-6 justify-between">
        <h2 className="text-4xl font-extrabold dark:text-white">All Movies</h2>
        <TypeaheadInput
          onClickSuggestion={onClickSuggestion}
          movies={moviesSuggest}
          loading={loading}
          handleChange={handleChange}
          isSugegstionSelected={isMovieListSelected}
          search={search}
        />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4" role="grid">
        {movies.map(({ id, title, overview, poster_path, release_date }) => (
          <Link to={`/home/${id}`} key={id}>
            <Card
              title={title}
              description={truncateText(overview)}
              image={poster_path}
              releaseDate={release_date}
              onClick={(event) => addToFavoriteHandler(event, id)}
              shouldAddToFavorite={hasFavoriteBtn(id)}
            />
          </Link>
        ))}
      </div>
    </>
  );
}
