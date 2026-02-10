import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Github,
  Linkedin,
  Mail,
  Menu as MenuIcon,
  X,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { KeyboardShortcutsModal } from "@/components/KeyboardShortcutsModal";

interface NavItem {
  name: string;
  href: string;
  key: string;
  icon?: React.ComponentType<{ className?: string }>;
}

const navigation: NavItem[] = [
  { name: "Home", href: "/", key: "h" },
  { name: "About", href: "/about", key: "a" },
  { name: "Projects", href: "/projects", key: "p" },
  { name: "Automation", href: "/automation", key: "u" },
  { name: "Experience", href: "/experience", key: "e" },
  { name: "Contact", href: "/contact", key: "c" },
];

export function UniqueNavigation() {
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useKeyboardShortcuts([
    { key: "h", action: () => navigate("/"), description: "Go to home" },
    { key: "a", action: () => navigate("/about"), description: "Go to about" },
    { key: "p", action: () => navigate("/projects"), description: "Go to projects" },
    { key: "u", action: () => navigate("/automation"), description: "Go to automation" },
    { key: "e", action: () => navigate("/experience"), description: "Go to experience" },
    { key: "c", action: () => navigate("/contact"), description: "Go to contact" },
    { key: "b", action: () => setTheme(theme === "dark" ? "light" : "dark"), description: "Toggle theme" },
    { key: "?", action: () => setShowShortcuts(true), description: "Show shortcuts" },
  ]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/80 backdrop-blur-md border-b border-border/50"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo - distinctive typographic treatment */}
            <Link
              to="/"
              className="group relative"
              onClick={() => setMobileMenuOpen(false)}
            >
              <motion.div
                className="relative"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <div className="text-xl font-semibold tracking-tight">
                  <span className="font-['Playfair_Display']">E</span>lijah
                  <span className="text-muted-foreground mx-1">·</span>
                  <span className="font-['Playfair_Display']">D</span>e
                  <span className="text-muted-foreground">.</span>
                </div>
                <motion.div
                  className="absolute -bottom-1 left-0 h-0.5 bg-primary"
                  initial={false}
                  animate={{
                    width: location.pathname === "/" ? "100%" : "0%",
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </Link>

            {/* Desktop Navigation - distinctive side navigation */}
            <div className="hidden lg:flex items-center gap-8">
              <div className="flex items-center gap-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onMouseEnter={() => setHoveredItem(item.name)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className="group relative py-2"
                  >
                    <span
                      className={`text-sm font-medium transition-colors relative z-10 ${
                        location.pathname === item.href
                          ? "text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {item.name}
                    </span>
                    <motion.div
                      className="absolute bottom-0 left-0 h-[1px] bg-foreground"
                      initial={false}
                      animate={{
                        width:
                          location.pathname === item.href ||
                          hoveredItem === item.name
                            ? "100%"
                            : "0%",
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 pl-6 border-l border-border/50">
                <button
                  onClick={() => setShowShortcuts(true)}
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors relative group"
                  aria-label="Keyboard shortcuts"
                >
                  <span className="mono text-xs">?</span>
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-background border border-border rounded px-2 py-1">
                    Shortcuts
                  </span>
                </button>

                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Toggle theme"
                >
                  <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Toggle theme"
              >
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-foreground"
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait">
                  {mobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <X className="h-6 w-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <MenuIcon className="h-6 w-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - distinctive slide-in panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-background z-50 lg:hidden overflow-y-auto"
            >
              <div className="p-6 space-y-8">
                <div className="flex items-center justify-between">
                  <div className="text-lg font-semibold">Menu</div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <nav className="space-y-2">
                  {navigation.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        to={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block px-4 py-3 rounded-lg transition-colors ${
                          location.pathname === item.href
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{item.name}</span>
                          <span className="mono text-xs opacity-50">
                            {item.key}
                          </span>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                <div className="pt-6 border-t border-border/50 space-y-4">
                  <button
                    onClick={() => {
                      setShowShortcuts(true);
                      setMobileMenuOpen(false);
                    }}
                    className="w-full px-4 py-3 rounded-lg text-left text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors"
                  >
                    <span className="mono text-xs">?</span> Keyboard Shortcuts
                  </button>

                  <div className="flex gap-3">
                    <a
                      href="https://github.com/elijahndelosantos"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                    <a
                      href="https://linkedin.com/in/elijahndelosantos"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a
                      href="mailto:contact@elijahndelosantos.com"
                      className="p-3 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors"
                    >
                      <Mail className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Keyboard Shortcuts Modal */}
      <KeyboardShortcutsModal
        open={showShortcuts}
        onOpenChange={setShowShortcuts}
      />
    </>
  );
}
