import { motion } from "framer-motion";
import { useState } from "react";
import {
  Zap,
  Workflow,
  Clock,
  Database,
  Mail,
  FileText,
  CheckCircle2,
  Play,
  RotateCcw,
  ArrowRight,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SEO } from "@/components/SEO";
import { CONTACT_EMAIL } from "@/lib/site";
import {
  getWorkflowConnectionPosition,
  getWorkflowRunState,
} from "@/lib/automation";

interface WorkflowNode {
  id: string;
  type: "trigger" | "process" | "integration" | "action";
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  status: "idle" | "active" | "complete" | "error";
}

interface WorkflowConnection {
  from: string;
  to: string;
}

const demoWorkflow: WorkflowNode[] = [
  {
    id: "1",
    type: "trigger",
    label: "New Email Received",
    description: "Gmail webhook triggers on new invoice email",
    icon: Mail,
    status: "idle",
  },
  {
    id: "2",
    type: "process",
    label: "Extract PDF Data",
    description: "Parse invoice details using AI/OCR",
    icon: FileText,
    status: "idle",
  },
  {
    id: "3",
    type: "integration",
    label: "Validate PO",
    description: "Check against QuickBooks purchase orders",
    icon: Database,
    status: "idle",
  },
  {
    id: "4",
    type: "action",
    label: "Create Invoice",
    description: "Auto-generate invoice in accounting system",
    icon: CheckCircle2,
    status: "idle",
  },
];

const connections: WorkflowConnection[] = [
  { from: "1", to: "2" },
  { from: "2", to: "3" },
  { from: "3", to: "4" },
];

