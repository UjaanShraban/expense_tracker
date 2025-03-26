import { render, screen, fireEvent } from "@testing-library/react";
import axios from "axios";
import Search from "../components/Search";

jest.mock("axios"); // Mock axios to avoid actual API calls

describe("Search Component", () => {
  test("renders search input and button", () => {
    render(<Search setExpenses={() => {}} />);

    // Check if input and button exist
    expect(screen.getByPlaceholderText(/Search by description or type/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
  });

  test("updates input value on typing", () => {
    render(<Search setExpenses={() => {}} />);
    const input = screen.getByPlaceholderText(/Search by description or type/i);

    fireEvent.change(input, { target: { value: "groceries" } });
    expect(input.value).toBe("groceries");
  });

  test("calls API on search button click", async () => {
    const mockSetExpenses = jest.fn();
    axios.post.mockResolvedValue({ data: [{ id: 1, description: "Groceries", type: "expense", amount: 100 }] });

    render(<Search setExpenses={mockSetExpenses} />);
    const input = screen.getByPlaceholderText(/Search by description or type/i);
    const button = screen.getByRole("button", { name: /search/i });

    fireEvent.change(input, { target: { value: "groceries" } });
    fireEvent.click(button);

    expect(axios.post).toHaveBeenCalledWith("http://localhost:5555/history/search", { searchTerm: "groceries" });
  });
});
