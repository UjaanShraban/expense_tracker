import { render, screen } from "@testing-library/react";
import History from "../components/History";
import { describe, it, expect } from "vitest";

describe("History Component", () => {
  it("renders without crashing", () => {
    render(<History />);
    expect(screen.getByText("Transaction History")).toBeInTheDocument();
  });
});
