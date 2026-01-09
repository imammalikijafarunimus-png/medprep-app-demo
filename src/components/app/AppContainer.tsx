"use client"; // Baris ini WAJIB paling atas sebelum import

import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { AppHeader } from './AppHeader';
import { DashboardHome } from './DashboardHome';
import { OSCESection } from './OSCESection'; 
import { FlashcardSection } from './FlashcardSection'; 
import { CBTSection } from './CBTSection'; 
import { AdminDashboard } from './AdminDashboard';
import { X } from 'lucide-react';
import { Button } from '../ui/Button';
import { PomodoroWidget } from './PomodoroWidget';

type ToastType = 'success' | 'error' | 'info';

interface AppContainerProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  onLogout: () => void;
}

export const AppContainer = ({ isDarkMode, toggleDarkMode, onLogout }: AppContainerProps) => {
  const [currentView, setCurrentView] = useState<string>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isPro, setIsPro] = useState(true); 

  const handleAddToast = (msg: string, type: ToastType) => {
    // Gunakan console.log untuk debugging jika alert diblokir browser
    console.log(`[${type.toUpperCase()}] ${msg}`);
    
    if (typeof window !== 'undefined') {
        if (type === 'error') {
            alert(`⚠️ ${msg}`);
        } else {
            alert(`✅ ${msg}`);
        }
    }
  };

  const renderContent = () => {
    // Perbaikan Logika Switch Case
    switch (currentView) {
      case 'home': 
        return <DashboardHome setView={setCurrentView} />;
      case 'osce': 
        return <OSCESection isPro={isPro} />; 
      case 'cbt': 
        return <CBTSection isPro={isPro} addToast={handleAddToast} />; 
      case 'flashcards': 
        return <FlashcardSection isPro={isPro} addToast={handleAddToast} />; 
      case 'admin': 
        return <AdminDashboard setView={setCurrentView} isDarkMode={false} toggleDarkMode={function (): void {
          throw new Error('Function not implemented.');
        } } onLogout={function (): void {
          throw new Error('Function not implemented.');
        } } />; 
      default: 
        return <DashboardHome setView={setCurrentView} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-black font-sans text-gray-900 dark:text-gray-100 overflow-hidden transition-colors duration-300">
      
      {/* Pastikan PomodoroWidget tidak menutupi konten secara mutlak jika tidak dimaksudkan */}
      <PomodoroWidget />

      <Sidebar 
        currentView={currentView} 
        setView={setCurrentView} 
        onLogout={onLogout}
        isPro={isPro}
        onUpgrade={() => handleAddToast("Fitur Upgrade akan segera hadir!", "info")}
      />

      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        <AppHeader 
          isDarkMode={isDarkMode} 
          toggleDarkMode={toggleDarkMode}
          isPro={isPro}
          setMobileMenuOpen={setMobileMenuOpen}
        />
        
        {/* Menambahkan key untuk memaksa re-render saat view berubah */}
        <main key={currentView} className="flex-1 overflow-y-auto bg-gray-50 dark:bg-black scroll-smooth relative">
          {renderContent()}
        </main>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 md:hidden backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}>
          <div 
            className="absolute left-0 top-0 bottom-0 w-3/4 max-w-xs bg-white dark:bg-gray-900 p-6 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out" 
            onClick={e => e.stopPropagation()}
          >
             <div className="flex justify-between items-center mb-8">
                <div className="font-bold text-xl text-teal-700 dark:text-teal-500">MedPrep</div>
                <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                  <X className="w-5 h-5"/>
                </Button>
             </div>
             <nav className="flex-1 space-y-2 overflow-y-auto">
               {['home', 'osce', 'cbt', 'flashcards', 'admin'].map(v => (
                 <button 
                   key={v} 
                   onClick={() => { setCurrentView(v); setMobileMenuOpen(false); }} 
                   className={`w-full text-left p-3 rounded-lg font-medium capitalize transition-colors ${
                     currentView === v 
                       ? 'bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400' 
                       : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                   }`}
                 >
                   {/* Ubah huruf pertama jadi kapital */}
                   {v === 'osce' ? 'OSCE' : v === 'cbt' ? 'CBT' : v}
                 </button>
               ))}
             </nav>
             <Button onClick={onLogout} variant="outline" className="mt-auto w-full border-red-200 text-red-600 hover:bg-red-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-900/20">
               Keluar
             </Button>
          </div>
        </div>
      )}
    </div>
  );
};