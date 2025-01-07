import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  // Additional custom props can be added here if needed
}

const Input: React.FC<InputProps> = ({ className = '', ...props }) => {
  return (
    <input
      className={`${className} w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary`}
      {...props}
    />
  );
};

export default Input;