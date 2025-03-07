
import React, { createContext, useState, useContext, useEffect } from "react";

type User = {
  id: string;
  email: string;
  name: string;
  role: "admin" | "editor" | "user";
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAdmin: () => boolean;
  isAuthorized: (authorId?: string) => boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// For demo purposes, we'll use a simple hardcoded admin user
// In a real application, you would use a proper authentication system
const ADMIN_USER: User = {
  id: "admin-1",
  email: "admin@zondoor.com",
  name: "Z-ON Admin",
  role: "admin",
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Check for saved auth on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("auth_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // For demo purposes, we'll use a hardcoded credential check
    // In a real app, you would validate against a server
    if (email === "admin@zondoor.com" && password === "admin123") {
      setUser(ADMIN_USER);
      localStorage.setItem("auth_user", JSON.stringify(ADMIN_USER));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth_user");
  };

  const isAdmin = () => {
    return user?.role === "admin";
  };

  const isAuthorized = (authorId?: string) => {
    if (!user) return false;
    if (user.role === "admin") return true;
    if (authorId && user.id === authorId) return true;
    return false;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin, isAuthorized }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
