import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import Loading from "../../components/Loading/Loading";
import { moviesURL } from "../../utils/constants";
import Card from "../../components/Card/Card";
import { truncateText } from "../../utils/utils";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const favoriteMovies = useSelector((state) => state.movies);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const { data, loading, error } = useFetch({
    url: moviesURL,
    extaPath: `&page=${page}`,
  });

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
    const movieSelected = data.find(({ id }) => id === movieID);
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

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (loading && !data.length) {
    return <Loading />;
  }

  if (!loading && !data.length && error) {
    return <p>Error</p>;
  }

  return (
    <div>
      <h2 className="text-4xl font-extrabold dark:text-white">All Movies</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data.length > 0 &&
          data.map(({ id, title, overview, poster_path, release_date }) => (
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
    </div>
  );
}
