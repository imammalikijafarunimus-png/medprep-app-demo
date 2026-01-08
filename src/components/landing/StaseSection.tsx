import React from 'react';
import { 
  HeartPulse, Bone, Baby, Sparkles, Eye, Activity, 
  Shield, Brain, Pill, Microscope, Flame, Users 
} from 'lucide-react';

export const StaseSection = () => {
  const stations = [
    { id: 1, name: 'Internal Medicine', icon: HeartPulse, cases: 45 },
    { id: 2, name: 'Surgery', icon: Bone, cases: 38 },
    { id: 3, name: 'Pediatrics', icon: Baby, cases: 42 },
    { id: 4, name: 'Obgyn', icon: Sparkles, cases: 35 },
    { id: 5, name: 'Ophthalmology', icon: Eye, cases: 28 },
    { id: 6, name: 'ENT', icon: Activity, cases: 25 },
    { id: 7, name: 'Dermatology', icon: Shield, cases: 30 },
    { id: 8, name: 'Psychiatry', icon: Brain, cases: 32 },
    { id: 9, name: 'Anesthesiology', icon: Pill, cases: 22 },
    { id: 10, name: 'Radiology', icon: Microscope, cases: 26 },
    { id: 11, name: 'Emergency', icon: Flame, cases: 40 },
    { id: 12, name: 'Public Health', icon: Users, cases: 20 },
  ];

  return (
    <section id="stase" className="py-24 bg-white dark:bg-black transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">12 Stase Klinis Lengkap</h2>
          <p className="text-gray-500 dark:text-gray-400">Mencakup seluruh sistem organ SKDI untuk persiapan komprehensif.</p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stations.map((station, idx) => (
            <div 
              key={station.id} 
              className="group cursor-pointer border border-gray-200 dark:border-gray-800 rounded-xl p-5 hover:border-teal-500 dark:hover:border-teal-500 transition-all hover:shadow-md bg-white dark:bg-gray-900 flex items-center justify-between animate-fade-in-up"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-teal-50 dark:bg-teal-900/30 text-teal-600 flex items-center justify-center group-hover:bg-teal-600 group-hover:text-white transition-colors duration-300">
                  <station.icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">{station.name}</h3>
              </div>
              <div className="text-xs font-bold text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
                {station.cases}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};