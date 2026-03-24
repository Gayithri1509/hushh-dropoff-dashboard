import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDZ5XaTQ-TCWXdyua-9A1IONp-T-fSd_jU",
  authDomain: "drop-of-detection.firebaseapp.com",
  projectId: "drop-of-detection",
  storageBucket: "drop-of-detection.firebasestorage.app",
  messagingSenderId: "149271123328",
  appId: "1:149271123328:web:3292b812f5b4d46ff99d65",
  measurementId: "G-L6RSMKMP96"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);