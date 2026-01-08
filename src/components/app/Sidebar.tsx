import React from 'react';
import { 
  Activity, CheckCircle, BookOpen, Zap, Settings, LogOut, Stethoscope, ShieldCheck 
} from 'lucide-react';
import { Button } from '../ui/Button';

interface SidebarProps {
  currentView: string;
  setView: (view: string) => void;
  onLogout: () => void;
  isPro: boolean;
  onUpgrade: () => void;
  // Prop baru untuk menutup menu mobile
  onCloseMobile?: () => void;
}

export const Sidebar = ({ currentView, setView, onLogout, isPro, onUpgrade, onCloseMobile }: SidebarProps) => {
  const menuItems = [
    { id: 'home', label: 'Dashboard', icon: Activity },
    { id: 'osce', label: 'Latihan OSCE', icon: CheckCircle },
    { id: 'cbt', label: 'Materi CBT', icon: BookOpen },
    { id: 'flashcards', label: 'Flashcards', icon: Zap },
  ];

  const handleNavClick = (view: string) => {
    setView(view);
    if (onCloseMobile) onCloseMobile(); // Tutup sidebar jika di mobile
  };

  return (
    <aside className="w-full h-full bg-white dark:bg-gray-900 flex flex-col transition-colors duration-300">
      {/* Brand */}
      <div className="p-8 flex items-center gap-3 font-bold text-2xl text-teal-700 dark:text-teal-500 tracking-tight">
        <div className="bg-teal-100 dark:bg-teal-900/30 p-2 rounded-xl">
          <Stethoscope className="w-6 h-6"/>
        </div>
        MedPrep
      </div>

      {/* Navigation - Tambahkan ID untuk Tour */}
      <nav id="sidebar-nav" className="p-4 space-y-1.5 flex-1 overflow-y-auto">
        {menuItems.map((item) => (
          <button 
            key={item.id}
            onClick={() => handleNavClick(item.id)} 
            className={`w-full flex items-center gap-3.5 p-3.5 rounded-xl text-sm font-semibold transition-all duration-200 
              ${currentView === item.id 
                ? 'bg-teal-50 text-teal-700 dark:bg-teal-900/20 dark:text-teal-400' 
                : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 dark:text-gray-400'
              }`}
          >
            <item.icon className="w-5 h-5"/> {item.label}
          </button>
        ))}
        
        <div className="pt-4 mt-4 border-t border-gray-100 dark:border-gray-800">
          <p className="px-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Administrator</p>
          <button 
            onClick={() => handleNavClick('admin')} 
            className={`w-full flex items-center gap-3.5 p-3.5 rounded-xl text-sm font-semibold transition-all duration-200 
              ${currentView === 'admin' 
                ? 'bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400' 
                : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 dark:text-gray-400'
              }`}
          >
            <ShieldCheck className="w-5 h-5"/> Admin Panel
          </button>
        </div>
      </nav>
      
      {/* Area Bawah */}
      <div className="mt-auto p-4 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 font-bold">dr</div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-gray-900 dark:text-white truncate">dr. Calon Spesialis</p>
              <p className="text-xs text-gray-500">{isPro ? 'Pro Plan' : 'Free Plan'}</p>
            </div>
          </div>
          {!isPro && (
            <Button onClick={onUpgrade} fullWidth size="sm" className="text-xs h-8 bg-gradient-to-r from-yellow-400 to-orange-500 border-none shadow-none text-white hover:opacity-90">
              Upgrade Pro
            </Button>
          )}
        </div>

        <button className="w-full text-left text-xs font-medium text-gray-400 hover:text-teal-600 flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition mb-1">
          <Settings className="w-4 h-4"/> Pengaturan
        </button>
        
        <button 
          onClick={onLogout} 
          className="w-full text-left text-xs font-medium text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-3 px-3 py-2 rounded-lg transition"
        >
          <LogOut className="w-4 h-4"/> Keluar Aplikasi
        </button>
      </div>
    </aside>
  );
};