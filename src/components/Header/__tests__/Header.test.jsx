/* eslint-disable react/prop-types */
import { describe, expect, it, afterEach } from "vitest";
import {
  render,
  screen,
  cleanup,
  fireEvent,
} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Header from "../Header";

const mockStore = configureStore([]);

const MockHeader = ({ store }) => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    </Provider>
  );
};

describe("Header", () => {
  afterEach(cleanup);

  it("renders the Header component user loged out", () => {
    const initialState = { login: { isLoggedIn: false } };
    const store = mockStore(initialState);

    render(<MockHeader store={store} />);

    expect(screen.getByText("Movies App")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  it("renders the Header component properly when user is logged in", () => {
    const initialState = { login: { isLoggedIn: true } };
    const store = mockStore(initialState);

    render(<MockHeader store={store} />);

    expect(screen.getByText(/Movies App/i)).toBeInTheDocument();
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Favorite/i)).toBeInTheDocument();
    expect(screen.getByText(/Logout/i)).toBeInTheDocument();
  });

  it("Dispatches logout action when Logout link is clicked", () => {
    const initialState = { login: { isLoggedIn: true } };
    const store = mockStore(initialState);

    render(<MockHeader store={store} />);

    fireEvent.click(screen.getByText(/Logout/i));
    const actions = store.getActions();
    expect(actions).toEqual([{ type: "LOGOUT" }]);
  });
});
