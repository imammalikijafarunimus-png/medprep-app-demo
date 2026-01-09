import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs = [
    { 
      question: 'Apakah MedPrep cocok untuk koas?', 
      answer: 'Sangat cocok. MedPrep dirancang khusus untuk mahasiswa kedokteran fase klinik (koas), persiapan UKMPPD, dan dokter muda yang ingin me-refresh ilmu.' 
    },
    { 
      question: 'Apakah materi selalu diperbarui?', 
      answer: 'Ya. Materi kami diperbarui secara berkala mengikuti PPK (Panduan Praktik Klinis) dan guideline terbaru dari Kemenkes maupun organisasi profesi.' 
    },
    { 
      question: 'Bagaimana cara kerja Spaced Repetition?', 
      answer: 'Algoritma kami akan menjadwalkan ulang flashcard berdasarkan seberapa baik Anda mengingatnya. Kartu yang sulit akan muncul lebih sering, kartu yang mudah akan muncul lebih jarang.' 
    },
    { 
      question: 'Apakah bisa diakses di HP?', 
      answer: 'Tentu saja! MedPrep didesain sebagai Progressive Web App (PWA) yang responsif dan ringan diakses melalui browser HP maupun Laptop.' 
    },
  ];

  const toggleIndex = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-white dark:bg-black transition-colors duration-300 border-t border-gray-100 dark:border-gray-800">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">Pertanyaan Umum</h2>
        
        <div className="space-y-4">
          {faqs.map((item, index) => {
            const isOpen = activeIndex === index;
            
            return (
              <div 
                key={index} 
                className={`border rounded-2xl overflow-hidden transition-all duration-300 
                  ${isOpen 
                    ? 'border-teal-500 bg-teal-50/50 dark:bg-teal-900/10 dark:border-teal-500/50' 
                    : 'border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/30 hover:border-teal-300 dark:hover:border-teal-700'
                  }`}
              >
                <button
                  onClick={() => toggleIndex(index)}
                  className="w-full flex justify-between items-center px-6 py-5 text-left focus:outline-none"
                >
                  <h4 className={`text-lg font-bold transition-colors ${isOpen ? 'text-teal-700 dark:text-teal-400' : 'text-gray-900 dark:text-white'}`}>
                    {item.question}
                  </h4>
                  <div className={`p-1 rounded-full transition-all duration-300 ${isOpen ? 'bg-teal-100 text-teal-600 rotate-180' : 'text-gray-400'}`}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>
                
                <div 
                  className={`px-6 text-gray-600 dark:text-gray-300 leading-relaxed overflow-hidden transition-all duration-300 ease-in-out
                    ${isOpen ? 'max-h-48 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  {item.answer}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};