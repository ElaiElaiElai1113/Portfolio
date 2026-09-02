import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ResumeActions } from "@/components/ResumeActions";

describe("ResumeActions", () => {
  it("offers explicit preview and direct-download links", () => {
    render(<ResumeActions />);

    const preview = screen.getByRole("link", {
      name: "View resume PDF in a new tab",
    });
    const download = screen.getByRole("link", {
      name: "Download resume PDF",
    });

    expect(preview).toHaveAttribute(
      "href",
      "/elijah-de-los-santos-resume.pdf",
    );
    expect(preview).toHaveAttribute("target", "_blank");
    expect(preview).toHaveAttribute("rel", "noreferrer");
    expect(download).toHaveAttribute(
      "href",
      "/elijah-de-los-santos-resume.pdf",
    );
    expect(download).toHaveAttribute(
      "download",
      "Elijah-De-Los-Santos-Resume.pdf",
    );
  });

  it("tracks preview and download separately when analytics is available", () => {
    const gtag = vi.fn();
    Object.defineProperty(window, "gtag", {
      configurable: true,
      value: gtag,
    });

    render(<ResumeActions />);
    const preview = screen.getByRole("link", {
      name: "View resume PDF in a new tab",
    });
    const download = screen.getByRole("link", {
      name: "Download resume PDF",
    });
    preview.addEventListener("click", (event) => event.preventDefault());
    download.addEventListener("click", (event) => event.preventDefault());

    fireEvent.click(preview);
    fireEvent.click(download);

    expect(gtag).toHaveBeenNthCalledWith(1, "event", "resume_view", {
      event_category: "engagement",
      event_label: "resume",
    });
    expect(gtag).toHaveBeenNthCalledWith(2, "event", "resume_download", {
      event_category: "engagement",
      event_label: "resume",
    });

    Reflect.deleteProperty(window, "gtag");
  });
});
