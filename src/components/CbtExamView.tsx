import React, { useState, useEffect, useRef } from 'react';
import { 
  Clock, AlertTriangle, ChevronLeft, ChevronRight, CheckCircle2, 
  HelpCircle, Flag, Send, ShieldAlert, Sparkles, X, RotateCcw
} from 'lucide-react';
import { Exam, Question, UserAnswer } from '../types';

interface CbtExamViewProps {
  exam: Exam;
  userId: string;
  onSubmitExam: (
    answers: Record<string, UserAnswer>,
    durationSpentSeconds: number,
    tabSwitchCount: number
  ) => void;
  onCancelExam: () => void;
}

export const CbtExamView: React.FC<CbtExamViewProps> = ({
  exam,
  userId,
  onSubmitExam,
  onCancelExam,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, UserAnswer>>({});
  const [timeLeft, setTimeLeft] = useState<number>(exam.duration_minutes * 60);
  const [tabSwitchCount, setTabSwitchCount] = useState<number>(0);
  const [showAntiCheatWarning, setShowAntiCheatWarning] = useState<boolean>(false);
  const [showConfirmSubmitModal, setShowConfirmSubmitModal] = useState<boolean>(false);
  const startTimeRef = useRef<number>(Date.now());

  const currentQuestion: Question = exam.questions[currentQuestionIndex];

  // Timer Countdown Effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Auto submit when time expires
          handleFinalSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Anti-cheat tab switch listener
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setTabSwitchCount((prev) => {
          const newCount = prev + 1;
          setShowAntiCheatWarning(true);
          return newCount;
        });
      }
    };

    window.addEventListener('visibilitychange', handleVisibilityChange);
    return () => window.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // Format seconds to MM:SS
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (option: 'A' | 'B' | 'C' | 'D' | 'E') => {
    const qId = currentQuestion.id;
    const existing = answers[qId] || { selected_option: null, is_doubtful: false };
    setAnswers({
      ...answers,
      [qId]: { ...existing, selected_option: option },
    });
  };

  const handleToggleDoubtful = () => {
    const qId = currentQuestion.id;
    const existing = answers[qId] || { selected_option: null, is_doubtful: false };
    setAnswers({
      ...answers,
      [qId]: { ...existing, is_doubtful: !existing.is_doubtful },
    });
  };

  const handleFinalSubmit = () => {
    const durationSpent = Math.max(1, Math.round((Date.now() - startTimeRef.current) / 1000));
    onSubmitExam(answers, durationSpent, tabSwitchCount);
  };

  // Calculate status statistics for the confirmation modal
  let totalAnswered = 0;
  let totalDoubtful = 0;
  let totalUnanswered = 0;

  exam.questions.forEach((q) => {
    const ans = answers[q.id];
    if (ans?.is_doubtful) totalDoubtful++;
    if (ans?.selected_option) totalAnswered++;
    else totalUnanswered++;
  });

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans select-none">
      {/* Floating Sticky Header */}
      <header className="sticky top-0 z-50 bg-slate-800/95 backdrop-blur-md border-b border-slate-700 px-4 py-3 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="font-black text-amber-400 text-lg tracking-tight">CBT TKA Engine</span>
            <span className="hidden sm:inline text-xs text-slate-400">| {exam.title}</span>
          </div>

          {/* Countdown Timer */}
          <div className="flex items-center space-x-2 bg-red-950/80 border border-red-500/50 text-red-400 px-4 py-1.5 rounded-full shadow-inner animate-pulse">
            <Clock className="w-4 h-4 text-red-400" />
            <span className="font-mono text-base font-extrabold">{formatTime(timeLeft)}</span>
          </div>

          <div className="flex items-center space-x-3">
            {tabSwitchCount > 0 && (
              <div className="hidden md:flex items-center space-x-1.5 text-xs text-amber-400 bg-amber-950/60 border border-amber-500/30 px-3 py-1 rounded-full">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Pelanggaran Tab: {tabSwitchCount}x</span>
              </div>
            )}

            <button
              onClick={() => setShowConfirmSubmitModal(true)}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-1.5 rounded-xl text-xs transition-all shadow-md cursor-pointer flex items-center space-x-1"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Selesai & Kumpulkan</span>
            </button>
          </div>
        </div>
      </header>

      {/* Anti-Cheat Toast Warning */}
      {showAntiCheatWarning && (
        <div className="bg-amber-500 text-slate-950 px-4 py-2 text-center text-xs font-bold flex items-center justify-center space-x-2">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>
            PERINGATAN ANTI-CHEAT: Anda terdeteksi berpindah tab browser! ({tabSwitchCount}x). Tetap berada di halaman ujian.
          </span>
          <button onClick={() => setShowAntiCheatWarning(false)} className="ml-2 font-black underline">
            [Tutup]
          </button>
        </div>
      )}

      {/* Main Examination Workspace */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Question Area (3 Cols) */}
        <div className="lg:col-span-3 bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-700/80 shadow-xl flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            {/* Question Header */}
            <div className="flex items-center justify-between border-b border-slate-700/60 pb-4">
              <div className="flex items-center space-x-3">
                <span className="w-9 h-9 rounded-xl bg-indigo-600 text-white font-extrabold text-sm flex items-center justify-center shadow-md">
                  {currentQuestionIndex + 1}
                </span>
                <div>
                  <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                    Soal Nomor {currentQuestionIndex + 1} dari {exam.total_questions}
                  </span>
                  <p className="text-xs text-indigo-300 font-bold">Topik: {currentQuestion.topic}</p>
                </div>
              </div>

              {/* Doubtful Checkbox Button */}
              <button
                onClick={handleToggleDoubtful}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border flex items-center space-x-1.5 cursor-pointer ${
                  answers[currentQuestion.id]?.is_doubtful
                    ? 'bg-amber-400 text-slate-950 border-amber-500 shadow-md'
                    : 'bg-slate-700/60 text-slate-300 border-slate-600 hover:bg-slate-700'
                }`}
              >
                <Flag className="w-3.5 h-3.5" />
                <span>Ragu-Ragu</span>
              </button>
            </div>

            {/* Question Text */}
            <div className="text-sm sm:text-base text-slate-100 leading-relaxed font-medium bg-slate-900/50 p-5 rounded-2xl border border-slate-700/50">
              {currentQuestion.text}
            </div>

            {/* Multiple Choice Options A - E */}
            <div className="space-y-3 pt-2">
              {(['A', 'B', 'C', 'D', 'E'] as const).map((optKey) => {
                const optText = currentQuestion[`option_${optKey.toLowerCase()}` as keyof Question];
                const isSelected = answers[currentQuestion.id]?.selected_option === optKey;

                return (
                  <button
                    key={optKey}
                    onClick={() => handleSelectOption(optKey)}
                    className={`w-full text-left p-4 rounded-2xl transition-all border flex items-start space-x-3.5 cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-600 text-white border-indigo-400 shadow-lg ring-2 ring-indigo-400/40'
                        : 'bg-slate-900/40 hover:bg-slate-700/60 text-slate-200 border-slate-700'
                    }`}
                  >
                    <span
                      className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                        isSelected
                          ? 'bg-white text-indigo-700'
                          : 'bg-slate-700 text-slate-300'
                      }`}
                    >
                      {optKey}
                    </span>
                    <span className="text-xs sm:text-sm font-medium pt-0.5 leading-relaxed">
                      {optText}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question Navigation Controls */}
          <div className="flex items-center justify-between border-t border-slate-700/60 pt-4">
            <button
              onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentQuestionIndex === 0}
              className="px-4 py-2.5 bg-slate-700 hover:bg-slate-600 disabled:opacity-40 disabled:hover:bg-slate-700 text-slate-200 rounded-xl font-bold text-xs transition-all flex items-center space-x-1 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Sebelumnya</span>
            </button>

            <span className="text-xs text-slate-400 font-medium">
              Soal {currentQuestionIndex + 1} / {exam.total_questions}
            </span>

            {currentQuestionIndex < exam.total_questions - 1 ? (
              <button
                onClick={() => setCurrentQuestionIndex((prev) => Math.min(exam.total_questions - 1, prev + 1))}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-xs transition-all flex items-center space-x-1 cursor-pointer shadow-md"
              >
                <span>Berikutnya</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => setShowConfirmSubmitModal(true)}
                className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl font-bold text-xs transition-all flex items-center space-x-1 cursor-pointer shadow-md"
              >
                <span>Kumpulkan Ujian</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Right Sidebar: CBT Grid Question Navigator & Color Indicators */}
        <div className="bg-slate-800 rounded-3xl p-6 border border-slate-700/80 shadow-xl space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="font-bold text-slate-200 text-sm border-b border-slate-700/60 pb-3">
              Navigasi Nomor Soal
            </h3>

            {/* Grid Box Layout */}
            <div className="grid grid-cols-5 gap-2.5">
              {exam.questions.map((q, idx) => {
                const ans = answers[q.id];
                const isCurrent = idx === currentQuestionIndex;
                const isAnswered = Boolean(ans?.selected_option);
                const isDoubtful = Boolean(ans?.is_doubtful);

                // Determine grid Box color:
                // Yellow = Doubtful
                // Green = Answered
                // White = Unanswered
                let bgClass = 'bg-white text-slate-900 border-slate-300';
                if (isDoubtful) {
                  bgClass = 'bg-amber-400 text-slate-950 font-black ring-2 ring-amber-300';
                } else if (isAnswered) {
                  bgClass = 'bg-emerald-500 text-slate-950 font-black';
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQuestionIndex(idx)}
                    className={`h-11 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex flex-col items-center justify-center relative ${bgClass} ${
                      isCurrent ? 'ring-2 ring-indigo-400 scale-105 shadow-md' : 'hover:opacity-90'
                    }`}
                  >
                    <span>{idx + 1}</span>
                    {ans?.selected_option && (
                      <span className="text-[9px] uppercase font-bold opacity-80">{ans.selected_option}</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Color Indicator Legend */}
          <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-700 space-y-2 text-xs">
            <p className="font-bold text-slate-400 uppercase text-[10px] tracking-wider mb-1">Indikator Warna Status</p>

            <div className="flex items-center space-x-2">
              <span className="w-4 h-4 rounded bg-emerald-500 shrink-0"></span>
              <span className="text-slate-300">Hijau: Sudah Dijawab</span>
            </div>

            <div className="flex items-center space-x-2">
              <span className="w-4 h-4 rounded bg-amber-400 shrink-0"></span>
              <span className="text-slate-300">Kuning: Ditandai Ragu-Ragu</span>
            </div>

            <div className="flex items-center space-x-2">
              <span className="w-4 h-4 rounded bg-white text-slate-900 border shrink-0"></span>
              <span className="text-slate-300">Putih: Belum Dijawab</span>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Submit Modal */}
      {showConfirmSubmitModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-6 shadow-2xl text-slate-100">
            <div className="flex items-center justify-between border-b border-slate-700 pb-3">
              <h3 className="font-bold text-lg text-amber-400">Konfirmasi Kumpulkan Ujian</h3>
              <button onClick={() => setShowConfirmSubmitModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <p className="text-slate-300">
                Apakah Anda yakin ingin menyelesaikan simulasi <span className="font-bold text-white">{exam.title}</span>?
              </p>

              <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-700 space-y-2">
                <div className="flex justify-between">
                  <span className="text-emerald-400 font-semibold">Sudah Dijawab:</span>
                  <span className="font-bold text-white">{totalAnswered} Soal</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-amber-400 font-semibold">Ditandai Ragu-ragu:</span>
                  <span className="font-bold text-white">{totalDoubtful} Soal</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 font-semibold">Belum Dijawab:</span>
                  <span className="font-bold text-white">{totalUnanswered} Soal</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3 pt-2">
              <button
                onClick={() => setShowConfirmSubmitModal(false)}
                className="flex-1 py-3 bg-slate-700 hover:bg-slate-600 font-bold rounded-xl text-xs text-slate-200 transition-all cursor-pointer"
              >
                Kembali
              </button>
              <button
                onClick={handleFinalSubmit}
                className="flex-1 py-3 bg-emerald-500 hover:bg-emerald-400 font-bold rounded-xl text-xs text-slate-950 transition-all shadow-md cursor-pointer"
              >
                Ya, Kumpulkan Sekarang
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
