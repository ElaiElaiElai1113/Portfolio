import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import CertificationsPage from "@/pages/CertificationsPage";
import UniqueAboutPage from "@/pages/UniqueAboutPage";

function renderWithProviders(ui: React.ReactNode) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>{ui}</MemoryRouter>
    </QueryClientProvider>,
  );
}

describe("hiring-focused portfolio content", () => {
  it("uses one honest certification disclosure instead of repeated placeholders", async () => {
    renderWithProviders(<CertificationsPage />);

    expect(
      await screen.findByText(
        "Public credential links are not displayed here yet. Supporting documentation can be discussed during the hiring process.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.queryByText("Credential details available on request."),
    ).not.toBeInTheDocument();
  });

  it("prioritizes technologies demonstrated by shipped portfolio work", () => {
    renderWithProviders(<UniqueAboutPage />);

    for (const technology of [
      "Next.js",
      "Supabase",
      "PostgreSQL",
      "Shopify",
      "Flutter",
      "Playwright",
    ]) {
      expect(screen.getAllByText(technology).length).toBeGreaterThan(0);
    }
    expect(
      screen.queryByText(/React, Node\.js, and whatever tools fit the job/),
    ).not.toBeInTheDocument();
  });
});
