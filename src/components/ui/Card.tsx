import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverEffect?: boolean;
}

export const Card = ({ children, className = '', onClick, hoverEffect = false }: CardProps) => (
  <div 
    onClick={onClick}
    className={`bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 
      ${hoverEffect ? 'hover:shadow-lg hover:-translate-y-1 hover:border-teal-300 dark:hover:border-teal-700 transition-all duration-300 cursor-pointer' : 'shadow-sm'} 
      ${className}`}
  >
    {children}
  </div>
);