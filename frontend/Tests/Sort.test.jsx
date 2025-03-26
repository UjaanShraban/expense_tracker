import { render, screen } from "@testing-library/react";
import Sort from "../components/Sort";
import { describe, it, expect } from "vitest";

describe("Sort Component", () => {
  it("renders sort button", () => {
    render(<Sort setExpenses={() => {}} />);
    expect(screen.getByText(/sort/i)).toBeInTheDocument();
  });
});
