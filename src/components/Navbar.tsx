import React, { useState } from 'react';
import { 
  BookOpen, Award, Flame, UserCheck, Shield, GraduationCap, Trophy, 
  FileText, Compass, Users, Bell, Check, LogOut, Lock, Target, Sparkles, AlertCircle, X, Edit3, Briefcase
} from 'lucide-react';
import { Role, User, AppNotification } from '../types';

export interface NavbarProps {
  user: User;
  mainPillar: 'belajar' | 'tka';
  setMainPillar: (pillar: 'belajar' | 'tka') => void;
  activeTab: 'dashboard' | 'journey' | 'modules' | 'tasks' | 'classrooms' | 'leaderboard' | 'cbt' | 'exam_active' | 'exam_discussion' | 'classroom_chat';
  setActiveTab: (tab: 'dashboard' | 'journey' | 'modules' | 'tasks' | 'classrooms' | 'leaderboard' | 'cbt' | 'exam_active' | 'exam_discussion' | 'classroom_chat') => void;
  cbtFilter: 'semua' | 'tryout' | 'latihan';
  setCbtFilter: (filter: 'semua' | 'tryout' | 'latihan') => void;
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
  cbtFilter,
  setCbtFilter,
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
      setActiveTab('modules');
    } else {
      setMainPillar('belajar');
      setActiveTab('dashboard');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-50 text-slate-900 border-b border-slate-200 shadow-xl">
      {/* Top Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
        
        {/* Brand Logo */}
        <div className="flex items-center space-x-3">
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => handleSelectPillar('belajar')}
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-blue-500 to-orange-500 flex items-center justify-center text-stone-950 shadow-lg shadow-emerald-950/50 border border-blue-200 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-black text-base sm:text-lg tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                  Sosiologi Membumi
                </span>
              </div>
              <p className="text-[10px] text-slate-600 hidden sm:block font-medium">
                Portal Edukasi Sosiologi SMAIT As-Syifa Boarding School Wanareja | TP 2026/2027
              </p>
            </div>
          </div>
        </div>

        {/* CENTER: Grand 2-Pillar Switcher (DUA BESAR TAB) */}
        <div className="hidden md:flex items-center bg-white p-1 rounded-2xl border border-slate-200 shadow-sm">
          <button
            onClick={() => handleSelectPillar('belajar')}
            className={`flex items-center space-x-2 px-3 sm:px-4 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
              mainPillar === 'belajar'
                ? 'bg-gradient-to-r from-blue-700 to-blue-600 text-white shadow-sm border border-slate-200 border border-blue-200'
                : 'text-slate-600 hover:text-slate-700 hover:bg-slate-100'
            }`}
          >
            <BookOpen className={`w-4 h-4 ${mainPillar === 'belajar' ? 'text-blue-500' : ''}`} />
            <span className="tracking-tight">1. BELAJAR SOSIOLOGI</span>
            <span className="text-[10px] px-1.5 py-0.2 bg-slate-100 text-blue-500 rounded-md border border-blue-400/30 hidden lg:inline-block">
              Kelas {user.grade}
            </span>
          </button>
          <button
            onClick={() => handleSelectPillar('tka')}
            className={`flex items-center space-x-2 px-3 sm:px-4 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
              mainPillar === 'tka'
                ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-stone-950 shadow-sm border border-slate-200 border border-amber-300'
                : 'text-slate-600 hover:text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Target className={`w-4 h-4 ${mainPillar === 'tka' ? 'text-stone-950' : ''}`} />
            <span className="tracking-tight">2. PERSIAPAN TKA</span>
            <span className="text-[10px] px-1.5 py-0.2 bg-slate-100 text-orange-500 rounded-md border border-amber-500/30 hidden lg:inline-block">
              UTBK/SNBT
            </span>
          </button>
        </div>

        {/* Right side Profile & Notifications */}
        <div className="flex items-center space-x-4">
          <div className="hidden lg:flex items-center bg-white/80 px-4 py-1.5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-[11px] font-bold text-slate-600 mr-2">Login sebagai:</span>
            <div className="flex items-center space-x-1">
              <select 
                value={user.role} 
                onChange={(e) => onRoleChange(e.target.value as Role)}
                className="bg-transparent text-orange-600 text-xs font-black uppercase outline-none cursor-pointer hover:text-orange-500"
              >
                <option value="siswa" className="bg-white text-white">👨‍🎓 Siswa</option>
                <option value="guru" className="bg-white text-white">👨‍🏫 Guru</option>
                <option value="admin" className="bg-white text-white">⚙️ Admin</option>
              </select>
            </div>
          </div>

          {isStudent && (
            <div className="hidden sm:flex items-center space-x-1.5 bg-orange-50 px-3 py-1.5 rounded-2xl border border-orange-200 cursor-help" title="Socio-Points (XP)">
              <Flame className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-black text-orange-600">{user.xp.toLocaleString()} XP</span>
            </div>
          )}

          {/* Notifications Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setShowNotifPopover(!showNotifPopover)}
              className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors relative"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-stone-900 animate-pulse"></span>
              )}
            </button>
            
            {showNotifPopover && (
              <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white border border-slate-300 rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-4">
                <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                  <h3 className="font-extrabold text-sm text-slate-900">Notifikasi</h3>
                  <span className="text-[10px] bg-orange-500 text-white px-2 py-0.5 rounded-full font-bold">
                    {unreadCount} Baru
                  </span>
                </div>
                <div className="max-h-[350px] overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-8 text-center text-slate-400 text-xs">
                      Belum ada notifikasi baru.
                    </div>
                  ) : (
                    <div className="divide-y divide-stone-800">
                      {notifications.map((notif) => (
                        <div 
                          key={notif.id} 
                          onClick={() => {
                            if (!notif.isRead && onMarkNotificationRead) onMarkNotificationRead(notif.id);
                            if (onNotificationClick) onNotificationClick(notif);
                            setShowNotifPopover(false);
                          }}
                          className={`p-4 hover:bg-slate-100 cursor-pointer transition-colors ${!notif.isRead ? 'bg-white' : 'opacity-70'}`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 space-y-1">
                              <h4 className={`text-xs font-bold ${!notif.isRead ? 'text-slate-900' : 'text-slate-600'}`}>
                                {notif.title}
                              </h4>
                              <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                                {notif.message}
                              </p>
                              <span className="text-[9px] text-slate-400 font-medium">
                                {notif.created_at}
                              </span>
                            </div>
                            {!notif.isRead && (
                              <div className="w-2 h-2 rounded-full bg-blue-500 mt-1 shrink-0 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-3 border-l border-slate-200 pl-4">
            <div className="hidden sm:block text-right">
              <p className="text-xs font-bold text-slate-900">{user.name}</p>
              <p className="text-[10px] text-blue-600 capitalize">{user.role}</p>
            </div>
            {onLogout ? (
              <button 
                onClick={onLogout}
                className="w-9 h-9 rounded-full border-2 border-slate-200 overflow-hidden hover:border-red-500 transition-colors relative group"
                title="Keluar"
              >
                <img src={user.avatarUrl} alt="Profile" className="w-full h-full object-cover group-hover:opacity-30 transition-opacity" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <LogOut className="w-4 h-4 text-red-500" />
                </div>
              </button>
            ) : (
              <div className="w-9 h-9 rounded-full border-2 border-blue-400 overflow-hidden shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                <img src={user.avatarUrl} alt="Profile" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE ONLY: 2 Pillar Switcher (Show when screen is small) */}
      <div className="md:hidden bg-white border-t border-slate-200 p-2 flex gap-2">
        <button
          onClick={() => handleSelectPillar('belajar')}
          className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
            mainPillar === 'belajar'
              ? 'bg-gradient-to-r from-blue-700 to-blue-600 text-white shadow-sm border border-slate-200 border border-blue-200'
              : 'text-slate-600 hover:text-slate-700 hover:bg-slate-100 bg-slate-50 border border-slate-200'
          }`}
        >
          <BookOpen className={`w-4 h-4 ${mainPillar === 'belajar' ? 'text-blue-500' : ''}`} />
          <span className="tracking-tight">BELAJAR</span>
        </button>
        <button
          onClick={() => handleSelectPillar('tka')}
          className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
            mainPillar === 'tka'
              ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-stone-950 shadow-sm border border-slate-200 border border-amber-300'
              : 'text-slate-600 hover:text-slate-700 hover:bg-slate-100 bg-slate-50 border border-slate-200'
          }`}
        >
          <Target className={`w-4 h-4 ${mainPillar === 'tka' ? 'text-stone-950' : ''}`} />
          <span className="tracking-tight">TKA UTBK</span>
        </button>
      </div>

      {/* SUB-NAVIGATION BAR (Flattened) */}
      <div className="bg-white border-t border-slate-200 overflow-x-auto custom-scrollbar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between">
          
          <nav className="flex items-center space-x-2 text-xs font-semibold whitespace-nowrap">
            
            {mainPillar === 'belajar' ? (
              <>
                {/* Grade Selector Pills */}
                <div className="flex items-center bg-slate-50 p-1 rounded-xl border border-slate-200 mr-2">
                  <span className="text-[10px] font-extrabold px-1.5 text-slate-400 uppercase tracking-wider">
                    Kelas:
                  </span>
                  {[10, 11, 12].map((g) => (
                    <button
                      key={g}
                      onClick={() => {
                        onGradeChange(g);
                        setActiveTab('dashboard');
                      }}
                      className={`px-3 py-1 rounded-lg text-xs font-extrabold transition-all ${
                        user.grade === g
                          ? g === 12
                            ? 'bg-orange-500 text-white shadow-sm border border-amber-300'
                            : 'bg-blue-600 text-white shadow-sm'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>

                {/* Vertical Separator */}
                <div className="h-6 w-px bg-slate-200 mx-2 hidden sm:block"></div>

                {/* Belajar Menu Tabs */}
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                    activeTab === 'dashboard'
                      ? 'bg-blue-100 text-orange-700 font-extrabold shadow-sm border border-blue-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Compass className="w-4 h-4 text-blue-600" />
                  <span>Beranda</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('journey')}
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                    activeTab === 'journey'
                      ? 'bg-blue-100 text-orange-700 font-extrabold shadow-sm border border-blue-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Target className="w-4 h-4 text-blue-600" />
                  <span>Peta Alur</span>
                </button>

                <button
                  onClick={() => setActiveTab('modules')}
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                    activeTab === 'modules'
                      ? 'bg-blue-100 text-orange-700 font-extrabold shadow-sm border border-blue-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  <span>Modul Materi</span>
                </button>

                <button
                  onClick={() => setActiveTab('tasks')}
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                    activeTab === 'tasks'
                      ? 'bg-blue-100 text-orange-700 font-extrabold shadow-sm border border-blue-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Award className="w-4 h-4 text-blue-600" />
                  <span>Misi & Tugas</span>
                </button>

                <button
                  onClick={() => setActiveTab('classroom_chat')}
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                    activeTab === 'classroom_chat'
                      ? 'bg-blue-100 text-orange-700 font-extrabold shadow-sm border border-blue-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Users className="w-4 h-4 text-blue-600" />
                  <span>Diskusi</span>
                </button>

                <button
                  onClick={() => setActiveTab('leaderboard')}
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                    activeTab === 'leaderboard'
                      ? 'bg-blue-100 text-orange-700 font-extrabold shadow-sm border border-blue-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Trophy className="w-4 h-4 text-blue-600" />
                  <span>Leaderboard</span>
                </button>
              </>
            ) : (
              <>
                {/* TKA Menu Tabs */}
                <button
                  onClick={() => setActiveTab('modules')}
                  className={`flex items-center space-x-2 px-4 py-1.5 rounded-xl transition-all cursor-pointer ${
                    activeTab === 'modules'
                      ? 'bg-orange-500 text-white font-black shadow-sm border border-slate-200 border border-amber-300'
                      : 'text-slate-600 hover:text-orange-500 hover:bg-slate-100'
                  }`}
                >
                  <BookOpen className={`w-4 h-4 ${activeTab === 'modules' ? 'text-stone-950' : 'text-orange-600'}`} />
                  <span>Materi TKA</span>
                </button>

                <button
                  onClick={() => {
                    setActiveTab('cbt');
                    setCbtFilter('latihan');
                  }}
                  className={`flex items-center space-x-2 px-4 py-1.5 rounded-xl transition-all cursor-pointer ${
                    activeTab === 'cbt' && cbtFilter === 'latihan'
                      ? 'bg-orange-500 text-white font-black shadow-sm border border-slate-200 border border-amber-300'
                      : 'text-slate-600 hover:text-orange-500 hover:bg-slate-100'
                  }`}
                >
                  <Edit3 className={`w-4 h-4 ${activeTab === 'cbt' && cbtFilter === 'latihan' ? 'text-stone-950' : 'text-orange-600'}`} />
                  <span>Latihan Soal</span>
                </button>

                <button
                  onClick={() => {
                    setActiveTab('cbt');
                    setCbtFilter('tryout');
                  }}
                  className={`flex items-center space-x-2 px-4 py-1.5 rounded-xl transition-all cursor-pointer ${
                    activeTab === 'cbt' && cbtFilter === 'tryout'
                      ? 'bg-orange-500 text-white font-black shadow-sm border border-slate-200 border border-amber-300'
                      : 'text-slate-600 hover:text-orange-500 hover:bg-slate-100'
                  }`}
                >
                  <FileText className={`w-4 h-4 ${activeTab === 'cbt' && cbtFilter === 'tryout' ? 'text-stone-950' : 'text-orange-600'}`} />
                  <span>Try Out Resmi</span>
                </button>
              </>
            )}
            
          </nav>
        </div>
      </div>

      {/* LOCK MODAL FOR GRADE 10 & 11 STUDENTS TRYING TO ACCESS TKA */}
      {showTkaLockModal && (
        <div className="fixed inset-0 z-50 bg-slate-800/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white border border-amber-500/50 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-5 text-slate-900 shadow-2xl relative">
            <button 
              onClick={() => setShowTkaLockModal(false)}
              className="absolute top-4 right-4 text-slate-600 hover:text-slate-900 p-1 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="w-14 h-14 rounded-2xl bg-orange-500/20 border border-amber-500/40 flex items-center justify-center text-orange-500 mx-auto">
              <Lock className="w-7 h-7" />
            </div>
            
            <div className="text-center space-y-2">
              <h3 className="text-xl font-extrabold text-orange-700">
                Fitur TKA Khusus Siswa Kelas 12
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Akses <span className="font-bold text-white">Tes Kemampuan Akademik (TKA) Sosiologi</span> dan Simulasi Tryout CBT disiapkan khusus untuk Siswa Kelas 12 yang mempersiapkan UTBK/SNBT Seleksi Masuk PTN.
              </p>
              <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                Saat ini Anda terdaftar di <span className="font-bold text-blue-600">Kelas {user.grade}</span>. Anda disarankan fokus menguasai materi pembelajaran Kurikulum Sosiologi Kelas {user.grade}.
              </p>
            </div>
            
            <div className="space-y-2 pt-2">
              <button
                onClick={() => {
                  onGradeChange(12);
                  setMainPillar('tka');
                  setActiveTab('modules');
                  setShowTkaLockModal(false);
                }}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-stone-950 font-black py-3 px-4 rounded-2xl text-xs transition-all shadow-lg flex items-center justify-center space-x-2 cursor-pointer"
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
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-2.5 px-4 rounded-2xl text-xs transition-all border border-slate-300 cursor-pointer"
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
