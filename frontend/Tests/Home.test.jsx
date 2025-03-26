import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Home from "../components/Home";

describe("Home Component", () => {
  test("renders the home page with title and description", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    expect(screen.getByText(/expense tracker/i)).toBeInTheDocument();
    expect(
      screen.getByText(/take control of your finances/i)
    ).toBeInTheDocument();
  });

  test("renders the Get Started button with correct link", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    const linkElement = screen.getByText(/get started/i);
    expect(linkElement).toBeInTheDocument();
    expect(linkElement.closest("a")).toHaveAttribute("href", "/form");
  });

  test("renders welcome message", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    expect(
      screen.getByText(/welcome to expense tracker/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/manage your expenses efficiently/i)
    ).toBeInTheDocument();
  });
});
