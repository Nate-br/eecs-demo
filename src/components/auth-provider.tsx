"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  role: string | null;
  user: {
    id: string;
    role: string;
    enterpriseId: string;
    name: string;
    enterpriseName: string;
  } | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children, session }: { children: ReactNode, session: any }) {
  const user = session ? {
    id: session.userId,
    role: session.role,
    enterpriseId: session.enterpriseId,
    name: session.name,
    enterpriseName: session.enterpriseName,
  } : null;

  return (
    <AuthContext.Provider value={{ role: session?.role || null, user }}>
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
