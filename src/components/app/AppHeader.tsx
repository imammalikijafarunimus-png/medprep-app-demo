import React from 'react';
import { Menu, Sun, Moon } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

interface AppHeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  isPro: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export const AppHeader = ({ isDarkMode, toggleDarkMode, isPro, setMobileMenuOpen }: AppHeaderProps) => {
  return (
    <header className="h-20 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 flex items-center justify-between px-4 md:px-8 sticky top-0 z-10 transition-colors duration-300">
      <div id="header-user" className="flex items-center gap-4">
        {/* Mobile Toggle */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(true)}>
            <Menu className="w-5 h-5"/>
          </Button>
        </div>
        
        {/* Welcome Text */}
        <div>
          <h2 className="font-bold text-xl text-gray-800 dark:text-white">Halo, Dokter! 👋</h2>
          <p className="text-xs text-gray-400 mt-0.5">Semangat belajar hari ini.</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={toggleDarkMode} 
          className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-gray-500 transition-colors"
        >
          {isDarkMode ? <Sun className="w-5 h-5"/> : <Moon className="w-5 h-5"/>}
        </button>
        
        <div className="h-8 w-[1px] bg-gray-200 dark:bg-gray-800 hidden md:block"></div>
        
        <div className="hidden md:block">
          <Badge color={isPro ? 'yellow' : 'gray'}>
            {isPro ? 'PRO MEMBER' : 'FREE ACCOUNT'}
          </Badge>
        </div>
      </div>
    </header>
  );
};