import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import AuthLogin from "../components/auth/AuthLogin"; // adjust path

// ---- Mocks for external boundaries ----
vi.mock("@/hooks/useToast", () => ({
  useToast: () => ({ showToast: vi.fn() }),
}));

// Minimal fake reducer just so <Provider> has something to work with
const mockStore = configureStore({
  reducer: { auth: (state = {}, action) => state },
});

const renderAuthLogin = () =>
  render(
    <Provider store={mockStore}>
      <BrowserRouter>
        <AuthLogin />
      </BrowserRouter>
    </Provider>
  );

describe("AuthLogin - Rendering", () => {
  // 1. Heading, fields, and submit button are present
  test("renders the Log In heading, email/password fields, and submit button", () => {
    renderAuthLogin();

    expect(
      screen.getByRole("heading", { name: /log in/i })
    ).toBeInTheDocument();

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /log in/i })
    ).toBeInTheDocument();
  });

  // 2. Register link points to the correct route
  test('renders a "Register" link pointing to /auth/register', () => {
    renderAuthLogin();

    const registerLink = screen.getByRole("link", { name: /register/i });
    expect(registerLink).toBeInTheDocument();
    expect(registerLink).toHaveAttribute("href", "/auth/register");
  });
});