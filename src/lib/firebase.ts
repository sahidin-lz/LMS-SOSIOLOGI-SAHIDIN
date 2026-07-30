import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Konfigurasi Firebase khusus LMS Sosiologi
export const firebaseConfig = {
  apiKey: "AIzaSyAbbe4nEov1hvv6Op8yGy2DcpWxgbSOIfM",
  authDomain: "lms-sosiologi.firebaseapp.com",
  projectId: "lms-sosiologi",
  storageBucket: "lms-sosiologi.firebasestorage.app",
  messagingSenderId: "78649220828",
  appId: "1:78649220828:web:63b5b4c8aca0106cc55e19"
};

// Inisialisasi Firebase App
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Inisialisasi Firestore
export const db = getFirestore(app);

export default app;
