/* eslint-disable react/prop-types */
import { beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import configureStore from "redux-mock-store";
import { BrowserRouter } from "react-router-dom";
import Login from "../Login";
import { Provider } from "react-redux";

// Mocking useNavigate
const mockedUseNavigate = vi.fn();
vi.mock("react-router-dom", async (importOriginal) => {
  const mod = await importOriginal("react-router-dom");
  return {
    ...mod,
    useNavigate: () => mockedUseNavigate,
  };
});

const mockStore = configureStore([]);
const MockLogin = ({ store }) => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </Provider>
  );
};

describe("Login", () => {
  let store;
  beforeEach(() => {
    cleanup; 
    vi.clearAllMocks();
    store = mockStore({
      login: {
        isLoggedIn: true,
        user: {
          email: "",
          password: "",
        },
      },
    });
  });

  it("renders the Login component", () => {
    render(<MockLogin store={store} />);

    const loginTitle = screen.getByRole("heading", {
      name: "Login in to your account",
    });
    const emailLabel = screen.getByLabelText(/Email Address/i);
    const passwordLabel = screen.getByLabelText(/Password/i);
    const submitButton = screen.getByRole("button");

    expect(loginTitle).toBeInTheDocument();
    expect(emailLabel).toBeInTheDocument();
    expect(passwordLabel).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it("Updates input values correctly", () => {
    const initialState = { login: { isLoggedIn: false } };
    const store = mockStore(initialState);

    render(<MockLogin store={store} />);

    const emailLabel = screen.getByLabelText(/Email Address/i);
    const passwordLabel = screen.getByLabelText(/Password/i);

    fireEvent.change(emailLabel, { target: { value: "test@example.com" } });
    fireEvent.change(passwordLabel, { target: { value: "password123" } });

    const actions = store.getActions();

    expect(actions).toEqual([
      { type: "USER", payload: { email: "test@example.com" } },
      { type: "USER", payload: { password: "password123" } },
    ]);
  });

  it("handles form submition correctly", () => {
    render(<MockLogin store={store} />);

    const emailLabel = screen.getByLabelText(/Email Address/i);
    const passwordLabel = screen.getByLabelText(/Password/i);
    const form = screen.getByRole("form");

    fireEvent.change(emailLabel, { target: { value: "test@example.com" } });
    fireEvent.change(passwordLabel, { target: { value: "password123" } });
    fireEvent.submit(form);

    const actions = store.getActions();

    expect(actions).toEqual([
      { type: "USER", payload: { email: "test@example.com" } },
      { type: "USER", payload: { password: "password123" } },
    ]);
    //expect(mockedUseNavigate).toHaveBeenCalledWith("/home");
  });
});
