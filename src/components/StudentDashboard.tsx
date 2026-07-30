import React from 'react';
import { 
  Award, Flame, BookOpen, ChevronRight, Play, CheckCircle2, 
  Sparkles, Target, Zap, ArrowUpRight, Clock, Star, Trophy
} from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Course, Exam, TryoutAnalytics, User, Announcement } from '../types';
import { INITIAL_COMPETENCY_ANALYSIS } from '../data/sociologyData';
import { Bell } from 'lucide-react';

interface StudentDashboardProps {
  user: User;
  courses: Course[];
  exams: Exam[];
  announcements?: Announcement[];
  analytics: TryoutAnalytics[];
  onStartCourse: (courseId: string) => void;
  onStartExam: (examId: string) => void;
  setActiveTab: (tab: 'dashboard' | 'modules' | 'leaderboard' | 'cbt') => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  user,
  courses,
  exams,
  announcements = [],
  analytics,
  onStartCourse,
  onStartExam,
  setActiveTab,
}) => {
  const latestTryout = analytics[analytics.length - 1];
  const targetUTBK = 700;

  return (
    <div className="space-y-8 pb-12">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-700 via-indigo-800 to-purple-800 p-6 sm:p-8 text-white shadow-xl">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-0 right-1/4 w-40 h-40 bg-purple-500/20 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="md:col-span-2 space-y-3">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-indigo-100 border border-white/15">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              <span>Target TKA Sosiologi 2026: Top 1% PTN</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Selamat Belajar, <span className="text-amber-300">{user.name}</span>! 👋
            </h1>
            
            <p className="text-indigo-100 text-sm max-w-xl leading-relaxed">
              Selesai <span className="font-bold text-white">7 hari beruntun</span>! Teruskan konsistensi belajarmu untuk menguasai Teori Struktur Sosial, Konflik, dan Metodologi Penelitian Sosiologi.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setActiveTab('cbt')}
                className="inline-flex items-center space-x-2 bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold px-5 py-2.5 rounded-xl text-sm transition-all shadow-md hover:shadow-amber-400/20 cursor-pointer"
              >
                <Zap className="w-4 h-4 fill-slate-900" />
                <span>Mulai Simulasi Tryout CBT</span>
              </button>

              <button
                onClick={() => setActiveTab('modules')}
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
                <p className="text-base font-bold text-amber-300">{user.levelTitle}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-amber-400/20 flex items-center justify-center text-amber-300">
                <Trophy className="w-5 h-5" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="bg-white/5 p-2.5 rounded-xl border border-white/10">
                <div className="flex items-center justify-center space-x-1 text-amber-300 mb-0.5">
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

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2 cols): Analytics Chart & Active Courses */}
        <div className="lg:col-span-2 space-y-8">
          {/* Recharts Analytics Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-lg font-bold text-slate-800 flex items-center space-x-2">
                  <Target className="w-5 h-5 text-indigo-600" />
                  <span>Grafik Progres Nilai Tryout TKA Sosiologi</span>
                </h2>
                <p className="text-xs text-slate-500">
                  Perkembangan skor dari tryout ke tryout menuju target <span className="font-semibold text-emerald-600">85 Points</span> (Skala Maksimal 100 IRT TKA)
                </p>
              </div>

              <div className="flex items-center space-x-2 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 text-xs text-emerald-800 font-semibold self-start sm:self-auto">
                <ArrowUpRight className="w-4 h-4 text-emerald-600" />
                <span>Skor IRT Terbaru: {latestTryout?.score || 92} / 100</span>
              </div>
            </div>

            {/* Recharts Line Graph */}
            <div className="h-64 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analytics} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="exam_title" stroke="#64748b" fontSize={12} tickLine={false} />
                  <YAxis domain={[0, 100]} stroke="#64748b" fontSize={12} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      borderRadius: '12px',
                      color: '#fff',
                      border: 'none',
                      fontSize: '12px',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="score"
                    name="Skor Tryout Kamu (IRT Max 100)"
                    stroke="#4f46e5"
                    strokeWidth={3}
                    dot={{ fill: '#4f46e5', r: 5 }}
                    activeDot={{ r: 8, fill: '#fbbf24' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="target_score"
                    name="Target Passing Grade PTN"
                    stroke="#10b981"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 bg-slate-50 p-3 rounded-2xl border border-slate-100">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-indigo-600 inline-block"></span>
                <span>Nilai IRT Tryout Kamu (Max 100)</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-3 h-0.5 border-t-2 border-dashed border-emerald-500 inline-block"></span>
                <span>Target PTN Favorit (85+)</span>
              </div>
            </div>
          </div>

          {/* Analisis Kemampuan Siswa Sesuai Soal yang Dikerjakan */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-amber-100 text-amber-800 rounded-xl">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-800">Analisis Kemampuan Siswa Sesuai Soal Dikerjakan</h2>
                  <p className="text-xs text-slate-500">Pemetaan kekuatan & kelemahan per butir soal & materi sosiologi</p>
                </div>
              </div>
              <span className="text-xs bg-indigo-50 text-indigo-700 font-bold px-3 py-1 rounded-full border border-indigo-100">
                Data Real-Time
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {INITIAL_COMPETENCY_ANALYSIS.map((comp) => {
                const mastery = comp.mastery_percentage || 0;
                let badgeClass = 'bg-emerald-100 text-emerald-800 border-emerald-200';
                if (mastery < 50) {
                  badgeClass = 'bg-red-100 text-red-800 border-red-200';
                } else if (mastery < 80) {
                  badgeClass = 'bg-amber-100 text-amber-800 border-amber-200';
                }

                return (
                  <div key={comp.topic_name} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-slate-800">{comp.topic_name}</span>
                      <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${badgeClass}`}>
                        {comp.status} ({mastery}%)
                      </span>
                    </div>

                    {/* Progress bar */}
                    <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${
                          mastery >= 80
                            ? 'bg-emerald-500'
                            : mastery >= 50
                            ? 'bg-amber-500'
                            : 'bg-red-500'
                        }`}
                        style={{ width: `${mastery}%` }}
                      ></div>
                    </div>

                    <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                      💡 {comp.recommendation}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recommended Modules / Continue Learning */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-800">Modul Belajar Kurikulum Sosiologi</h2>
                <p className="text-xs text-slate-500">Pilih modul kelas 10, 11, atau 12 untuk mulai belajar</p>
              </div>

              <button
                onClick={() => setActiveTab('modules')}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center space-x-1"
              >
                <span>Lihat Semua</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {courses.map((course) => {
                const progressPercent = Math.round((course.completedLessons / course.totalLessons) * 100);

                return (
                  <div
                    key={course.id}
                    className="group bg-slate-50 hover:bg-indigo-50/40 rounded-2xl p-4 border border-slate-200 hover:border-indigo-300 transition-all duration-200 flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-700 border border-indigo-200">
                          Kelas {course.grade_level} SMA
                        </span>
                        <span className="text-xs text-slate-500 font-medium">{course.category}</span>
                      </div>

                      <h3 className="font-bold text-sm text-slate-800 group-hover:text-indigo-700 transition-colors line-clamp-2">
                        {course.title}
                      </h3>

                      <p className="text-xs text-slate-500 line-clamp-2">{course.description}</p>
                    </div>

                    <div className="space-y-2">
                      {/* Progress bar */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[11px] font-medium text-slate-600">
                          <span>Progres Belajar</span>
                          <span>{progressPercent}%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                          <div
                            className="bg-indigo-600 h-full rounded-full transition-all duration-300"
                            style={{ width: `${progressPercent}%` }}
                          ></div>
                        </div>
                      </div>

                      <button
                        onClick={() => onStartCourse(course.id)}
                        className="w-full py-2 bg-white hover:bg-indigo-600 text-indigo-700 hover:text-white border border-indigo-200 hover:border-indigo-600 font-semibold rounded-xl text-xs transition-all flex items-center justify-center space-x-1.5 cursor-pointer shadow-2xs"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>{progressPercent > 0 ? 'Lanjutkan Belajar' : 'Mulai Modul Ini'}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column (1 col): Announcements, Active Tryouts & Quick Leaderboard Widget */}
        <div className="space-y-8">
          {/* Announcements Card */}
          {announcements.length > 0 && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center space-x-2 text-indigo-900 border-b border-slate-100 pb-3">
                <Bell className="w-5 h-5 text-indigo-600 animate-bounce" />
                <h2 className="font-bold text-base">Pengumuman LMS & Sekolah</h2>
              </div>

              <div className="space-y-3">
                {announcements.map((ann) => (
                  <div key={ann.id} className="p-3.5 bg-indigo-50/50 rounded-2xl border border-indigo-100 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
                        {ann.category}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">{ann.date}</span>
                    </div>
                    <h3 className="font-bold text-xs text-slate-800">{ann.title}</h3>
                    <p className="text-[11px] text-slate-600 leading-snug">{ann.content}</p>
                    <p className="text-[10px] text-indigo-600 font-semibold pt-0.5">— {ann.author}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Active CBT Tryouts Box */}
          <div className="bg-gradient-to-b from-slate-900 to-slate-800 rounded-3xl p-6 text-white shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-700/60 pb-4">
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-amber-400" />
                <h2 className="font-bold text-base">Tryout CBT UTBK Aktif</h2>
              </div>
              <span className="text-[10px] uppercase font-extrabold bg-amber-400 text-slate-900 px-2 py-0.5 rounded-full">
                HOT
              </span>
            </div>

            {exams.map((exam) => (
              <div
                key={exam.id}
                className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700 space-y-3 hover:border-amber-400/50 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-400/20 text-amber-300 border border-amber-400/30">
                    {exam.category}
                  </span>
                  <div className="flex items-center space-x-1 text-slate-400 text-xs">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{exam.duration_minutes} Menit</span>
                  </div>
                </div>

                <h3 className="font-bold text-sm text-slate-100">{exam.title}</h3>

                <p className="text-xs text-slate-400 line-clamp-2">{exam.description}</p>

                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center space-x-1 text-amber-300 text-xs font-semibold">
                    <Award className="w-3.5 h-3.5" />
                    <span>+{exam.xp_reward} XP</span>
                  </div>

                  <button
                    onClick={() => onStartExam(exam.id)}
                    className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-3.5 py-1.5 rounded-lg text-xs transition-all shadow-xs cursor-pointer flex items-center space-x-1"
                  >
                    <span>Mulai CBT</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Study Recommendation */}
          <div className="bg-amber-50/70 rounded-3xl p-6 border border-amber-200/80 space-y-3">
            <div className="flex items-center space-x-2 text-amber-800">
              <Star className="w-5 h-5 text-amber-500 fill-amber-400" />
              <h3 className="font-bold text-sm">Tips Lolos UTBK Sosiologi</h3>
            </div>
            <p className="text-xs text-amber-900/80 leading-relaxed">
              Fokus pada pemahaman korelasi antar-konsep (seperti bagaimana <span className="font-semibold">Diferensiasi Sosial</span> dapat memicu <span className="font-semibold">Konflik Horizontal</span> jika terjadi Konsolidasi Etnis & Agama).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
