import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AdminAuthContextType {
  isAdminLoggedIn: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  const login = (username: string, password: string) => {
    if (username === "admin" && password === "admin123") {
      setIsAdminLoggedIn(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdminLoggedIn(false);
  };

  return (
    <AdminAuthContext.Provider value={{ isAdminLoggedIn, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}