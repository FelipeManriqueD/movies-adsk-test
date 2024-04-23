// movieReducer.js
const initialState = {
  movies: [],
};

const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FAVORITE_MOVIE":
      return {
        ...state,
        movies: [...state.movies, action.payload],
      };
    case "FILTER_MOVIES":
      return {
        ...state,
        movies: [...state.movies, action.payload],
      };
    default:
      return state;
  }
};

export default movieReducer;
