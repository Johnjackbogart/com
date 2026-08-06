import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Navbar } from "@/components/navbar";

const setTheme = vi.fn();

vi.mock("next-themes", () => ({
  useTheme: () => ({
    setTheme,
    resolvedTheme: "light",
    theme: "system",
  }),
}));

describe("Navbar", () => {
  it("renders desktop nav links", () => {
    render(<Navbar />);
    expect(screen.getByRole("link", { name: "Blog" })).toHaveAttribute(
      "href",
      "/blog",
    );
    expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute(
      "href",
      "/#contact",
    );
  });

  it("opens and closes the mobile menu", async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    const menuToggle = screen
      .getAllByRole("button")
      .find((btn) => btn.getAttribute("aria-controls") === "mobile-menu")!;

    expect(menuToggle).toHaveAttribute("aria-expanded", "false");

    await user.click(menuToggle);
    expect(menuToggle).toHaveAttribute("aria-expanded", "true");
    expect(document.getElementById("mobile-menu")).toBeInTheDocument();

    await user.click(menuToggle);
    expect(menuToggle).toHaveAttribute("aria-expanded", "false");
    expect(document.getElementById("mobile-menu")).not.toBeInTheDocument();
  });

  it("cycles the theme when the theme toggle is clicked", async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    const themeToggle = screen.getByRole("button", { name: "Toggle theme" });
    await user.click(themeToggle);

    expect(setTheme).toHaveBeenCalledWith("light");
  });
});
