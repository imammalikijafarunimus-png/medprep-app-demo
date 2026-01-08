import { OSCECase } from '../../types';

export const CASES_KARDIO: OSCECase[] = [
  {
    id: 201, 
    title: 'Angina Pectoris Stabil',
    difficulty: 'Easy',
    isFree: true,
    imageUrl: 'https://placehold.co/600x200/e2e8f0/1e293b?text=EKG+Strip:+ST+Depression',
    imageCaption: 'Gambaran EKG saat serangan',
    analysis: [{ aspect: 'EKG', point: 'Depresi ST / T Inverted pada lead V1-V4' }],
    keyPoints: ['Nyeri membaik dengan istirahat', 'Tx: ISDN, Aspirin'],
    checklist: ['Anamnesis Nyeri Dada', 'EKG', 'Edukasi']
  }
];