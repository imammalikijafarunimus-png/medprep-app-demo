import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
apiKey: "AIzaSyB-DhPJ1pRZg4hnZpPXwCkXNb8CUaj_Fs0",
authDomain: "medprep-demo.firebaseapp.com",
projectId: "medprep-demo",
storageBucket: "medprep-demo.firebasestorage.app",
messagingSenderId: "795566402842",
appId: "1:795566402842:web:3c1e2d1b5891800de150a3",
measurementId: "G-LN2ZNDFJRV"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
