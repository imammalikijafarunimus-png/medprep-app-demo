import React from 'react';
import { Star, Quote } from 'lucide-react';

export const Testimonials = () => {
  const reviews = [
    {
      name: 'dr. Sarah Wijaya',
      role: 'Lulusan FK UI (Batch Februari 2024)',
      avatar: 'SW',
      color: 'bg-pink-100 text-pink-600',
      quote: "Jujur awalnya ragu, tapi fitur OSCE simulatornya bener-bener ngebantu buat simulasi waktu. Timer-nya bikin deg-degan kayak ujian asli! Alhamdulillah One Shot.",
      rating: 5
    },
    {
      name: 'dr. Budi Santoso',
      role: 'Lulusan FK Unair (Batch Mei 2024)',
      avatar: 'BS',
      color: 'bg-blue-100 text-blue-600',
      quote: "Flashcard SRS-nya juara sih. Materi farmakologi yang susah hapal jadi nempel banget di kepala karena diulang-ulang di waktu yang pas. Recommended!",
      rating: 5
    },
    {
      name: 'Annisa Putri, S.Ked',
      role: 'Co-Ass FK UGM',
      avatar: 'AP',
      color: 'bg-purple-100 text-purple-600',
      quote: "Tampilannya bersih dan ga bikin pusing. Dark mode-nya enak banget buat belajar malem-malem pas jaga. Materi CBT-nya juga high yield banget, ga bertele-tele.",
      rating: 5
    }
  ];

  return (
    <section id="testimonial" className="py-24 bg-teal-50/50 dark:bg-gray-900/30 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">Kata Mereka</h2>
          <p className="text-gray-500 dark:text-gray-400">Bergabung dengan ribuan sejawat yang telah berhasil lulus.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((t, i) => (
            <div 
              key={i} 
              className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col"
            >
              <div className="mb-6 flex justify-between items-start">
                <Quote className="w-10 h-10 text-teal-100 dark:text-teal-900" />
                <div className="flex gap-1 text-yellow-400">
                  {[...Array(t.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current"/>)}
                </div>
              </div>
              
              <p className="mb-8 text-gray-600 dark:text-gray-300 italic text-lg leading-relaxed flex-1">
                "{t.quote}"
              </p>
              
              <div className="flex items-center gap-4 pt-6 border-t border-gray-100 dark:border-gray-800">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${t.color}`}>
                  {t.avatar}
                </div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">{t.name}</p>
                  <p className="text-xs text-teal-600 font-medium">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};