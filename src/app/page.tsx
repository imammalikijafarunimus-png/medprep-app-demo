"use client";

import React, { useState, useEffect } from 'react';

// Landing Components
import { Navbar } from '../components/landing/Navbar';
import { Hero } from '../components/landing/Hero';
import { Features } from '../components/landing/Features';
import { StaseSection } from '../components/landing/StaseSection';
import { Pricing } from '../components/landing/Pricing';
import { Testimonials } from '../components/landing/Testimonials'; // Import Baru
import { FAQ } from '../components/landing/FAQ';
import { Footer } from '../components/landing/Footer';

// App Components
import { AppContainer } from '../components/app/AppContainer';

export default function MedPrepApp() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [viewMode, setViewMode] = useState<'landing' | 'app'>('landing');

  // Handle Dark Mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  
  const handleEnterApp = () => {
    setViewMode('app');
  };

  return (
    <>
      {viewMode === 'landing' ? (
        <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
          <Navbar 
            isDarkMode={isDarkMode} 
            toggleDarkMode={toggleDarkMode}
            onLogin={handleEnterApp}
            onStart={handleEnterApp}
          />
          
          <main>
            <div id="home">
              <Hero onStart={handleEnterApp} />
            </div>
            
            <div id="fitur">
              <Features />
            </div>
            
            <div id="stase">
              <StaseSection />
            </div>
            
            <div id="pricing">
              <Pricing onUpgrade={handleEnterApp} />
            </div>

            <div id="testimonial">
              <Testimonials />
            </div>

            <div id="faq">
              <FAQ />
            </div>
          </main>

          <Footer />
        </div>
      ) : (
        // App Mode
        <AppContainer 
          isDarkMode={isDarkMode} 
          toggleDarkMode={toggleDarkMode} 
          onLogout={() => setViewMode('landing')} 
        />
      )}
    </>
  );
}