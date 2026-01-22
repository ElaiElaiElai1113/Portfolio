import { createContext, useContext, useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { getCurrentUser, isAdmin, onAuthStateChange } from "@/services/auth";

interface AuthContextType {
  user: User | null;
  isAdminUser: boolean;
  loading: boolean;
  setUser: (user: User | null) => void;
  signOut: () => Promise<void>;
  refreshAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [loading, setLoading] = useState(true);

  const refreshAuth = async () => {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);

      if (currentUser) {
        const adminStatus = await isAdmin();
        setIsAdminUser(adminStatus);
      } else {
        setIsAdminUser(false);
      }
    } catch (error) {
      console.error("Error refreshing auth:", error);
      setUser(null);
      setIsAdminUser(false);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    const { signOut: supabaseSignOut } = await import("@/services/auth");
    await supabaseSignOut();
    setUser(null);
    setIsAdminUser(false);
  };

  useEffect(() => {
    refreshAuth();

    const {
      data: { subscription },
    } = onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);

      if (session?.user) {
        const adminStatus = await isAdmin();
        setIsAdminUser(adminStatus);
      } else {
        setIsAdminUser(false);
      }

      setLoading(false);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAdminUser, loading, setUser, signOut, refreshAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
