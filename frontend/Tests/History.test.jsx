import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import History from "../components/History";

// Mock Axios
jest.mock("axios");

const mockExpenses = [
  {
    id: 1,
    description: "Groceries",
    amount: 500,
    type: "expense",
    date: "2024-03-25",
  },
  {
    id: 2,
    description: "Salary",
    amount: 2000,
    type: "income",
    date: "2024-03-20",
  },
];

describe("History Component", () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({ data: mockExpenses });
  });

  test("renders history table and balance", async () => {
    render(
      <BrowserRouter>
        <History />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/history/i)).toBeInTheDocument();
      expect(screen.getByText(/groceries/i)).toBeInTheDocument();
      expect(screen.getByText(/salary/i)).toBeInTheDocument();
      expect(screen.getByText(/remaining balance: rs. 1500/i)).toBeInTheDocument();
    });
  });

  test("deletes an expense on delete button click", async () => {
    axios.delete.mockResolvedValue({});

    render(
      <BrowserRouter>
        <History />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/groceries/i)).toBeInTheDocument();
    });

    const deleteButtons = screen.getAllByText(/remove/i);
    fireEvent.click(deleteButtons[0]);

    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalledWith("http://localhost:5555/history/1");
    });
  });

  test("opens and submits update modal", async () => {
    render(
      <BrowserRouter>
        <History />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/groceries/i)).toBeInTheDocument();
    });

    const updateButton = screen.getAllByText(/update/i)[0];
    fireEvent.click(updateButton);

    await waitFor(() => {
      expect(screen.getByText(/edit expense/i)).toBeInTheDocument();
    });

    const descriptionInput = screen.getByLabelText(/description/i);
    fireEvent.change(descriptionInput, { target: { value: "Updated Groceries" } });

    axios.put.mockResolvedValue({});

    const saveButton = screen.getByText(/save/i);
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(axios.put).toHaveBeenCalledWith("http://localhost:5555/history/1", {
        id: 1,
        description: "Updated Groceries",
        amount: 500,
        type: "expense",
        date: "2024-03-25",
      });
    });
  });
});
