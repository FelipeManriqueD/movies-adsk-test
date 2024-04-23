import { useCallback, useRef, useState } from "react";
import {
  getMovies,
  searchMovies,
  getMovieDetailByID,
} from "../services/movies";

export function useMovies({ search = "", page = 1 }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const previousSearch = useRef(search);

  const getAllMovies = async () => {
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
      setMovies(newMovies);
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
    getAllMovies,
    getMoviesBySearch,
    getMovieByID,
    getMoviesFiltered,
    loading,
    error,
  };
}
// export function useFetch({ url, extaPath = "" }) {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   async function fetchData() {
//     setLoading(true);
//     setError(null);
//     try {
//       const fetchFromURL = await fetch(`${url}${extaPath}`);
//       const response = await fetchFromURL.json();
//       if (response.results) {
//         setData((prevState) => [...prevState, ...response.results]);
//       } else {
//         setData(response);
//       }
//       setLoading(false);
//     } catch (error) {
//       setError(`There is a error fetching ${error}`);
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     fetchData();
//   }, [extaPath]);

//   return { data, loading, error };
// }
