import { CASES_RESPI } from './respi';
import { CASES_KARDIO } from './kardio';
import { OSCECase } from '../../types';

export const ALL_OSCE_CASES: Record<string, OSCECase[]> = {
  'respi': CASES_RESPI,
  'kardio': CASES_KARDIO,
  // Tambahkan stase lain di sini nanti
};