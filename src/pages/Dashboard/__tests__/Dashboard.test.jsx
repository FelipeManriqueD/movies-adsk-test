import { describe, it } from "vitest";
import { render } from "@testing-library/react";
import Dashboard from "../dashboard";

describe("Dashboard", () => {
  it("renders the Dashboard component", () => {
    render(<Dashboard />);
  });
});
