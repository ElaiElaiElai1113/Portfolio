import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProjectVisual } from "@/components/ProjectVisual";

describe("ProjectVisual", () => {
  it("renders a descriptive project image", () => {
    render(<ProjectVisual src="/assets/example.png" alt="EasyDrive dashboard" />);
    expect(screen.getByRole("img", { name: "EasyDrive dashboard" })).toHaveAttribute(
      "src",
      "/assets/example.png",
    );
  });

  it("renders an accessible fallback after an image error", () => {
    render(<ProjectVisual src="/assets/missing.png" alt="RewardMe homepage" />);
    fireEvent.error(screen.getByRole("img", { name: "RewardMe homepage" }));
    expect(
      screen.getByRole("img", { name: "RewardMe homepage preview unavailable" }),
    ).toBeInTheDocument();
  });
});
