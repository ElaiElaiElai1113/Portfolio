import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, useLocation, useNavigate } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { ScrollToTop } from "@/components/ScrollToTop";

function RouteHarness() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <ScrollToTop />
      <span>{location.pathname}</span>
      <button type="button" onClick={() => navigate("/projects")}>Projects</button>
    </>
  );
}

describe("ScrollToTop", () => {
  it("resets both scroll axes after a pathname change", () => {
    document.documentElement.style.scrollBehavior = "smooth";
    const scrollTo = vi
      .spyOn(window, "scrollTo")
      .mockImplementation(() => undefined);

    render(
      <MemoryRouter initialEntries={["/about"]}>
        <RouteHarness />
      </MemoryRouter>,
    );
    scrollTo.mockClear();

    fireEvent.click(screen.getByRole("button", { name: "Projects" }));

    expect(screen.getByText("/projects")).toBeInTheDocument();
    expect(scrollTo).toHaveBeenCalledWith({
      top: 0,
      left: 0,
      behavior: "instant",
    });
    expect(document.documentElement.style.scrollBehavior).toBe("smooth");

    document.documentElement.style.scrollBehavior = "";
  });
});
