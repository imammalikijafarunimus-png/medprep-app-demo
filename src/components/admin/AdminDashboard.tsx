import React, { useState } from 'react';
import { 
  LayoutDashboard, FileText, Zap, BookOpen, ChevronLeft, Plus, Trash2, Edit, Save, X 
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { STASE_LIST, INITIAL_OSCE_CASES, OSCECase } from '../../data/dummyData';
import { ToastType } from '../ui/Toast';

interface AdminDashboardProps {
  setView: (view: string) => void;
  // Tambahkan prop addToast agar sesuai dengan AppContainer
  addToast?: (msg: string, type: ToastType) => void; 
}

export const AdminDashboard = ({ setView, addToast }: AdminDashboardProps) => {
  const [activeTab, setActiveTab] = useState<'osce' | 'cbt' | 'flashcard'>('osce');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black p-6 md:p-10 animate-fade-in pb-32">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600">
              <LayoutDashboard className="w-6 h-6" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Panel</h1>
          </div>
          <p className="text-gray-500">Kelola konten aplikasi MedPrep dari satu tempat.</p>
        </div>
        <Button variant="outline" icon={ChevronLeft} onClick={() => setView('home')}>
          Kembali ke App
        </Button>
      </div>

      {/* --- TABS --- */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {[
          { id: 'osce', label: 'Manajemen OSCE', icon: FileText },
          { id: 'cbt', label: 'Manajemen CBT', icon: BookOpen },
          { id: 'flashcard', label: 'Manajemen Flashcard', icon: Zap },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all whitespace-nowrap
              ${activeTab === tab.id 
                ? 'bg-white dark:bg-gray-800 text-teal-600 shadow-md border border-teal-100 dark:border-teal-900' 
                : 'text-gray-500 hover:bg-white/50 dark:hover:bg-gray-800/50'
              }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* --- CONTENT AREA --- */}
      <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 p-6 md:p-8 shadow-sm min-h-[500px]">
        {activeTab === 'osce' && <AdminOSCEManager addToast={addToast} />}
        {activeTab === 'cbt' && <div className="text-center py-20 text-gray-400">Fitur Manajemen CBT Segera Hadir</div>}
        {activeTab === 'flashcard' && <div className="text-center py-20 text-gray-400">Fitur Manajemen Flashcard Segera Hadir</div>}
      </div>

    </div>
  );
};

// --- SUB-COMPONENT: OSCE MANAGER ---
const AdminOSCEManager = ({ addToast }: { addToast?: (msg: string, type: ToastType) => void }) => {
  // State Lokal untuk demo CRUD
  // Pastikan tipe data state didefinisikan sebagai Record<string, OSCECase[]>
  const [cases, setCases] = useState<Record<string, OSCECase[]>>(INITIAL_OSCE_CASES);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<Partial<OSCECase> & { staseId?: string }>({});

  // Flatten cases untuk list view dengan TIPE DATA EKSPLISIT
  const allCases = Object.entries(cases).flatMap(([staseId, items]) => 
    (items as OSCECase[]).map((item: OSCECase) => ({ ...item, staseId }))
  );

  const handleDelete = (id: number, staseId: string) => {
    if (confirm('Hapus kasus ini permanen?')) {
      const updated = { ...cases };
      // Pastikan staseId valid sebelum filter
      if (updated[staseId]) {
        updated[staseId] = updated[staseId].filter((c: OSCECase) => c.id !== id);
        setCases(updated);
        if (addToast) addToast('Kasus berhasil dihapus', 'success');
        else alert('Kasus berhasil dihapus');
      }
    }
  };

  const handleEdit = (kasus: OSCECase & { staseId: string }) => {
    setEditData(kasus);
    setIsEditing(true);
  };

  const handleAddNew = () => {
    setEditData({ 
      title: '', 
      difficulty: 'Easy', 
      isFree: false, 
      checklist: [''], 
      staseId: 'respi' 
    });
    setIsEditing(true);
  };

  const handleSave = () => {
    if (addToast) addToast('Simpan Data: ' + editData.title, 'success');
    else alert('Simpan Data: ' + editData.title);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="max-w-3xl mx-auto animate-fade-in">
        <div className="flex justify-between items-center mb-6 border-b border-gray-100 dark:border-gray-800 pb-4">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">
            {editData.id ? 'Edit Kasus' : 'Tambah Kasus Baru'}
          </h3>
          <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Judul Kasus</label>
            <input 
              className="w-full p-3 border rounded-xl bg-gray-50 dark:bg-black dark:border-gray-700 outline-none focus:ring-2 focus:ring-teal-500 dark:text-white"
              value={editData.title || ''}
              onChange={e => setEditData({...editData, title: e.target.value})}
              placeholder="Contoh: Asma Bronkiale Eksaserbasi Akut"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Stase</label>
              <select 
                className="w-full p-3 border rounded-xl bg-gray-50 dark:bg-black dark:border-gray-700 outline-none dark:text-white"
                value={editData.staseId || 'respi'}
                onChange={e => setEditData({...editData, staseId: e.target.value})}
              >
                {STASE_LIST.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Tingkat Kesulitan</label>
              <select 
                className="w-full p-3 border rounded-xl bg-gray-50 dark:bg-black dark:border-gray-700 outline-none dark:text-white"
                value={editData.difficulty || 'Easy'}
                onChange={e => setEditData({...editData, difficulty: e.target.value as any})}
              >
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>
            </div>
          </div>

          {/* Simple Checklist Editor */}
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Checklist Items</label>
            <div className="space-y-2 max-h-60 overflow-y-auto p-2 border rounded-xl border-gray-200 dark:border-gray-800">
              {editData.checklist?.map((item, idx) => (
                <div key={idx} className="flex gap-2">
                  <span className="text-gray-400 text-sm py-2">{idx + 1}.</span>
                  <input 
                    className="w-full p-2 text-sm bg-transparent border-b border-gray-200 dark:border-gray-700 focus:border-teal-500 outline-none dark:text-white"
                    value={item}
                    onChange={e => {
                      const newChecklist = [...(editData.checklist || [])];
                      newChecklist[idx] = e.target.value;
                      setEditData({...editData, checklist: newChecklist});
                    }}
                  />
                </div>
              ))}
              <Button 
                size="sm" variant="ghost" 
                onClick={() => setEditData({...editData, checklist: [...(editData.checklist || []), '']})}
              >
                + Tambah Item
              </Button>
            </div>
          </div>

          <div className="flex gap-3 pt-6">
            <Button onClick={handleSave} icon={Save} fullWidth>Simpan Perubahan</Button>
            <Button variant="ghost" onClick={() => setIsEditing(false)}>Batal</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-lg text-gray-700 dark:text-gray-200">Daftar Kasus OSCE</h3>
        <Button onClick={handleAddNew} icon={Plus}>Buat Kasus Baru</Button>
      </div>

      <div className="space-y-3">
        {allCases.map((kasus) => (
          <div key={kasus.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-black/20 border border-gray-100 dark:border-gray-800 rounded-xl hover:border-teal-500 transition-all group">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge color="outline" className="text-[10px]">{STASE_LIST.find(s => s.id === kasus.staseId)?.name}</Badge>
                {kasus.isFree ? <Badge color="green">Free</Badge> : <Badge color="yellow">Pro</Badge>}
              </div>
              <h4 className="font-bold text-gray-900 dark:text-white">{kasus.title}</h4>
            </div>
            
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button size="sm" variant="ghost" className="text-blue-500 hover:bg-blue-50" onClick={() => handleEdit(kasus)}>
                <Edit className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="ghost" className="text-red-500 hover:bg-red-50" onClick={() => handleDelete(kasus.id, kasus.staseId as string)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};