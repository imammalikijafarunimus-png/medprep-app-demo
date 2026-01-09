"use client";

import React, { useState } from 'react';
// Path: naik 2 folder (../..) keluar dari app/dashboard, masuk ke components
import { AppContainer } from '../../components/app/AppContainer';

export default function DashboardPage() {
  // State untuk Dark Mode
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const onLogout = () => {
    // Logika logout: redirect ke halaman depan
    window.location.href = "/";
  };

  return (
    <AppContainer
      isDarkMode={isDarkMode}
      toggleDarkMode={toggleDarkMode}
      onLogout={onLogout}
    />
  );
}