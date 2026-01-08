import React from 'react';
import { ClipboardCheck, Zap, BookOpen } from 'lucide-react';
import { Badge } from '../ui/Badge'; 

export const Features = () => {
  const features = [
    {
      icon: <ClipboardCheck className="w-7 h-7"/>,
      title: "Simulasi OSCE Realistis",
      desc: "Latihan dengan timer 15 menit dan ceklis standar penguji nasional. Rasakan tekanan ujian sesungguhnya.",
      color: "blue"
    },
    {
      icon: <Zap className="w-7 h-7"/>,
      title: "Flashcard Active Recall",
      desc: "Hafalkan dosis obat, trias, dan kriteria diagnosis dengan algoritma Spaced Repetition yang cerdas.",
      color: "yellow"
    },
    {
      icon: <BookOpen className="w-7 h-7"/>,
      title: "Materi CBT High-Yield",
      desc: "Rangkuman padat berisi 'Clue' dan kata kunci yang sering keluar di soal UKMPPD. Tidak bertele-tele.",
      color: "purple"
    }
  ];

  return (
    <section id="fitur" className="py-24 bg-gray-50 dark:bg-gray-900/50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="flex justify-center mb-4">
             <Badge color="outline">Fitur MedPrep</Badge>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Semua yang Anda Butuhkan</h2>
          <p className="mt-4 text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Kami menggabungkan metode belajar terbaik untuk memaksimalkan retensi memori Anda.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div 
              key={idx} 
              className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 
                ${feature.color === 'blue' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30' : 
                  feature.color === 'yellow' ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30' : 
                  'bg-purple-100 text-purple-600 dark:bg-purple-900/30'}`}
              >
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{feature.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};