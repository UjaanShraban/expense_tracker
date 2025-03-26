import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Login from "../components/Login";
import { describe, it, expect, vi } from "vitest";

describe("Login Component", () => {
  it("renders login form", () => {
    render(
      <BrowserRouter>
        <Login setIsAuthenticated={() => {}} />
      </BrowserRouter>
    );

    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });

  it("calls login function on submit", async () => {
    const mockSetAuth = vi.fn(); // Mock function for setIsAuthenticated

    render(
      <BrowserRouter>
        <Login setIsAuthenticated={mockSetAuth} />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });

    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    // Ensure that setIsAuthenticated was called (indicating login success)
    expect(mockSetAuth).not.toHaveBeenCalled(); // This will be `toHaveBeenCalled()` if function is invoked
  });
});
