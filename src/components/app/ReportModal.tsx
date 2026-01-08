"use client";

import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { AlertTriangle, Send } from 'lucide-react';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseTitle: string;
}

export const ReportModal = ({ isOpen, onClose, caseTitle }: ReportModalProps) => {
  const [reason, setReason] = useState('guideline');
  const [details, setDetails] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulasi kirim ke server
    setTimeout(() => {
      setIsSubmitting(false);
      alert(`Terima kasih, Dok! Laporan untuk "${caseTitle}" telah kami terima. Tim ahli kami akan meninjau update guideline yang Anda sarankan.`);
      setDetails(''); // Reset form
      onClose(); // Tutup modal
    }, 1500);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Lapor Masalah / Update">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg flex items-start gap-3 text-sm text-yellow-800 dark:text-yellow-200">
          <AlertTriangle className="w-5 h-5 flex-shrink-0" />
          <p>Laporan Anda membantu kami menjaga kualitas materi agar tetap update dengan PPK/Guideline terbaru.</p>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
            Jenis Masalah
          </label>
          <select 
            value={reason} 
            onChange={(e) => setReason(e.target.value)}
            className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-black text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-teal-500 transition-all"
          >
            <option value="guideline">Update Guideline Terbaru</option>
            <option value="key">Kunci Jawaban/Analisis Salah</option>
            <option value="typo">Typo / Kesalahan Ketik</option>
            <option value="image">Gambar Tidak Muncul / Buram</option>
            <option value="other">Lainnya</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
            Detail Laporan
          </label>
          <textarea 
            required
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            rows={4}
            className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-black text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-teal-500 transition-all resize-none"
            placeholder="Mohon sertakan referensi guideline terbaru jika ada..."
          />
        </div>

        <div className="pt-2 flex justify-end gap-3">
          <Button type="button" variant="ghost" onClick={onClose}>
            Batal
          </Button>
          <Button 
            type="submit" 
            disabled={isSubmitting} 
            className="bg-red-600 hover:bg-red-700 text-white shadow-red-500/20"
            icon={isSubmitting ? undefined : Send}
          >
            {isSubmitting ? 'Mengirim...' : 'Kirim Laporan'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};