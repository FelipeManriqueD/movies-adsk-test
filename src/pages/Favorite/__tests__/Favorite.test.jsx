import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { Provider, useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Favorite from "../Favorite";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);

vi.mock("react-redux", async (importOriginal) => {
  const mod = await importOriginal("react-redux");
  return {
    ...mod,
    useSelector: vi.fn(),
  };
});

const MockFavorite = ({ store }) => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Favorite />
      </BrowserRouter>
    </Provider>
  );
};

describe("Favorite", () => {
  let store;
  beforeEach(() => {
    cleanup;
    store = mockStore({
      movies: {
        movies: [],
      },
    });
  });

  it("renders the Favorite component with no movies", () => {
    useSelector.mockImplementation((cb) => cb({ movies: { movies: [] } }));

    render(<MockFavorite store={store} />);

    const favoriteTitle = screen.getByRole("heading", {
      name: "Favorite movies",
    });
    const noMoviestext = screen.getByText(/No Favorite Movies/i);

    expect(favoriteTitle).toBeInTheDocument();
    expect(noMoviestext).toBeInTheDocument();
  });

  it("renders the Favorite component with movies", () => {
    useSelector.mockImplementation((cb) =>
      cb({
        movies: {
          movies: [
            {
              id: 1,
              title: "Favorite Movie 1",
              overview: "Overview of Favorite Movie 1",
              poster_path: "/poster1.jpg",
              release_date: "2022-01-01",
            },
            {
              id: 2,
              title: "Favorite Movie 2",
              overview: "Overview of Favorite Movie 2",
              poster_path: "/poster2.jpg",
              release_date: "2022-02-01",
            },
          ],
        },
      })
    );

    render(<MockFavorite store={store} />);

    const favoriteTitle = screen.getByRole("heading", {
      name: "Favorite movies",
    });

    expect(favoriteTitle).toBeInTheDocument();
    expect(screen.getByRole("grid").childNodes.length).toEqual(2);
  });
});
