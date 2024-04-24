/* eslint-disable react/prop-types */
import { beforeEach, describe, it } from "vitest";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const mockStore = configureStore([]);

const MockApp = ({ store }) => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
};

describe("App", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      login: {
        user: {
          email: "",
          password: "",
        },
      },
    });
  });

  it("renders the App component", () => {
    render(<MockApp store={store} />);
  });
});
