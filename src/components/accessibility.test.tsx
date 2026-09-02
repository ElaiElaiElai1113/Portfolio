import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { AnimatedContactForm } from "@/components/AnimatedContactForm";
import { ThemeProvider } from "@/components/theme-provider";
import { UniqueNavigation } from "@/components/UniqueNavigation";
import { UniquePublicLayout } from "@/layouts/UniquePublicLayout";
import ContactPage from "@/pages/ContactPage";

vi.mock("@/components/animations/ScrollReveal", () => ({
  ScrollReveal: ({ children }: { children: React.ReactNode }) => children,
}));

function renderWithProviders(ui: React.ReactNode) {
  return render(
    <ThemeProvider defaultTheme="dark" storageKey="portfolio-a11y-test-theme">
      <MemoryRouter>{ui}</MemoryRouter>
    </ThemeProvider>,
  );
}

describe("public-page accessibility", () => {
  it("provides a main landmark and keyboard skip link", () => {
    renderWithProviders(
      <UniquePublicLayout>
        <h1>Test page</h1>
      </UniquePublicLayout>,
    );

    expect(screen.getByRole("main")).toHaveAttribute("id", "main-content");
    expect(
      screen.getByRole("link", { name: "Skip to main content" }),
    ).toHaveAttribute("href", "#main-content");
  });

  it("associates visible contact labels with their fields", () => {
    render(<AnimatedContactForm />);

    expect(screen.getByRole("textbox", { name: "Name" })).toHaveAttribute("name", "name");
    expect(screen.getByRole("textbox", { name: "Email" })).toHaveAttribute("name", "email");
    expect(screen.getByRole("textbox", { name: "Subject" })).toHaveAttribute("name", "subject");
    expect(screen.getByRole("textbox", { name: "Message" })).toHaveAttribute("name", "message");
  });

  it("connects contact validation messages to invalid fields", async () => {
    render(<AnimatedContactForm />);

    fireEvent.click(screen.getByRole("button", { name: "Open Email Draft" }));

    const nameField = screen.getByPlaceholderText("John Doe");
    const error = await screen.findByText("Name must be at least 2 characters");

    await waitFor(() => expect(nameField).toHaveAttribute("aria-invalid", "true"));
    expect(error).toHaveAttribute("id");
    expect(nameField.getAttribute("aria-describedby")).toContain(error.id);
  });

  it("gives the mobile menu controls and links concise accessible names", async () => {
    renderWithProviders(<UniqueNavigation />);

    const menuToggle = screen.getByRole("button", { name: "Open menu" });
    expect(menuToggle).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(menuToggle);

    const closeButtons = await screen.findAllByRole("button", { name: "Close menu" });
    expect(closeButtons).toHaveLength(2);
    expect(closeButtons[0]).toHaveAttribute("aria-expanded", "true");
    const homeLinks = screen.getAllByRole("link", { name: "Home" });
    expect(homeLinks).toHaveLength(2);
    expect(homeLinks.every((link) => link.getAttribute("href") === "/")).toBe(true);
  });

  it("uses level-two headings for contact-page sections", () => {
    renderWithProviders(<ContactPage />);

    for (const name of [
      "Send Me a Message",
      "Contact Info",
      "Social Links",
      "Let's Create Something Amazing",
    ]) {
      expect(screen.getByRole("heading", { level: 2, name })).toBeInTheDocument();
    }
  });
});
