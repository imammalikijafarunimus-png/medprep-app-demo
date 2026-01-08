import { FLASHCARD_NEURO } from './neuro';
// import { FLASHCARD_RESPI } from './respi';
import { Flashcard } from '../types';

// Gabungkan semua array flashcard
export const ALL_FLASHCARDS: Flashcard[] = [
  ...FLASHCARD_NEURO,
  // ...FLASHCARD_RESPI,
  // Hardcoded contoh lain jika belum ada file terpisah:
  { id: 2, front: 'Diagnosis Gambaran Ini?', back: 'Pneumothorax Dextra', category: 'Respi', isFree: true, imageUrl: 'https://placehold.co/300x300/e2e8f0/1e293b?text=Rontgen+Thorax' },
  { id: 3, front: 'Rumus Baxter', back: '4cc x BB x %LB', category: 'Bedah', isFree: false, imageUrl: null }
];