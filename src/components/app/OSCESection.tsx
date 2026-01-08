import React, { useState, useEffect } from 'react';
import { 
  Search, ChevronRight, Timer, Flag, ImageIcon, Activity, Brain, 
  CheckCircle, Check, Play, Pause, RotateCcw, AlertTriangle, EyeOff, 
  BarChart, ClipboardList, Stethoscope, ChevronDown 
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { 
  STASE_LIST, INITIAL_OSCE_CASES, OSCECase, INITIAL_OSCE_CHECKLISTS, OSCEChecklistData 
} from '../../data/dummyData'; // Pastikan import baru ditambahkan

interface OSCESectionProps {
  isPro: boolean;
}

export const OSCESection = ({ isPro }: OSCESectionProps) => {
  // --- GLOBAL STATE ---
  const [activeTab, setActiveTab] = useState<'simulation' | 'checklist'>('simulation');

  // --- STATE UNTUK SIMULASI (Kode Lama) ---
  const [selectedStase, setSelectedStase] = useState('respi');
  const [selectedCase, setSelectedCase] = useState<OSCECase | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [mode, setMode] = useState<'practice' | 'exam'>('practice');
  const [isExamFinished, setIsExamFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(900); 
  const [timerActive, setTimerActive] = useState(false);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  // --- STATE UNTUK CEKLIS (Baru) ---
  const [selectedChecklist, setSelectedChecklist] = useState<OSCEChecklistData | null>(null);
  const [checklistSearch, setChecklistSearch] = useState('');
  // State untuk expand/collapse section di detail ceklis
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  // --- LOGIC SIMULASI ---
  const filteredCases = INITIAL_OSCE_CASES[selectedStase] 
    ? INITIAL_OSCE_CASES[selectedStase].filter(c => c.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    } else if (timeLeft === 0 && timerActive) {
      setTimerActive(false);
      if (mode === 'exam') { setIsExamFinished(true); alert("Waktu Habis! Ujian Selesai."); } 
      else { alert("Waktu Habis!"); }
    }
    return () => clearInterval(interval);
  }, [timerActive, timeLeft, mode]);

  const handleSelectCase = (kasus: OSCECase) => {
    if (!kasus.isFree && !isPro) { alert("Upgrade ke Pro!"); return; }
    setSelectedCase(kasus); setTimeLeft(900); setTimerActive(false); setCheckedItems({}); setIsExamFinished(false); setMode('practice');
  };

  const toggleCheck = (idx: number) => {
    const key = `${selectedCase?.id}-${idx}`;
    setCheckedItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const calculateScore = () => {
    if (!selectedCase) return 0;
    const total = selectedCase.checklist.length;
    if (total === 0) return 0;
    let checkedCount = 0;
    selectedCase.checklist.forEach((_, idx) => { if (checkedItems[`${selectedCase.id}-${idx}`]) checkedCount++; });
    return Math.round((checkedCount / total) * 100);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleFinishExam = () => {
    setTimerActive(false); setIsExamFinished(true); window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- LOGIC CEKLIS ---
  const filteredChecklists = INITIAL_OSCE_CHECKLISTS.filter(c => 
    c.title.toLowerCase().includes(checklistSearch.toLowerCase()) || 
    c.category.toLowerCase().includes(checklistSearch.toLowerCase())
  );

  const toggleSection = (idx: number) => {
    setExpandedSections(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  // ==================================================================================
  // RENDER UTAMA
  // ==================================================================================

  return (
    <div className="p-6 md:p-10 h-full flex flex-col pb-24 md:pb-8 animate-fade-in max-w-7xl mx-auto">
      
      {/* --- HEADER TITLE & TAB SWITCHER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-3">
            <Activity className="text-teal-600" /> OSCE Center
          </h2>
          <p className="text-gray-500">Pusat latihan keterampilan klinis terlengkap.</p>
        </div>

        <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
          <button 
            onClick={() => { setActiveTab('simulation'); setSelectedChecklist(null); }}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'simulation' ? 'bg-white dark:bg-gray-700 shadow text-teal-600 dark:text-teal-400' : 'text-gray-500'}`}
          >
            Simulasi Kasus
          </button>
          <button 
            onClick={() => { setActiveTab('checklist'); setSelectedCase(null); }}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'checklist' ? 'bg-white dark:bg-gray-700 shadow text-teal-600 dark:text-teal-400' : 'text-gray-500'}`}
          >
            <ClipboardList className="w-4 h-4"/> Ceklis Kompetensi
          </button>
        </div>
      </div>

      {/* ==================================================================================
          TAB 1: SIMULASI KASUS (LOGIKA LAMA)
         ================================================================================== */}
      {activeTab === 'simulation' && (
        !selectedCase ? (
          // LIST VIEW SIMULASI
          <div className="animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
              <div className="relative w-full md:w-72">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input type="text" placeholder="Cari kasus diagnosis..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2.5 border rounded-xl bg-white dark:bg-gray-900 dark:border-gray-800 focus:ring-2 focus:ring-teal-500 outline-none shadow-sm transition-all dark:text-white" />
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-64 flex-shrink-0 flex md:flex-col gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {STASE_LIST.map(stase => (
                  <button key={stase.id} onClick={() => { setSelectedStase(stase.id); setSearchQuery(''); }} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${selectedStase === stase.id ? 'bg-teal-600 text-white shadow-lg shadow-teal-500/20' : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 border border-transparent'}`}>
                    {stase.name}
                  </button>
                ))}
              </div>

              <div className="flex-1 space-y-4">
                {filteredCases.length > 0 ? filteredCases.map((kasus) => (
                  <div key={kasus.id} onClick={() => handleSelectCase(kasus)} className={`p-6 rounded-2xl border flex justify-between items-center cursor-pointer transition-all duration-300 ${(!kasus.isFree && !isPro) ? 'opacity-70 bg-gray-50 dark:bg-gray-900/50' : 'hover:border-teal-500 hover:shadow-md bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800'}`}>
                    <div>
                      <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-2">{kasus.title}</h4>
                      <div className="flex gap-2">
                        <Badge color={kasus.difficulty === 'Easy' ? 'green' : 'yellow'}>{kasus.difficulty}</Badge>
                        {!kasus.isFree && <Badge color="yellow">PRO</Badge>}
                        {kasus.imageUrl && <Badge color="blue">IMG</Badge>}
                      </div>
                    </div>
                    <ChevronRight className="text-gray-400" />
                  </div>
                )) : (
                  <div className="text-center py-10 text-gray-400 border border-dashed rounded-2xl">Tidak ada kasus ditemukan.</div>
                )}
              </div>
            </div>
          </div>
        ) : (
          // DETAIL VIEW SIMULASI (KODE SEBELUMNYA)
          <div className="max-w-5xl mx-auto pb-32 animate-fade-in">
            {/* ... (Konten Detail Simulasi - Timer, Soal, dll tetap sama) ... */}
            {/* Saya persingkat di sini agar tidak terlalu panjang, gunakan kode Detail View dari OsceSection.tsx sebelumnya */}
            <div className="sticky top-0 z-20 bg-gray-50/95 dark:bg-black/95 backdrop-blur-md py-4 mb-6 border-b border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 transition-all shadow-sm">
              <div className="flex items-center gap-4 w-full md:w-auto">
                <button onClick={() => setSelectedCase(null)} className="flex items-center text-gray-500 hover:text-teal-600 font-medium transition-colors">
                  <ChevronRight className="rotate-180 w-5 h-5 mr-1" /> Kembali
                </button>
                <div className="flex bg-gray-200 dark:bg-gray-800 rounded-lg p-1">
                  <button onClick={() => { setMode('practice'); setTimerActive(false); setIsExamFinished(false); }} className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${mode === 'practice' ? 'bg-white dark:bg-gray-700 shadow text-teal-700 dark:text-teal-300' : 'text-gray-500'}`}>Latihan</button>
                  <button onClick={() => { setMode('exam'); setTimerActive(false); setTimeLeft(900); setIsExamFinished(false); setCheckedItems({}); }} className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${mode === 'exam' ? 'bg-red-500 text-white shadow' : 'text-gray-500'}`}>Ujian</button>
                </div>
              </div>
              <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                <div className={`px-4 py-2 rounded-xl flex items-center gap-3 font-mono font-bold text-lg shadow-inner transition-colors ${timerActive ? 'bg-red-100 text-red-600 dark:bg-red-900/30' : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'}`}>
                  <Timer className={`w-5 h-5 ${timerActive ? 'animate-pulse' : ''}`} /> {formatTime(timeLeft)}
                </div>
                {mode === 'practice' ? (
                  <button onClick={() => setTimerActive(!timerActive)} className={`p-3 rounded-xl text-white shadow-lg transition-all active:scale-95 ${timerActive ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-teal-600 hover:bg-teal-700'}`}>
                    {timerActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  </button>
                ) : (
                  !isExamFinished ? (
                    !timerActive ? <Button onClick={() => setTimerActive(true)} className="bg-teal-600">Mulai Ujian</Button> : <Button onClick={handleFinishExam} className="bg-red-600 hover:bg-red-700">Selesai</Button>
                  ) : <Button onClick={() => { setTimeLeft(900); setIsExamFinished(false); setCheckedItems({}); }} variant="outline" icon={RotateCcw}>Ulang</Button>
                )}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
              <div className="bg-gradient-to-r from-teal-600 to-emerald-600 p-8 text-white">
                <div className="flex justify-between items-start">
                  <div>
                    <Badge className="bg-white/20 text-white border-none mb-2">Stase {STASE_LIST.find(s => s.id === selectedStase)?.name}</Badge>
                    <h2 className="text-3xl font-bold">{selectedCase.title}</h2>
                  </div>
                  <Button size="sm" variant="ghost" className="text-white hover:bg-white/10" icon={Flag} onClick={() => alert("Laporan terkirim.")}>Lapor</Button>
                </div>
                {mode === 'exam' && !isExamFinished && (
                  <div className="mt-4 bg-red-500/20 border border-red-500/30 p-3 rounded-lg flex items-center gap-2 text-sm text-red-50 font-medium animate-pulse">
                    <AlertTriangle className="w-4 h-4" /> Mode Ujian Aktif: Kunci jawaban disembunyikan.
                  </div>
                )}
              </div>
              
              <div className="p-8 space-y-10">
                {/* Image Data */}
                {selectedCase.imageUrl && (
                  <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-gray-900 dark:text-white"><ImageIcon className="text-teal-600 w-5 h-5" /> Data Penunjang</h3>
                    <div className="rounded-xl overflow-hidden shadow-md bg-black">
                      <img src={selectedCase.imageUrl} alt="Case visual" className="w-full max-h-[400px] object-contain" />
                    </div>
                    {selectedCase.imageCaption && <p className="text-center text-sm text-gray-500 mt-3 italic">{selectedCase.imageCaption}</p>}
                  </div>
                )}

                {/* Analysis */}
                <div className={`transition-all duration-500 ${(mode === 'exam' && !isExamFinished) ? 'opacity-50 grayscale blur-sm pointer-events-none select-none' : 'opacity-100'}`}>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-xl flex items-center gap-3 text-gray-900 dark:text-white"><Activity className="text-teal-600 w-6 h-6" /> Analisis & Diagnosis</h3>
                    {(mode === 'exam' && !isExamFinished) && <Badge color="red" className="flex items-center gap-1"><EyeOff className="w-3 h-3"/> Tersembunyi</Badge>}
                  </div>
                  {!(mode === 'exam' && !isExamFinished) ? (
                    <>
                      <div className="grid gap-4 mb-8">
                        {selectedCase.analysis.map((row, idx) => (
                          <div key={idx} className="flex flex-col md:flex-row border-b border-gray-100 dark:border-gray-800 pb-4 last:border-0">
                            <span className="w-full md:w-1/3 font-bold text-gray-700 dark:text-gray-300 mb-1 md:mb-0">{row.aspect}</span>
                            <span className="w-full md:w-2/3 text-gray-600 dark:text-gray-400 leading-relaxed">{row.point}</span>
                          </div>
                        ))}
                      </div>
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-800">
                        <h3 className="font-bold text-blue-800 dark:text-blue-300 mb-4 flex items-center gap-2"><Brain className="w-5 h-5" /> Key Points & Clues</h3>
                        <ul className="space-y-2">
                          {selectedCase.keyPoints.map((kp, i) => (
                            <li key={i} className="flex gap-3 text-blue-900 dark:text-blue-200 text-sm"><div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div><span className="leading-relaxed">{kp}</span></li>
                          ))}
                        </ul>
                      </div>
                    </>
                  ) : (
                    <div className="h-40 bg-gray-100 dark:bg-gray-800 rounded-xl flex flex-col items-center justify-center text-gray-400 gap-2 border border-dashed border-gray-300 dark:border-gray-700"><EyeOff className="w-8 h-8" /><p>Selesaikan ujian untuk melihat analisis.</p></div>
                  )}
                </div>

                {/* Checklist */}
                <div>
                  <div className="flex justify-between items-center mb-6 border-b border-gray-200 dark:border-gray-800 pb-4">
                    <h3 className="font-bold text-xl flex items-center gap-3 text-gray-900 dark:text-white"><CheckCircle className="text-teal-600 w-6 h-6" /> Checklist Mandiri</h3>
                    {(!(mode === 'exam' && !isExamFinished)) && (
                      <div className={`px-4 py-1.5 rounded-full text-sm font-bold border ${calculateScore() >= 75 ? 'bg-green-100 text-green-700 border-green-200' : 'bg-yellow-100 text-yellow-700 border-yellow-200'}`}>Skor Akhir: {calculateScore()}%</div>
                    )}
                  </div>
                  <div className="space-y-3">
                    {selectedCase.checklist.map((item, idx) => {
                      const isChecked = checkedItems[`${selectedCase.id}-${idx}`];
                      return (
                        <div key={idx} onClick={() => toggleCheck(idx)} className={`p-4 rounded-xl border cursor-pointer flex items-center gap-4 transition-all duration-200 ${isChecked ? 'bg-green-50 border-green-500 dark:bg-green-900/20 dark:border-green-800' : 'hover:bg-gray-50 dark:hover:bg-gray-800 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800'}`}>
                          <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${isChecked ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 dark:border-gray-600'}`}>{isChecked && <Check className="w-4 h-4" />}</div>
                          <span className={`text-sm font-medium ${isChecked ? 'text-green-800 dark:text-green-300 line-through decoration-green-500/30' : 'text-gray-700 dark:text-gray-300'}`}>{item}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      )}

      {/* ==================================================================================
          TAB 2: CEKLIS KOMPETENSI (LOGIKA BARU)
         ================================================================================== */}
      {activeTab === 'checklist' && (
        !selectedChecklist ? (
          // VIEW DAFTAR CEKLIS
          <div className="animate-fade-in">
            <div className="mb-6 relative w-full md:w-96 mx-auto">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Cari ceklis (cth: thorax, abdomen)..." 
                value={checklistSearch}
                onChange={(e) => setChecklistSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border rounded-xl bg-white dark:bg-gray-900 dark:border-gray-800 focus:ring-2 focus:ring-teal-500 outline-none shadow-sm dark:text-white" 
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {filteredChecklists.map((item) => (
                <div 
                  key={item.id} 
                  onClick={() => setSelectedChecklist(item)}
                  className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 cursor-pointer hover:border-teal-500 hover:shadow-lg transition-all group"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="bg-teal-50 dark:bg-teal-900/20 p-3 rounded-xl text-teal-600 group-hover:scale-110 transition-transform">
                      <ClipboardList className="w-6 h-6" />
                    </div>
                    <Badge color="outline">{item.category}</Badge>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{item.title}</h4>
                  <p className="text-sm text-gray-500">
                    {item.steps.length} Bagian • {item.steps.reduce((acc, curr) => acc + curr.items.length, 0)} Item Ceklis
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          // VIEW DETAIL CEKLIS
          <div className="max-w-4xl mx-auto pb-32 animate-fade-in">
            <div className="sticky top-0 z-20 bg-gray-50/95 dark:bg-black/95 backdrop-blur-md py-4 mb-6 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
              <button onClick={() => setSelectedChecklist(null)} className="flex items-center text-gray-500 hover:text-teal-600 font-medium transition-colors">
                <ChevronRight className="rotate-180 w-5 h-5 mr-1" /> Kembali
              </button>
              <div className="font-bold text-gray-900 dark:text-white text-lg truncate ml-4 flex-1 text-right">
                {selectedChecklist.title}
              </div>
            </div>

            <div className="space-y-6">
              {selectedChecklist.steps.map((step, idx) => {
                const isExpanded = expandedSections[idx] !== false; // Default expanded
                return (
                  <div key={idx} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
                    <button 
                      onClick={() => toggleSection(idx)}
                      className="w-full flex justify-between items-center p-5 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <h4 className="font-bold text-lg text-teal-700 dark:text-teal-400 flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center text-sm">{idx + 1}</span>
                        {step.section}
                      </h4>
                      <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {isExpanded && (
                      <div className="p-5 space-y-3 border-t border-gray-100 dark:border-gray-800">
                        {step.items.map((item, i) => (
                          <div key={i} className="flex gap-4 items-start">
                            <div className="mt-1 min-w-5">
                              <div className="w-5 h-5 rounded-full border-2 border-gray-300 dark:border-gray-600"></div>
                            </div>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{item}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )
      )}

    </div>
  );
};