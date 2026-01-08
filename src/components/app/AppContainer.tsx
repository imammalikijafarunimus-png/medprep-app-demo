import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { AppHeader } from './AppHeader';
import { DashboardHome } from './DashboardHome';
import { OSCESection } from './OSCESection'; 
import { FlashcardSection } from './FlashcardSection'; 
import { CBTSection } from './CBTSection'; 
import { AdminDashboard } from '../admin/AdminDashboard'; 
import { X } from 'lucide-react';
import { Button } from '../ui/Button';
import { PomodoroWidget } from './PomodoroWidget';
import { OnboardingTour } from './OnboardingTour'; // Import Baru

type ToastType = 'success' | 'error' | 'info';

interface AppContainerProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  onLogout: () => void;
}

export const AppContainer = ({ isDarkMode, toggleDarkMode, onLogout }: AppContainerProps) => {
  const [currentView, setCurrentView] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isPro, setIsPro] = useState(true); 

  const handleAddToast = (msg: string, type: ToastType) => {
    if (type === 'error') {
      alert(`⚠️ ${msg}`);
    } else {
      alert(`✅ ${msg}`);
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case 'home': return <DashboardHome setView={setCurrentView} />;
      case 'osce': return <OSCESection isPro={isPro} />; 
      case 'cbt': return <CBTSection isPro={isPro} addToast={handleAddToast} />; 
      case 'flashcards': return <FlashcardSection isPro={isPro} addToast={handleAddToast} />; 
      // @ts-ignore
      case 'admin': return <AdminDashboard setView={setCurrentView} addToast={handleAddToast} />; 
      default: return <DashboardHome setView={setCurrentView} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-black font-sans text-gray-900 dark:text-gray-100 overflow-hidden transition-colors duration-300">
      
      {/* GLOBAL WIDGETS */}
      <PomodoroWidget />
      <OnboardingTour />

      {/* SIDEBAR DESKTOP */}
      <div className="hidden md:flex w-72 h-full border-r border-gray-100 dark:border-gray-800">
        <Sidebar 
          currentView={currentView} 
          setView={setCurrentView} 
          onLogout={onLogout}
          isPro={isPro}
          onUpgrade={() => handleAddToast("Fitur Upgrade akan segera hadir!", "info")}
        />
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        <AppHeader 
          isDarkMode={isDarkMode} 
          toggleDarkMode={toggleDarkMode}
          isPro={isPro}
          setMobileMenuOpen={setMobileMenuOpen}
        />
        
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-black scroll-smooth relative">
          {renderContent()}
        </main>
      </div>

      {/* SIDEBAR MOBILE (OVERLAY) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 md:hidden" onClick={() => setMobileMenuOpen(false)}>
          <div 
            className="absolute left-0 top-0 bottom-0 w-3/4 max-w-xs bg-white dark:bg-gray-900 shadow-2xl flex flex-col animate-fade-in-right" // Animasi slide-in bisa ditambahkan di global css
            onClick={e => e.stopPropagation()}
          >
             {/* Tombol Close Mobile */}
             <div className="absolute top-4 right-4 z-50">
               <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                  <X className="w-6 h-6"/>
               </Button>
             </div>

             {/* Re-use Sidebar Component */}
             <Sidebar 
                currentView={currentView} 
                setView={setCurrentView} 
                onLogout={onLogout}
                isPro={isPro}
                onUpgrade={() => handleAddToast("Fitur Upgrade!", "info")}
                onCloseMobile={() => setMobileMenuOpen(false)} // Pass fungsi close
             />
          </div>
        </div>
      )}
    </div>
  );
};