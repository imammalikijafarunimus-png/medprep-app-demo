import React from 'react';
// Correcting import paths to be relative to the current folder (./)
import { Hero } from './Hero';
import { Features } from './Features';
import { StaseSection } from './StaseSection';
import { Pricing } from './Pricing';
import { Testimonials } from './Testimonials';
import { FAQ } from './FAQ';
import { Navbar } from './Navbar';
import { CTASection } from './CTASection';
import { Footer } from './Footer';

interface LandingPageProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  onLogin: () => void;
  onStart: () => void;
}

export const LandingPage = ({ isDarkMode, toggleDarkMode, onLogin, onStart }: LandingPageProps) => {
  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
      <Navbar 
        isDarkMode={isDarkMode} 
        toggleDarkMode={toggleDarkMode}
        onLogin={onLogin}
        onStart={onStart}
      />
      
      <main>
        <div id="home">
          <Hero onStart={onStart} />
        </div>
        
        <div id="fitur">
          <Features />
        </div>
        
        <div id="stase">
          <StaseSection />
        </div>
        
        <div id="pricing">
          <Pricing onUpgrade={onStart} />
        </div>

        <div id="testimonial">
          <Testimonials />
        </div>

        <div id="faq">
          <FAQ />
        </div>

        <CTASection onStart={onStart} />
      </main>

      <Footer />
    </div>
  );
};