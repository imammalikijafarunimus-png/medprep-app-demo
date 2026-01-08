"use client";

import React, { useState, useEffect } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

interface Step {
  targetId: string; // ID elemen HTML yang disorot
  title: string;
  description: string;
  position: 'right' | 'bottom' | 'left' | 'top';
}

const STEPS: Step[] = [
  {
    targetId: 'sidebar-nav',
    title: 'Navigasi Utama',
    description: 'Akses semua fitur belajar seperti OSCE, CBT, dan Flashcard dari sini.',
    position: 'right',
  },
  {
    targetId: 'header-user',
    title: 'Profil & Pengaturan',
    description: 'Lihat status akun Pro Anda dan atur preferensi tampilan (Dark Mode).',
    position: 'bottom',
  },
  {
    targetId: 'dashboard-quick',
    title: 'Akses Cepat',
    description: 'Langsung lanjut belajar terakhir atau lihat statistik harianmu.',
    position: 'top', // Sesuaikan jika perlu
  },
];

export const OnboardingTour = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    // Cek apakah user sudah pernah tour (simpan di localStorage)
    const hasToured = localStorage.getItem('medprep_tour_completed');
    if (!hasToured) {
      // Delay sedikit agar UI render dulu
      setTimeout(() => setIsVisible(true), 1000);
    }
  }, []);

  useEffect(() => {
    if (isVisible && STEPS[currentStep]) {
      const element = document.getElementById(STEPS[currentStep].targetId);
      if (element) {
        setTargetRect(element.getBoundingClientRect());
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [currentStep, isVisible]);

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleClose();
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('medprep_tour_completed', 'true');
  };

  if (!isVisible || !targetRect) return null;

  const step = STEPS[currentStep];

  // Hitung posisi tooltip sederhana (bisa dipercanggih library seperti floating-ui)
  let tooltipStyle: React.CSSProperties = {};
  if (step.position === 'right') {
    tooltipStyle = { top: targetRect.top, left: targetRect.right + 20 };
  } else if (step.position === 'bottom') {
    tooltipStyle = { top: targetRect.bottom + 20, left: targetRect.left };
  } else if (step.position === 'top') {
    tooltipStyle = { bottom: window.innerHeight - targetRect.top + 20, left: targetRect.left };
  }

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none">
      {/* Backdrop dengan lubang (clip-path) agak rumit tanpa library, 
          jadi kita pakai semi-transparent overlay biasa dulu */}
      <div className="absolute inset-0 bg-black/50 pointer-events-auto" />

      {/* Highlighter Box (Visual Only) */}
      <div 
        className="absolute border-2 border-teal-400 rounded-lg shadow-[0_0_0_9999px_rgba(0,0,0,0.5)] transition-all duration-300 pointer-events-none"
        style={{
          top: targetRect.top - 5,
          left: targetRect.left - 5,
          width: targetRect.width + 10,
          height: targetRect.height + 10,
        }}
      />

      {/* Tooltip Card */}
      <div 
        className="absolute bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-2xl max-w-sm pointer-events-auto transition-all duration-300 animate-fade-in-up border border-gray-200 dark:border-gray-800"
        style={tooltipStyle}
      >
        <div className="flex justify-between items-start mb-2">
          <h4 className="text-lg font-bold text-teal-600">{step.title}</h4>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-4 h-4" />
          </button>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm leading-relaxed">
          {step.description}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-400 font-medium">
            Langkah {currentStep + 1} dari {STEPS.length}
          </span>
          <Button size="sm" onClick={handleNext} className="flex items-center gap-1">
            {currentStep === STEPS.length - 1 ? 'Selesai' : 'Lanjut'} <ArrowRight className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </div>
  );
};