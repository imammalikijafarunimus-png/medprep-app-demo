import React from 'react';
import { Check, Star } from 'lucide-react';
import { Button } from '../ui/Button';

export const Pricing = ({ onUpgrade }: { onUpgrade: () => void }) => {
  return (
    <section id="pricing" className="py-24 bg-gray-50 dark:bg-gray-900/20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">Pilih Paket Belajarmu</h2>
          <p className="text-gray-500 dark:text-gray-400">Investasi terbaik untuk masa depan karir doktermu.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          {/* FREE PLAN - Dengan Animasi */}
          <div className="group relative rounded-3xl border bg-white dark:bg-gray-900 dark:border-gray-800 p-8 shadow-sm flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:border-teal-200 dark:hover:border-teal-800">
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-teal-600 transition-colors">Free</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">Untuk coba & eksplorasi awal</p>
            <div className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">Rp 0</div>
            
            <ul className="space-y-4 mb-8 flex-1">
              {['Akses 2 Kasus OSCE', 'Akses 3 Flashcards', 'Preview Materi CBT', 'Tanpa Kartu Kredit'].map((item, i) => (
                <li key={i} className="flex gap-3 text-sm text-gray-600 dark:text-gray-300">
                  <div className="bg-gray-100 dark:bg-gray-800 p-1 rounded-full text-teal-600">
                    <Check className="w-3 h-3 flex-shrink-0" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
            
            <Button fullWidth variant="outline" size="lg" onClick={onUpgrade} className="group-hover:bg-teal-50 dark:group-hover:bg-teal-900/10 group-hover:border-teal-200 dark:group-hover:border-teal-800 transition-all">
              Mulai Gratis
            </Button>
          </div>

          {/* PRO PLAN - Dengan Animasi Lebih Menonjol */}
          <div className="group relative rounded-3xl border-2 border-teal-500 bg-white dark:bg-gray-900 p-8 shadow-xl flex flex-col transform md:-translate-y-4 z-10 transition-all duration-300 hover:shadow-teal-500/20 hover:scale-[1.02]">
            <div className="absolute top-0 right-0 bg-teal-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-lg uppercase tracking-wider flex items-center gap-1 shadow-md">
              <Star className="w-3 h-3 fill-white" /> Paling Populer
            </div>
            
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-teal-600 transition-colors">Pro Member</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">Persiapan UKMPPD maksimal</p>
            <div className="text-4xl font-bold mb-6 text-gray-900 dark:text-white flex items-end gap-1">
              Rp 99rb <span className="text-sm font-normal text-gray-500 mb-1">/bulan</span>
            </div>
            
            <ul className="space-y-4 mb-8 flex-1">
              {[
                'Akses Semua Kasus OSCE + Timer', 
                'Checklist Lengkap & Standar Penguji', 
                'Flashcard Spaced Repetition (Unlimited)', 
                'Materi CBT High-Yield Lengkap',
                'Update Materi Rutin',
                'Prioritas Support'
              ].map((item, i) => (
                <li key={i} className="flex gap-3 text-sm font-medium text-gray-800 dark:text-gray-200">
                  <div className="bg-teal-100 dark:bg-teal-900/30 p-1 rounded-full text-teal-600">
                    <Check className="w-3 h-3 flex-shrink-0" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
            
            <Button fullWidth size="lg" onClick={onUpgrade} className="shadow-lg shadow-teal-500/25 group-hover:shadow-teal-500/40 group-hover:-translate-y-0.5 transition-all">
              Upgrade Sekarang
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};