import { describe, it } from "vitest";
import { render } from "@testing-library/react";
import Favorite from "../Favorite";

describe("Favorite", () => {
  it("renders the Favorite component", () => {
    render(<Favorite />);
  });
});
