import React, { useState } from 'react';
import { UserCheck, GraduationCap, Shield, LogIn, Lock, Mail, User as UserIcon, X, Check, Key, Trash2, Crown } from 'lucide-react';
import { User, Role } from '../types';
import { saveDocument } from '../lib/firestoreService';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
  onLoginSuccess: (user: User) => void;
  onPurgeAllData?: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLoginSuccess,
  onPurgeAllData,
}) => {
  const [selectedRole, setSelectedRole] = useState<Role>('admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [customName, setCustomName] = useState('');
  const [loginAlert, setLoginAlert] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setLoginAlert('Mohon isi Email/NIP/NISN dan Kata Sandi.');
      return;
    }

    const newUser: User = {
      id: `usr_${Date.now()}`,
      name: customName.trim() || (selectedRole === 'admin' ? 'Super Admin LMS' : selectedRole === 'guru' ? 'Guru Sosiologi' : 'Siswa Sosiologi'),
      email: email.trim(),
      role: selectedRole,
      total_xp: selectedRole === 'siswa' ? 500 : selectedRole === 'guru' ? 3500 : 9990,
      levelTitle: selectedRole === 'admin' ? 'Super Admin Utama' : selectedRole === 'guru' ? 'Guru Pengampu Sosiologi' : 'Siswa Sosiologi TKA',
      avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(email)}`,
      grade: 12,
      streakDays: 1,
      schoolName: 'SMA Negeri 1 Membumi',
      group_name: selectedRole === 'admin' ? 'Super Admin' : '12 IPS 1',
    };

    saveDocument('users', newUser.id, newUser);
    onLoginSuccess(newUser);
    setLoginAlert(`Login Berhasil! Selamat datang, ${newUser.name} (${newUser.role.toUpperCase()})`);
    setTimeout(() => {
      setLoginAlert(null);
      onClose();
    }, 700);
  };

  const handleQuickRoleLogin = (role: Role, defaultEmail: string, defaultName: string) => {
    const newUser: User = {
      id: `usr_${role}_${Date.now()}`,
      name: defaultName,
      email: defaultEmail,
      role: role,
      total_xp: role === 'admin' ? 9990 : role === 'guru' ? 3500 : 1850,
      levelTitle: role === 'admin' ? 'Super Admin Utama' : role === 'guru' ? 'Guru Pengampu Sosiologi' : 'Peserta Didik TKA',
      avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(defaultEmail)}`,
      grade: 12,
      streakDays: 14,
      schoolName: 'SMA Negeri 1 Membumi',
      group_name: role === 'admin' ? 'Super Admin' : '12 IPS 1',
    };

    saveDocument('users', newUser.id, newUser);
    onLoginSuccess(newUser);
    setLoginAlert(`Berhasil Masuk sebagai ${newUser.name}`);
    setTimeout(() => {
      setLoginAlert(null);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-stone-900 border border-amber-600/60 rounded-2xl shadow-2xl overflow-hidden text-stone-100">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-900 via-stone-900 to-amber-950 px-6 py-4 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center font-black shadow-md border border-amber-300">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-amber-200">Login LMS Sosiologi</h3>
              <p className="text-xs text-stone-400">Masuk sebagai Super Admin, Guru, atau Siswa</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-4">
          {loginAlert && (
            <div className="p-3 bg-emerald-950/90 border border-emerald-500 text-emerald-200 rounded-xl text-xs font-semibold flex items-center space-x-2 animate-bounce">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{loginAlert}</span>
            </div>
          )}

          {/* Quick Login Role Shortcuts */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold text-amber-300 uppercase tracking-wider">Akses Masuk Cepat Peran:</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickRoleLogin('admin', 'admin@sosiologimembumi.sch.id', 'Super Admin Utama')}
                className="p-2.5 rounded-xl bg-purple-950/80 border border-purple-700/80 hover:bg-purple-900 text-purple-200 text-xs font-bold flex flex-col items-center justify-center space-y-1 transition-all cursor-pointer shadow-sm hover:scale-105"
              >
                <Crown className="w-4 h-4 text-purple-400" />
                <span className="text-[11px]">Super Admin</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickRoleLogin('guru', 'guru@sosiologimembumi.sch.id', 'Ibu Ratna Pertiwi, S.Sos')}
                className="p-2.5 rounded-xl bg-amber-950/80 border border-amber-700/80 hover:bg-amber-900 text-amber-200 text-xs font-bold flex flex-col items-center justify-center space-y-1 transition-all cursor-pointer shadow-sm hover:scale-105"
              >
                <GraduationCap className="w-4 h-4 text-amber-400" />
                <span className="text-[11px]">Guru</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickRoleLogin('siswa', 'siswa@sosiologimembumi.sch.id', 'Ahmad Fauzi')}
                className="p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-700/80 hover:bg-emerald-900 text-emerald-200 text-xs font-bold flex flex-col items-center justify-center space-y-1 transition-all cursor-pointer shadow-sm hover:scale-105"
              >
                <UserCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-[11px]">Siswa</span>
              </button>
            </div>
          </div>

          <div className="relative my-3">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-stone-800"></div></div>
            <div className="relative flex justify-center text-[10px] uppercase font-bold text-stone-500"><span className="bg-stone-900 px-2">Atau Form Kredensial</span></div>
          </div>

          <form onSubmit={handleCustomSubmit} className="space-y-3.5">
            {/* Role Selection Buttons */}
            <div>
              <label className="block text-xs font-bold text-stone-300 mb-1.5">Pilih Hak Akses:</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedRole('admin')}
                  className={`py-2 px-2.5 rounded-xl border text-xs font-bold flex items-center justify-center space-x-1.5 transition-all ${
                    selectedRole === 'admin'
                      ? 'bg-purple-900 border-purple-500 text-purple-100 shadow-sm'
                      : 'bg-stone-800 border-stone-700 text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <Crown className="w-3.5 h-3.5" />
                  <span>Super Admin</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedRole('guru')}
                  className={`py-2 px-2.5 rounded-xl border text-xs font-bold flex items-center justify-center space-x-1.5 transition-all ${
                    selectedRole === 'guru'
                      ? 'bg-amber-900 border-amber-500 text-amber-100 shadow-sm'
                      : 'bg-stone-800 border-stone-700 text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>Guru</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedRole('siswa')}
                  className={`py-2 px-2.5 rounded-xl border text-xs font-bold flex items-center justify-center space-x-1.5 transition-all ${
                    selectedRole === 'siswa'
                      ? 'bg-emerald-900 border-emerald-500 text-emerald-100 shadow-sm'
                      : 'bg-stone-800 border-stone-700 text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Siswa</span>
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
                  placeholder="Contoh: Drs. Supriyadi, M.Pd"
                  className="w-full bg-stone-800 border border-stone-700 rounded-xl pl-9 pr-3 py-2 text-xs text-stone-100 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Email / NISN Field */}
            <div>
              <label className="block text-xs font-bold text-stone-300 mb-1">Email / NIP / NISN:</label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 w-4 h-4 text-stone-500" />
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@sosiologimembumi.sch.id"
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
        </div>

        {/* Footer */}
        <div className="bg-stone-950 px-6 py-3 border-t border-stone-800 text-stone-400 text-[10px] flex items-center justify-between">
          <span>LMS Sosiologi • Firebase Cloud Connected</span>
          {onPurgeAllData && (
            <button
              type="button"
              onClick={() => {
                if (window.confirm('Apakah Anda yakin ingin mengosongkan/menghapus semua data lokal?')) {
                  onPurgeAllData();
                  setLoginAlert('Semua data lokal berhasil dibuang!');
                }
              }}
              className="px-2.5 py-1 rounded-lg bg-red-950/80 hover:bg-red-900 border border-red-700/80 text-red-200 text-[10px] font-bold flex items-center space-x-1 transition-all cursor-pointer"
            >
              <Trash2 className="w-3 h-3 text-red-400" />
              <span>Kosongkan Data</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

