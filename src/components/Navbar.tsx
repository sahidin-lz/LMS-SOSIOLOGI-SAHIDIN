import React, { useState } from 'react';
import { 
  BookOpen, Award, Flame, UserCheck, Shield, GraduationCap, Trophy, 
  FileText, Compass, Users, Bell, Check, LogOut, Lock, Target, Sparkles, AlertCircle, X
} from 'lucide-react';
import { Role, User, AppNotification } from '../types';

export interface NavbarProps {
  user: User;
  mainPillar: 'belajar' | 'tka';
  setMainPillar: (pillar: 'belajar' | 'tka') => void;
  activeTab: 'dashboard' | 'journey' | 'modules' | 'tasks' | 'classrooms' | 'leaderboard' | 'cbt' | 'exam_active' | 'exam_discussion';
  setActiveTab: (tab: 'dashboard' | 'journey' | 'modules' | 'tasks' | 'classrooms' | 'leaderboard' | 'cbt' | 'exam_active' | 'exam_discussion') => void;
  onSelectTkaModules?: () => void;
  tkaSubTab?: 'materi' | 'latihan_bab' | 'try_out_tka';
  onSelectTkaSubTab?: (subTab: 'materi' | 'latihan_bab' | 'try_out_tka') => void;
  onRoleChange: (role: Role) => void;
  onGradeChange: (grade: number) => void;
  onLogout?: () => void;
  notifications?: AppNotification[];
  onMarkNotificationRead?: (id: string) => void;
  onNotificationClick?: (notif: AppNotification) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  mainPillar,
  setMainPillar,
  activeTab,
  setActiveTab,
  onSelectTkaModules,
  tkaSubTab = 'materi',
  onSelectTkaSubTab,
  onRoleChange,
  onGradeChange,
  onLogout,
  notifications = [],
  onMarkNotificationRead,
  onNotificationClick,
}) => {
  const [showNotifPopover, setShowNotifPopover] = useState(false);
  const [showTkaLockModal, setShowTkaLockModal] = useState(false);

  const unreadCount = notifications.filter(n => !n.isRead).length;
  const isStudent = user.role === 'siswa';
  const canAccessTka = !isStudent || user.grade === 12;

  const handleSelectPillar = (pillar: 'belajar' | 'tka') => {
    if (pillar === 'tka') {
      if (!canAccessTka) {
        setShowTkaLockModal(true);
        return;
      }
      setMainPillar('tka');
      setActiveTab('cbt');
    } else {
      setMainPillar('belajar');
      if (activeTab === 'cbt' || activeTab === 'exam_discussion') {
        setActiveTab('dashboard');
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-stone-950 text-stone-100 border-b border-stone-800 shadow-xl">
      {/* Top Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
        
        {/* Brand Logo & Interactive Grade Badge Switcher */}
        <div className="flex items-center space-x-3">
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => {
              setMainPillar('belajar');
              setActiveTab('dashboard');
            }}
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 via-emerald-500 to-amber-500 flex items-center justify-center text-stone-950 shadow-lg shadow-emerald-950/50 border border-emerald-400/40 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-black text-base sm:text-lg tracking-tight text-white group-hover:text-emerald-300 transition-colors">
                  Sosiologi Membumi
                </span>
              </div>
              <p className="text-[10px] text-stone-400 hidden sm:block font-medium">
                Portal Edukasi Sosiologi SMAN • TP 2026/2027
              </p>
            </div>
          </div>

          {/* Quick Grade Selector Badge Pills */}
          <div className="hidden sm:flex items-center space-x-1 bg-stone-900/90 p-1 rounded-xl border border-stone-800 ml-2">
            <span className="text-[10px] font-extrabold px-1.5 text-stone-400 uppercase tracking-wider">
              Kelas:
            </span>
            {[10, 11, 12].map((g) => (
              <button
                key={g}
                onClick={() => {
                  onGradeChange(g);
                  if (g !== 12 && mainPillar === 'tka') {
                    setMainPillar('belajar');
                    setActiveTab('dashboard');
                  }
                }}
                className={`px-2.5 py-0.5 rounded-lg text-[11px] font-extrabold transition-all ${
                  user.grade === g
                    ? g === 12
                      ? 'bg-amber-500 text-stone-950 shadow-sm border border-amber-300'
                      : 'bg-emerald-600 text-white shadow-sm'
                    : 'text-stone-400 hover:text-white hover:bg-stone-800'
                }`}
                title={`Ganti ke Kelas ${g}`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* CENTER: Grand 2-Pillar Switcher (DUA BESAR TAB) */}
        <div className="flex items-center bg-stone-900 p-1 rounded-2xl border border-stone-800 shadow-inner">
          <button
            onClick={() => handleSelectPillar('belajar')}
            className={`flex items-center space-x-2 px-3 sm:px-4 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
              mainPillar === 'belajar'
                ? 'bg-gradient-to-r from-emerald-700 to-emerald-600 text-white shadow-md border border-emerald-400/40'
                : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/60'
            }`}
          >
            <BookOpen className="w-4 h-4 text-emerald-300" />
            <span className="tracking-tight">1. BELAJAR SOSIOLOGI</span>
            <span className="text-[10px] px-1.5 py-0.2 bg-stone-950/60 text-emerald-300 rounded-md border border-emerald-500/30 hidden md:inline-block">
              Kelas {user.grade}
            </span>
          </button>

          <button
            onClick={() => handleSelectPillar('tka')}
            className={`flex items-center space-x-2 px-3 sm:px-4 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
              mainPillar === 'tka'
                ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-stone-950 shadow-md border border-amber-300/60'
                : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/60'
            }`}
          >
            <Target className={`w-4 h-4 ${mainPillar === 'tka' ? 'text-stone-950' : 'text-amber-400'}`} />
            <span className="tracking-tight">2. PERSIAPAN TKA</span>
            {!canAccessTka ? (
              <span className="flex items-center space-x-1 text-[10px] bg-red-950/90 text-red-300 px-1.5 py-0.2 rounded-md border border-red-800">
                <Lock className="w-3 h-3" />
                <span>Kelas 12</span>
              </span>
            ) : (
              <span className="text-[10px] bg-amber-950 text-amber-300 px-1.5 py-0.2 rounded-md border border-amber-700 hidden md:inline-block font-extrabold">
                Tryout CBT
              </span>
            )}
          </button>
        </div>

        {/* RIGHT SIDE: Profile, Stats, Role, Notifications & Logout */}
        <div className="flex items-center space-x-2">
          {/* XP & Streak */}
          <div className="hidden lg:flex items-center space-x-2">
            <div className="flex items-center space-x-1 bg-amber-950/60 border border-amber-800/60 px-2.5 py-1 rounded-xl text-xs font-black text-amber-300">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>{user.total_xp} XP</span>
            </div>
            <div className="flex items-center space-x-1 bg-red-950/60 border border-red-800/60 px-2.5 py-1 rounded-xl text-xs font-black text-red-300">
              <Flame className="w-3.5 h-3.5 text-red-400 animate-bounce" />
              <span>{user.streakDays}d</span>
            </div>
          </div>

          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifPopover(!showNotifPopover)}
              className="relative p-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-800 transition-all cursor-pointer"
              title="Notifikasi LMS"
            >
              <Bell className="w-4 h-4 text-amber-400" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white font-black text-[9px] flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown */}
            {showNotifPopover && (
              <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-stone-900 border border-amber-600/60 rounded-2xl shadow-2xl z-50 p-3 space-y-2 text-stone-100">
                <div className="flex items-center justify-between border-b border-stone-800 pb-2 px-1">
                  <div className="flex items-center space-x-1.5">
                    <Bell className="w-4 h-4 text-amber-400" />
                    <span className="font-bold text-xs text-amber-200">Notifikasi LMS Sosiologi</span>
                  </div>
                  <span className="text-[10px] bg-amber-950 text-amber-300 px-2 py-0.5 rounded-full font-bold border border-amber-800">
                    {unreadCount} Baru
                  </span>
                </div>

                <div className="max-h-72 overflow-y-auto space-y-2 pr-1">
                  {notifications.length === 0 ? (
                    <div className="p-4 text-center text-xs text-stone-400">Tidak ada notifikasi baru saat ini.</div>
                  ) : (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        onClick={() => {
                          if (onNotificationClick) onNotificationClick(notif);
                          setShowNotifPopover(false);
                        }}
                        className={`p-3 rounded-xl border transition-all cursor-pointer space-y-1 ${
                          notif.isRead
                            ? 'bg-stone-800/40 border-stone-800 text-stone-400'
                            : 'bg-stone-800 border-amber-500/40 text-stone-100 shadow-sm hover:border-amber-400'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                            {notif.type}
                          </span>
                          <span className="text-[10px] text-stone-400">{notif.date}</span>
                        </div>
                        <h4 className="font-bold text-xs text-amber-200">{notif.title}</h4>
                        <p className="text-[11px] leading-snug text-stone-300">{notif.message}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Role & Logout */}
          <div className="flex items-center space-x-2 bg-stone-900 p-1 pl-2.5 rounded-2xl border border-stone-800">
            <div className="hidden md:flex flex-col text-right leading-tight">
              <span className="font-extrabold text-xs text-stone-200 truncate max-w-[110px]">{user.name}</span>
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                Kelas {user.grade} • {user.role}
              </span>
            </div>

            <div className="w-8 h-8 rounded-full ring-2 ring-emerald-500/60 overflow-hidden shrink-0">
              <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
            </div>

            {/* Admin Switcher Button */}
            <button
              onClick={() => {
                onRoleChange(user.role === 'admin' ? 'siswa' : 'admin');
                setActiveTab('dashboard');
              }}
              className={`p-1.5 rounded-xl text-xs font-black transition-all ${
                user.role === 'admin'
                  ? 'bg-purple-900 text-purple-100 border border-purple-500'
                  : 'bg-stone-800 text-stone-400 hover:text-stone-200'
              }`}
              title="Toggle Super Admin Mode"
            >
              <Shield className="w-4 h-4 text-purple-400" />
            </button>

            {/* Logout */}
            {onLogout && (
              <button
                onClick={onLogout}
                className="p-1.5 rounded-xl bg-red-950/60 hover:bg-red-900 text-red-300 border border-red-800/80 transition-all cursor-pointer"
                title="Keluar (Logout)"
              >
                <LogOut className="w-4 h-4 text-red-400" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* SUB-NAVIGATION BAR (Dependent on Active Pillar) */}
      <div className="bg-stone-900/90 border-t border-stone-800/80 px-4 sm:px-8 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {mainPillar === 'belajar' ? (
            /* Pilar 1: Belajar Sosiologi Sub-tabs */
            <nav className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto text-xs font-semibold">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl transition-all ${
                  activeTab === 'dashboard'
                    ? 'bg-emerald-800 text-amber-200 font-extrabold shadow-sm border border-emerald-600/50'
                    : 'text-stone-300 hover:text-white hover:bg-stone-800'
                }`}
              >
                <BookOpen className="w-4 h-4 text-emerald-400" />
                <span>Beranda Belajar</span>
              </button>

              <button
                onClick={() => setActiveTab('journey')}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl transition-all ${
                  activeTab === 'journey'
                    ? 'bg-emerald-800 text-amber-200 font-extrabold shadow-sm border border-emerald-600/50'
                    : 'text-stone-300 hover:text-white hover:bg-stone-800'
                }`}
              >
                <Compass className="w-4 h-4 text-emerald-400" />
                <span>Peta Alur Belajar</span>
              </button>

              <button
                onClick={() => setActiveTab('modules')}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl transition-all ${
                  activeTab === 'modules'
                    ? 'bg-emerald-800 text-amber-200 font-extrabold shadow-sm border border-emerald-600/50'
                    : 'text-stone-300 hover:text-white hover:bg-stone-800'
                }`}
              >
                <GraduationCap className="w-4 h-4 text-amber-400" />
                <span>Modul & Video Materi</span>
              </button>

              <button
                onClick={() => setActiveTab('tasks')}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl transition-all ${
                  activeTab === 'tasks'
                    ? 'bg-emerald-800 text-amber-200 font-extrabold shadow-sm border border-emerald-600/50'
                    : 'text-stone-300 hover:text-white hover:bg-stone-800'
                }`}
              >
                <Users className="w-4 h-4 text-amber-400" />
                <span>Misi & Tugas</span>
              </button>

              <button
                onClick={() => setActiveTab('classrooms')}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl transition-all ${
                  activeTab === 'classrooms'
                    ? 'bg-emerald-800 text-amber-200 font-extrabold shadow-sm border border-emerald-600/50'
                    : 'text-stone-300 hover:text-white hover:bg-stone-800'
                }`}
              >
                <GraduationCap className="w-4 h-4 text-emerald-400" />
                <span>Ruang Kelas (Rombel)</span>
              </button>

              <button
                onClick={() => setActiveTab('leaderboard')}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl transition-all ${
                  activeTab === 'leaderboard'
                    ? 'bg-emerald-800 text-amber-200 font-extrabold shadow-sm border border-emerald-600/50'
                    : 'text-stone-300 hover:text-white hover:bg-stone-800'
                }`}
              >
                <Trophy className="w-4 h-4 text-amber-400" />
                <span>Papan Peringkat</span>
              </button>
            </nav>
          ) : (
            /* Pilar 2: TKA Sosiologi Sub-tabs (Kelas 12) */
            <nav className="flex items-center space-x-2 overflow-x-auto text-xs font-semibold">
              <button
                onClick={() => {
                  if (onSelectTkaSubTab) {
                    onSelectTkaSubTab('materi');
                  } else {
                    setActiveTab('modules');
                  }
                }}
                className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                  mainPillar === 'tka' && activeTab === 'modules' && tkaSubTab === 'materi'
                    ? 'bg-amber-500 text-stone-950 font-black shadow-md border border-amber-300'
                    : 'text-stone-300 hover:text-amber-300 hover:bg-stone-800'
                }`}
              >
                <BookOpen className={`w-4 h-4 ${mainPillar === 'tka' && activeTab === 'modules' && tkaSubTab === 'materi' ? 'text-stone-950' : 'text-amber-400'}`} />
                <span className="capitalize">materi</span>
              </button>

              <button
                onClick={() => {
                  if (onSelectTkaSubTab) {
                    onSelectTkaSubTab('latihan_bab');
                  } else {
                    setActiveTab('modules');
                  }
                }}
                className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                  mainPillar === 'tka' && activeTab === 'modules' && tkaSubTab === 'latihan_bab'
                    ? 'bg-amber-500 text-stone-950 font-black shadow-md border border-amber-300'
                    : 'text-stone-300 hover:text-amber-300 hover:bg-stone-800'
                }`}
              >
                <GraduationCap className={`w-4 h-4 ${mainPillar === 'tka' && activeTab === 'modules' && tkaSubTab === 'latihan_bab' ? 'text-stone-950' : 'text-amber-400'}`} />
                <span className="capitalize">latihan bab</span>
              </button>

              <button
                onClick={() => {
                  if (onSelectTkaSubTab) {
                    onSelectTkaSubTab('try_out_tka');
                  } else {
                    setActiveTab('cbt');
                  }
                }}
                className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                  mainPillar === 'tka' && (activeTab === 'cbt' || tkaSubTab === 'try_out_tka')
                    ? 'bg-amber-500 text-stone-950 font-black shadow-md border border-amber-300'
                    : 'text-stone-300 hover:text-amber-300 hover:bg-stone-800'
                }`}
              >
                <FileText className={`w-4 h-4 ${mainPillar === 'tka' && (activeTab === 'cbt' || tkaSubTab === 'try_out_tka') ? 'text-stone-950' : 'text-amber-400'}`} />
                <span>Try out TKA</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              </button>

              {activeTab === 'exam_discussion' && (
                <button
                  className="flex items-center space-x-2 px-3.5 py-1.5 rounded-xl bg-indigo-900 text-indigo-100 font-bold border border-indigo-500"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Diskusi & Pembahasan IRT</span>
                </button>
              )}
            </nav>
          )}

          {/* Active Grade Status Indicator */}
          <div className="hidden md:flex items-center space-x-2 text-[11px] text-stone-400">
            <span>Jenjang Aktif:</span>
            <span className="font-extrabold text-amber-300 bg-stone-800 px-2 py-0.5 rounded-md border border-stone-700">
              Sosiologi SMA Kelas {user.grade}
            </span>
          </div>
        </div>
      </div>

      {/* LOCK MODAL FOR GRADE 10 & 11 STUDENTS TRYING TO ACCESS TKA */}
      {showTkaLockModal && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-amber-500/50 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-5 text-stone-100 shadow-2xl relative">
            <button 
              onClick={() => setShowTkaLockModal(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-white p-1 rounded-full hover:bg-stone-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 mx-auto">
              <Lock className="w-7 h-7" />
            </div>

            <div className="text-center space-y-2">
              <h3 className="text-xl font-extrabold text-amber-200">
                Fitur TKA Khusus Siswa Kelas 12
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                Akses <span className="font-bold text-white">Tes Kemampuan Akademik (TKA) Sosiologi</span> dan Simulasi Tryout CBT disiapkan khusus untuk Siswa Kelas 12 yang mempersiapkan UTBK/SNBT Seleksi Masuk PTN.
              </p>
              <p className="text-xs text-stone-400 bg-stone-950 p-3 rounded-2xl border border-stone-800">
                Saat ini Anda terdaftar di <span className="font-bold text-emerald-400">Kelas {user.grade}</span>. Anda disarankan fokus menguasai materi pembelajaran Kurikulum Sosiologi Kelas {user.grade}.
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={() => {
                  onGradeChange(12);
                  setMainPillar('tka');
                  setActiveTab('cbt');
                  setShowTkaLockModal(false);
                }}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-black py-3 px-4 rounded-2xl text-xs transition-all shadow-lg flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 fill-stone-950" />
                <span>Pindah ke Kelas 12 & Buka TKA Sekarang</span>
              </button>

              <button
                onClick={() => {
                  setMainPillar('belajar');
                  setActiveTab('dashboard');
                  setShowTkaLockModal(false);
                }}
                className="w-full bg-stone-800 hover:bg-stone-700 text-stone-300 font-bold py-2.5 px-4 rounded-2xl text-xs transition-all border border-stone-700 cursor-pointer"
              >
                Kembali Belajar Sosiologi Kelas {user.grade}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
