import { describe, it } from "vitest";
import { render } from "@testing-library/react";
import { Home } from "../Home";

describe("Home", () => {
  it("renders the Home component", () => {
    render(<Home />);
  });
});
