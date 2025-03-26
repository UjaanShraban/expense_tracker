import { render, screen, fireEvent } from "@testing-library/react";
import axios from "axios";
import Sort from "../components/Sort";

jest.mock("axios"); // Mock axios to prevent actual API calls

describe("Sort Component", () => {
  let setExpensesMock;

  beforeEach(() => {
    setExpensesMock = jest.fn();
    render(<Sort setExpenses={setExpensesMock} />);
  });

  test("renders sort button", () => {
    expect(screen.getByRole("button", { name: /sort/i })).toBeInTheDocument();
  });

  test("shows sorting options when button is clicked", () => {
    fireEvent.click(screen.getByRole("button", { name: /sort/i }));
    
    expect(screen.getByText(/Sort By/i)).toBeInTheDocument();
    expect(screen.getByText(/Ascending/i)).toBeInTheDocument();
    expect(screen.getByText(/Descending/i)).toBeInTheDocument();
  });

  test("updates state when selecting sort options", () => {
    fireEvent.click(screen.getByRole("button", { name: /sort/i }));

    const sortByDropdown = screen.getByRole("combobox", { name: "sortBy" });
    const orderDropdown = screen.getByRole("combobox", { name: "order" });

    fireEvent.change(sortByDropdown, { target: { value: "amount" } });
    fireEvent.change(orderDropdown, { target: { value: "desc" } });

    expect(sortByDropdown.value).toBe("amount");
    expect(orderDropdown.value).toBe("desc");
  });

  test("calls API and updates expenses on form submit", async () => {
    axios.post.mockResolvedValue({ data: [{ id: 1, description: "Groceries", amount: 50 }] });

    fireEvent.click(screen.getByRole("button", { name: /sort/i }));

    fireEvent.change(screen.getByRole("combobox", { name: "sortBy" }), { target: { value: "amount" } });
    fireEvent.change(screen.getByRole("combobox", { name: "order" }), { target: { value: "asc" } });

    fireEvent.click(screen.getByRole("button", { name: /apply/i }));

    expect(axios.post).toHaveBeenCalledWith("http://localhost:5555/history/sort", {
      sortBy: "amount",
      order: "asc",
    });

    expect(setExpensesMock).toHaveBeenCalledWith([{ id: 1, description: "Groceries", amount: 50 }]);
  });
});
