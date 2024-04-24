/* eslint-disable react/prop-types */
import { beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import Home from "../Home";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import * as useMoviesHooks from "../../../hooks/useMovies";
import * as moviesMock from "../../../mocks/movies.json";

const mockStore = configureStore([]);

const MockHome = ({ store }) => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    </Provider>
  );
};

describe("Home", () => {
  let store;

  beforeEach(() => {
    cleanup;
    vi.clearAllMocks();
    store = mockStore({});
  });

  it("renders the Home component with loading", () => {
    render(<MockHome store={store} />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders error message when there's an error", () => {
    const useMoviesSpy = vi.spyOn(useMoviesHooks, "useMovies");

    useMoviesSpy.mockReturnValueOnce({
      movies: [],
      moviesSuggest: [],
      loading: false,
      error: "Some error message",
      getAllMovies: vi.fn(),
      getMoviesFiltered: vi.fn(),
      getMoviesBySearch: vi.fn(),
    });

    render(<MockHome store={store} />);
    expect(screen.getByText("Error")).toBeInTheDocument();
  });

  it("renders the Home component with movies", () => {
    const useMoviesSpy = vi.spyOn(useMoviesHooks, "useMovies");
    useMoviesSpy.mockReturnValueOnce({
      movies: moviesMock.results,
      moviesSuggest: moviesMock.results,
      loading: false,
      error: null,
      getAllMovies: vi.fn(),
      getMoviesFiltered: vi.fn(),
      getMoviesBySearch: vi.fn(),
    });

    render(<MockHome store={store} />);

    const homeTitle = screen.getByRole("heading", { name: "All Movies" });
    const movies = screen.getByRole("grid");

    expect(homeTitle).toBeInTheDocument();
    expect(movies.childNodes.length).toEqual(20);
  });

  it("navigates to specific movie once is clicked", () => {
    const useMoviesSpy = vi.spyOn(useMoviesHooks, "useMovies");
    useMoviesSpy.mockReturnValueOnce({
      movies: moviesMock.results,
      moviesSuggest: moviesMock.results,
      loading: false,
      error: null,
      getAllMovies: vi.fn(),
      getMoviesFiltered: vi.fn(),
      getMoviesBySearch: vi.fn(),
    });

    render(<MockHome store={store} />);

    const cardLink = screen.getByRole("link", { name: /No Way Up/i });

    fireEvent.click(cardLink);

    expect(window.location.pathname).toBe(`/home/1096197`);
  });

  it("adds specific movie to favorite", () => {
    const useMoviesSpy = vi.spyOn(useMoviesHooks, "useMovies");
    useMoviesSpy.mockReturnValueOnce({
      movies: moviesMock.results,
      moviesSuggest: moviesMock.results,
      loading: false,
      error: null,
      getAllMovies: vi.fn(),
      getMoviesFiltered: vi.fn(),
      getMoviesBySearch: vi.fn(),
    });

    render(<MockHome store={store} />);

    const moviesList = screen.getByRole("grid");
    const cardButton = moviesList.querySelectorAll("button")[0];

    fireEvent.click(cardButton);

    const actions = store.getActions();

    expect(actions).toEqual([
      { type: "FAVORITE_MOVIE", payload: moviesMock.results[0] },
    ]);
  });
});
