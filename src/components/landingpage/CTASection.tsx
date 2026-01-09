import React from 'react';
import { ArrowRight } from 'lucide-react';

interface CTASectionProps {
  onStart: () => void;
}

export const CTASection = ({ onStart }: CTASectionProps) => {
  return (
    <section className="py-20 bg-teal-600 dark:bg-teal-900 text-white text-center px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Siap Lulus?</h2>
        <p className="text-lg md:text-xl text-teal-100 mb-8 max-w-2xl mx-auto leading-relaxed">
          Jangan biarkan kebingungan menghambat impian Anda menjadi dokter. Bergabunglah dengan ribuan ko-asisten lainnya dan raih gelar Anda sekarang.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button 
            onClick={onStart}
            className="px-8 py-3 bg-white text-teal-700 font-bold rounded-xl hover:shadow-xl transition-all hover:-translate-y-1 flex items-center justify-center gap-2"
          >
            Daftar Sekarang <ArrowRight className="w-5 h-5"/>
          </button>
          <button 
            className="px-8 py-3 bg-transparent border-2 border-white/30 text-white font-bold rounded-xl hover:bg-white/10 transition-all"
          >
            Hubungi Sales
          </button>
        </div>
      </div>
    </section>
  );
};