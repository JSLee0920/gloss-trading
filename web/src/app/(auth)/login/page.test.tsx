import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import LoginPage from "./page";

test("login page renders labeled email and password fields", () => {
  render(<LoginPage />);

  expect(
    screen.getByRole("heading", { level: 1, name: /sign in/i })
  ).toBeInTheDocument();

  // Accessibility guardrail: inputs must be reachable by their labels.
  expect(screen.getByLabelText(/email/i)).toBeRequired();
  expect(screen.getByLabelText(/password/i)).toBeRequired();
  expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
});
