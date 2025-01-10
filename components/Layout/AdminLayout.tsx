'use client';

import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from './Sidebar.tsx';
import { ThemeContext } from '../Global/ThemeContext.tsx';
import { setAuthToken } from '../../utils/api.js';
import { verifyToken } from '../../utils/auth.js';

interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { theme } = useContext(ThemeContext);
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('No token found');
        }

        const isValid = await verifyToken(token);
        if (!isValid) {
          throw new Error('Invalid token');
        }

        setAuthToken(token);
        setIsAuthenticated(true);
      } catch (error) {
        localStorage.removeItem('authToken');
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className={`flex items-center justify-center h-screen bg-[var(--background-${theme})]`}>
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[var(--primary)]"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className={`flex h-screen bg-[var(--background-${theme})] text-[var(--text-${theme})]`}>
      <Sidebar />
      <div className="flex-1 p-4 overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
