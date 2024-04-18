import { describe, it } from "vitest";
import { render } from "@testing-library/react";
import { Detail } from "../Detail";

describe("Detail", () => {
  it("renders the Detail component", () => {
    render(<Detail />);
  });
});
