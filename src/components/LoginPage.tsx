import React, { useState } from 'react';
import { 
  LogIn, Lock, Mail, AlertCircle, CheckCircle2, Eye, EyeOff, BookOpen 
} from 'lucide-react';
import { 
  signInWithEmailAndPassword
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { saveDocument } from '../lib/firestoreService';
import { User } from '../types';

interface LoginPageProps {
  onLoginSuccess: (user: User) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Status states
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Map Firebase Auth Errors to Indonesian
  const getIndonesianErrorMessage = (errorCode: string): string => {
    switch (errorCode) {
      case 'auth/invalid-credential':
      case 'auth/wrong-password':
      case 'auth/user-not-found':
        return 'Email atau kata sandi tidak sesuai. Silakan periksa kredensial Anda atau daftar akun baru.';
      case 'auth/email-already-in-use':
        return 'Email ini sudah terdaftar di sistem. Silakan pilih tab "Masuk" di atas.';
      case 'auth/weak-password':
        return 'Kata sandi terlalu lemah. Gunakan minimal 6 karakter.';
      case 'auth/invalid-email':
        return 'Format email tidak valid (contoh: user@sekolah.sch.id).';
      case 'auth/too-many-requests':
        return 'Terlalu banyak percobaan gagal. Silakan tunggu beberapa saat sebelum mencoba kembali.';
      case 'auth/network-request-failed':
        return 'Gagal terhubung ke jaringan. Periksa koneksi internet Anda.';
      default:
        return 'Terjadi kesalahan autentikasi. Silakan periksa kredensial Anda.';
    }
  };

  // Handle Login Submit via Firebase Auth
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!email || !password) {
      setErrorMessage('Mohon isi Email dan Kata Sandi.');
      return;
    }

    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password);
      const fbUser = userCredential.user;

      let appUser: User | null = null;

      try {
        // Fetch Firestore user doc
        const userDocRef = doc(db, 'users', fbUser.uid);
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
          appUser = docSnap.data() as User;
        }
      } catch (fsErr) {
        console.warn('Firestore user fetch offline/warning:', fsErr);
      }

      if (!appUser) {
        appUser = {
          id: fbUser.uid,
          name: fbUser.displayName || 'Sahidin, S.Pd., Gr.',
          email: fbUser.email || email,
          role: 'admin',
          total_xp: 9990,
          levelTitle: 'Guru Pengampu Sosiologi / Admin LMS',
          avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=Sahidin`,
          grade: 12,
          streakDays: 30,
          schoolName: 'SMA Negeri Sosiologi',
          group_name: 'Guru Sosiologi',
        };
        saveDocument('users', fbUser.uid, appUser);
      } else {
        // Firebase user logged in gets Superadmin control
        appUser = {
          ...appUser,
          name: appUser.name || 'Sahidin, S.Pd., Gr.',
          role: 'admin',
          levelTitle: 'Guru Pengampu Sosiologi / Admin LMS',
        };
      }

      setSuccessMessage(`Login Berhasil! Selamat datang kembali, ${appUser.name} (Guru Superadmin)`);
      setTimeout(() => {
        onLoginSuccess(appUser!);
      }, 600);

    } catch (err: any) {
      console.error('Firebase Auth Login Error:', err);
      // Fallback for offline mode if network error or client offline
      const errStr = String(err?.message || err);
      if (errStr.includes('offline') || err.code === 'auth/network-request-failed') {
        const offlineUser: User = {
          id: `usr_offline_${Date.now()}`,
          name: email.split('@')[0] || 'Guru Super Admin Sosiologi',
          email: email.trim(),
          role: 'admin',
          total_xp: 9990,
          levelTitle: 'Super Admin Utama / Guru Pengampu Sosiologi',
          avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(email)}`,
          grade: 12,
          streakDays: 1,
          schoolName: 'SMA Negeri 1 Membumi',
          group_name: 'Super Admin',
        };
        setSuccessMessage(`Login Mode Offline: Selamat datang, ${offlineUser.name}`);
        setTimeout(() => {
          onLoginSuccess(offlineUser);
        }, 600);
      } else {
        const code = err.code || '';
        setErrorMessage(getIndonesianErrorMessage(code));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Background Subtle Glow Decor */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md bg-stone-900 border border-amber-600/50 rounded-3xl shadow-2xl overflow-hidden relative z-10 text-stone-100">
        
        {/* Brand Header */}
        <div className="bg-gradient-to-r from-emerald-950 via-stone-900 to-amber-950 p-6 border-b border-stone-800 text-center space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-500 text-stone-950 font-black shadow-lg border border-amber-300 mx-auto">
            <BookOpen className="w-7 h-7" />
          </div>
          <h1 className="text-xl font-extrabold text-amber-200 tracking-tight">
            LMS SOSIOLOGI MEMBUMI
          </h1>
          <p className="text-xs text-stone-400 font-medium">
            Portal Pembelajaran & CBT Sosiologi SMA • Firebase Authenticated
          </p>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-5">

          {/* Feedback Messages */}
          {errorMessage && (
            <div className="p-3 bg-red-950/90 border border-red-500 text-red-200 rounded-2xl text-xs font-semibold flex items-start space-x-2.5 animate-fade-in">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="p-3 bg-emerald-950/90 border border-emerald-500 text-emerald-200 rounded-2xl text-xs font-semibold flex items-start space-x-2.5 animate-fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* LOGIN FORM */}
          <form onSubmit={handleLogin} className="space-y-4">
              {/* Email Input */}
              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1">Email Terdaftar:</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 w-4 h-4 text-stone-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@sosiologimembumi.sch.id"
                    required
                    className="w-full bg-stone-800 border border-stone-700 rounded-xl pl-10 pr-3 py-2.5 text-xs text-stone-100 focus:outline-none focus:border-amber-500 transition-all"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1">Kata Sandi (Password):</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3 w-4 h-4 text-stone-500" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full bg-stone-800 border border-stone-700 rounded-xl pl-10 pr-10 py-2.5 text-xs text-stone-100 focus:outline-none focus:border-amber-500 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-stone-400 hover:text-stone-200"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-amber-500 via-amber-600 to-emerald-600 text-stone-950 font-black rounded-xl text-xs hover:from-amber-400 hover:to-emerald-500 transition-all shadow-lg flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50 mt-2"
              >
                {loading ? (
                  <span className="flex items-center space-x-2">
                    <span className="w-4 h-4 border-2 border-stone-950 border-t-transparent rounded-full animate-spin"></span>
                    <span>Memverifikasi Firebase Auth...</span>
                  </span>
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    <span>Masuk Ke LMS Sosiologi</span>
                  </>
                )}
              </button>
            </form>
        </div>

        {/* Footer info */}
        <div className="bg-stone-950 px-6 py-3 border-t border-stone-800 text-stone-500 text-[10px] flex items-center justify-between">
          <span>Sosiologi Membumi Enterprise</span>
          <span>Firebase Auth: lms-sosiologi</span>
        </div>
      </div>
    </div>
  );
};
