// Re-export Types
export * from './types';

// Re-export Data
export { STASE_LIST } from './staseList';
export { ALL_FLASHCARDS as INITIAL_FLASHCARDS } from './flashcards';
export { INITIAL_CBT_NOTES, INITIAL_QUIZ_QUESTIONS } from './cbt';

// OSCE DATA (Cases & Checklists) imported from osce folder
import { ALL_OSCE_CASES, ALL_CHECKLISTS } from './osce';

export const INITIAL_OSCE_CASES = ALL_OSCE_CASES;
export const INITIAL_OSCE_CHECKLISTS = ALL_CHECKLISTS;