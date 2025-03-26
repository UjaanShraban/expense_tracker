import { render, screen, fireEvent } from "@testing-library/react";
import Form from "../components/Form";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";

// Mock function for adding expenses
const mockAddExpense = vi.fn();

describe("Form Component", () => {
    it("renders form correctly", () => {
        render(
            <MemoryRouter>
                <Form addExpense={mockAddExpense} />
            </MemoryRouter>
        );

        expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/amount/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/type/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /add transaction/i })).toBeInTheDocument();
    });

    it("updates input fields on change", () => {
        render(
            <MemoryRouter>
                <Form addExpense={mockAddExpense} />
            </MemoryRouter>
        );

        const descriptionInput = screen.getByLabelText(/description/i);
        fireEvent.change(descriptionInput, { target: { value: "Test Expense" } });
        expect(descriptionInput.value).toBe("Test Expense");
    });

    it("submits form data", () => {
        render(
            <MemoryRouter>
                <Form addExpense={mockAddExpense} />
            </MemoryRouter>
        );

        const submitButton = screen.getByRole("button", { name: /add transaction/i });
        fireEvent.click(submitButton);

        expect(mockAddExpense).toHaveBeenCalled();
    });
});
