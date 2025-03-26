import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import Login from "../components/Login";

// Mock axios
jest.mock("axios");

describe("Login Component", () => {
  test("renders login form correctly", () => {
    render(
      <BrowserRouter>
        <Login setIsAuthenticated={() => {}} />
      </BrowserRouter>
    );

    expect(screen.getByText(/login/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
    expect(screen.getByText(/signup here!/i)).toBeInTheDocument();
  });

  test("updates input fields on change", () => {
    render(
      <BrowserRouter>
        <Login setIsAuthenticated={() => {}} />
      </BrowserRouter>
    );

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(emailInput.value).toBe("test@example.com");
    expect(passwordInput.value).toBe("password123");
  });

  test("calls API and logs in successfully", async () => {
    axios.post.mockResolvedValue({ data: { success: true } });

    const setIsAuthenticated = jest.fn();
    render(
      <BrowserRouter>
        <Login setIsAuthenticated={setIsAuthenticated} />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(await screen.findByText(/login successful!/i)).toBeInTheDocument();
    expect(setIsAuthenticated).toHaveBeenCalledWith(true);
  });

  test("shows error message on failed login", async () => {
    axios.post.mockResolvedValue({ data: { success: false } });

    render(
      <BrowserRouter>
        <Login setIsAuthenticated={() => {}} />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "wrong@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "wrongpass" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(await screen.findByText(/invalid email or password/i)).toBeInTheDocument();
  });

  test("shows alert on API error", async () => {
    axios.post.mockRejectedValue(new Error("Network error"));

    render(
      <BrowserRouter>
        <Login setIsAuthenticated={() => {}} />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(await screen.findByText(/error logging in/i)).toBeInTheDocument();
  });
});
