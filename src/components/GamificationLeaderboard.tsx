import React, { useState } from 'react';
import { Trophy, Award, Crown, Medal, Flame, Star, Sparkles, TrendingUp, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { LeaderboardUser, User } from '../types';

interface GamificationLeaderboardProps {
  user: User;
  leaderboardData: LeaderboardUser[];
}

export const GamificationLeaderboard: React.FC<GamificationLeaderboardProps> = ({
  user,
  leaderboardData,
}) => {
  const [gradeFilter, setGradeFilter] = useState<number | 'all'>('all');

  const filteredLeaderboard = leaderboardData.filter((u) =>
    gradeFilter === 'all' ? true : u.grade === gradeFilter
  );

  const top1 = filteredLeaderboard.find((u) => u.rank === 1);
  const top2 = filteredLeaderboard.find((u) => u.rank === 2);
  const top3 = filteredLeaderboard.find((u) => u.rank === 3);

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-orange-600 via-orange-600 to-amber-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-bold text-amber-100 border border-white/20">
              <Trophy className="w-3.5 h-3.5 text-orange-500" />
              <span>Klasemen Socio-Points Mingguan</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Leaderboard Sosiolog SMA Se-Indonesia
            </h1>
            <p className="text-amber-100 text-sm max-w-xl">
              Dapatkan XP dari menyelesaikan modul materi, menjawab soal tryout CBT dengan akurasi tinggi, dan mempertahankan streak harian!
            </p>
          </div>

          {/* User's Own XP Rank Banner */}
          <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/25 flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-amber-400 flex items-center justify-center text-slate-900 shadow-sm border border-slate-200">
              <Crown className="w-7 h-7 fill-slate-900" />
            </div>
            <div>
              <p className="text-xs text-amber-100 font-medium">Peringkat Kamu</p>
              <p className="text-xl font-extrabold text-white">Peringkat #3</p>
              <p className="text-xs font-semibold text-orange-500">{user.total_xp} Socio-Points</p>
            </div>
          </div>
        </div>
      </div>

      {/* Top 3 Winners Podium */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end pt-4">
        {/* 2nd Place Silver */}
        {top2 && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col items-center text-center space-y-3 relative order-2 md:order-1">
            <div className="absolute -top-4 bg-slate-300 text-slate-800 font-extrabold text-xs px-3 py-1 rounded-full shadow-xs border border-slate-400">
              Juara 2
            </div>
            <div className="relative mt-2">
              <div className="w-20 h-20 rounded-full ring-4 ring-slate-300 overflow-hidden shadow-sm border border-slate-200">
                <img src={top2.avatar} alt={top2.name} className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-slate-700 font-black text-xs shadow-xs">
                2
              </div>
            </div>

            <div>
              <h3 className="font-bold text-slate-800 text-base">{top2.name}</h3>
              <p className="text-xs text-slate-600">{top2.school}</p>
            </div>

            <div className="bg-slate-50 px-4 py-2 rounded-2xl border border-slate-200 w-full">
              <span className="text-sm font-extrabold text-indigo-700">{top2.xp} XP</span>
              <p className="text-[10px] text-slate-400">{top2.badgeTitle}</p>
            </div>
          </div>
        )}

        {/* 1st Place Gold */}
        {top1 && (
          <div className="bg-gradient-to-b from-amber-50 to-white rounded-3xl p-7 border-2 border-amber-300 shadow-xl flex flex-col items-center text-center space-y-3 relative order-1 md:order-2 transform md:-translate-y-4">
            <div className="absolute -top-5 bg-amber-400 text-slate-900 font-black text-xs px-4 py-1.5 rounded-full shadow-sm border border-slate-200 flex items-center space-x-1">
              <Crown className="w-4 h-4 fill-slate-900" />
              <span>Juara 1 Grandmaster</span>
            </div>

            <div className="relative mt-3">
              <div className="w-24 h-24 rounded-full ring-4 ring-amber-400 overflow-hidden shadow-lg">
                <img src={top1.avatar} alt={top1.name} className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-9 h-9 rounded-full bg-amber-400 border-2 border-white flex items-center justify-center text-slate-900 font-black text-sm shadow-sm border border-slate-200">
                1
              </div>
            </div>

            <div>
              <h3 className="font-extrabold text-slate-900 text-lg">{top1.name}</h3>
              <p className="text-xs text-slate-600 font-medium">{top1.school}</p>
            </div>

            <div className="bg-amber-100/70 px-5 py-2.5 rounded-2xl border border-amber-200 w-full">
              <span className="text-base font-black text-amber-900">{top1.xp} XP</span>
              <p className="text-[11px] font-bold text-amber-800">{top1.badgeTitle}</p>
            </div>
          </div>
        )}

        {/* 3rd Place Bronze */}
        {top3 && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col items-center text-center space-y-3 relative order-3">
            <div className="absolute -top-4 bg-amber-700 text-amber-100 font-extrabold text-xs px-3 py-1 rounded-full shadow-xs">
              Juara 3
            </div>
            <div className="relative mt-2">
              <div className="w-20 h-20 rounded-full ring-4 ring-amber-600 overflow-hidden shadow-sm border border-slate-200">
                <img src={top3.avatar} alt={top3.name} className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-amber-700 border-2 border-white flex items-center justify-center text-white font-black text-xs shadow-xs">
                3
              </div>
            </div>

            <div>
              <h3 className="font-bold text-slate-800 text-base">{top3.name}</h3>
              <p className="text-xs text-slate-600">{top3.school}</p>
            </div>

            <div className="bg-slate-50 px-4 py-2 rounded-2xl border border-slate-200 w-full">
              <span className="text-sm font-extrabold text-indigo-700">{top3.xp} XP</span>
              <p className="text-[10px] text-slate-400">{top3.badgeTitle}</p>
            </div>
          </div>
        )}
      </div>

      {/* Leaderboard Table */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-800">Tabel Peringkat Lengkap</h2>
            <p className="text-xs text-slate-600">Klasemen diperbarui secara langsung setelah setiap aktivitas</p>
          </div>

          <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setGradeFilter('all')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                gradeFilter === 'all' ? 'bg-white text-indigo-700 shadow-xs font-bold' : 'text-slate-600'
              }`}
            >
              Semua Kelas
            </button>
            <button
              onClick={() => setGradeFilter(12)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                gradeFilter === 12 ? 'bg-white text-indigo-700 shadow-xs font-bold' : 'text-slate-600'
              }`}
            >
              Kelas 12
            </button>
            <button
              onClick={() => setGradeFilter(11)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                gradeFilter === 11 ? 'bg-white text-indigo-700 shadow-xs font-bold' : 'text-slate-600'
              }`}
            >
              Kelas 11
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-orange-500 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="p-3">Rank</th>
                <th className="p-3">Nama Siswa</th>
                <th className="p-3">Asal Sekolah</th>
                <th className="p-3">Gelar / Gelombang</th>
                <th className="p-3 text-right">Socio-Points (XP)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLeaderboard.map((item) => {
                const isUser = item.id === user.id;

                return (
                  <tr
                    key={item.id}
                    className={`transition-all ${
                      isUser
                        ? 'bg-amber-50/70 font-bold border-l-4 border-amber-500'
                        : 'hover:bg-slate-50'
                    }`}
                  >
                    <td className="p-3">
                      <span
                        className={`w-7 h-7 rounded-full flex items-center justify-center font-extrabold text-xs ${
                          item.rank === 1
                            ? 'bg-amber-400 text-slate-900'
                            : item.rank === 2
                            ? 'bg-slate-300 text-slate-800'
                            : item.rank === 3
                            ? 'bg-amber-700 text-white'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {item.rank}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center space-x-3">
                        <img
                          src={item.avatar}
                          alt={item.name}
                          className="w-8 h-8 rounded-full object-cover ring-2 ring-slate-200"
                        />
                        <span className="font-bold text-slate-800">{item.name}</span>
                      </div>
                    </td>
                    <td className="p-3 text-slate-600">{item.school}</td>
                    <td className="p-3">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
                        {item.badgeTitle}
                      </span>
                    </td>
                    <td className="p-3 text-right font-extrabold text-amber-600 text-sm">
                      {item.xp} XP
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
