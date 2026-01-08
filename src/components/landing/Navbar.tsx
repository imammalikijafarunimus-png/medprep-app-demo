import React, { useState, useEffect } from 'react';
import { Stethoscope, Sun, Moon, Menu, X, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

interface NavbarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  onLogin: () => void;
  onStart: () => void;
}

export const Navbar = ({ isDarkMode, toggleDarkMode, onLogin, onStart }: NavbarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('home');

  // Daftar menu navigasi yang disesuaikan
  const navLinks = [
    { name: 'Fitur', href: '#fitur' },
    { name: 'Stase', href: '#stase' },
    { name: 'Harga', href: '#pricing' },
    { name: 'Testimoni', href: '#testimonial' },
    { name: 'FAQ', href: '#faq' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // 1. Ubah style navbar saat discroll (Sticky Effect)
      setScrolled(window.scrollY > 20);

      // 2. Hitung Reading Progress (0-100%)
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setReadingProgress(progress);

      // 3. Deteksi section mana yang sedang dilihat user (Active Highlighting)
      // Logic active state tetap dipertahankan karena sangat berguna
      const scrollPosition = window.scrollY + 100; 

      // Cek Home secara manual jika di paling atas
      if (window.scrollY < 100) {
        setActiveSection('home');
      } else {
        for (const link of navLinks) {
          const sectionId = link.href.replace('#', '');
          const element = document.getElementById(sectionId);
          
          if (element) {
            const offsetTop = element.offsetTop;
            const offsetBottom = offsetTop + element.offsetHeight;

            if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
              setActiveSection(sectionId);
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    if (targetId === 'home') {
       window.scrollTo({ top: 0, behavior: 'smooth' });
       setActiveSection('home');
       setMobileMenuOpen(false);
       return;
    }

    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(targetId);
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav 
      className={`fixed w-full z-50 top-0 transition-all duration-300 border-b 
      ${scrolled 
        ? 'bg-white/90 dark:bg-black/90 backdrop-blur-md shadow-sm border-gray-200 dark:border-gray-800' 
        : 'bg-transparent border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between relative">
        
        {/* Logo - Dipertahankan karena sudah ikonik */}
        <div 
          className="flex items-center gap-2 font-bold text-xl tracking-tight text-gray-900 dark:text-white cursor-pointer group" 
          onClick={(e) => handleScrollTo(e as any, '#home')}
        >
          <div className="bg-teal-600 p-1.5 rounded-lg text-white shadow-lg shadow-teal-500/30 group-hover:scale-110 transition-transform duration-300">
            <Stethoscope className="w-6 h-6"/>
          </div>
          <span className="group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">MedPrep</span>
        </div>

        {/* Desktop Navigation - Mengadopsi gaya yang lebih bersih dan terpusat */}
        <div className="hidden md:flex items-center gap-1 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-1.5 rounded-full border border-gray-200/50 dark:border-gray-700/50 shadow-sm">
           <a 
              href="#home"
              onClick={(e) => handleScrollTo(e, '#home')}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 
                ${activeSection === 'home'
                  ? 'bg-white dark:bg-gray-700 text-teal-600 dark:text-teal-400 shadow-sm' 
                  : 'text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400'
                }`}
            >
              Home
            </a>
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <a 
                key={link.name} 
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 
                  ${isActive 
                    ? 'bg-white dark:bg-gray-700 text-teal-600 dark:text-teal-400 shadow-sm' 
                    : 'text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400'
                  }`}
              >
                {link.name}
              </a>
            );
          })}
        </div>

        {/* Right Side Actions - CTA yang lebih menonjol */}
        <div className="flex gap-3 items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleDarkMode} 
            className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500"
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          <div className="hidden md:flex gap-3 items-center pl-2 border-l border-gray-200 dark:border-gray-700">
             <button 
                onClick={onLogin} 
                className="text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors px-3"
             >
               Masuk
             </button>
             <button 
                onClick={onStart} 
                className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40 transition-all hover:-translate-y-0.5 flex items-center gap-2"
             >
               Mulai Belajar <ArrowRight className="w-4 h-4" />
             </button>
          </div>

          <div className="md:hidden">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
          </div>
        </div>
      </div>

      {/* Progress Bar (Indikator Membaca) */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gray-100 dark:bg-gray-800">
        <div 
          className="h-full bg-gradient-to-r from-teal-400 to-blue-500 shadow-[0_0_10px_rgba(20,184,166,0.5)] transition-all duration-150 ease-out" 
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-20 w-full bg-white dark:bg-black border-b border-gray-100 dark:border-gray-800 p-6 flex flex-col gap-2 shadow-xl animate-fade-in h-[calc(100vh-80px)] overflow-y-auto">
           <a 
             href="#home"
             onClick={(e) => handleScrollTo(e, '#home')}
             className={`text-base font-medium py-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center
               ${activeSection === 'home' ? 'text-teal-600 dark:text-teal-400 font-bold pl-2 border-l-4 border-l-teal-500' : 'text-gray-700 dark:text-gray-200'}`}
           >
             Home
             {activeSection === 'home' && <span className="text-xs bg-teal-100 dark:bg-teal-900 text-teal-700 px-2 py-1 rounded-full">Aktif</span>}
           </a>
           {navLinks.map((link) => {
             const isActive = activeSection === link.href.replace('#', '');
             return (
               <a 
                 key={link.name} 
                 href={link.href} 
                 onClick={(e) => handleScrollTo(e, link.href)}
                 className={`text-base font-medium py-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center
                   ${isActive ? 'text-teal-600 dark:text-teal-400 font-bold pl-2 border-l-4 border-l-teal-500' : 'text-gray-700 dark:text-gray-200'}`}
               >
                 {link.name}
                 {isActive && <span className="text-xs bg-teal-100 dark:bg-teal-900 text-teal-700 px-2 py-1 rounded-full">Aktif</span>}
               </a>
             );
           })}
           <div className="flex flex-col gap-3 mt-6 pt-6 border-t border-gray-100 dark:border-gray-800">
             <Button variant="outline" onClick={onLogin} fullWidth className="justify-center">Masuk Akun</Button>
             <button 
                onClick={onStart} 
                className="w-full bg-teal-600 hover:bg-teal-700 text-white px-5 py-3 rounded-xl text-base font-bold shadow-lg transition-all flex items-center justify-center gap-2"
             >
               Mulai Belajar Sekarang <ArrowRight className="w-4 h-4" />
             </button>
           </div>
        </div>
      )}
    </nav>
  );
};