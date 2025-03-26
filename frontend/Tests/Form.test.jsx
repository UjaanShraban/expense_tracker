import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Form from "../components/Form";
import axios from "axios";

// Mock Axios
jest.mock("axios");

describe("Form Component", () => {
  test("renders form correctly", () => {
    render(
      <BrowserRouter>
        <Form />
      </BrowserRouter>
    );

    expect(screen.getByText(/add new expense\/income/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/amount:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/category:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date:/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /add data/i })).toBeInTheDocument();
  });

  test("updates input fields on change", () => {
    render(
      <BrowserRouter>
        <Form />
      </BrowserRouter>
    );

    const descriptionInput = screen.getByLabelText(/description:/i);
    const amountInput = screen.getByLabelText(/amount:/i);
    const categorySelect = screen.getByLabelText(/category:/i);
    const dateInput = screen.getByLabelText(/date:/i);

    fireEvent.change(descriptionInput, { target: { value: "Test Expense" } });
    fireEvent.change(amountInput, { target: { value: "100" } });
    fireEvent.change(categorySelect, { target: { value: "expense" } });
    fireEvent.change(dateInput, { target: { value: "2024-03-25" } });

    expect(descriptionInput.value).toBe("Test Expense");
    expect(amountInput.value).toBe("100");
    expect(categorySelect.value).toBe("expense");
    expect(dateInput.value).toBe("2024-03-25");
  });

  test("submits form data and resets fields", async () => {
    axios.post.mockResolvedValue({ data: { message: "Expense added successfully!" } });

    render(
      <BrowserRouter>
        <Form />
      </BrowserRouter>
    );

    const descriptionInput = screen.getByLabelText(/description:/i);
    const amountInput = screen.getByLabelText(/amount:/i);
    const categorySelect = screen.getByLabelText(/category:/i);
    const dateInput = screen.getByLabelText(/date:/i);
    const submitButton = screen.getByRole("button", { name: /add data/i });

    fireEvent.change(descriptionInput, { target: { value: "Test Expense" } });
    fireEvent.change(amountInput, { target: { value: "100" } });
    fireEvent.change(categorySelect, { target: { value: "expense" } });
    fireEvent.change(dateInput, { target: { value: "2024-03-25" } });

    fireEvent.click(submitButton);

    expect(axios.post).toHaveBeenCalledWith("http://localhost:5555/history", {
      description: "Test Expense",
      amount: 100,
      type: "expense",
      date: "2024-03-25",
    });

    expect(descriptionInput.value).toBe("");
    expect(amountInput.value).toBe("");
    expect(categorySelect.value).toBe("");
    expect(dateInput.value).toBe("");
  });
});
