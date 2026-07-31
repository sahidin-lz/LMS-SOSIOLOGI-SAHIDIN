import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Course, Lesson, User } from '../types';
import { Lock, CheckCircle2, PlayCircle, Sparkles, Trophy, Star, ArrowRight, BookOpen, Compass } from 'lucide-react';

interface LearningJourneyMapProps {
  user: User;
  courses: Course[];
  onSelectLesson: (courseId: string, lessonId: string) => void;
}

export const LearningJourneyMap: React.FC<LearningJourneyMapProps> = ({ user, courses, onSelectLesson }) => {
  const [selectedGrade, setSelectedGrade] = useState<10 | 11 | 12>(user.grade as 10 | 11 | 12 || 10);

  const activeCourse = courses.find((c) => c.grade_level === selectedGrade) || courses[0];

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner - Sosiologi Membumi Theme */}
      <div className="bg-gradient-to-r from-emerald-900 via-stone-900 to-amber-950 rounded-3xl p-6 sm:p-8 text-white border border-orange-300/40 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-orange-500/20 text-orange-500 rounded-full text-xs font-bold border border-amber-500/30">
            <Compass className="w-3.5 h-3.5 text-orange-600" />
            <span>Peta Jalan Pembelajaran Membumi</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-800">
            Roadmap Petualangan Sosiologi Kelas {selectedGrade}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Taklukkan setiap node bab dan materi Sosiologi untuk mengumpulkan Socio-Points, membuka lencana kehormatan, dan menguasai konsep fakta sosial hingga perubahan global.
          </p>

          {/* Grade & TKA Selector Tabs */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            {[10, 11, 12].map((g) => (
              <button
                key={g}
                onClick={() => setSelectedGrade(g as 10 | 11 | 12)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                  selectedGrade === g
                    ? 'bg-orange-500 text-white border-amber-400 shadow-sm border border-slate-200 scale-105'
                    : 'bg-slate-100/80 text-slate-600 border-slate-300 hover:bg-slate-200'
                }`}
              >
                Kelas {g} SMA
              </button>
            ))}
            <div className="px-3 py-1.5 bg-gradient-to-r from-emerald-800 to-amber-700 text-orange-700 rounded-xl text-xs font-extrabold border border-amber-500/50 flex items-center space-x-1.5 shadow-sm border border-slate-200">
              <Sparkles className="w-3.5 h-3.5 text-orange-500" />
              <span>Target Khusus: TKA Sosiologi</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Timeline Roadmap Node Path */}
      <div className="bg-white/90 rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-lg relative min-h-[500px]">
        {/* Header Information for Selected Course */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 border-b border-slate-200">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600 px-3 py-1 bg-orange-50 rounded-full border border-orange-300">
              {activeCourse.category}
            </span>
            <h2 className="text-xl font-bold text-slate-800 mt-2">{activeCourse.title}</h2>
            <p className="text-xs text-white0 mt-1">{activeCourse.description}</p>
          </div>

          <div className="flex items-center space-x-3 bg-slate-100/90 px-4 py-2.5 rounded-2xl border border-slate-300 shrink-0">
            <Trophy className="w-5 h-5 text-orange-600" />
            <div>
              <div className="text-[10px] text-white0 font-medium">Progres Kelas {selectedGrade}</div>
              <div className="text-xs font-bold text-slate-800">
                {activeCourse.completedLessons} / {activeCourse.totalLessons} Selesai
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Path Container */}
        <div className="py-10 max-w-xl mx-auto relative">
          {/* Vertical Wavy Connector Line */}
          <div className="absolute top-12 bottom-12 left-1/2 -translate-x-1/2 w-1.5 bg-gradient-to-b from-blue-600 via-orange-600 to-stone-700 rounded-full -z-0 opacity-60"></div>

          <div className="space-y-12 relative z-10">
            {activeCourse.lessons.map((lesson, idx) => {
              // Node logic
              const isCompleted = lesson.completed;
              // Active node is the first uncompleted lesson
              const isPreviousCompleted = idx === 0 || activeCourse.lessons[idx - 1]?.completed;
              const isActive = !isCompleted && isPreviousCompleted;
              const isLocked = !isCompleted && !isActive;

              // Alternate left and right offset
              const isEven = idx % 2 === 0;

              return (
                <motion.div
                  key={lesson.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center justify-center relative"
                >
                  <div className={`flex items-center w-full ${isEven ? 'flex-row' : 'flex-row-reverse'}`}>
                    {/* Lesson Card */}
                    <div className="w-[42%] px-2 sm:px-4">
                      <div
                        onClick={() => !isLocked && onSelectLesson(activeCourse.id, lesson.id)}
                        className={`p-4 rounded-2xl border transition-all duration-300 relative ${
                          isCompleted
                            ? 'bg-slate-100/90 border-emerald-600/60 hover:border-blue-400 cursor-pointer shadow-sm border border-slate-200'
                            : isActive
                            ? 'bg-gradient-to-br from-emerald-950 to-stone-900 border-amber-500 shadow-xl shadow-emerald-900/30 cursor-pointer ring-2 ring-amber-500/40'
                            : 'bg-slate-100 border-slate-200 opacity-60 cursor-not-allowed'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <span className="text-[10px] font-bold text-orange-600">
                            Bab {lesson.chapter_number}
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-slate-600 border border-slate-300">
                            +{lesson.xp_reward} XP
                          </span>
                        </div>

                        <h3 className="text-xs sm:text-sm font-extrabold text-slate-800 line-clamp-2">
                          {lesson.title}
                        </h3>

                        <div className="mt-2 flex items-center justify-between text-[10px] text-white0">
                          <span>{lesson.duration}</span>
                          {isCompleted && (
                            <span className="text-blue-600 font-bold flex items-center space-x-1">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Selesai</span>
                            </span>
                          )}
                          {isActive && (
                            <span className="text-orange-600 font-bold flex items-center space-x-1 animate-pulse">
                              <PlayCircle className="w-3 h-3" />
                              <span>Kerjakan</span>
                            </span>
                          )}
                          {isLocked && (
                            <span className="text-slate-400 flex items-center space-x-1">
                              <Lock className="w-3 h-3" />
                              <span>Terkunci</span>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Center Node Icon Circle */}
                    <div className="relative z-20 mx-2 shrink-0">
                      {isCompleted && (
                        <motion.button
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => onSelectLesson(activeCourse.id, lesson.id)}
                          className="w-14 h-14 rounded-full bg-blue-600 text-stone-950 flex items-center justify-center shadow-lg border-4 border-stone-900 cursor-pointer"
                        >
                          <CheckCircle2 className="w-7 h-7 stroke-[2.5]" />
                        </motion.button>
                      )}

                      {isActive && (
                        <motion.button
                          animate={{ scale: [1, 1.08, 1] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => onSelectLesson(activeCourse.id, lesson.id)}
                          className="w-16 h-16 rounded-full bg-gradient-to-tr from-orange-500 to-blue-500 text-stone-950 flex items-center justify-center shadow-xl shadow-amber-500/20 border-4 border-stone-900 cursor-pointer"
                        >
                          <PlayCircle className="w-8 h-8 fill-stone-950 text-orange-600" />
                        </motion.button>
                      )}

                      {isLocked && (
                        <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center border-4 border-stone-900 shadow-sm">
                          <Lock className="w-5 h-5" />
                        </div>
                      )}
                    </div>

                    {/* Empty placeholder balancing opposite side */}
                    <div className="w-[42%]"></div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
