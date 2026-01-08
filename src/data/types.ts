// --- OSCE TYPES ---
export interface AnalysisRow {
  aspect: string;
  point: string;
}

export interface OSCECase {
  id: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  isFree: boolean;
  imageUrl?: string | null;
  imageCaption?: string;
  analysis: AnalysisRow[];
  keyPoints: string[];
  checklist: string[];
}

// [NEW] Checklist Data Interface
export interface OSCEChecklistData {
  id: string;
  title: string;
  category: string;
  steps: {
    section: string;
    items: string[];
  }[];
}

// --- FLASHCARD TYPES ---
export interface Flashcard {
  id: number;
  front: string;
  back: string;
  category: string;
  isFree: boolean;
  imageUrl?: string | null;
}

// --- CBT TYPES ---
export interface CBTNote {
  category: string;
  title: string;
  clues: string[];
  isFree: boolean;
}

// --- QUIZ TYPES ---
export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // Index of correct answer (0-3)
  explanation: string;
}

// --- GENERAL TYPES ---
export interface Stase {
  id: string;
  name: string;
}