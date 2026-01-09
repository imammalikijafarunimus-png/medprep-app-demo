"use client";

import React, { useState } from 'react';
// Path: naik 2 folder (../..) keluar dari app/admin, masuk ke admin
import { AdminDashboard } from '../../components/app/AdminDashboard';

export default function AdminPage() {
  // State untuk navigasi sub-menu di dalam admin (misal: 'users', 'settings')
  const [currentAdminView, setCurrentAdminView] = useState('home');

  // State Dark Mode (opsional, kalau admin dashboard butuh)
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const onLogout = () => {
    window.location.href = "/";
  };

  return (
    <AdminDashboard 
      setView={setCurrentAdminView}
      isDarkMode={isDarkMode}
      toggleDarkMode={toggleDarkMode}
      onLogout={onLogout}
    />
  );
}