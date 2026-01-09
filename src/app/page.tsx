// app/page.tsx
"use client";

import React, { useState } from 'react';
import { LandingPage } from '../components/landingpage/LandingPage';

export default function Page() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => setIsDarkMode((v) => !v);

  const onLogin = () => {
    // misalnya nanti navigate ke login
    window.location.href = "/login";
  };

  const onStart = () => {
    // misalnya nanti navigate ke dashboard
    window.location.href = "/dashboard";
  };

  return (
    <LandingPage
      isDarkMode={isDarkMode}
      toggleDarkMode={toggleDarkMode}
      onLogin={onLogin}
      onStart={onStart}
    />
  );
}