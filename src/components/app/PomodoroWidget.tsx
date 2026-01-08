import React, { useState, useEffect } from 'react';
import { Timer, Play, Pause, RotateCcw, X, Coffee } from 'lucide-react';

export const PomodoroWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 menit
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<'focus' | 'break'>('focus');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      // Play sound notification logic here
      alert(mode === 'focus' ? "Waktunya istirahat!" : "Kembali fokus!");
      if (mode === 'focus') {
        setMode('break');
        setTimeLeft(5 * 60);
      } else {
        setMode('focus');
        setTimeLeft(25 * 60);
      }
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, mode]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(mode === 'focus' ? 25 * 60 : 5 * 60);
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-6 bg-red-500 hover:bg-red-600 text-white p-3 rounded-full shadow-lg transition-all z-40 flex items-center gap-2 group"
        title="Buka Pomodoro Timer"
      >
        <Timer className="w-6 h-6" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap text-sm font-bold">
          Fokus Mode
        </span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-20 right-6 w-72 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 z-40 animate-fade-in-up overflow-hidden">
      {/* Header */}
      <div className={`p-4 flex justify-between items-center ${mode === 'focus' ? 'bg-red-500' : 'bg-green-500'} text-white`}>
        <div className="flex items-center gap-2 font-bold">
          {mode === 'focus' ? <Timer className="w-5 h-5"/> : <Coffee className="w-5 h-5"/>}
          {mode === 'focus' ? 'Fokus' : 'Istirahat'}
        </div>
        <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded">
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Body */}
      <div className="p-6 text-center">
        <div className="text-5xl font-mono font-bold text-gray-800 dark:text-white mb-6 tracking-wider">
          {formatTime(timeLeft)}
        </div>
        
        <div className="flex justify-center gap-4">
          <button 
            onClick={toggleTimer}
            className={`p-3 rounded-full shadow-md transition-transform active:scale-95 ${isActive ? 'bg-yellow-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'}`}
          >
            {isActive ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
          </button>
          
          <button 
            onClick={resetTimer}
            className="p-3 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <RotateCcw className="w-6 h-6" />
          </button>
        </div>
        
        <div className="mt-6 flex justify-center gap-2">
          <button 
            onClick={() => { setMode('focus'); setTimeLeft(25 * 60); setIsActive(false); }}
            className={`text-xs px-3 py-1 rounded-full ${mode === 'focus' ? 'bg-red-100 text-red-600' : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
          >
            25m Fokus
          </button>
          <button 
            onClick={() => { setMode('break'); setTimeLeft(5 * 60); setIsActive(false); }}
            className={`text-xs px-3 py-1 rounded-full ${mode === 'break' ? 'bg-green-100 text-green-600' : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
          >
            5m Rehat
          </button>
        </div>
      </div>
    </div>
  );
};