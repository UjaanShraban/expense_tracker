import { render, screen } from "@testing-library/react";
import Search from "../components/Search";
import { describe, it, expect } from "vitest";

describe("Search Component", () => {
  it("renders search input and button", () => {
    render(<Search setExpenses={() => {}} />);
    
    expect(
      screen.getByPlaceholderText(/search by description or type/i)
    ).toBeInTheDocument();
    
    expect(screen.getByText(/search/i)).toBeInTheDocument();
  });
});
