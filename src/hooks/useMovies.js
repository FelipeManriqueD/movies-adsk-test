import { useCallback, useRef, useState } from "react";
import {
  getMovies,
  searchMovies,
  getMovieDetailByID,
} from "../services/movies";

export function useMovies({ search = "" }) {
  const [movies, setMovies] = useState([]);
  const [moviesSuggest, setMoviesSuggest] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const previousSearch = useRef(search);

  const getAllMovies = async (page) => {
    try {
      setLoading(true);
      setError(null);
      const allMovies = await getMovies({ currentPage: page });
      setMovies(allMovies);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const getMoviesBySearch = useCallback(async ({ search }) => {
    if (search === previousSearch.current) return;

    try {
      setLoading(true);
      setError(null);
      previousSearch.current = search;
      const newMovies = await searchMovies({ search });
      setMoviesSuggest(newMovies);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const getMovieByID = async ({ movieID = 1 }) => {
    try {
      setLoading(true);
      setError(null);
      const movieDetail = await getMovieDetailByID({ movieID });
      setMovies([movieDetail]);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const getMoviesFiltered = ({ moviesFiltered }) => {
    setMovies(moviesFiltered);
  };

  return {
    movies,
    moviesSuggest,
    getAllMovies,
    getMoviesBySearch,
    getMovieByID,
    getMoviesFiltered,
    loading,
    error,
  };
}
