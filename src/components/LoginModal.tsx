import React, { useState } from 'react';
import { UserCheck, GraduationCap, Shield, LogIn, Lock, Mail, User as UserIcon, X, Check, Key } from 'lucide-react';
import { User, Role } from '../types';
import { saveDocument } from '../lib/firestoreService';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
  onLoginSuccess: (user: User) => void;
}

export const DEMO_ACCOUNTS: User[] = [
  {
    id: 'usr_admin_01',
    name: 'Drs. Supriyadi, M.Pd (Super Admin)',
    email: 'admin@sosiologimembumi.sch.id',
    role: 'admin',
    total_xp: 9990,
    levelTitle: 'Administrator Utama',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    grade: 12,
    streakDays: 45,
    schoolName: 'SMA Negeri 1 Membumi',
    group_name: 'Semua Rombel',
  },
  {
    id: 'usr_guru_01',
    name: 'Ibu Ratna Pertiwi, S.Sos, M.Si',
    email: 'guru.sosiologi@sosiologimembumi.sch.id',
    role: 'guru',
    total_xp: 3450,
    levelTitle: 'Guru Pengampu Sosiologi',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
    grade: 12,
    streakDays: 30,
    schoolName: 'SMA Negeri 1 Membumi',
    group_name: 'PJ Sosiologi 10, 11, 12',
  },
  {
    id: 'usr_siswa_01',
    name: 'Ahmad Fauzi (Siswa TKA)',
    email: 'siswa.ahmad@sosiologimembumi.sch.id',
    role: 'siswa',
    total_xp: 1850,
    levelTitle: 'Sosiolog Muda - Master TKA',
    avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=250',
    grade: 12,
    streakDays: 14,
    schoolName: 'SMA Negeri 1 Membumi',
    group_id: 'rmb_12_ips1',
    group_name: '12 IPS 1',
  },
];

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLoginSuccess,
}) => {
  const [selectedRole, setSelectedRole] = useState<Role>('siswa');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [customName, setCustomName] = useState('');
  const [activeTab, setActiveTab] = useState<'demo' | 'custom'>('demo');
  const [loginAlert, setLoginAlert] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSelectDemo = (acc: User) => {
    saveDocument('users', acc.id, acc);
    onLoginSuccess(acc);
    setLoginAlert(`Berhasil masuk sebagai ${acc.name} (${acc.role.toUpperCase()})`);
    setTimeout(() => {
      setLoginAlert(null);
      onClose();
    }, 600);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setLoginAlert('Mohon isi Email/NISN dan Kata Sandi.');
      return;
    }

    const newUser: User = {
      id: `usr_${Date.now()}`,
      name: customName.trim() || (selectedRole === 'siswa' ? 'Siswa Sosiologi Baru' : selectedRole === 'guru' ? 'Guru Sosiologi Baru' : 'Admin Sosiologi Baru'),
      email: email.trim(),
      role: selectedRole,
      total_xp: selectedRole === 'siswa' ? 500 : 2000,
      levelTitle: selectedRole === 'siswa' ? 'Peserta Didik TKA' : selectedRole === 'guru' ? 'Pengampu Sosiologi' : 'Administrator Sistem',
      avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(email)}`,
      grade: 12,
      streakDays: 1,
      schoolName: 'SMA Negeri 1 Membumi',
      group_name: '12 IPS 1',
    };

    saveDocument('users', newUser.id, newUser);
    onLoginSuccess(newUser);
    setLoginAlert(`Login Berhasil! Selamat datang, ${newUser.name}`);
    setTimeout(() => {
      setLoginAlert(null);
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-stone-900 border border-amber-600/60 rounded-2xl shadow-2xl overflow-hidden text-stone-100">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-900 via-stone-900 to-amber-950 px-6 py-4 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center font-black shadow-md border border-amber-300">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-amber-200">Autentikasi LMS Sosiologi</h3>
              <p className="text-xs text-stone-400">Masuk sesuai Peran (Siswa, Guru, atau Admin)</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-stone-800 bg-stone-950/60 p-1.5">
          <button
            onClick={() => setActiveTab('demo')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 ${
              activeTab === 'demo'
                ? 'bg-amber-600 text-stone-950 shadow-md'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <UserIcon className="w-3.5 h-3.5" />
            <span>Pilih Akun Demo Instant</span>
          </button>
          <button
            onClick={() => setActiveTab('custom')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 ${
              activeTab === 'custom'
                ? 'bg-amber-600 text-stone-950 shadow-md'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Login Kustom / Form</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-5">
          {loginAlert && (
            <div className="p-3 bg-emerald-950/90 border border-emerald-500 text-emerald-200 rounded-xl text-xs font-semibold flex items-center space-x-2 animate-bounce">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{loginAlert}</span>
            </div>
          )}

          {activeTab === 'demo' ? (
            <div className="space-y-3">
              <p className="text-xs text-stone-300 font-medium">
                Klik salah satu profil akun di bawah ini untuk langsung masuk dan menguji seluruh fitur sesuai hak aksesnya:
              </p>

              <div className="space-y-2.5">
                {DEMO_ACCOUNTS.map((acc) => {
                  const isActive = currentUser.id === acc.id || currentUser.role === acc.role;
                  return (
                    <div
                      key={acc.id}
                      onClick={() => handleSelectDemo(acc)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between group ${
                        isActive
                          ? 'bg-emerald-950/60 border-emerald-500 shadow-md'
                          : 'bg-stone-800/80 border-stone-700/80 hover:bg-stone-800 hover:border-amber-500/60'
                      }`}
                    >
                      <div className="flex items-center space-x-3.5">
                        <img
                          src={acc.avatarUrl}
                          alt={acc.name}
                          className="w-11 h-11 rounded-full object-cover ring-2 ring-amber-500/50"
                        />
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-extrabold text-sm text-amber-200">{acc.name}</span>
                            {isActive && (
                              <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase bg-emerald-500 text-stone-950">
                                Aktif
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-stone-300">{acc.email}</p>
                          <p className="text-[10px] text-stone-400 font-medium mt-0.5">{acc.levelTitle} • {acc.group_name}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase border ${
                          acc.role === 'admin'
                            ? 'bg-purple-950 text-purple-300 border-purple-800'
                            : acc.role === 'guru'
                            ? 'bg-amber-950 text-amber-300 border-amber-800'
                            : 'bg-emerald-950 text-emerald-300 border-emerald-800'
                        }`}>
                          {acc.role}
                        </span>
                        <LogIn className="w-4 h-4 text-stone-400 group-hover:text-amber-300 transition-colors" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <form onSubmit={handleCustomSubmit} className="space-y-4">
              {/* Role Selection Buttons */}
              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1.5">Pilih Peran Akun:</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedRole('siswa')}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center space-x-1.5 transition-all ${
                      selectedRole === 'siswa'
                        ? 'bg-emerald-800 border-emerald-500 text-emerald-100 shadow-sm'
                        : 'bg-stone-800 border-stone-700 text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>Siswa</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedRole('guru')}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center space-x-1.5 transition-all ${
                      selectedRole === 'guru'
                        ? 'bg-amber-800 border-amber-500 text-amber-100 shadow-sm'
                        : 'bg-stone-800 border-stone-700 text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>Guru</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedRole('admin')}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center space-x-1.5 transition-all ${
                      selectedRole === 'admin'
                        ? 'bg-purple-800 border-purple-500 text-purple-100 shadow-sm'
                        : 'bg-stone-800 border-stone-700 text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    <Shield className="w-3.5 h-3.5" />
                    <span>Admin</span>
                  </button>
                </div>
              </div>

              {/* Name Field */}
              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1">Nama Lengkap (Opsional):</label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-2.5 w-4 h-4 text-stone-500" />
                  <input
                    type="text"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    placeholder="Contoh: Budi Santoso, S.Sos"
                    className="w-full bg-stone-800 border border-stone-700 rounded-xl pl-9 pr-3 py-2 text-xs text-stone-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Email / NISN Field */}
              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1">Email / NISN / NIP:</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 w-4 h-4 text-stone-500" />
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@sekolah.sch.id atau NISN 0051234567"
                    required
                    className="w-full bg-stone-800 border border-stone-700 rounded-xl pl-9 pr-3 py-2 text-xs text-stone-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1">Kata Sandi:</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 w-4 h-4 text-stone-500" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full bg-stone-800 border border-stone-700 rounded-xl pl-9 pr-3 py-2 text-xs text-stone-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-gradient-to-r from-amber-500 via-amber-600 to-emerald-600 text-stone-950 font-extrabold rounded-xl text-xs hover:from-amber-400 hover:to-emerald-500 transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer mt-2"
              >
                <LogIn className="w-4 h-4" />
                <span>Masuk Sekarang ({selectedRole.toUpperCase()})</span>
              </button>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="bg-stone-950 px-6 py-3 border-t border-stone-800 text-stone-400 text-[10px] flex items-center justify-between">
          <span>LMS Sosiologi Membumi • Firebase Firestore Cloud Configured</span>
          <span>Project: lms-sosiologi</span>
        </div>
      </div>
    </div>
  );
};
