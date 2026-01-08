import { OSCEChecklistData } from '../../types';

export const CHECKLIST_RESPI_THORAX: OSCEChecklistData = {
  id: 'c-respi-thorax',
  title: 'Pemeriksaan Fisik Thorax (Paru)',
  category: 'Respirasi',
  steps: [
    {
      section: 'Persiapan & Informed Consent',
      items: [
        'Mengucapkan salam dan memperkenalkan diri',
        'Menanyakan identitas pasien (Nama, Usia, Alamat)',
        'Menjelaskan tujuan dan prosedur pemeriksaan',
        'Meminta persetujuan (Informed Consent)',
        'Melakukan cuci tangan 6 langkah WHO'
      ]
    },
    // ... (langkah-langkah lain tetap sama)
    {
      section: 'Pasca Tindakan',
      items: [
        'Menyampaikan hasil pemeriksaan kepada pasien',
        'Melakukan cuci tangan setelah tindakan',
        'Mencatat hasil di rekam medis'
      ]
    }
  ]
};

export const CHECKLIST_RESPI_ASMA: OSCEChecklistData = {
  id: 'c-respi-asma',
  title: 'Tatalaksana Serangan Asma Akut',
  category: 'Respirasi',
  steps: [
    {
      section: 'Primary Survey (Airway & Breathing)',
      items: [
        'Cek patensi jalan napas (bisa bicara kalimat penuh?)',
        'Cek saturasi oksigen (Target >92-95%)',
        'Berikan Oksigen jika desaturasi',
        'Auskultasi: Wheezing ekspiratoir/inspiratoir'
      ]
    },
    // ... (langkah-langkah lain tetap sama)
  ]
};

// --- PENTING: EXPORT GABUNGAN INI HARUS ADA ---
export const RESPI_CHECKLISTS = [CHECKLIST_RESPI_THORAX, CHECKLIST_RESPI_ASMA];