"use client";

import React, { useState } from 'react';
import {
  LayoutDashboard,
  FileText,
  Zap,
  BookOpen,
  Users,
  Settings,
  Plus,
  Trash2,
  Edit,
  Save,
  X,
  LogOut,
  ChevronLeft
} from 'lucide-react';

import { Button } from '../ui/Button';

interface AdminDashboardProps {
  setView: (view: string) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  onLogout: () => void;
}

export const AdminDashboard = ({ 
  setView, 
  isDarkMode, 
  toggleDarkMode, 
  onLogout 
}: AdminDashboardProps) => {
  // State untuk navigasi menu sidebar (internal admin)
  const [activeTab, setActiveTab] = useState('overview');

  // Mock Data untuk Simulasi (CRUD sederhana di memori)
  const [osceData, setOsceData] = useState([
    { id: 1, title: 'History Taking - Nyeri Dada', station: 'Station 1' },
    { id: 2, title: 'Pemeriksaan Fisik Paru', station: 'Station 2' },
  ]);

  const [cbtData, setCbtData] = useState([
    { id: 1, title: 'Anatomi Jantung', questions: 50 },
  ]);

  // Fungsi hapus data (Simulasi)
  const handleDelete = (id: number, type: 'osce' | 'cbt') => {
    if (confirm('Yakin ingin menghapus data ini?')) {
      if (type === 'osce') {
        setOsceData(osceData.filter(item => item.id !== id));
      } else {
        setCbtData(cbtData.filter(item => item.id !== id));
      }
    }
  };

  // Render Konten berdasarkan Tab
  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Dashboard Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow border dark:border-gray-700">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 text-blue-600 rounded-full dark:bg-blue-900 dark:text-blue-300">
                    <Zap className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Total Soal OSCE</p>
                    <p className="text-2xl font-bold">{osceData.length}</p>
                  </div>
                </div>
              </div>
              <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow border dark:border-gray-700">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-100 text-green-600 rounded-full dark:bg-green-900 dark:text-green-300">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Total Bank CBT</p>
                    <p className="text-2xl font-bold">{cbtData.length}</p>
                  </div>
                </div>
              </div>
              <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow border dark:border-gray-700">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-100 text-purple-600 rounded-full dark:bg-purple-900 dark:text-purple-300">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Pengguna Aktif</p>
                    <p className="text-2xl font-bold">124</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'manage-osce':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Manajemen Soal OSCE</h2>
              <Button>
                <Plus className="w-4 h-4 mr-2" /> Tambah Station
              </Button>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden border dark:border-gray-700">
              <table className="w-full text-left">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="p-4">ID</th>
                    <th className="p-4">Judul Station</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {osceData.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="p-4 text-gray-500">#{item.id}</td>
                      <td className="p-4 font-medium">{item.title}</td>
                      <td className="p-4">
                        <span className="px-2 py-1 text-xs font-semibold text-green-600 bg-green-100 rounded-full dark:bg-green-900 dark:text-green-300">
                          Aktif
                        </span>
                      </td>
                      <td className="p-4 text-right flex justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-red-500 hover:bg-red-50 hover:text-red-600"
                          onClick={() => handleDelete(item.id, 'osce')}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'manage-cbt':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Manajemen Bank Soal CBT</h2>
              <Button>
                <Plus className="w-4 h-4 mr-2" /> Upload Soal
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cbtData.map((item) => (
                <div key={item.id} className="p-4 border rounded-lg dark:border-gray-700 bg-white dark:bg-gray-800">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg">{item.title}</h3>
                      <p className="text-sm text-gray-500">{item.questions} Pertanyaan</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id, 'cbt')}>
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-20">
            <Settings className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <p className="text-xl text-gray-500">Menu {activeTab} sedang dalam pengembangan.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-black overflow-hidden font-sans">
      
      {/* Sidebar Admin */}
      <aside className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col">
        <div className="p-6 flex items-center gap-3 border-b border-gray-200 dark:border-gray-800">
          <div className="p-2 bg-teal-600 rounded-lg">
            <LayoutDashboard className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight">MedPrep</h1>
            <p className="text-xs text-gray-500">Admin Panel</p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'overview' 
                ? 'bg-teal-50 text-teal-700 dark:bg-teal-900/20 dark:text-teal-400' 
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <Zap className="w-5 h-5" />
            Overview
          </button>
          
          <button
            onClick={() => setActiveTab('manage-osce')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'manage-osce' 
                ? 'bg-teal-50 text-teal-700 dark:bg-teal-900/20 dark:text-teal-400' 
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <BookOpen className="w-5 h-5" />
            Soal OSCE
          </button>

          <button
            onClick={() => setActiveTab('manage-cbt')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'manage-cbt' 
                ? 'bg-teal-50 text-teal-700 dark:bg-teal-900/20 dark:text-teal-400' 
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <FileText className="w-5 h-5" />
            Soal CBT
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'settings' 
                ? 'bg-teal-50 text-teal-700 dark:bg-teal-900/20 dark:text-teal-400' 
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <Settings className="w-5 h-5" />
            Pengaturan
          </button>
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <button 
            onClick={() => setView('home')} // Kembali ke dashboard utama
            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Kembali ke App
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        
        {/* Header Admin */}
        <header className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-8">
          <div>
            <h2 className="text-lg font-semibold capitalize">
              {activeTab.replace('-', ' ')}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300"
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>
            <Button variant="outline" onClick={onLogout} className="gap-2">
              <LogOut className="w-4 h-4" />
              Keluar
            </Button>
          </div>
        </header>

        {/* Scrollable Area */}
        <main className="flex-1 overflow-y-auto p-8 scroll-smooth">
          {renderContent()}
        </main>
      </div>

    </div>
  );
};