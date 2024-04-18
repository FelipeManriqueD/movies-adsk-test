import { describe, it } from "vitest";
import { render } from "@testing-library/react";
import Login from "../Login";

describe("Login", () => {
  it("renders the Login component", () => {
    render(<Login />);
  });
});
