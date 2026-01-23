import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Moon, Sun, Menu, X, Keyboard, Github, Linkedin, Twitter } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { KeyboardShortcutsModal } from "@/components/KeyboardShortcutsModal";

export function PublicLayout({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navigation = [
    { name: "Home", href: "/", key: "h" },
    { name: "Projects", href: "/projects", key: "p" },
    { name: "Experience", href: "/experience", key: "e" },
    { name: "Certifications", href: "/certifications", key: "c" },
    { name: "Contact", href: "/contact", key: "c" },
  ];

  // Handle scroll for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard shortcuts
  useKeyboardShortcuts([
    {
      key: "h",
      action: () => navigate("/"),
      description: "Go to home",
    },
    {
      key: "p",
      action: () => navigate("/projects"),
      description: "Go to projects",
    },
    {
      key: "e",
      action: () => navigate("/experience"),
      description: "Go to experience",
    },
    {
      key: "c",
      action: () => navigate("/contact"),
      description: "Go to contact",
    },
    {
      key: "t",
      action: () => setTheme(theme === "dark" ? "light" : "dark"),
      description: "Toggle theme",
    },
    {
      key: "?",
      action: () => setShowShortcuts(true),
      description: "Show shortcuts",
    },
  ]);

  return (
    <div className="min-h-screen bg-background">
      {/* Gradient Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[128px]" />
      </div>

      {/* Navigation */}
      <nav
        className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
          scrolled
            ? "bg-background/80 backdrop-blur-lg shadow-sm"
            : "bg-background/60 backdrop-blur-md"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 group">
              <motion.span
                className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent"
                whileHover={{ scale: 1.05 }}
              >
                Portfolio
              </motion.span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="relative group"
                >
                  <motion.div
                    className="px-3 py-2 text-sm font-medium transition-colors hover:text-primary flex items-center gap-1"
                    whileHover={{ y: -1 }}
                  >
                    <span
                      className={
                        location.pathname === item.href
                          ? "text-primary"
                          : "text-muted-foreground"
                      }
                    >
                      {item.name}
                    </span>
                    <Badge
                      variant="outline"
                      className="h-4 px-1 text-[10px] opacity-50 group-hover:opacity-100 transition-opacity"
                    >
                      {item.key}
                    </Badge>
                  </motion.div>
                  {location.pathname === item.href && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              ))}

              <div className="flex items-center gap-1 ml-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowShortcuts(true)}
                  className="relative"
                >
                  <Keyboard className="h-4 w-4" />
                  <span className="sr-only">Keyboard shortcuts</span>
                  <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 text-[10px] flex items-center justify-center">
                    ?
                  </Badge>
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                >
                  <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <AnimatePresence mode="wait">
                  {mobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="h-6 w-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="h-6 w-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
                <span className="sr-only">Toggle menu</span>
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="md:hidden overflow-hidden"
              >
                <div className="pb-4 space-y-1">
                  {navigation.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        to={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block px-3 py-2 text-base font-medium transition-colors hover:text-primary ${
                          location.pathname === item.href
                            ? "text-primary"
                            : "text-muted-foreground"
                        }`}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => {
                      setShowShortcuts(true);
                      setMobileMenuOpen(false);
                    }}
                  >
                    <Keyboard className="mr-2 h-4 w-4" />
                    Keyboard Shortcuts
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">{children}</main>

      {/* Footer */}
      <footer className="border-t bg-background/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-12">
          <div className="grid gap-8 md:grid-cols-3">
            {/* Brand */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold">Portfolio</h3>
              <p className="text-sm text-muted-foreground">
                Building modern web applications with React, TypeScript, and
                Node.js.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold">Quick Links</h4>
              <div className="flex flex-wrap gap-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Social */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold">Connect</h4>
              <div className="flex gap-4">
                {[
                  { icon: Github, href: "https://github.com", label: "GitHub" },
                  {
                    icon: Linkedin,
                    href: "https://linkedin.com",
                    label: "LinkedIn",
                  },
                  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
                ].map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                  >
                    <social.icon className="h-4 w-4" />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Portfolio. Built with{" "}
              <span className="text-red-500">♥</span> using React & TypeScript.
            </p>
            <p className="text-sm text-muted-foreground">
              Press <kbd className="px-1.5 py-0.5 text-xs bg-muted rounded">?</kbd> for
              keyboard shortcuts
            </p>
          </div>
        </div>
      </footer>

      {/* Keyboard Shortcuts Modal */}
      <KeyboardShortcutsModal
        open={showShortcuts}
        onOpenChange={setShowShortcuts}
      />
    </div>
  );
}
