import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

const Button: React.FC<ButtonProps> = ({ children, size = 'md', ...props }) => {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  return (
    <button
      className={`${sizeClasses[size]} bg-primary text-white rounded hover:bg-primary-dark transition-colors`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;