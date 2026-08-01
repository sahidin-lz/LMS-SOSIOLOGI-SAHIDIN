import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, XCircle, Award, Clock, ArrowLeft, Sparkles, 
  HelpCircle, Bot, BookOpen, AlertCircle, RefreshCw, Trophy, Layers, GitCompare
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Exam, ExamSession, Question } from '../types';
import { getTkaTypeDetails, getOptionText } from '../utils/tkaQuestionHelper';

interface ExamDiscussionViewProps {
  session: ExamSession;
  exam: Exam;
  onBackToDashboard: () => void;
  onRetakeExam: () => void;
}

export const ExamDiscussionView: React.FC<ExamDiscussionViewProps> = ({
  session,
  exam,
  onBackToDashboard,
  onRetakeExam,
}) => {
  const [aiExplanations, setAiExplanations] = useState<Record<string, string>>({});
  const [loadingAi, setLoadingAi] = useState<Record<string, boolean>>({});

  // Fire confetti on high score
  useEffect(() => {
    if (session.score >= 70) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [session.score]);

  // Request custom Gemini AI explanation for a question
  const handleAskAiExplanation = async (question: Question) => {
    const qId = question.id;
    setLoadingAi((prev) => ({ ...prev, [qId]: true }));

    const userAnswer = session.answers[qId]?.selected_option;

    try {
      const res = await fetch('/api/ai/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionText: question.text,
          topic: question.topic,
          studentAnswer: userAnswer,
          correctAnswer: question.correct_answer,
        }),
      });

      const data = await res.json();
      if (data.explanation) {
        setAiExplanations((prev) => ({ ...prev, [qId]: data.explanation }));
      }
    } catch (err) {
      console.error('Error getting AI explanation:', err);
    } finally {
      setLoadingAi((prev) => ({ ...prev, [qId]: false }));
    }
  };

  const minutesSpent = Math.floor(session.duration_spent_seconds / 60);
  const secondsSpent = session.duration_spent_seconds % 60;

  return (
    <div className="space-y-8 pb-16 max-w-5xl mx-auto">
      {/* Top Banner Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackToDashboard}
          className="inline-flex items-center space-x-2 text-slate-600 hover:text-indigo-600 text-xs font-bold transition-all cursor-pointer bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Dashboard</span>
        </button>

        <button
          onClick={onRetakeExam}
          className="inline-flex items-center space-x-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold px-3.5 py-2 rounded-xl border border-indigo-200 transition-all cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Ulangi Tryout</span>
        </button>
      </div>

      {/* Score Results Card */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="md:col-span-2 space-y-3">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-indigo-200 border border-white/20">
              <Trophy className="w-3.5 h-3.5 text-orange-500" />
              <span>Hasil Ujian CBT Sosiologi</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold">{session.exam_title}</h1>
            <p className="text-xs text-indigo-200">
              Ujian diselesaikan pada {new Date(session.end_time || Date.now()).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <div className="flex items-center space-x-1.5 text-orange-500 font-bold text-xs bg-white/10 px-3 py-1.5 rounded-xl border border-white/10">
                <Award className="w-4 h-4" />
                <span>+{session.xp_earned} Socio-Points Berhasil Didapat!</span>
              </div>

              <div className="flex items-center space-x-1.5 text-indigo-200 font-medium text-xs bg-white/10 px-3 py-1.5 rounded-xl border border-white/10">
                <Clock className="w-4 h-4" />
                <span>Waktu Pengerjaan: {minutesSpent}m {secondsSpent}s</span>
              </div>
            </div>
          </div>

          {/* Dual Score Badges (Skala Maksimal 100 IRT & Normal 100) */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 text-center space-y-3">
            <div className="border-b border-white/10 pb-2">
              <span className="text-[10px] text-orange-500 font-extrabold uppercase tracking-wider block">Skor IRT TKA (Skala Max 100)</span>
              <div className="text-3xl sm:text-4xl font-black text-orange-500 tracking-tight">
                {session.irt_score ?? session.score} <span className="text-sm font-normal text-indigo-200">/ 100</span>
              </div>
              <p className="text-[10px] text-orange-700/90 mt-0.5">Sistem Normal Berbobot Kesukaran Soal</p>
            </div>

            <div className="pt-1">
              <span className="text-[10px] text-indigo-200 font-bold uppercase tracking-wider block">Skor Normal (Persentase Jawaban Benar)</span>
              <div className="text-2xl font-bold text-white tracking-tight">
                {session.normal_score ?? Math.round((session.total_correct / session.total_questions) * 100)} <span className="text-xs font-normal text-indigo-200">/ 100</span>
              </div>
              <p className="text-[10px] text-indigo-200/80 mt-0.5">Jumlah Benar: {session.total_correct} dari {session.total_questions} Soal</p>
            </div>

            <div className="pt-2 border-t border-white/10">
              <span className="inline-block text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-500 border border-blue-300/30">
                {(session.irt_score ?? session.score) >= 75 ? 'Lolos Target TKA Sosiologi' : 'Perlu Pendalaman Materi'}
              </span>
            </div>
          </div>
        </div>

        {/* Breakdown bar + IRT Explanation Info */}
        <div className="space-y-3 pt-4 border-t border-white/15">
          <div className="grid grid-cols-3 gap-3 text-center text-xs">
            <div className="bg-blue-500/20 p-3 rounded-2xl border border-blue-300/30">
              <span className="text-blue-500 block font-bold">Benar</span>
              <span className="text-lg font-black text-white">{session.total_correct} Soal</span>
            </div>
            <div className="bg-red-500/20 p-3 rounded-2xl border border-red-400/30">
              <span className="text-red-300 block font-bold">Salah</span>
              <span className="text-lg font-black text-white">{session.total_incorrect} Soal</span>
            </div>
            <div className="bg-slate-500/20 p-3 rounded-2xl border border-slate-400/30">
              <span className="text-slate-300 block font-bold">Kosong</span>
              <span className="text-lg font-black text-white">{session.total_unanswered} Soal</span>
            </div>
          </div>

          <div className="bg-indigo-950/60 p-3 rounded-xl border border-indigo-400/20 text-[11px] text-indigo-200 flex items-start space-x-2">
            <Sparkles className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
            <p className="leading-snug">
              <strong className="text-white">Metode Penilaian Dual IRT & Normal:</strong> Skor IRT (Item Response Theory) memberi bobot poin lebih tinggi untuk soal penalaran HOTS yang lebih sukar, disesuaikan ke skala 100 nasional TKA.
            </p>
          </div>
        </div>
      </div>

      {/* Analisis Kemampuan Siswa Sesuai Soal yang Dikerjakan */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm border border-slate-200 space-y-6">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-amber-100 rounded-2xl text-amber-700">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-slate-800">Analisis Kemampuan & Penguasaan Topik Siswa</h2>
            <p className="text-xs text-slate-600">Pemetaan kekuatan dan kelemahan berdasarkan butir soal yang baru saja kamu selesaikan</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(() => {
            // Group questions by topic and calculate mastery
            const topicMap: Record<string, { total: number; correct: number }> = {};
            exam.questions.forEach((q) => {
              const topic = q.topic || 'Umum Sosiologi';
              if (!topicMap[topic]) topicMap[topic] = { total: 0, correct: 0 };
              topicMap[topic].total += 1;
              if (session.answers[q.id]?.selected_option === q.correct_answer) {
                topicMap[topic].correct += 1;
              }
            });

            return Object.entries(topicMap).map(([topicName, stats]) => {
              const pct = Math.round((stats.correct / stats.total) * 100);
              let badgeColor = 'bg-emerald-100 text-emerald-800 border-emerald-200';
              let statusText = 'Sangat Paham';
              let recText = 'Kemampuan penalaran sangat baik! Pertahankan.';

              if (pct < 50) {
                badgeColor = 'bg-red-100 text-red-800 border-red-200';
                statusText = 'Perlu Remedial';
                recText = 'Disarankan mempelajari ulang bab ini dan mengerjakan latihan bab harian.';
              } else if (pct < 80) {
                badgeColor = 'bg-amber-100 text-amber-800 border-amber-200';
                statusText = 'Cukup Paham';
                recText = 'Perlu memperdalam latihan soal variasi HOTS.';
              }

              return (
                <div key={topicName} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-800">{topicName}</span>
                    <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${badgeColor}`}>
                      {statusText} ({pct}%)
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-500 ${pct >= 80 ? 'bg-blue-500' : pct >= 50 ? 'bg-orange-500' : 'bg-red-500'}`} 
                      style={{ width: `${pct}%` }}
                    />
                  </div>

                  <p className="text-[11px] text-slate-600 leading-relaxed font-medium">{recText}</p>
                </div>
              );
            });
          })()}
        </div>
      </div>

      {/* Comprehensive Question Discussions Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-xl font-extrabold text-slate-800">Pembahasan Soal Sosiologi Komprehensif</h2>
            <p className="text-xs text-slate-600">Evaluasi jawaban kamu dan pelajari kunci teori sosiologinya</p>
          </div>
          <span className="text-xs bg-indigo-100 text-indigo-800 font-bold px-3 py-1 rounded-full">
            {exam.questions.length} Soal Lengkap
          </span>
        </div>

        {exam.questions.map((question, idx) => {
          const userAnsObj = session.answers[question.id];
          const selectedOption = userAnsObj?.selected_option;
          const isCorrect = selectedOption === question.correct_answer;
          const isUnanswered = !selectedOption;

          return (
            <div
              key={question.id}
              className={`bg-white rounded-3xl p-6 sm:p-7 border shadow-xs space-y-5 ${
                isCorrect
                  ? 'border-emerald-200'
                  : isUnanswered
                  ? 'border-slate-200'
                  : 'border-red-200'
              }`}
            >
              {/* Question Header Status */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center space-x-3">
                  <span
                    className={`w-8 h-8 rounded-xl font-extrabold text-xs flex items-center justify-center ${
                      isCorrect
                        ? 'bg-emerald-100 text-emerald-800'
                        : isUnanswered
                        ? 'bg-slate-100 text-slate-600'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {idx + 1}
                  </span>
                  <div>
                    <span className="text-xs text-slate-600 font-bold block">Topik: {question.topic}</span>
                    {(() => {
                      const tkaDetails = getTkaTypeDetails(question);
                      return (
                        <span className={`inline-block px-2 py-0.5 mt-0.5 rounded text-[10px] font-extrabold border ${tkaDetails.badgeBg} ${tkaDetails.badgeText} ${tkaDetails.badgeBorder}`}>
                          {tkaDetails.label}
                        </span>
                      );
                    })()}
                  </div>
                </div>

                {/* Tag Status */}
                {isCorrect ? (
                  <span className="inline-flex items-center space-x-1.5 bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Jawaban Kamu Benar (+{Math.round(exam.xp_reward / exam.total_questions)} XP)</span>
                  </span>
                ) : isUnanswered ? (
                  <span className="inline-flex items-center space-x-1.5 bg-slate-100 text-slate-700 text-xs font-bold px-3 py-1 rounded-full border border-slate-200">
                    <AlertCircle className="w-4 h-4 text-slate-600" />
                    <span>Belum Dijawab</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center space-x-1.5 bg-red-100 text-red-800 text-xs font-bold px-3 py-1 rounded-full border border-red-200">
                    <XCircle className="w-4 h-4 text-red-600" />
                    <span>Jawaban Kamu Salah</span>
                  </span>
                )}
              </div>

              {/* Question Text & Statements */}
              <div className="space-y-3">
                <p className="text-sm text-slate-800 font-semibold leading-relaxed">
                  {question.text}
                </p>

                {(question.statement_1 || question.statement_2) && (
                  <div className="p-3.5 bg-purple-50/80 rounded-xl border border-purple-200 space-y-1.5 text-xs text-slate-800 font-medium">
                    <p className="font-bold text-purple-900">Pernyataan-pernyataan:</p>
                    {question.statement_1 && <div>(1) {question.statement_1}</div>}
                    {question.statement_2 && <div>(2) {question.statement_2}</div>}
                    {question.statement_3 && <div>(3) {question.statement_3}</div>}
                    {question.statement_4 && <div>(4) {question.statement_4}</div>}
                  </div>
                )}

                {(question.pernyataan || question.alasan) && (
                  <div className="p-3.5 bg-amber-50/80 rounded-xl border border-amber-200 space-y-2 text-xs text-slate-800 font-medium">
                    {question.pernyataan && (
                      <div>
                        <span className="font-bold text-amber-900 uppercase text-[10px] block">Kalimat Pernyataan:</span>
                        <p className="text-slate-900">{question.pernyataan}</p>
                      </div>
                    )}
                    <div className="text-center font-black text-amber-800 text-[11px] uppercase tracking-widest my-1 bg-amber-100 py-0.5 rounded">
                      — SEBAB —
                    </div>
                    {question.alasan && (
                      <div>
                        <span className="font-bold text-amber-900 uppercase text-[10px] block">Kalimat Alasan:</span>
                        <p className="text-slate-900">{question.alasan}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Options Breakdown */}
              <div className="space-y-2 text-xs sm:text-sm">
                {(['A', 'B', 'C', 'D', 'E'] as const).map((optKey) => {
                  const optText = getOptionText(question, optKey);
                  const isUserChosen = selectedOption === optKey;
                  const isCorrectKey = question.correct_answer === optKey;

                  let optBg = 'bg-slate-50 text-slate-700 border-slate-200';
                  if (isCorrectKey) {
                    optBg = 'bg-emerald-50 text-emerald-900 border-emerald-300 font-bold';
                  } else if (isUserChosen && !isCorrectKey) {
                    optBg = 'bg-red-50 text-red-900 border-red-300 font-bold';
                  }

                  return (
                    <div
                      key={optKey}
                      className={`p-3 rounded-2xl border flex items-center justify-between ${optBg}`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="font-extrabold w-6 text-center">{optKey}.</span>
                        <span>{optText}</span>
                      </div>

                      {isCorrectKey && (
                        <span className="text-[11px] bg-blue-600 text-white font-extrabold px-2.5 py-0.5 rounded-full shrink-0">
                          Kunci Jawaban
                        </span>
                      )}
                      {isUserChosen && !isCorrectKey && (
                        <span className="text-[11px] bg-red-600 text-white font-extrabold px-2.5 py-0.5 rounded-full shrink-0">
                          Pilihan Kamu
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Standard Comprehensive Sociology Explanation */}
              <div className="bg-indigo-50/70 p-5 rounded-2xl border border-indigo-100 space-y-2 text-xs sm:text-sm text-indigo-950">
                <div className="flex items-center space-x-2 font-extrabold text-indigo-900">
                  <BookOpen className="w-4 h-4 text-indigo-600" />
                  <span>Pembahasan Teks Sosiologi:</span>
                </div>
                <p className="leading-relaxed font-medium">{question.explanation}</p>
              </div>

              {/* AI Custom Gemini Explanation Box if requested */}
              {aiExplanations[question.id] ? (
                <div className="bg-purple-50 p-5 rounded-2xl border border-purple-200 space-y-2 text-xs sm:text-sm text-purple-950">
                  <div className="flex items-center space-x-2 font-extrabold text-purple-900">
                    <Sparkles className="w-4 h-4 text-purple-600" />
                    <span>Penjelasan AI Tutor Sosiologi (Gemini):</span>
                  </div>
                  <p className="leading-relaxed font-medium whitespace-pre-line">
                    {aiExplanations[question.id]}
                  </p>
                </div>
              ) : (
                <button
                  onClick={() => handleAskAiExplanation(question)}
                  disabled={loadingAi[question.id]}
                  className="inline-flex items-center space-x-2 text-xs font-bold text-purple-700 hover:text-purple-900 bg-purple-50 hover:bg-purple-100 px-3.5 py-2 rounded-xl border border-purple-200 transition-all cursor-pointer"
                >
                  <Bot className="w-4 h-4 text-purple-600" />
                  <span>{loadingAi[question.id] ? 'Membuat Penjelasan AI...' : 'Tanyakan Ke AI Tutor untuk Penjelasan Tambahan'}</span>
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