export default function AutomationPage() {
  const [workflow, setWorkflow] = useState<WorkflowNode[]>(demoWorkflow);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(-1);
  const runState = getWorkflowRunState(
    isPlaying,
    workflow.map((node) => node.status),
  );

  const runWorkflow = async () => {
    setIsPlaying(true);
    setCurrentStep(0);
    setWorkflow((prev) =>
      prev.map((node) => ({ ...node, status: "idle" as const })),
    );

    // Simulate workflow execution
    for (let i = 0; i < workflow.length; i++) {
      setWorkflow((prev) =>
        prev.map((node, idx) =>
          idx === i
            ? { ...node, status: "active" as const }
            : {
                ...node,
                status: idx < i ? ("complete" as const) : ("idle" as const),
              },
        )
      );

      await new Promise((resolve) => setTimeout(resolve, 1500));

      setWorkflow((prev) =>
        prev.map((node, idx) =>
          idx === i ? { ...node, status: "complete" as const } : node
        )
      );

      if (i < workflow.length - 1) {
        setCurrentStep(i + 1);
      }
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsPlaying(false);
    setCurrentStep(workflow.length);
  };

  const resetWorkflow = () => {
    setIsPlaying(false);
    setCurrentStep(-1);
    setWorkflow((prev) =>
      prev.map((node) => ({ ...node, status: "idle" as const }))
    );
  };

  return (
    <>
      <SEO
        title="Automation & n8n Workflows"
        description="Explore an interactive n8n workflow and the validation, traceability, and integration patterns I use to build dependable business automation."
      />

      <div className="max-w-6xl mx-auto px-6 space-y-16">
        {/* Header */}
        <section className="text-center py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 mb-6"
          >
            <Zap className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Automation Hub</span>
          </motion.div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-['Playfair_Display'] font-semibold mb-6">
            Intelligent Workflows
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore an illustrative n8n workflow and the design decisions that
            make business automations easier to validate and operate.
          </p>
        </section>

        {/* Interactive Workflow Demo */}
        <section>
          <Card className="surface-paper p-6 sm:p-8 lg:p-12">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between mb-8">
              <div>
                <h2 className="text-2xl font-semibold mb-2">
                  Illustrative Workflow Demo
                </h2>
                <p className="text-muted-foreground">
                  Invoice processing pattern — run the interaction locally
                </p>
              </div>
              <div className="flex flex-wrap gap-2 sm:shrink-0">
                <Button
                  onClick={runWorkflow}
                  disabled={isPlaying}
                  className="rounded-full"
                >
                  <Play className="mr-2 h-4 w-4" />
                  {isPlaying ? "Running..." : "Run Demo"}
                </Button>
                <Button
                  onClick={resetWorkflow}
                  variant="outline"
                  className="rounded-full"
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Reset
                </Button>
              </div>
            </div>

            {/* Workflow Visualization */}
            <div className="relative">
              {/* Connection lines */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none hidden md:block"
                style={{ zIndex: 0 }}
              >
                <defs>
                  <linearGradient id="line-active" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="hsl(var(--primary))" />
                    <stop offset="100%" stopColor="hsl(var(--sage))" />
                  </linearGradient>
                </defs>
                {connections.map((conn, idx) => {
                  const isActive = currentStep > idx;
                  const fromNode = workflow.find((n) => n.id === conn.from);
                  const toNode = workflow.find((n) => n.id === conn.to);
                  if (!fromNode || !toNode) return null;
                  const position = getWorkflowConnectionPosition(
                    idx,
                    workflow.length,
                  );

                  return (
                    <g key={`${conn.from}-${conn.to}`}>
                      <motion.line
                        x1={position.x1}
                        y1="50%"
                        x2={position.x2}
                        y2="50%"
                        stroke={
                          isActive
                            ? "url(#line-active)"
                            : "hsl(var(--border) / 0.5)"
                        }
                        strokeWidth="2"
                        strokeDasharray="5,5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: isActive ? 1 : 0 }}
                        transition={{ duration: 0.5 }}
                      />
                    </g>
                  );
                })}
              </svg>

              {/* Nodes */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
                {workflow.map((node, index) => (
                  <motion.div
                    key={node.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative"
                    style={{ zIndex: 1 }}
                  >
                    <Card
                      className={`p-6 text-center transition-all duration-300 ${
                        node.status === "active"
                          ? "border-primary bg-primary/5 shadow-soft"
                          : node.status === "complete"
                          ? "border-sage bg-sage/5"
                          : "border-border/50"
                      }`}
                    >
                      <div
                        className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4 mx-auto ${
                          node.status === "active"
                            ? "bg-primary text-primary-foreground animate-pulse"
                            : node.status === "complete"
                            ? "bg-sage text-sage-foreground"
                            : "bg-muted/50"
                        }`}
                      >
                        <node.icon className="h-7 w-7" />
                      </div>
                      <h3 className="font-semibold text-sm mb-2">
                        {node.label}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {node.description}
                      </p>
                      {node.status === "active" && (
                        <motion.div
                          className="absolute -top-1 -right-1"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          <div className="w-3 h-3 rounded-full bg-primary" />
                        </motion.div>
                      )}
                      {node.status === "complete" && (
                        <div className="absolute -top-1 -right-1">
                          <CheckCircle2 className="h-4 w-4 text-sage" />
                        </div>
                      )}
                    </Card>
                    {index < workflow.length - 1 && (
                      <ArrowRight className="hidden md:block absolute top-1/2 -right-4 h-6 w-6 text-muted-foreground/30" />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Status indicator */}
            <div
              role="status"
              aria-live="polite"
              className="mt-8 flex items-center justify-center gap-4 text-center text-sm"
            >
              {runState === "running" ? (
                <>
                  <motion.div
                    className="w-2 h-2 rounded-full bg-primary"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                  <span className="text-muted-foreground">
                    Workflow executing...
                  </span>
                </>
              ) : runState === "ready" ? (
                <>
                  <div className="w-2 h-2 rounded-full bg-muted-foreground/50" />
                  <span className="text-muted-foreground">
                    Ready to run - Click the Run Demo button
                  </span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-4 w-4 text-sage" />
                  <span className="text-sage">Workflow completed successfully</span>
                </>
              )}
            </div>
          </Card>
        </section>

        {/* Workflow Stats */}
        <section>
          <div className="grid gap-6 sm:grid-cols-3">
            <Card className="surface-paper p-6 text-center">
              <Clock className="h-8 w-8 mx-auto mb-4 text-primary/70" />
              <div className="text-3xl font-bold font-['Playfair_Display'] mb-2">
                Validation
              </div>
              <div className="text-sm text-muted-foreground">
                Checks before each handoff
              </div>
            </Card>
            <Card className="surface-paper p-6 text-center">
              <CheckCircle2 className="h-8 w-8 mx-auto mb-4 text-sage" />
              <div className="text-3xl font-bold font-['Playfair_Display'] mb-2">
                Traceable
              </div>
              <div className="text-sm text-muted-foreground">
                Explicit processing states
              </div>
            </Card>
            <Card className="surface-paper p-6 text-center">
              <Workflow className="h-8 w-8 mx-auto mb-4 text-terracotta" />
              <div className="text-3xl font-bold font-['Playfair_Display'] mb-2">
                4 stages
              </div>
              <div className="text-sm text-muted-foreground">
                Demonstrated workflow
              </div>
            </Card>
          </div>
        </section>

        {/* Representative workflow patterns */}
        <section>
          <h2 className="text-3xl font-['Playfair_Display'] font-semibold mb-8">
            Representative Workflow Patterns
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                title: "AI Content Scheduler",
                description:
                  "Drafts channel-ready content, routes it through human review, and schedules approved posts with a traceable publishing record.",
                tools: ["n8n", "OpenAI", "Social APIs", "Notion"],
                focus: "Reviewable drafts",
                complexity: "Advanced",
              },
              {
                title: "Customer Onboarding Pipeline",
                description:
                  "Coordinates new-user registration, account provisioning, welcome messages, and follow-up tasks while recording failed handoffs.",
                tools: ["n8n", "Stripe", "SendGrid", "CRM", "Slack"],
                focus: "Reliable handoffs",
                complexity: "Complex",
              },
              {
                title: "E-commerce Inventory Sync",
                description:
                  "Synchronizes inventory across commerce and warehouse systems with validation, conflict handling, and low-stock alerts.",
                tools: ["n8n", "Shopify", "WooCommerce", "PostgreSQL"],
                focus: "Validated inventory",
                complexity: "Medium",
              },
              {
                title: "Meeting Intelligence Bot",
                description:
                  "Transcribes meetings, prepares action items for review, creates approved tasks, and distributes a consistent summary.",
                tools: ["n8n", "Zoom API", "OpenAI Whisper", "Asana", "Slack"],
                focus: "Human-reviewed actions",
                complexity: "Advanced",
              },
            ].map((workflow, index) => (
              <motion.div
                key={workflow.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="surface-paper p-6 hover-organic transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">
                        {workflow.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                        {workflow.description}
                      </p>
                    </div>
                    <Badge
                      variant={
                        workflow.complexity === "Complex"
                          ? "default"
                          : workflow.complexity === "Advanced"
                          ? "secondary"
                          : "outline"
                      }
                      className="shrink-0"
                    >
                      {workflow.complexity}
                    </Badge>
                  </div>
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div className="flex flex-wrap gap-2">
                      {workflow.tools.map((tool) => (
                        <span
                          key={tool}
                          className="px-2 py-1 text-xs rounded-md border border-border/50 bg-muted/30"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                    <span className="text-sm font-medium text-primary">
                      {workflow.focus}
                    </span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-12">
          <Card className="surface-paper p-12">
            <h2 className="text-3xl font-['Playfair_Display'] font-semibold mb-4">
              Have an automation challenge?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              I'd love to help you identify automation opportunities and build
              workflows that save your team time and reduce errors.
            </p>
            <Button size="lg" asChild className="rounded-full px-8">
              <a href={`mailto:${CONTACT_EMAIL}`}>
                <Mail className="mr-2 h-5 w-5" />
                Let's Talk Automation
              </a>
            </Button>
          </Card>
        </section>
      </div>
    </>
  );
}
