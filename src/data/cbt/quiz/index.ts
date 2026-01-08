import { QUIZ_KARDIO } from './kardio';
import { QUIZ_GINJAL } from './ginjal';
// Import quiz sistem lain...

// Dummy sisa
import { QuizQuestion } from '../../types';
const QUIZ_OTHERS: QuizQuestion[] = [
   {
    id: 3,
    question: "Pasien wanita 25 tahun, benjolan di payudara kanan, kenyal, mudah digerakkan, tidak nyeri. Diagnosis paling mungkin?",
    options: ["Fibroadenoma Mammae (FAM)", "Karsinoma Mammae", "Abses Payudara", "Fibrokistik Mammae"],
    correctAnswer: 0, 
    explanation: "FAM khas pada wanita muda (<30 th), benjolan kenyal, mobile, batas tegas, dan umumnya tidak nyeri (atau nyeri ringan saat haid)."
  }
];

export const ALL_QUIZ_QUESTIONS: QuizQuestion[] = [
  ...QUIZ_KARDIO,
  ...QUIZ_GINJAL,
  ...QUIZ_OTHERS,
];