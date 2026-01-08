import { CBT_NOTES_NEURO } from './neuro';
import { CBT_NOTES_RESPI } from './respi';
// Import file sistem organ lain di sini...
// import { CBT_NOTES_KARDIO } from './kardio';

// Data dummy hardcoded yang belum dipindah ke file terpisah (Sisa 11 sistem lain)
// Sebaiknya nanti semua dipindah ke file masing-masing seperti contoh di atas
import { CBTNote } from '../../types';

const CBT_NOTES_OTHERS: CBTNote[] = [
  { category: 'Indra (THT & Mata)', title: 'Otitis Media Akut (OMA)', clues: ['Stadium: Oklusi -> Hiperemis -> Supurasi -> Perforasi -> Resolusi', 'Membran timpani bulging (Supurasi)', 'Tx: Antibiotik + Dekongestan'], isFree: true },
  { category: 'Reproduksi', title: 'Pre-eklampsia Berat', clues: ['TD >= 160/110 mmHg', 'Proteinuria +2', 'Impending Eklampsia: Nyeri kepala hebat, pandangan kabur', 'Tx: MgSO4 (Loading & Maintenance)'], isFree: false },
  // ... (sisanya dari dummyData lama)
];

export const ALL_CBT_NOTES: CBTNote[] = [
  ...CBT_NOTES_NEURO,
  ...CBT_NOTES_RESPI,
  ...CBT_NOTES_OTHERS, 
  // ...CBT_NOTES_KARDIO,
];