const fs = require('fs');
const content = `import { initializeApp, getApps } from 'firebase/app';
import { 
  getFirestore, 
  initializeFirestore, 
  persistentLocalCache, 
  persistentMultipleTabManager 
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

export const firebaseConfig = {
  apiKey: "AIzaSyAbbe4nEov1hvv6Op8yGy2DcpWxgbSOIfM",
  authDomain: "lms-sosiologi.firebaseapp.com",
  projectId: "lms-sosiologi",
  storageBucket: "lms-sosiologi.firebasestorage.app",
  messagingSenderId: "78649220828",
  appId: "1:78649220828:web:63b5b4c8aca0106cc55e19"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Inisialisasi Firestore dengan Offline Persistence
export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() })
});

export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;
`;
fs.writeFileSync('src/lib/firebase.ts', content, 'utf8');
