import { db } from './firebase';
import { collection, addDoc, getDocs, deleteDoc } from 'firebase/firestore';
import { 
  INITIAL_OSCE_CASES, 
  INITIAL_FLASHCARDS, 
  INITIAL_QUIZ_QUESTIONS 
} from '../data/dummyData';

/**
 * Fungsi ini mengunggah semua data dummy ke Firestore.
 * Jalankan ini HANYA SEKALI untuk inisialisasi database.
 */
export const migrateStaticDataToFirebase = async () => {
  try {
    console.log("Memulai migrasi data...");

    // 1. Migrasi OSCE Cases
    const osceCollection = collection(db, "osce_cases");
    for (const [staseId, cases] of Object.entries(INITIAL_OSCE_CASES)) {
      for (const item of cases) {
        await addDoc(osceCollection, {
          ...item,
          staseId: staseId, // Tambahkan ID stase ke dalam dokumen
          updatedAt: new Date()
        });
      }
    }
    console.log("✅ OSCE Cases berhasil diunggah");

    // 2. Migrasi Flashcards
    const flashcardCollection = collection(db, "flashcards");
    for (const card of INITIAL_FLASHCARDS) {
      await addDoc(flashcardCollection, {
        ...card,
        updatedAt: new Date()
      });
    }
    console.log("✅ Flashcards berhasil diunggah");

    // 3. Migrasi Quiz Questions
    const quizCollection = collection(db, "cbt_quiz");
    for (const question of INITIAL_QUIZ_QUESTIONS) {
      await addDoc(quizCollection, {
        ...question,
        updatedAt: new Date()
      });
    }
    console.log("✅ Quiz Questions berhasil diunggah");

    alert("Migrasi Selesai! Cek Firebase Console Anda.");
  } catch (error) {
    console.error("Gagal migrasi:", error);
    alert("Terjadi kesalahan saat migrasi. Cek console.");
  }
};

/**
 * Fungsi pembantu jika Anda ingin membersihkan database (Gunakan hati-hati!)
 */
export const clearFirestoreCollection = async (collectionName: string) => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  querySnapshot.forEach(async (doc) => {
    await deleteDoc(doc.ref);
  });
  console.log(`Koleksi ${collectionName} telah dikosongkan.`);
};