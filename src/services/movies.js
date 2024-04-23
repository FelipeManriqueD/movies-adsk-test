import { apiKey, baseUrl, moviesURL } from "../utils/constants";

export const searchMovies = async ({ search }) => {
  if (search === "") return null;

  try {
    const response = await fetch(
      `${baseUrl}/search/movie?query=${search}&api_key=${apiKey}`
    );
    const json = await response.json();
    return json.results;
  } catch (e) {
    throw new Error("Error searching movies");
  }
};

export const getMovies = async ({ currentPage }) => {
  try {
    const response = await fetch(`${moviesURL}&page=${currentPage}`);
    const json = await response.json();
    return json.results;
  } catch (e) {
    throw new Error("Error getting all movies");
  }
};

export const getMovieDetailByID = async ({ movieID }) => {
  try {
    const response = await fetch(
      `${baseUrl}/movie/${movieID}?api_key=${apiKey}`
    );
    const json = await response.json();
    return json;
  } catch (e) {
    throw new Error("Error getting movie detail");
  }
};
