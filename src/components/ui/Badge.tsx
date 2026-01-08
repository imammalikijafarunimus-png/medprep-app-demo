import React from 'react';

    interface BadgeProps {
      children: React.ReactNode;
      color?: 'gray' | 'teal' | 'blue' | 'yellow' | 'red' | 'green' | 'purple' | 'outline';
      className?: string;
    }

    export const Badge = ({ children, color = 'gray', className = '' }: BadgeProps) => {
      const colors: Record<string, string> = {
        gray: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 border border-gray-200 dark:border-gray-700",
        teal: "bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300 border border-teal-200 dark:border-teal-800",
        blue: "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-200 dark:border-blue-800",
        yellow: "bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-800",
        red: "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300 border border-red-200 dark:border-red-800",
        green: "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300 border border-green-200 dark:border-green-800",
        purple: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 border border-purple-200 dark:border-purple-800",
        outline: "border border-gray-300 text-gray-600 dark:border-gray-600 dark:text-gray-400 bg-transparent"
      };

      return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${colors[color] || colors.gray} ${className}`}>
          {children}
        </span>
      );
    };