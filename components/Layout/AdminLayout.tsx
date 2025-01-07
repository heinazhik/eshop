import React, { useContext } from 'react';
import Sidebar from './Sidebar.jsx';
import { ThemeContext } from '../Global/ThemeContext.jsx';

interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { theme } = useContext(ThemeContext);
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