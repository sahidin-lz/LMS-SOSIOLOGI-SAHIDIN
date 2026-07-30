import React, { useState } from 'react';
import { BookOpen, Award, Flame, UserCheck, Shield, GraduationCap, Trophy, FileText, Compass, Users, Bell, Check, ExternalLink } from 'lucide-react';
import { Role, User, AppNotification } from '../types';

interface NavbarProps {
  user: User;
  activeTab: 'dashboard' | 'journey' | 'modules' | 'tasks' | 'classrooms' | 'leaderboard' | 'cbt';
  setActiveTab: (tab: 'dashboard' | 'journey' | 'modules' | 'tasks' | 'classrooms' | 'leaderboard' | 'cbt') => void;
  onRoleChange: (role: Role) => void;
  notifications?: AppNotification[];
  onMarkNotificationRead?: (id: string) => void;
  onNotificationClick?: (notif: AppNotification) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  activeTab,
  setActiveTab,
  onRoleChange,
  notifications = [],
  onMarkNotificationRead,
  onNotificationClick,
}) => {
  const [showNotifPopover, setShowNotifPopover] = useState(false);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <header className="sticky top-0 z-40 bg-stone-900/95 text-stone-100 backdrop-blur-md border-b border-amber-900/40 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo - Sosiologi Membumi */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-800 via-emerald-600 to-amber-700 flex items-center justify-center text-amber-100 shadow-md border border-amber-500/30">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-lg tracking-tight text-emerald-100">Sosiologi Membumi</span>
              <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-900/60 text-amber-300 rounded-full border border-amber-700/60 uppercase">
                LMS TKA Sosiologi
              </span>
            </div>
            <p className="text-[10px] text-stone-400 hidden sm:block font-medium">
              Rombel {user.group_name || '12-IPS 1'} • TP 2026/2027 Ganjil
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'dashboard'
                ? 'bg-emerald-800 text-amber-200 shadow-sm border border-emerald-600/40'
                : 'text-stone-300 hover:text-amber-200 hover:bg-stone-800/80'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Beranda</span>
          </button>

          <button
            onClick={() => setActiveTab('journey')}
            className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'journey'
                ? 'bg-emerald-800 text-amber-200 shadow-sm border border-emerald-600/40'
                : 'text-stone-300 hover:text-amber-200 hover:bg-stone-800/80'
            }`}
          >
            <Compass className="w-4 h-4 text-emerald-400" />
            <span>Peta Belajar</span>
          </button>

          <button
            onClick={() => setActiveTab('modules')}
            className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'modules'
                ? 'bg-emerald-800 text-amber-200 shadow-sm border border-emerald-600/40'
                : 'text-stone-300 hover:text-amber-200 hover:bg-stone-800/80'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Modul & Video</span>
          </button>

          <button
            onClick={() => setActiveTab('tasks')}
            className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'tasks'
                ? 'bg-emerald-800 text-amber-200 shadow-sm border border-emerald-600/40'
                : 'text-stone-300 hover:text-amber-200 hover:bg-stone-800/80'
            }`}
          >
            <Users className="w-4 h-4 text-amber-400" />
            <span>Misi & Tugas</span>
          </button>

          <button
            onClick={() => setActiveTab('classrooms')}
            className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'classrooms'
                ? 'bg-emerald-800 text-amber-200 shadow-sm border border-emerald-600/40'
                : 'text-stone-300 hover:text-amber-200 hover:bg-stone-800/80'
            }`}
          >
            <GraduationCap className="w-4 h-4 text-emerald-400" />
            <span>Ruang Kelas (Rombel)</span>
          </button>

          <button
            onClick={() => setActiveTab('cbt')}
            className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'cbt'
                ? 'bg-amber-800 text-amber-100 shadow-sm border border-amber-600/60'
                : 'text-stone-300 hover:text-amber-300 hover:bg-stone-800/80'
            }`}
          >
            <FileText className="w-4 h-4 text-amber-400" />
            <span className="flex items-center space-x-1.5">
              <span>Tryout CBT</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </span>
          </button>

          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'leaderboard'
                ? 'bg-emerald-800 text-amber-200 shadow-sm border border-emerald-600/40'
                : 'text-stone-300 hover:text-amber-200 hover:bg-stone-800/80'
            }`}
          >
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>Leaderboard</span>
          </button>
        </nav>

        {/* Right side stats, Notifications Bell & Role Selector */}
        <div className="flex items-center space-x-3">
          {/* Notification Bell Button */}
          <div className="relative">
            <button
              onClick={() => setShowNotifPopover(!showNotifPopover)}
              className="relative p-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700/80 transition-all cursor-pointer"
              title="Notifikasi LMS"
            >
              <Bell className="w-4 h-4 text-amber-300" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white font-extrabold text-[10px] flex items-center justify-center animate-bounce shadow-md">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification Popover Dropdown */}
            {showNotifPopover && (
              <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-stone-900 border border-amber-600/60 rounded-2xl shadow-2xl z-50 p-3 space-y-2 text-stone-100">
                <div className="flex items-center justify-between border-b border-stone-800 pb-2 px-1">
                  <div className="flex items-center space-x-1.5">
                    <Bell className="w-4 h-4 text-amber-400" />
                    <span className="font-bold text-xs text-amber-200">Pusat Notifikasi LMS</span>
                  </div>
                  <span className="text-[10px] bg-amber-950 text-amber-300 px-2 py-0.5 rounded-full font-bold border border-amber-800">
                    {unreadCount} Baru
                  </span>
                </div>

                <div className="max-h-72 overflow-y-auto space-y-2 pr-1">
                  {notifications.length === 0 ? (
                    <div className="p-4 text-center text-xs text-stone-400">Tidak ada notifikasi saat ini.</div>
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

                        {!notif.isRead && onMarkNotificationRead && (
                          <div className="pt-1 flex justify-end">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onMarkNotificationRead(notif.id);
                              }}
                              className="text-[10px] text-emerald-400 hover:underline flex items-center space-x-1"
                            >
                              <Check className="w-3 h-3" />
                              <span>Tandai dibaca</span>
                            </button>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User XP Badge */}
          <div className="flex items-center space-x-1.5 bg-amber-950/80 border border-amber-700/60 px-3 py-1.5 rounded-full shadow-xs">
            <Award className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-extrabold text-amber-200">{user.total_xp} XP</span>
          </div>

          {/* Streak Badge */}
          <div className="hidden sm:flex items-center space-x-1 bg-red-950/80 border border-red-800/60 px-2.5 py-1.5 rounded-full">
            <Flame className="w-4 h-4 text-red-400 animate-bounce" />
            <span className="text-xs font-bold text-red-200">{user.streakDays} Hari</span>
          </div>

          {/* Clear Prominent Login & Role Switcher */}
          <div className="relative group">
            <button className="flex items-center space-x-2 bg-gradient-to-r from-amber-600 via-amber-500 to-emerald-600 hover:from-amber-500 hover:to-emerald-500 text-stone-950 px-3.5 py-1.5 rounded-xl text-xs font-black transition-all shadow-md cursor-pointer border border-amber-300/40">
              {user.role === 'siswa' && <UserCheck className="w-4 h-4 text-stone-950" />}
              {user.role === 'guru' && <GraduationCap className="w-4 h-4 text-stone-950" />}

              {user.role === 'admin' && <Shield className="w-4 h-4 text-stone-950" />}
              <div className="flex flex-col items-start leading-tight">
                <span className="text-[9px] uppercase tracking-wider opacity-80">Akun Login:</span>
                <span className="capitalize font-black text-xs">{user.role}</span>
              </div>
            </button>
            
            <div className="absolute right-0 mt-2 w-56 bg-stone-900 border border-amber-600/50 rounded-2xl shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-150 pointer-events-none group-hover:pointer-events-auto p-2.5 z-50">
              <div className="flex items-center justify-between border-b border-stone-800 pb-2 mb-2 px-1">
                <span className="text-[10px] font-extrabold text-amber-400 uppercase tracking-wider">Pilih Peran Akun</span>
                <span className="text-[9px] text-stone-400">Demo Instant</span>
              </div>
              <button
                onClick={() => onRoleChange('siswa')}
                className={`w-full text-left p-2 rounded-xl text-xs font-medium flex items-center space-x-2.5 transition-all mb-1 ${
                  user.role === 'siswa' ? 'bg-emerald-900/80 text-emerald-100 font-bold border border-emerald-500/60' : 'text-stone-300 hover:bg-stone-800'
                }`}
              >
                <div className="p-1.5 bg-emerald-800/80 rounded-lg text-emerald-300">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-xs">Siswa (Student)</div>
                  <div className="text-[10px] text-stone-400">Akses Peta Belajar & CBT TKA</div>
                </div>
              </button>
              <button
                onClick={() => onRoleChange('guru')}
                className={`w-full text-left p-2 rounded-xl text-xs font-medium flex items-center space-x-2.5 transition-all mb-1 ${
                  user.role === 'guru' ? 'bg-amber-900/80 text-amber-100 font-bold border border-amber-500/60' : 'text-stone-300 hover:bg-stone-800'
                }`}
              >
                <div className="p-1.5 bg-amber-800/80 rounded-lg text-amber-300">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-xs">Guru Sosiologi</div>
                  <div className="text-[10px] text-stone-400">Kelola Bank Soal & Tugas</div>
                </div>
              </button>
              <button
                onClick={() => onRoleChange('admin')}
                className={`w-full text-left p-2 rounded-xl text-xs font-medium flex items-center space-x-2.5 transition-all ${
                  user.role === 'admin' ? 'bg-purple-900/80 text-purple-100 font-bold border border-purple-500/60' : 'text-stone-300 hover:bg-stone-800'
                }`}
              >
                <div className="p-1.5 bg-purple-800/80 rounded-lg text-purple-300">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-xs">Administrator LMS</div>
                  <div className="text-[10px] text-stone-400">Kontrol Sistem & User</div>
                </div>
              </button>
            </div>
          </div>

          {/* User Avatar */}
          <div className="w-9 h-9 rounded-full ring-2 ring-emerald-500/50 overflow-hidden shrink-0">
            <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      {/* Mobile Subnav Bar */}
      <div className="lg:hidden flex items-center justify-around bg-stone-900 border-t border-stone-800 px-2 py-2 text-[11px] font-semibold text-stone-300 overflow-x-auto">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex flex-col items-center space-y-0.5 px-2 ${activeTab === 'dashboard' ? 'text-amber-300 font-extrabold' : ''}`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Beranda</span>
        </button>
        <button
          onClick={() => setActiveTab('journey')}
          className={`flex flex-col items-center space-y-0.5 px-2 ${activeTab === 'journey' ? 'text-emerald-400 font-extrabold' : ''}`}
        >
          <Compass className="w-4 h-4" />
          <span>Peta Belajar</span>
        </button>
        <button
          onClick={() => setActiveTab('modules')}
          className={`flex flex-col items-center space-y-0.5 px-2 ${activeTab === 'modules' ? 'text-emerald-400 font-extrabold' : ''}`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>Modul</span>
        </button>
        <button
          onClick={() => setActiveTab('tasks')}
          className={`flex flex-col items-center space-y-0.5 px-2 ${activeTab === 'tasks' ? 'text-amber-400 font-extrabold' : ''}`}
        >
          <Users className="w-4 h-4" />
          <span>Misi</span>
        </button>
        <button
          onClick={() => setActiveTab('classrooms')}
          className={`flex flex-col items-center space-y-0.5 px-2 ${activeTab === 'classrooms' ? 'text-emerald-400 font-extrabold' : ''}`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>Kelas</span>
        </button>
        <button
          onClick={() => setActiveTab('cbt')}
          className={`flex flex-col items-center space-y-0.5 px-2 ${activeTab === 'cbt' ? 'text-amber-400 font-extrabold' : ''}`}
        >
          <FileText className="w-4 h-4" />
          <span>CBT</span>
        </button>
        <button
          onClick={() => setActiveTab('leaderboard')}
          className={`flex flex-col items-center space-y-0.5 px-2 ${activeTab === 'leaderboard' ? 'text-amber-400 font-extrabold' : ''}`}
        >
          <Trophy className="w-4 h-4" />
          <span>Klasemen</span>
        </button>
      </div>
    </header>
  );
};

