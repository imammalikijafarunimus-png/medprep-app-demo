import React from 'react';
import { Star, ArrowRight, Users, FileText, CheckCircle, Trophy } from 'lucide-react';
import { Button } from '../ui/Button';

interface HeroProps {
  onStart: () => void;
}

export const Hero = ({ onStart }: HeroProps) => {
  return (
    <section className="pt-32 pb-20 px-6 relative overflow-hidden bg-white dark:bg-black transition-colors duration-300">
      {/* Background Blurs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-400/20 rounded-full blur-[120px] -z-10 opacity-60" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-400/20 rounded-full blur-[120px] -z-10 opacity-60" />

      <div className="max-w-7xl mx-auto text-center z-10 relative">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm text-teal-700 dark:text-teal-300 px-4 py-1.5 rounded-full text-sm font-bold mb-8 border border-teal-100 dark:border-teal-800 shadow-sm animate-fade-in-up">
          <Star className="w-4 h-4 fill-current text-yellow-400"/> #1 Platform Persiapan UKMPPD Indonesia
        </div>

        {/* Main Heading - Gradient diperbaiki */}
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight text-gray-900 dark:text-white animate-fade-in-up delay-100">
          Lulus UKMPPD <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-blue-500 to-teal-500 dark:from-teal-300 dark:via-blue-400 dark:to-teal-300 bg-300% animate-gradient">One Shot</span><br />
          Bukan Lagi Mimpi.
        </h1>

        {/* Subheading */}
        <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up delay-200">
          Bergabung dengan ribuan calon dokter. Pelajari ratusan kasus OSCE standar nasional, materi CBT high-yield, dan flashcard pintar dalam satu aplikasi.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up delay-300 mb-16">
          <Button 
            onClick={onStart} 
            size="lg" 
            className="text-lg px-8 py-4 shadow-xl shadow-teal-500/20 hover:shadow-teal-500/40 transition-all hover:-translate-y-1"
            icon={ArrowRight}
          >
            Coba Gratis Sekarang
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="text-lg px-8 py-4 hover:-translate-y-1 transition-all"
            onClick={() => {
              document.getElementById('fitur')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Lihat Demo Materi
          </Button>
        </div>

        {/* Social Proof Stats (Ditambahkan sesuai permintaan) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-gray-100 dark:border-gray-800 pt-12 animate-fade-in-up delay-300">
          {[
            { label: 'Mahasiswa Aktif', val: '2,500+', icon: Users, color: 'text-blue-500' },
            { label: 'Kasus CBT & OSCE', val: '850+', icon: FileText, color: 'text-teal-500' },
            { label: 'Tingkat Kelulusan', val: '98%', icon: Trophy, color: 'text-yellow-500' },
            { label: 'Rating Aplikasi', val: '4.9/5', icon: Star, color: 'text-orange-500' },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className={`mb-2 ${stat.color} bg-gray-50 dark:bg-gray-900 p-3 rounded-2xl`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <h4 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white">{stat.val}</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};