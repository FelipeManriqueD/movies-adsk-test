
import { cleanup, render, screen } from "@testing-library/react";
import { BrowserRouter} from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Detail from "../Detail";
import * as useMoviesHooks from "../../../hooks/useMovies";
import * as moviesMock from "../../../mocks/movies.json";

const mockStore = configureStore([]);

// Mocking useParams
const mockedUseParams = vi.fn();
vi.mock("react-router-dom", async (importOriginal) => {
  const mod = await importOriginal("react-router-dom");
  return {
    ...mod,
    useParams: () => mockedUseParams,
  };
});

const MockDetail = ({ store }) => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Detail />
      </BrowserRouter>
    </Provider>
  );
};

describe("Detail component", () => {
  beforeEach(() => {
    cleanup; 
    vi.clearAllMocks();
  });

  it("should render movie details correctly", () => {
    const initialState = { movies: [] };
    const store = mockStore(initialState);

    const useMoviesSpy = vi.spyOn(useMoviesHooks, "useMovies");

    // Mock useMovies to provide mock data
    useMoviesSpy.mockReturnValue({
      movies: moviesMock.results,
      loading: false,
      error: null,
      getMovieByID: vi.fn(),
    });

    render(
      <MockDetail store={store} />
    );

    const detailMovieTitle = screen.getByRole("heading", {name: "No Way Up"})
    const detailMovieImg = screen.getByRole("img")

    
    expect(detailMovieTitle).toBeInTheDocument();
    expect(detailMovieImg).toBeInTheDocument();
  });
});
