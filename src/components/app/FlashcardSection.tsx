"use client";

import React, { useState, useMemo } from 'react';
import { Zap, Lock, ImageIcon, ArrowLeft, Layers, CheckCircle, Clock } from 'lucide-react'; // Added Clock
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { INITIAL_FLASHCARDS, Flashcard } from '../../data/dummyData';
import { ToastType } from '../ui/Toast';

interface FlashcardSectionProps {
  isPro: boolean;
  addToast: (msg: string, type: ToastType) => void;
}

const calculateNextReview = (quality: number, previousInterval: number) => {
  if (quality === 0) return 1; 
  if (previousInterval === 0) return 1;
  if (previousInterval === 1) return 3;
  const factor = quality === 1 ? 1.2 : quality === 2 ? 2.5 : 3.0;
  return Math.ceil(previousInterval * factor);
};

export const FlashcardSection = ({ isPro, addToast }: FlashcardSectionProps) => {
  const [cards] = useState(INITIAL_FLASHCARDS);
  const [selectedDeck, setSelectedDeck] = useState<string | null>(null);
  
  const [flipped, setFlipped] = useState<Record<number, boolean>>({});
  const [intervals, setIntervals] = useState<Record<number, number>>({});

  // --- LOGIC PER DECK ---
  const decks = useMemo(() => {
    const deckMap: Record<string, Flashcard[]> = {};
    cards.forEach(card => {
      if (!deckMap[card.category]) deckMap[card.category] = [];
      deckMap[card.category].push(card);
    });
    return deckMap;
  }, [cards]);

  const getDeckProgress = (category: string) => {
    const deckCards = decks[category] || [];
    if (deckCards.length === 0) return 0;
    const masteredCount = deckCards.filter(c => (intervals[c.id] || 0) > 0).length;
    return Math.round((masteredCount / deckCards.length) * 100);
  };

  // NEW: Hitung Total Review Hari Ini (Dummy Logic)
  const totalDueToday = cards.length - Object.keys(intervals).length; 

  const toggleFlip = (id: number) => {
    setFlipped(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleRate = (e: React.MouseEvent, cardId: number, quality: number) => {
    e.stopPropagation();
    const currentInterval = intervals[cardId] || 0;
    const nextInterval = calculateNextReview(quality, currentInterval);
    setIntervals(prev => ({ ...prev, [cardId]: nextInterval }));
    setFlipped(prev => ({ ...prev, [cardId]: false }));
    addToast(`Kartu dijadwalkan ulang dalam ${nextInterval} hari`, "success");
  };

  // --- RENDER DECK LIST VIEW ---
  if (!selectedDeck) {
    return (
      <div className="p-6 md:p-10 animate-fade-in max-w-7xl mx-auto">
        
        {/* Header & Stats */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
              <Layers className="text-teal-600" /> Pilih Deck Materi
            </h2>
            <p className="text-gray-500">Pilih topik untuk memulai hafalan Spaced Repetition.</p>
          </div>
          
          {/* New Progress Widget */}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 px-5 py-3 rounded-2xl border border-yellow-100 dark:border-yellow-800 flex items-center gap-4">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-800 rounded-full text-yellow-600 dark:text-yellow-200">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-yellow-700 dark:text-yellow-300 uppercase">Review Hari Ini</div>
              <div className="text-xl font-extrabold text-gray-900 dark:text-white">{totalDueToday} Kartu</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.keys(decks).map((category) => {
            const progress = getDeckProgress(category);
            const totalCards = decks[category].length;
            
            return (
              <div 
                key={category}
                onClick={() => setSelectedDeck(category)}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 cursor-pointer hover:shadow-lg hover:border-teal-500 transition-all group"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-teal-50 dark:bg-teal-900/20 rounded-xl text-teal-600 group-hover:scale-110 transition-transform">
                    <Zap className="w-6 h-6" />
                  </div>
                  <Badge color={progress === 100 ? 'green' : 'gray'}>
                    {progress}% Selesai
                  </Badge>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{category}</h3>
                <p className="text-sm text-gray-500 mb-6">{totalCards} Kartu Hafalan</p>
                
                <div className="w-full bg-gray-100 dark:bg-gray-800 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-teal-500 h-full rounded-full transition-all duration-1000" 
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // --- RENDER CARD STUDY VIEW ---
  const activeCards = decks[selectedDeck] || [];

  return (
    <div className="p-6 md:p-10 pb-24 animate-fade-in max-w-7xl mx-auto">
      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
        .rotate-y-0 { transform: rotateY(0deg); }
      `}</style>

      {/* Header Navigation */}
      <div className="flex items-center gap-4 mb-8">
        <Button 
          variant="ghost" 
          icon={ArrowLeft} 
          onClick={() => setSelectedDeck(null)}
          className="hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          Kembali
        </Button>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            Deck: {selectedDeck}
          </h2>
          <p className="text-sm text-gray-500">Total {activeCards.length} kartu di deck ini.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {activeCards.map((card) => {
          const isLocked = !card.isFree && !isPro;
          const isFlipped = flipped[card.id];

          return (
            <div 
              key={card.id} 
              onClick={() => isLocked ? addToast("Konten Premium", "error") : toggleFlip(card.id)} 
              className="h-80 relative perspective-1000 cursor-pointer group"
            >
              {/* FRONT SIDE */}
              <div className={`w-full h-full absolute top-0 left-0 transition-all duration-500 transform-style-3d backface-hidden rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-xl hover:border-teal-400 dark:hover:border-teal-600 group-hover:-translate-y-1 
                ${isFlipped ? 'rotate-y-180 opacity-0 pointer-events-none' : 'rotate-y-0 opacity-100'}`}
              >
                {isLocked ? (
                  <div className="text-gray-400 flex flex-col items-center">
                    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-full mb-4">
                      <Lock className="w-8 h-8"/>
                    </div>
                    <span className="font-bold">Konten Premium</span>
                    <span className="text-xs mt-2">Upgrade untuk akses</span>
                  </div>
                ) : (
                  <>
                    <span className="text-[10px] font-bold tracking-widest text-teal-600 uppercase bg-teal-50 dark:bg-teal-900/30 px-3 py-1 rounded-full mb-6">
                      {card.category}
                    </span>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white leading-relaxed">
                      {card.front}
                    </h3>
                    {card.imageUrl && (
                      <div className="mt-4 text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded flex items-center gap-1">
                        <ImageIcon className="w-3 h-3"/> Lihat Gambar
                      </div>
                    )}
                    <p className="absolute bottom-6 text-xs text-gray-400 font-medium animate-pulse">
                      Ketuk untuk membalik
                    </p>
                  </>
                )}
              </div>

              {/* BACK SIDE */}
              <div className={`w-full h-full absolute top-0 left-0 transition-all duration-500 transform-style-3d backface-hidden rounded-3xl border border-teal-200 bg-teal-50 dark:bg-teal-900/10 p-6 flex flex-col items-center justify-between shadow-lg 
                ${isFlipped ? 'rotate-y-0 opacity-100' : '-rotate-y-180 opacity-0 pointer-events-none'}`}
              >
                <div className="flex-1 flex flex-col justify-center items-center w-full overflow-hidden">
                  {card.imageUrl && (
                    <div className="h-32 w-full mb-4 rounded-lg overflow-hidden border border-gray-200 bg-white">
                      <img src={card.imageUrl} className="w-full h-full object-cover" alt="Visual aid" />
                    </div>
                  )}
                  <p className="text-base font-medium text-gray-800 dark:text-gray-200 text-center leading-relaxed">
                    {card.back}
                  </p>
                </div>

                {/* SRS Ratings */}
                <div className="grid grid-cols-4 gap-2 w-full mt-4 pt-4 border-t border-teal-200 dark:border-teal-800/30">
                  {[
                    { label: 'Again', color: 'text-red-600 hover:bg-red-100', score: 0, time: '1m' },
                    { label: 'Hard', color: 'text-orange-600 hover:bg-orange-100', score: 1, time: '2d' },
                    { label: 'Good', color: 'text-blue-600 hover:bg-blue-100', score: 2, time: '3d' },
                    { label: 'Easy', color: 'text-green-600 hover:bg-green-100', score: 3, time: '4d' }
                  ].map((rate) => (
                    <button 
                      key={rate.label}
                      onClick={(e) => handleRate(e, card.id, rate.score)} 
                      className={`flex flex-col items-center justify-center p-2 rounded-lg transition ${rate.color}`}
                    >
                      <span className="text-xs font-bold">{rate.label}</span>
                      <span className="text-[9px] opacity-70">{rate.time}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};