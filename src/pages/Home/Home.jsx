import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMovies } from "../../hooks/useMovies";
import Loading from "../../components/Loading/Loading";
import Card from "../../components/Card/Card";
import { truncateText } from "../../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import TypeaheadInput from "../../components/TypeaheadInput/TypeaheadInput";

export default function Home() {
  const favoriteMovies = useSelector((state) => state.movies);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const { movies, loading, error, getAllMovies, getMoviesFiltered } = useMovies(
    {}
  );

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    )
      return;
    setPage((prevPage) => prevPage + 1);
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
    return favoriteMovies.movies.length > 0 &&
      favoriteMovies.movies.filter(({ id }) => id === movieID).length > 0
      ? false
      : true;
  }

  function onClickSuggestion(moviesFiltered) {
    getMoviesFiltered({ moviesFiltered });
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    getAllMovies(page);
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
        />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {movies.length > 0 &&
          movies.map(({ id, title, overview, poster_path, release_date }) => (
            <Link to={`/home/${id}`} key={id} target="_blank">
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
