import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Zap,
  GitBranch,
  Workflow,
  CheckCircle2,
  Database,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface AutomationMetric {
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface WorkflowStep {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const automationCapabilities: AutomationMetric[] = [
  {
    label: "Event-driven",
    description: "Webhook, schedule, and system-event triggers",
    icon: Zap,
  },
  {
    label: "Validated",
    description: "Checks and conditional paths before each handoff",
    icon: CheckCircle2,
  },
  {
    label: "Observable",
    description: "Explicit processing states and actionable failures",
    icon: Workflow,
  },
  {
    label: "Integrated",
    description: "APIs, databases, email, and business tools connected",
    icon: Database,
  },
];

const workflowSteps: WorkflowStep[] = [
  {
    id: "1",
    label: "Trigger",
    icon: Zap,
    description: "Webhook, schedule, or event-based initiation",
  },
  {
    id: "2",
    label: "Process",
    icon: GitBranch,
    description: "Conditional logic & data transformation",
  },
  {
    id: "3",
    label: "Integrate",
    icon: Database,
    description: "Connect with APIs & databases",
  },
  {
    id: "4",
    label: "Execute",
    icon: CheckCircle2,
    description: "Complete task & notify stakeholders",
  },
];

const exampleWorkflows = [
  {
    title: "Invoice Processing System",
    description:
      "Automatically extract data from PDF invoices, validate against purchase orders, and update accounting systems",
    focus: "Document intake and validation",
    complexity: "Medium",
    tools: ["n8n", "Google Sheets", "QuickBooks", "Gmail"],
  },
  {
    title: "Social Media Scheduler",
    description:
      "AI-powered content scheduling across platforms with optimal timing based on audience analytics",
    focus: "Reviewable content handoffs",
    complexity: "Advanced",
    tools: ["n8n", "Twitter API", "LinkedIn", "OpenAI"],
  },
  {
    title: "Customer Onboarding Flow",
    description:
      "Automated welcome sequences, account setup, and personalized resource delivery for new users",
    focus: "Consistent account setup",
    complexity: "Complex",
    tools: ["n8n", "Notion", "SendGrid", "CRM"],
  },
];

export function AutomationShowcase() {
  return (
    <section className="py-24 relative">
      {/* Unique background pattern */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <svg
          className="absolute top-0 left-0 w-full h-full opacity-[0.02]"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <pattern
            id="automation-grid"
            width="10"
            height="10"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r="0.5" fill="currentColor" />
          </pattern>
          <rect width="100" height="100" fill="url(#automation-grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-sage/30 bg-sage/5 mb-6">
            <Zap className="h-4 w-4 text-sage" />
            <span className="text-sm font-medium text-sage">Automation Hub</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-['Playfair_Display'] font-semibold mb-6">
            Building systems that{" "}
            <span className="text-primary">run reliably in the background</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            I design and implement intelligent automation workflows using n8n
            to reduce repetitive work and make operations more consistent.
          </p>
        </motion.div>

        {/* Capability dashboard */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-20">
          {automationCapabilities.map((capability, index) => (
            <motion.div
              key={capability.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="surface-paper p-6 h-full hover-organic transition-all">
                <capability.icon className="h-8 w-8 mb-5 text-primary/70" />
                <div className="text-lg font-semibold text-foreground mb-2">
                  {capability.label}
                </div>
                <div className="text-sm leading-relaxed text-muted-foreground">
                  {capability.description}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
        {/* Interactive workflow visualization */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="surface-paper p-8 lg:p-12">
            <div className="text-center mb-12">
              <h3 className="text-2xl font-semibold mb-3">
                How My Workflows Work
              </h3>
              <p className="text-muted-foreground">
                A peek under the hood of my automation architecture
              </p>
            </div>

            <div className="relative">
              {/* Connection lines */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none hidden md:block"
                viewBox="0 0 800 100"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient
                    id="line-gradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="hsl(var(--primary) / 0.3)" />
                    <stop offset="100%" stopColor="hsl(var(--sage) / 0.3)" />
                  </linearGradient>
                </defs>
                <path
                  d="M 100 50 L 250 50"
                  stroke="url(#line-gradient)"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="5,5"
                />
                <path
                  d="M 300 50 L 450 50"
                  stroke="url(#line-gradient)"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="5,5"
                />
                <path
                  d="M 500 50 L 650 50"
                  stroke="url(#line-gradient)"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="5,5"
                />
              </svg>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {workflowSteps.map((step, index) => (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="relative text-center"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4 mx-auto">
                      <step.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h4 className="font-medium mb-2">{step.label}</h4>
                    <p className="text-sm text-muted-foreground">
                      {step.description}
                    </p>
                    {index < workflowSteps.length - 1 && (
                      <ArrowRight className="hidden md:block absolute top-8 -right-3 h-5 w-5 text-primary/30" />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Animated data flow indicator */}
            <div className="mt-12 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <motion.div
                className="flex gap-1"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full bg-primary/70"
                  />
                ))}
              </motion.div>
              <span className="ml-2">Real-time data processing</span>
            </div>
          </div>
        </motion.div>

        {/* Example workflows showcase */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-semibold">
              Representative Workflow Patterns
            </h3>
            <Button variant="outline" asChild className="group">
              <Link to="/automation">
                View All Workflows
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {exampleWorkflows.map((workflow, index) => (
              <motion.div
                key={workflow.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="surface-paper p-6 h-full hover-organic transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg mb-2">
                        {workflow.title}
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {workflow.description}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Workflow Focus</span>
                      <span className="font-medium text-primary">
                        {workflow.focus}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Complexity</span>
                      <span className="font-medium">{workflow.complexity}</span>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-4 border-t border-border/50">
                      {workflow.tools.map((tool) => (
                        <span
                          key={tool}
                          className="px-2 py-1 text-xs rounded-md border border-border/50 bg-muted/30"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Before/After comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="surface-paper p-8 lg:p-12"
        >
          <h3 className="text-2xl font-semibold mb-8 text-center">
            The Transformation
          </h3>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
                  <XIcon className="h-5 w-5 text-destructive" />
                </div>
                <h4 className="font-medium text-lg">Before: Manual Process</h4>
              </div>
              <ul className="space-y-3">
                {[
                  "Copy-pasting data between disconnected applications",
                  "Human approval without a visible queue or audit trail",
                  "Manual entry that is difficult to validate consistently",
                  "Handoffs with unclear ownership or processing state",
                  "Repetitive work competing with higher-value tasks",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <span className="text-destructive mt-0.5">×</span>
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-sage/10 flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-sage" />
                </div>
                <h4 className="font-medium text-lg">After: Automated Flow</h4>
              </div>
              <ul className="space-y-3">
                {[
                  "Connected systems through explicit integration steps",
                  "Validation before data moves to the next stage",
                  "Traceable processing states and actionable failures",
                  "Retries and human review where exceptions matter",
                  "Teams retain control while repetitive work is automated",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <span className="text-sage mt-0.5">✓</span>
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-16"
        >
          <h3 className="text-3xl font-['Playfair_Display'] font-semibold mb-4">
            Ready to automate your workflows?
          </h3>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Let's discuss how I can reduce repetitive work and make your
            operational handoffs easier to validate.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild className="rounded-full px-8">
              <Link to="/contact">
                <Mail className="mr-2 h-5 w-5" />
                Start the Conversation
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="rounded-full px-8">
              <Link to="/automation">
                <Workflow className="mr-2 h-5 w-5" />
                Explore Workflows
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Helper component for X icon
function XIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}
