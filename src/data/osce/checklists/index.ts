import { RESPI_CHECKLISTS } from './respi'; // Pastikan di respi.ts Anda export const RESPI_CHECKLISTS = [...]
import { CHECKLIST_KARDIO } from './kardio';
import { OSCEChecklistData } from '../../types';

export const ALL_CHECKLISTS: OSCEChecklistData[] = [
  ...RESPI_CHECKLISTS,
  CHECKLIST_KARDIO,
  // Tambahkan checklist lain di sini
];