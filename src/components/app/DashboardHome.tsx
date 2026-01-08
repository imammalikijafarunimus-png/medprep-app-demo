"use client";

import React, { useState, useEffect } from 'react';
import { 
  Activity, BarChart2, Brain, Flame, Calendar, ArrowRight, Zap, BookOpen 
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

interface DashboardHomeProps {
  setView: (view: string) => void;
}

export const DashboardHome = ({ setView }: DashboardHomeProps) => {
  // --- STATE ---
  const [greeting, setGreeting] = useState('');
  
  // Data Dummy untuk simulasi progress
  const userStats = {
    streak: 3, // 3 hari berturut-turut
    osceScore: 45, // Progress 45%
    cardsMastered: 120, // Kartu hafal
    totalCards: 300,
    lastActivity: 'Latihan OSCE - Kardio',
  };

  // --- EFFECT: Dynamic Greeting ---
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Selamat Pagi');
    else if (hour < 18) setGreeting('Selamat Siang');
    else setGreeting('Selamat Malam');
  }, []);

  const cardPercentage = Math.round((userStats.cardsMastered / userStats.totalCards) * 100);

  return (
    <div className="p-6 md:p-10 space-y-8 pb-24 md:pb-8 animate-fade-in max-w-7xl mx-auto">
      
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            {greeting}, Dokter! <span className="text-2xl animate-bounce">👋</span>
          </h1>
          <p className="text-gray-500 mt-1">Siap untuk melanjutkan progress belajarmu hari ini?</p>
        </div>
        
        {/* Streak Badge (Gamification) */}
        <div className="flex items-center gap-2 bg-orange-50 dark:bg-orange-900/20 text-orange-600 px-4 py-2 rounded-full border border-orange-100 dark:border-orange-800 shadow-sm animate-fade-in-up">
          <Flame className="w-5 h-5 fill-orange-500 text-orange-600 animate-pulse" />
          <span className="font-bold">{userStats.streak} Hari Streak</span>
        </div>
      </div>

      {/* --- HERO CARD (QUICK ACTION) --- */}
      <div id="dashboard-quick" className="bg-gradient-to-br from-teal-600 to-emerald-600 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden group transition-all hover:shadow-2xl hover:scale-[1.01] cursor-pointer" onClick={() => setView('osce')}>
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-teal-100 text-sm font-bold mb-2 uppercase tracking-wider">
            <Activity className="w-4 h-4" /> Lanjutkan Terakhir
          </div>
          <h2 className="text-2xl md:text-4xl font-extrabold mb-4 tracking-tight">
            {userStats.lastActivity}
          </h2>
          <Button 
            className="bg-white text-teal-700 hover:bg-teal-50 border-none shadow-lg px-6"
            onClick={(e) => {
              e.stopPropagation(); // Mencegah klik parent
              setView('osce');
            }}
          >
            Lanjut Belajar <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
        
        {/* Background Decor */}
        <Activity className="absolute right-[-20px] bottom-[-40px] w-64 h-64 text-white opacity-10 group-hover:scale-110 group-hover:rotate-12 transition-all duration-700" />
      </div>

      {/* --- STATS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* OSCE Progress */}
        <Card className="flex flex-col justify-between border-t-4 border-t-blue-500 hover:shadow-lg transition-all">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider flex items-center gap-2">
                <Activity className="w-4 h-4" /> Progres OSCE
              </p>
              <h3 className="text-4xl font-extrabold text-gray-900 dark:text-white mt-2">
                {userStats.osceScore}%
              </h3>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-xl text-blue-600">
              <BarChart2 className="w-6 h-6" />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-blue-500 h-full rounded-full transition-all duration-1000 ease-out" 
                style={{ width: `${userStats.osceScore}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-400 font-medium">Target: Selesaikan 5 kasus lagi minggu ini.</p>
          </div>
        </Card>

        {/* Flashcard Stats */}
        <Card className="flex flex-col justify-between border-t-4 border-t-yellow-500 hover:shadow-lg transition-all">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider flex items-center gap-2">
                <Brain className="w-4 h-4" /> Hafalan Materi
              </p>
              <h3 className="text-4xl font-extrabold text-gray-900 dark:text-white mt-2">
                {userStats.cardsMastered} <span className="text-xl text-gray-400 font-normal">/ {userStats.totalCards}</span>
              </h3>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-xl text-yellow-600">
              <Zap className="w-6 h-6" />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-yellow-500 h-full rounded-full transition-all duration-1000 ease-out" 
                style={{ width: `${cardPercentage}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-400 font-medium">{cardPercentage}% materi telah masuk ke *Long-term Memory*.</p>
          </div>
        </Card>
      </div>

      {/* --- QUICK ACTIONS GRID --- */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Latihan Acak', icon: Zap, color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-900/20', action: 'flashcards' },
          { label: 'CBT Harian', icon: BookOpen, color: 'text-pink-600', bg: 'bg-pink-50 dark:bg-pink-900/20', action: 'cbt' },
          { label: 'Jadwal Belajar', icon: Calendar, color: 'text-teal-600', bg: 'bg-teal-50 dark:bg-teal-900/20', action: 'home' },
          { label: 'Lihat Statistik', icon: BarChart2, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20', action: 'home' },
        ].map((item, idx) => (
          <button 
            key={idx}
            onClick={() => setView(item.action)}
            className="flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl hover:border-teal-500 hover:shadow-md transition-all group"
          >
            <div className={`p-3 rounded-xl ${item.bg} ${item.color} mb-3 group-hover:scale-110 transition-transform`}>
              <item.icon className="w-6 h-6" />
            </div>
            <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{item.label}</span>
          </button>
        ))}
      </div>

    </div>
  );
};