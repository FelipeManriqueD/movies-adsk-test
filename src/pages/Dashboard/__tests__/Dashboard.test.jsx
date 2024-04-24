import { describe, expect, it, afterEach, vi } from "vitest";
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import Dashboard from "../dashboard";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../../reducers/store";

// Mocking useNavigate
const mockedUseNavigate = vi.fn();
vi.mock("react-router-dom", async (importOriginal) => {
  const mod = await importOriginal(
    "react-router-dom"
  );
  return {
    ...mod,
    useNavigate: () => mockedUseNavigate,
  };
});

const MockDashboard = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    </Provider>
  );
};

describe("Dashboard", () => {
  afterEach(() => {
    cleanup
    vi.clearAllMocks()
  })

  it("renders the Dashboard component", () => {
    render(<MockDashboard />);

    const dashBoardTitle = screen.getByRole("heading", {name: 'Welcome to Movies App'})
    expect(dashBoardTitle).toBeInTheDocument();
  });

  it("renders the Login button", () => {
    render(<MockDashboard />);

    const loginButton = screen.getByRole('button')
    expect(loginButton).toBeInTheDocument()
  });

  it("navigates to login view once Login button is clicked", () => {
    render(<MockDashboard />);

    const loginButton = screen.getByRole('button')
    expect(loginButton).toBeInTheDocument()
    fireEvent.click(loginButton)
    expect(mockedUseNavigate).toHaveBeenCalledWith('/login')
  });
});

