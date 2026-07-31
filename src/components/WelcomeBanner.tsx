import React from 'react';
import { Sparkles, Zap, BookOpen, Trophy, Award, Flame } from 'lucide-react';
import { User } from '../types';

interface WelcomeBannerProps {
  user: User;
  onNavigate: (tab: 'dashboard' | 'modules' | 'leaderboard' | 'cbt') => void;
}

export const WelcomeBanner: React.FC<WelcomeBannerProps> = ({ user, onNavigate }) => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-700 via-indigo-800 to-purple-800 p-6 sm:p-8 text-white shadow-xl">
      <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-0 right-1/4 w-40 h-40 bg-purple-500/20 rounded-full blur-2xl pointer-events-none"></div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        <div className="md:col-span-2 space-y-3">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-indigo-100 border border-white/15">
            <Sparkles className="w-3.5 h-3.5 text-orange-500 animate-pulse" />
            <span>Target TKA Sosiologi 2026: Top 1% PTN</span>
          </div>
          
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Selamat Belajar, <span className="text-orange-500">{user.name}</span>! 👋
          </h1>
          
          <p className="text-indigo-100 text-sm max-w-xl leading-relaxed">
            Selesai <span className="font-bold text-white">7 hari beruntun</span>! Teruskan konsistensi belajarmu untuk menguasai Teori Struktur Sosial, Konflik, dan Metodologi Penelitian Sosiologi.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('cbt')}
              className="inline-flex items-center space-x-2 bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold px-5 py-2.5 rounded-xl text-sm transition-all shadow-sm border border-slate-200 hover:shadow-amber-400/20 cursor-pointer"
            >
              <Zap className="w-4 h-4 fill-slate-900" />
              <span>Mulai Simulasi Tryout CBT</span>
            </button>

            <button
              onClick={() => onNavigate('modules')}
              className="inline-flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white font-medium px-4 py-2.5 rounded-xl text-sm transition-all border border-white/20 cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>Jelajahi Materi Kelas {user.grade}</span>
            </button>
          </div>
        </div>

        {/* User Stat Cards */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <p className="text-xs text-indigo-200">Gelar Socio-Points</p>
              <p className="text-base font-bold text-orange-500">{user.levelTitle}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-400/20 flex items-center justify-center text-orange-500">
              <Trophy className="w-5 h-5" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="bg-white/5 p-2.5 rounded-xl border border-white/10">
              <div className="flex items-center justify-center space-x-1 text-orange-500 mb-0.5">
                <Award className="w-4 h-4" />
                <span className="text-xs font-semibold">Total XP</span>
              </div>
              <span className="text-lg font-extrabold text-white">{user.total_xp}</span>
            </div>

            <div className="bg-white/5 p-2.5 rounded-xl border border-white/10">
              <div className="flex items-center justify-center space-x-1 text-red-300 mb-0.5">
                <Flame className="w-4 h-4" />
                <span className="text-xs font-semibold">Streak</span>
              </div>
              <span className="text-lg font-extrabold text-white">{user.streakDays} Hari</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
