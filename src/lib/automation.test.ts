import { describe, expect, it } from "vitest";
import {
  getWorkflowConnectionPosition,
  getWorkflowRunState,
} from "@/lib/automation";

describe("automation presentation", () => {
  it("keeps a completed run visible until it is reset", () => {
    expect(getWorkflowRunState(true, ["active", "idle"])).toBe("running");
    expect(getWorkflowRunState(false, ["complete", "complete"])).toBe("complete");
    expect(getWorkflowRunState(false, ["idle", "idle"])).toBe("ready");
  });

  it("places each workflow connection between adjacent cards", () => {
    expect(getWorkflowConnectionPosition(0, 4)).toEqual({
      x1: "12.5%",
      x2: "37.5%",
      labelX: "25%",
    });
    expect(getWorkflowConnectionPosition(1, 4)).toEqual({
      x1: "37.5%",
      x2: "62.5%",
      labelX: "50%",
    });
    expect(getWorkflowConnectionPosition(2, 4)).toEqual({
      x1: "62.5%",
      x2: "87.5%",
      labelX: "75%",
    });
  });
});
