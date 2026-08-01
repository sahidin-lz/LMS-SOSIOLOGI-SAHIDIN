import React, { useState, useEffect, useRef } from 'react';
import { 
  Clock, AlertTriangle, ChevronLeft, ChevronRight, CheckCircle2, 
  HelpCircle, Flag, Send, ShieldAlert, Sparkles, X, RotateCcw, Info, Layers, GitCompare
} from 'lucide-react';
import { Exam, Question, UserAnswer } from '../types';
import { getTkaTypeDetails, getOptionText, KOMPLEKS_OPTIONS, SEBAB_AKIBAT_OPTIONS } from '../utils/tkaQuestionHelper';

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
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans select-none">
      {/* Floating Sticky Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 py-3 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="font-black text-orange-600 text-lg tracking-tight uppercase">CBT TKA Sosiologi</span>
            <span className="hidden sm:inline text-xs text-slate-500 font-bold">| {exam.title}</span>
          </div>

          {/* Countdown Timer */}
          <div className="flex items-center space-x-2 bg-red-50 border border-red-200 text-red-600 px-4 py-1.5 rounded-xl shadow-sm">
            <Clock className="w-4 h-4 text-red-500" />
            <span className="font-mono text-base font-extrabold">{formatTime(timeLeft)}</span>
          </div>

          <div className="flex items-center space-x-3">
            {tabSwitchCount > 0 && (
              <div className="hidden md:flex items-center space-x-1.5 text-xs text-red-600 bg-red-50 border border-red-200 px-3 py-1 rounded-full font-bold">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Pelanggaran Tab: {tabSwitchCount}x</span>
              </div>
            )}

            <button
              onClick={() => setShowConfirmSubmitModal(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-black px-5 py-2 rounded-xl text-xs transition-all shadow-md cursor-pointer flex items-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>Selesai & Kumpulkan</span>
            </button>
          </div>
        </div>
      </header>

      {/* Anti-Cheat Toast Warning */}
      {showAntiCheatWarning && (
        <div className="bg-orange-500 text-slate-950 px-4 py-2 text-center text-xs font-bold flex items-center justify-center space-x-2">
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
        <div className="lg:col-span-3 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            {/* Question Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center space-x-3">
                <span className="w-9 h-9 rounded-xl bg-indigo-600 text-white font-extrabold text-sm flex items-center justify-center shadow-sm">
                  {currentQuestionIndex + 1}
                </span>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                      Soal Nomor {currentQuestionIndex + 1} dari {exam.total_questions}
                    </span>
                    {(() => {
                      const tkaDetails = getTkaTypeDetails(currentQuestion);
                      return (
                        <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-extrabold border ${tkaDetails.badgeBg} ${tkaDetails.badgeText} ${tkaDetails.badgeBorder}`}>
                          {tkaDetails.label}
                        </span>
                      );
                    })()}
                  </div>
                  <p className="text-xs text-indigo-600 font-bold">Topik: {currentQuestion.topic}</p>
                </div>
              </div>

              {/* Doubtful Checkbox Button */}
              <button
                onClick={handleToggleDoubtful}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border flex items-center space-x-1.5 cursor-pointer ${
                  answers[currentQuestion.id]?.is_doubtful
                    ? 'bg-amber-400 text-slate-950 border-amber-500 shadow-sm'
                    : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                }`}
              >
                <Flag className="w-3.5 h-3.5" />
                <span>Ragu-Ragu</span>
              </button>
            </div>

            {/* TKA Model Instruction Card */}
            {(() => {
              const tkaDetails = getTkaTypeDetails(currentQuestion);
              if (tkaDetails.type === 'kompleks') {
                return (
                  <div className="bg-purple-50 border border-purple-200 p-4 rounded-2xl text-xs text-purple-900 space-y-2">
                    <div className="flex items-center space-x-2 font-bold text-purple-700">
                      <Layers className="w-4 h-4 shrink-0 text-purple-600" />
                      <span>Petunjuk Soal Pilihan Ganda Kompleks (Asosiatif):</span>
                    </div>
                    <p className="text-slate-700 font-medium">{tkaDetails.description}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 bg-white p-3 rounded-xl border border-purple-100 font-mono text-[11px]">
                      <div>• <span className="font-bold text-purple-700">A:</span> Jika (1), (2), dan (3) benar</div>
                      <div>• <span className="font-bold text-purple-700">B:</span> Jika (1) dan (3) benar</div>
                      <div>• <span className="font-bold text-purple-700">C:</span> Jika (2) dan (4) benar</div>
                      <div>• <span className="font-bold text-purple-700">D:</span> Jika hanya (4) yang benar</div>
                      <div className="sm:col-span-2">• <span className="font-bold text-purple-700">E:</span> Jika semua pernyataan benar</div>
                    </div>
                  </div>
                );
              }

              if (tkaDetails.type === 'sebab_akibat') {
                return (
                  <div className="bg-orange-50 border border-amber-200 p-4 rounded-2xl text-xs text-orange-900 space-y-2">
                    <div className="flex items-center space-x-2 font-bold text-orange-600">
                      <GitCompare className="w-4 h-4 shrink-0 text-orange-600" />
                      <span>Petunjuk Soal Hubungan Sebab-Akibat:</span>
                    </div>
                    <p className="text-slate-700 font-medium">{tkaDetails.description}</p>
                    <div className="space-y-1 bg-white p-3 rounded-xl border border-amber-100 text-[11px] font-medium">
                      <div><span className="font-bold text-orange-600">A:</span> Pernyataan benar, alasan benar, dan keduanya menunjukkan hubungan sebab-akibat</div>
                      <div><span className="font-bold text-orange-600">B:</span> Pernyataan benar, alasan benar, tetapi keduanya tidak menunjukkan hubungan sebab-akibat</div>
                      <div><span className="font-bold text-orange-600">C:</span> Pernyataan benar dan alasan salah</div>
                      <div><span className="font-bold text-orange-600">D:</span> Pernyataan salah dan alasan benar</div>
                      <div><span className="font-bold text-orange-600">E:</span> Pernyataan dan alasan, keduanya salah</div>
                    </div>
                  </div>
                );
              }

              return null;
            })()}

            {/* Question Stimulus / Text */}
            <div className="text-sm sm:text-base text-slate-900 leading-relaxed font-bold bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
              <p>{currentQuestion.text}</p>

              {/* Statements (1) to (4) if present in question object */}
              {(currentQuestion.statement_1 || currentQuestion.statement_2) && (
                <div className="mt-3 p-4 bg-white rounded-xl border border-slate-200 space-y-2 font-sans text-xs sm:text-sm text-slate-800">
                  <p className="font-extrabold text-purple-700">Pernyataan-pernyataan:</p>
                  {currentQuestion.statement_1 && <div>(1) {currentQuestion.statement_1}</div>}
                  {currentQuestion.statement_2 && <div>(2) {currentQuestion.statement_2}</div>}
                  {currentQuestion.statement_3 && <div>(3) {currentQuestion.statement_3}</div>}
                  {currentQuestion.statement_4 && <div>(4) {currentQuestion.statement_4}</div>}
                </div>
              )}

              {/* Pernyataan & Alasan block if present in question object */}
              {(currentQuestion.pernyataan || currentQuestion.alasan) && (
                <div className="mt-3 p-4 bg-white rounded-xl border border-amber-200 space-y-3 text-xs sm:text-sm text-slate-800">
                  {currentQuestion.pernyataan && (
                    <div>
                      <span className="font-extrabold text-orange-600 block uppercase text-[10px]">Kalimat Pernyataan:</span>
                      <p className="font-bold text-slate-900 mt-0.5">{currentQuestion.pernyataan}</p>
                    </div>
                  )}
                  <div className="text-center font-black text-orange-600 text-xs tracking-widest my-1 uppercase bg-orange-50/60 py-1 rounded border border-amber-100">
                    — SEBAB —
                  </div>
                  {currentQuestion.alasan && (
                    <div>
                      <span className="font-extrabold text-orange-600 block uppercase text-[10px]">Kalimat Alasan:</span>
                      <p className="font-bold text-slate-900 mt-0.5">{currentQuestion.alasan}</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Multiple Choice Options A - E */}
            <div className="space-y-3 pt-2">
              {(['A', 'B', 'C', 'D', 'E'] as const).map((optKey) => {
                const optText = getOptionText(currentQuestion, optKey);
                const isSelected = answers[currentQuestion.id]?.selected_option === optKey;

                return (
                  <button
                    key={optKey}
                    onClick={() => handleSelectOption(optKey)}
                    className={`w-full text-left p-4 rounded-2xl transition-all border flex items-start space-x-3.5 cursor-pointer ${
                      isSelected
                        ? 'bg-blue-50 text-blue-900 border-blue-500 shadow-md ring-2 ring-blue-500'
                        : 'bg-white hover:bg-slate-50 text-slate-900 border-slate-200 shadow-sm'
                    }`}
                  >
                    <span
                      className={`w-7 h-7 rounded-xl flex items-center justify-center font-black text-xs shrink-0 ${
                        isSelected
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-slate-600 border border-slate-200'
                      }`}
                    >
                      {optKey}
                    </span>
                    <span className="text-xs sm:text-sm font-bold pt-0.5 leading-relaxed">
                      {optText}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question Navigation Controls */}
          <div className="flex items-center justify-between border-t border-slate-100 pt-4">
            <button
              onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentQuestionIndex === 0}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 rounded-xl font-bold text-xs transition-all flex items-center space-x-1 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Sebelumnya</span>
            </button>

            <span className="text-xs text-slate-500 font-bold">
              Soal {currentQuestionIndex + 1} / {exam.total_questions}
            </span>

            {currentQuestionIndex < exam.total_questions - 1 ? (
              <button
                onClick={() => setCurrentQuestionIndex((prev) => Math.min(exam.total_questions - 1, prev + 1))}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-black text-xs transition-all flex items-center space-x-1 cursor-pointer shadow-md"
              >
                <span>Berikutnya</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => setShowConfirmSubmitModal(true)}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-black text-xs transition-all flex items-center space-x-1 cursor-pointer shadow-md"
              >
                <span>Kumpulkan Ujian</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Right Sidebar: CBT Grid Question Navigator & Color Indicators */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xl space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="font-extrabold text-slate-800 text-sm border-b border-slate-100 pb-3">
              Navigasi Nomor Soal
            </h3>

            {/* Grid Box Layout */}
            <div className="grid grid-cols-5 gap-2.5">
              {exam.questions.map((q, idx) => {
                const ans = answers[q.id];
                const isCurrent = idx === currentQuestionIndex;
                const isAnswered = Boolean(ans?.selected_option);
                const isDoubtful = Boolean(ans?.is_doubtful);

                let bgClass = 'bg-white text-slate-800 border-slate-200';
                if (isDoubtful) {
                  bgClass = 'bg-amber-400 text-slate-900 font-black border-amber-500';
                } else if (isAnswered) {
                  bgClass = 'bg-blue-500 text-white font-black border-blue-600';
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQuestionIndex(idx)}
                    className={`h-11 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex flex-col items-center justify-center relative border ${bgClass} ${
                      isCurrent ? 'ring-2 ring-indigo-500 scale-105 shadow-md' : 'hover:bg-slate-50'
                    }`}
                  >
                    <span>{idx + 1}</span>
                    {ans?.selected_option && (
                      <span className="text-[9px] uppercase font-black opacity-90">{ans.selected_option}</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Color Indicator Legend */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-[11px]">
            <p className="font-extrabold text-slate-500 uppercase text-[9px] tracking-widest mb-1">Indikator Status</p>

            <div className="flex items-center space-x-2">
              <span className="w-4 h-4 rounded bg-blue-500 border border-blue-600 shrink-0"></span>
              <span className="text-slate-800 font-bold">Sudah Dijawab</span>
            </div>

            <div className="flex items-center space-x-2">
              <span className="w-4 h-4 rounded bg-amber-400 border border-amber-500 shrink-0"></span>
              <span className="text-slate-800 font-bold">Ragu-Ragu</span>
            </div>

            <div className="flex items-center space-x-2">
              <span className="w-4 h-4 rounded bg-white border border-slate-300 shrink-0"></span>
              <span className="text-slate-800 font-bold">Belum Dijawab</span>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Submit Modal */}
      {showConfirmSubmitModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-6 shadow-2xl text-slate-900">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-black text-lg text-indigo-700 uppercase">Kumpulkan Ujian?</h3>
              <button onClick={() => setShowConfirmSubmitModal(false)} className="text-slate-400 hover:text-slate-900">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4 text-sm">
              <p className="text-slate-700 font-medium">
                Apakah Anda yakin ingin mengakhiri simulasi <span className="font-black text-slate-900">{exam.title}</span>?
              </p>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-blue-600 font-bold">Sudah Dijawab:</span>
                  <span className="font-black text-slate-900 bg-blue-50 px-3 py-1 rounded-lg border border-blue-100">{totalAnswered} Soal</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-orange-600 font-bold">Ragu-ragu:</span>
                  <span className="font-black text-slate-900 bg-orange-50 px-3 py-1 rounded-lg border border-orange-100">{totalDoubtful} Soal</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-bold">Belum Dijawab:</span>
                  <span className="font-black text-slate-900 bg-white px-3 py-1 rounded-lg border border-slate-200">{totalUnanswered} Soal</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3 pt-2">
              <button
                onClick={() => setShowConfirmSubmitModal(false)}
                className="flex-1 py-3.5 bg-slate-100 hover:bg-slate-200 font-bold rounded-xl text-xs text-slate-700 transition-all cursor-pointer"
              >
                Kembali
              </button>
              <button
                onClick={handleFinalSubmit}
                className="flex-1 py-3.5 bg-indigo-600 hover:bg-indigo-700 font-black rounded-xl text-xs text-white transition-all shadow-md cursor-pointer"
              >
                Kumpulkan Sekarang
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
