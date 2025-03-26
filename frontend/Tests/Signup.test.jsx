import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Signup from "../components/Signup";
import { describe, it, expect, vi } from "vitest";

// Mock function for handling signup
const mockHandleSignup = vi.fn();

describe("Signup Component", () => {
  it("renders signup form", () => {
    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    );
    expect(screen.getByText(/signup/i)).toBeInTheDocument();
  });

  it("calls signup function on submit", () => {
    render(
      <BrowserRouter>
        <Signup handleSignup={mockHandleSignup} />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByText(/signup/i));

    // Check if the mock function was called
    expect(mockHandleSignup).toHaveBeenCalled();
  });
});
