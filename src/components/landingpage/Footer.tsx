import React from 'react';
import { Stethoscope, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gray-50 dark:bg-black border-t border-gray-200 dark:border-gray-800 pt-16 pb-8 px-6 text-gray-600 dark:text-gray-400">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
        
        {/* Brand Column */}
        <div className="col-span-2 lg:col-span-2 pr-8">
          <div className="flex items-center gap-2 font-bold text-xl text-gray-900 dark:text-white mb-4">
            <div className="bg-teal-600 p-1.5 rounded-lg text-white">
              <Stethoscope className="w-5 h-5"/>
            </div>
            MedPrep
          </div>
          <p className="text-sm leading-relaxed mb-6">
            Platform belajar kedokteran yang dibuat dengan <Heart className="w-3 h-3 inline text-red-500 fill-current mx-1"/> untuk sejawat Indonesia.
          </p>
          <div className="text-sm">
            &copy; {new Date().getFullYear()} MedPrep Indonesia.
          </div>
        </div>

        {/* Links Column 1 */}
        <div>
          <h4 className="font-bold text-gray-900 dark:text-white mb-4">Produk</h4>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="hover:text-teal-600 dark:hover:text-teal-400">Soal UKMPPD</a></li>
            <li><a href="#" className="hover:text-teal-600 dark:hover:text-teal-400">Modul Stase</a></li>
            <li><a href="#" className="hover:text-teal-600 dark:hover:text-teal-400">Flashcards</a></li>
          </ul>
        </div>

        {/* Links Column 2 */}
        <div>
          <h4 className="font-bold text-gray-900 dark:text-white mb-4">Perusahaan</h4>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="hover:text-teal-600 dark:hover:text-teal-400">Tentang Kami</a></li>
            <li><a href="#" className="hover:text-teal-600 dark:hover:text-teal-400">Karir</a></li>
            <li><a href="#" className="hover:text-teal-600 dark:hover:text-teal-400">Blog</a></li>
          </ul>
        </div>

        {/* Links Column 3 */}
        <div>
          <h4 className="font-bold text-gray-900 dark:text-white mb-4">Legal</h4>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="hover:text-teal-600 dark:hover:text-teal-400">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-teal-600 dark:hover:text-teal-400">Terms of Service</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};