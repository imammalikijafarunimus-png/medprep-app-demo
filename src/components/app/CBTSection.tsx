"use client";

import React, { useState } from 'react';
import { 
  BookOpen, Lock, ChevronRight, Hash, HelpCircle, CheckCircle, XCircle, RotateCcw, Trophy 
} from 'lucide-react';
import { INITIAL_CBT_NOTES, INITIAL_QUIZ_QUESTIONS } from '../../data/dummyData';
import { ToastType } from '../ui/Toast';
import { Button } from '../ui/Button';

interface CBTSectionProps {
  isPro: boolean;
  addToast: (msg: string, type: ToastType) => void;
}

export const CBTSection = ({ isPro, addToast }: CBTSectionProps) => {
  const [activeTab, setActiveTab] = useState<'material' | 'quiz'>('material');
  
  // --- QUIZ STATE ---
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  // --- QUIZ HANDLERS ---
  const handleOptionSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
  };

  const handleCheckAnswer = () => {
    if (selectedOption === null) return;
    
    const currentQ = INITIAL_QUIZ_QUESTIONS[currentQIndex];
    const isCorrect = selectedOption === currentQ.correctAnswer;
    
    setIsAnswered(true);
    
    if (isCorrect) {
      setScore(s => s + 1);
      addToast("Jawaban Benar! Mantap.", "success");
    } else {
      addToast("Jawaban Salah. Cek pembahasannya.", "error");
    }
  };

  const handleNextQuestion = () => {
    if (currentQIndex < INITIAL_QUIZ_QUESTIONS.length - 1) {
      setCurrentQIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowScore(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setShowScore(false);
  };

  return (
    <div className="p-6 md:p-10 animate-fade-in max-w-7xl mx-auto">
      
      {/* HEADER & TABS */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-3">
            <BookOpen className="text-teal-600" /> CBT Center
          </h2>
          <p className="text-gray-500">Pelajari materi high-yield dan uji pemahamanmu.</p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
          <button 
            onClick={() => setActiveTab('material')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'material' ? 'bg-white dark:bg-gray-700 shadow text-teal-600 dark:text-teal-400' : 'text-gray-500'}`}
          >
            Materi
          </button>
          <button 
            onClick={() => setActiveTab('quiz')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'quiz' ? 'bg-white dark:bg-gray-700 shadow text-teal-600 dark:text-teal-400' : 'text-gray-500'}`}
          >
            <HelpCircle className="w-4 h-4"/> Mini Kuis
          </button>
        </div>
      </div>

      {/* --- CONTENT: MATERIAL TAB --- */}
      {activeTab === 'material' && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 animate-fade-in">
          {INITIAL_CBT_NOTES.map((note, idx) => {
            const isLocked = !note.isFree && !isPro;
            return (
              <div 
                key={idx} 
                onClick={() => isLocked && addToast("Materi ini terkunci. Upgrade ke Pro!", "error")}
                className={`p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden group
                  ${isLocked 
                    ? 'opacity-75 bg-gray-50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-800 cursor-not-allowed' 
                    : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 hover:border-teal-500 hover:shadow-lg cursor-pointer'
                  }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] font-bold tracking-widest text-teal-600 uppercase bg-teal-50 dark:bg-teal-900/30 px-3 py-1 rounded-full border border-teal-100 dark:border-teal-800/50">
                    {note.category}
                  </span>
                  {isLocked && <Lock className="w-5 h-5 text-gray-400" />}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-teal-600 transition-colors">
                  {note.title}
                </h3>
                <ul className="space-y-3">
                  {note.clues.map((clue, i) => (
                    <li key={i} className="text-sm flex gap-3 text-gray-600 dark:text-gray-300 items-start">
                      <div className="min-w-4 pt-0.5"><Hash className="w-3 h-3 text-teal-500" /></div>
                      <span className="leading-relaxed">{clue}</span>
                    </li>
                  ))}
                </ul>
                {!isLocked && (
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
                    <div className="bg-teal-50 dark:bg-teal-900 p-2 rounded-full text-teal-600">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* --- CONTENT: QUIZ TAB --- */}
      {activeTab === 'quiz' && (
        <div className="max-w-2xl mx-auto animate-fade-in">
          {!showScore ? (
            // Quiz Active View
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 shadow-sm">
              {/* Progress Bar */}
              <div className="mb-6 flex justify-between items-center text-sm font-bold text-gray-400">
                <span>Soal {currentQIndex + 1} dari {INITIAL_QUIZ_QUESTIONS.length}</span>
                <span>Skor: {score}</span>
              </div>
              <div className="w-full bg-gray-100 dark:bg-gray-800 h-2 rounded-full mb-8 overflow-hidden">
                <div 
                  className="bg-teal-500 h-full transition-all duration-500" 
                  style={{ width: `${((currentQIndex + 1) / INITIAL_QUIZ_QUESTIONS.length) * 100}%` }}
                ></div>
              </div>

              {/* Question */}
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 leading-relaxed">
                {INITIAL_QUIZ_QUESTIONS[currentQIndex].question}
              </h3>

              {/* Options */}
              <div className="space-y-3 mb-8">
                {INITIAL_QUIZ_QUESTIONS[currentQIndex].options.map((opt: string, idx: number) => {
                  let optionClass = "border-gray-200 dark:border-gray-700 hover:border-teal-500 hover:bg-teal-50 dark:hover:bg-teal-900/20";
                  
                  if (selectedOption === idx) {
                    optionClass = "border-teal-500 bg-teal-50 dark:bg-teal-900/20 ring-1 ring-teal-500";
                  }

                  if (isAnswered) {
                    if (idx === INITIAL_QUIZ_QUESTIONS[currentQIndex].correctAnswer) {
                      optionClass = "border-green-500 bg-green-50 dark:bg-green-900/20 ring-1 ring-green-500";
                    } else if (selectedOption === idx) {
                      optionClass = "border-red-500 bg-red-50 dark:bg-red-900/20 ring-1 ring-red-500";
                    } else {
                      optionClass = "opacity-50 border-gray-200 dark:border-gray-800";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleOptionSelect(idx)}
                      disabled={isAnswered}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all font-medium text-gray-700 dark:text-gray-300 flex justify-between items-center ${optionClass}`}
                    >
                      {opt}
                      {isAnswered && idx === INITIAL_QUIZ_QUESTIONS[currentQIndex].correctAnswer && <CheckCircle className="w-5 h-5 text-green-500"/>}
                      {isAnswered && selectedOption === idx && idx !== INITIAL_QUIZ_QUESTIONS[currentQIndex].correctAnswer && <XCircle className="w-5 h-5 text-red-500"/>}
                    </button>
                  );
                })}
              </div>

              {/* Explanation & Controls */}
              {isAnswered ? (
                <div className="animate-fade-in-up">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-800 mb-6">
                    <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-1 flex items-center gap-2">
                      <BookOpen className="w-4 h-4"/> Pembahasan:
                    </h4>
                    <p className="text-sm text-blue-700 dark:text-blue-200 leading-relaxed">
                      {INITIAL_QUIZ_QUESTIONS[currentQIndex].explanation}
                    </p>
                  </div>
                  <Button fullWidth onClick={handleNextQuestion}>
                    {currentQIndex < INITIAL_QUIZ_QUESTIONS.length - 1 ? "Soal Berikutnya" : "Lihat Hasil"}
                  </Button>
                </div>
              ) : (
                <Button 
                  fullWidth 
                  disabled={selectedOption === null} 
                  onClick={handleCheckAnswer}
                  className={selectedOption === null ? "opacity-50 cursor-not-allowed" : ""}
                >
                  Periksa Jawaban
                </Button>
              )}
            </div>
          ) : (
            // Score View
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-10 text-center shadow-lg">
              <div className="w-20 h-20 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-6 text-yellow-600 animate-bounce">
                <Trophy className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Kuis Selesai!</h3>
              <p className="text-gray-500 mb-6">Kamu berhasil menjawab</p>
              
              <div className="text-5xl font-extrabold text-teal-600 dark:text-teal-400 mb-8">
                {Math.round((score / INITIAL_QUIZ_QUESTIONS.length) * 100)}
                <span className="text-xl text-gray-400 font-medium ml-2">/ 100</span>
              </div>

              <div className="flex gap-3 justify-center">
                <Button onClick={resetQuiz} variant="outline" icon={RotateCcw}>Ulangi Kuis</Button>
                <Button onClick={() => setActiveTab('material')}>Kembali ke Materi</Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};