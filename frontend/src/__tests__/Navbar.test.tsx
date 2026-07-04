import Navbar from "@/components/Navbar";
import { render, screen } from "@testing-library/react";
import { test } from "vitest";

test("renders the main brand logo with corect alt text", () => {
  const mocksetSeacrh = vi.fn();
  console.log("--- BEFORE INTERACTION ---", mocksetSeacrh);
  render(<Navbar search="" setSearch={mocksetSeacrh} />);
  const logoImg = screen.getByRole("img", { name: /logo/i });
console.log("--- MOCK CALL HISTORY ---", mocksetSeacrh.mock.calls);
  expect(logoImg).toBeInTheDocument();
  expect(logoImg).toHaveAttribute("src", expect.stringContaining("blushlogo"));
});
