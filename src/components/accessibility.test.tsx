import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router-dom";
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

function LocationProbe() {
  return <output aria-label="Current route">{useLocation().pathname}</output>;
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

  it("exposes Certifications in primary navigation and through its shortcut", async () => {
    renderWithProviders(
      <>
        <UniqueNavigation />
        <LocationProbe />
      </>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));

    const certificationLinks = await screen.findAllByRole("link", {
      name: "Certifications",
    });
    expect(certificationLinks).toHaveLength(2);
    expect(
      certificationLinks.every(
        (link) => link.getAttribute("href") === "/certifications",
      ),
    ).toBe(true);

    fireEvent.keyDown(window, { key: "r" });
    await waitFor(() =>
      expect(screen.getByRole("status", { name: "Current route" })).toHaveTextContent(
        "/certifications",
      ),
    );
  });

  it("keeps shortcut help synchronized with implemented keys", async () => {
    renderWithProviders(<UniqueNavigation />);

    fireEvent.click(screen.getByRole("button", { name: "Keyboard shortcuts" }));
    const dialog = await screen.findByRole("dialog");

    expect(within(dialog).getByText("Certifications")).toBeInTheDocument();
    expect(within(dialog).getByText("r")).toBeInTheDocument();
    expect(within(dialog).getByText("Toggle Theme")).toBeInTheDocument();
    expect(within(dialog).getByText("b")).toBeInTheDocument();
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
