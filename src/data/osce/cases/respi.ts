import { OSCECase } from '../../types';

export const CASES_RESPI: OSCECase[] = [
  {
    id: 101, 
    title: 'Serangan Asma Akut',
    difficulty: 'Medium',
    isFree: true,
    imageUrl: null,
    analysis: [
      { aspect: 'Anamnesis', point: 'Sesak napas memberat, bunyi "ngik", riwayat atopi.' },
      { aspect: 'Pemeriksaan Fisik', point: 'Tachypnea, retraksi, Wheezing ekspiratoir difus.' }
    ],
    keyPoints: ['Diagnosis: Asma Eksaserbasi.', 'Tx: Oksigen + Nebu SABA.'],
    checklist: ['Salam & Informed Consent', 'Anamnesis', 'Pemfis Thorax', 'Diagnosis', 'Edukasi']
  },
  // Tambah kasus respi lain di sini...
];