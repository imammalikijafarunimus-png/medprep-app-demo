import { OSCEChecklistData } from '../../types';

export const CHECKLIST_KARDIO: OSCEChecklistData = {
  id: 'c-kardio',
  title: 'Pemeriksaan Jantung',
  category: 'Kardiovaskular',
  steps: [
    {
      section: 'Inspeksi & Palpasi',
      items: [
        'Mencuci tangan dan informed consent',
        'Inspeksi Ictus Cordis (Terlihat/Tidak)',
        'Palpasi Ictus Cordis (Lokasi, Kuat angkat)',
        'Palpasi Thrill (Getaran)'
      ]
    },
    {
      section: 'Perkusi (Batas Jantung)',
      items: [
        'Menentukan Batas Kanan Jantung',
        'Menentukan Batas Kiri Jantung',
        'Menentukan Batas Atas Jantung (Pinggang Jantung)'
      ]
    },
    {
      section: 'Auskultasi',
      items: [
        'Auskultasi Katup Mitral (Apex)',
        'Auskultasi Katup Trikuspid (ICS IV-V Parasternal Kiri)',
        'Auskultasi Katup Pulmonal (ICS II Parasternal Kiri)',
        'Auskultasi Katup Aorta (ICS II Parasternal Kanan)',
        'Menilai Bunyi Jantung I dan II (Murni/Split)',
        'Menilai adanya Bising Jantung (Murmur/Gallop)'
      ]
    }
  ]
};