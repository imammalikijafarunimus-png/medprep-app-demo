// src/lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Masukkan config yang kamu copy dari Firebase Console di sini
const firebaseConfig = {
 apiKey: "AIzaSyB-DhPJ1pRZg4hnZpPXwCkXNb8CUaj_Fs0",
 authDomain: "medprep-demo.firebaseapp.com",
 projectId: "medprep-demo",
 storageBucket: "medprep-demo.firebasestorage.app",
 messagingSenderId: "795566402842",
 appId: "1:795566402842:web:3c1e2d1b5891800de150a3",
 measurementId: "G-LN2ZNDFJRV"
};

// Inisialisasi Firebase (Cek agar tidak diinisialisasi 2x saat hot reload)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Inisialisasi Firestore (Database)
const db = getFirestore(app);

export { db };