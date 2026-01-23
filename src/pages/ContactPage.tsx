import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollReveal } from "@/components/animations/PageTransition";
import { AnimatedContactForm } from "@/components/AnimatedContactForm";
import { SEO } from "@/components/SEO";
import { motion } from "framer-motion";
import {
  Mail,
  Linkedin,
  Github,
  Twitter,
  MapPin,
  Clock,
  Send,
} from "lucide-react";

export default function ContactPage() {
  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: "your.email@example.com",
      href: "mailto:your.email@example.com",
      color: "text-red-500",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "San Francisco, CA",
      href: null,
      color: "text-blue-500",
    },
    {
      icon: Clock,
      label: "Response Time",
      value: "Within 24-48 hours",
      href: null,
      color: "text-green-500",
    },
  ];

  const socialLinks = [
    {
      icon: Linkedin,
      name: "LinkedIn",
      href: "https://linkedin.com/in/yourprofile",
      color: "hover:bg-blue-500/10 hover:text-blue-500 hover:border-blue-500/50",
    },
    {
      icon: Github,
      name: "GitHub",
      href: "https://github.com/yourusername",
      color: "hover:bg-gray-500/10 hover:text-gray-500 hover:border-gray-500/50",
    },
    {
      icon: Twitter,
      name: "Twitter",
      href: "https://twitter.com/yourusername",
      color: "hover:bg-sky-500/10 hover:text-sky-500 hover:border-sky-500/50",
    },
  ];

  return (
    <>
      <SEO
        title="Contact"
        description="Get in touch! Have a project in mind or just want to say hello? I'd love to hear from you."
      />

      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Send className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">Get In Touch</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Have a project in mind or just want to say hello? I'd love to hear
              from you!
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Contact Form - Takes 2 columns on large screens */}
          <ScrollReveal delay={0.1} className="lg:col-span-2">
            <AnimatedContactForm />
          </ScrollReveal>

          {/* Contact Info */}
          <div className="space-y-6">
            {/* Quick Contact Methods */}
            <ScrollReveal delay={0.2}>
              <Card>
                <CardHeader>
                  <CardTitle>Contact Info</CardTitle>
                  <CardDescription>
                    Various ways to reach me
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {contactMethods.map((method, index) => (
                    <motion.div
                      key={method.label}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.05 }}
                      className="flex items-start gap-3"
                    >
                      <div className={`p-2 rounded-lg bg-muted ${method.color}`}>
                        <method.icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{method.label}</p>
                        {method.href ? (
                          <a
                            href={method.href}
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors break-all"
                          >
                            {method.value}
                          </a>
                        ) : (
                          <p className="text-sm text-muted-foreground">{method.value}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </ScrollReveal>

            {/* Social Links */}
            <ScrollReveal delay={0.3}>
              <Card>
                <CardHeader>
                  <CardTitle>Social Links</CardTitle>
                  <CardDescription>
                    Connect with me on social media
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${social.color}`}
                    >
                      <social.icon className="h-5 w-5" />
                      <span className="font-medium">{social.name}</span>
                    </motion.a>
                  ))}
                </CardContent>
              </Card>
            </ScrollReveal>

            {/* Availability Card */}
            <ScrollReveal delay={0.4}>
              <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-background border-primary/20">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-full bg-primary/20">
                      <Clock className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium mb-1">Availability</p>
                      <p className="text-sm text-muted-foreground">
                        Currently open to freelance projects and full-time opportunities.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>
        </div>

        {/* CTA Section */}
        <ScrollReveal delay={0.5}>
          <Card className="relative overflow-hidden bg-gradient-to-r from-primary/10 via-purple-500/10 to-pink-500/10 border-border/50">
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
            <div className="relative z-10 text-center py-12 px-4">
              <h3 className="text-2xl font-bold mb-3">Let's Create Something Amazing</h3>
              <p className="text-muted-foreground max-w-xl mx-auto mb-6">
                Whether you have a project in mind, a question, or just want to connect,
                I'm always happy to chat.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" asChild className="group">
                  <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                    Connect on LinkedIn
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild className="group">
                  <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                    Check GitHub
                  </a>
                </Button>
              </div>
            </div>
          </Card>
        </ScrollReveal>
      </div>
    </>
  );
}
