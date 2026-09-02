export type WorkflowNodeStatus = "idle" | "active" | "complete" | "error";

export type WorkflowRunState = "ready" | "running" | "complete";

export function getWorkflowRunState(
  isPlaying: boolean,
  statuses: WorkflowNodeStatus[],
): WorkflowRunState {
  if (isPlaying) return "running";
  if (statuses.length > 0 && statuses.every((status) => status === "complete")) {
    return "complete";
  }
  return "ready";
}

function asPercentage(value: number) {
  return `${Number(value.toFixed(2))}%`;
}

export function getWorkflowConnectionPosition(index: number, nodeCount: number) {
  const columnWidth = 100 / nodeCount;
  const x1 = columnWidth * (index + 0.5);
  const x2 = columnWidth * (index + 1.5);

  return {
    x1: asPercentage(x1),
    x2: asPercentage(x2),
    labelX: asPercentage((x1 + x2) / 2),
  };
}
