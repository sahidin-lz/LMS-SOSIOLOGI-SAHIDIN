import React, { useState } from 'react';
import { motion } from 'motion/react';
import { TaskItem, TaskSubmission, User } from '../types';
import { INITIAL_TASKS, INITIAL_SUBMISSIONS } from '../data/sociologyData';
import { Users, FileText, CheckCircle2, Clock, Upload, Send, MessageSquare, AlertCircle, Award, Sparkles } from 'lucide-react';

interface TasksWorkspaceProps {
  user: User;
}

export const TasksWorkspace: React.FC<TasksWorkspaceProps> = ({ user }) => {
  const [tasks, setTasks] = useState<TaskItem[]>(INITIAL_TASKS);
  const [submissions, setSubmissions] = useState<TaskSubmission[]>(INITIAL_SUBMISSIONS);
  const [selectedTaskId, setSelectedTaskId] = useState<string>(tasks[0].id);
  
  // Form input states
  const [answerText, setAnswerText] = useState('');
  const [fileName, setFileName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const activeTask = tasks.find((t) => t.id === selectedTaskId) || tasks[0];
  const activeSubmission = submissions.find((s) => s.task_id === selectedTaskId);

  const handleSubmitTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!answerText && !fileName) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const newSubmission: TaskSubmission = {
        id: `sub_${Date.now()}`,
        task_id: activeTask.id,
        task_title: activeTask.title,
        type: activeTask.type,
        group_name: activeTask.type === 'GROUP' ? 'Kelompok 2 - Socio Thinkers' : undefined,
        group_members: activeTask.type === 'GROUP' ? ['Arya Pratama', 'Bintang Ramadhan', 'Siti Rahmawati', 'Dewi Lestari'] : undefined,
        submitted_by: activeTask.type === 'GROUP' ? `${user.name} (Perwakilan Kelompok)` : user.name,
        submitted_at: 'Baru Saja (Hari ini)',
        answer_text: answerText,
        file_name: fileName || 'Berkas_Tugas_Sosiologi.pdf',
        status: 'Menunggu Penilaian',
      };

      setSubmissions((prev) => [newSubmission, ...prev.filter((s) => s.task_id !== activeTask.id)]);
      setIsSubmitting(false);
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 4000);
    }, 800);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner - Sosiologi Membumi Theme */}
      <div className="bg-gradient-to-r from-stone-900 via-amber-950 to-emerald-950 rounded-3xl p-6 sm:p-8 text-white border border-orange-300/40 shadow-xl relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-orange-500/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-blue-500/20 text-blue-500 rounded-full text-xs font-bold border border-blue-400/30">
            <Users className="w-3.5 h-3.5 text-blue-600" />
            <span>Workspace Penugasan Terpadu & Smart Grouping</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-800">
            Tugas Individu & Kelompok Membumi
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Kerjakan studi kasus analisis sosiologis secara mandiri atau kolaborasi kelompok. Cukup 1 perwakilan kelompok yang mengunggah laporan untuk memperbarui status seluruh anggota.
          </p>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Task List Selection */}
        <div className="lg:col-span-4 space-y-4">
          <h2 className="text-sm font-bold text-slate-600 uppercase tracking-wider px-1">Daftar Penugasan</h2>
          <div className="space-y-3">
            {tasks.map((task) => {
              const sub = submissions.find((s) => s.task_id === task.id);
              const isSelected = task.id === selectedTaskId;

              return (
                <div
                  key={task.id}
                  onClick={() => {
                    setSelectedTaskId(task.id);
                    setAnswerText('');
                    setFileName('');
                  }}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-orange-50/80 border-amber-500 shadow-sm border border-slate-200 ring-1 ring-amber-500/40'
                      : 'bg-white/90 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${
                        task.type === 'GROUP'
                          ? 'bg-blue-50 text-blue-500 border-emerald-700/60'
                          : 'bg-orange-50 text-orange-500 border-amber-700/60'
                      }`}
                    >
                      {task.type === 'GROUP' ? 'Kelompok' : 'Individu'}
                    </span>

                    <span className="text-[10px] text-slate-600 flex items-center space-x-1">
                      <Clock className="w-3 h-3 text-orange-600" />
                      <span>{task.deadline}</span>
                    </span>
                  </div>

                  <h3 className="text-xs font-bold text-slate-800 line-clamp-2">{task.title}</h3>
                  <p className="text-[11px] text-slate-600 mt-1">{task.chapter_title}</p>

                  <div className="mt-3 pt-2 border-t border-slate-200 flex items-center justify-between text-[11px]">
                    <span className="text-slate-600 font-medium">Maks. {task.max_score} Poin</span>
                    {sub ? (
                      <span className="font-bold text-blue-600 flex items-center space-x-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{sub.status}</span>
                      </span>
                    ) : (
                      <span className="text-orange-600 font-semibold flex items-center space-x-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>Belum Mengumpulkan</span>
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Task Detail & Submission Workspace */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white/90 rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xl">
            {/* Task Title Header */}
            <div className="space-y-3 pb-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-orange-600 uppercase tracking-wide">
                  {activeTask.chapter_title}
                </span>
                <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full border border-slate-300">
                  Maks. {activeTask.max_score} Poin
                </span>
              </div>

              <h2 className="text-xl font-extrabold text-slate-800">{activeTask.title}</h2>
              <p className="text-xs text-slate-600 leading-relaxed">{activeTask.description}</p>

              {/* Smart Grouping Banner for Group Tasks */}
              {activeTask.type === 'GROUP' && (
                <div className="bg-blue-50/60 border border-blue-300/80 rounded-2xl p-4 mt-4 space-y-2">
                  <div className="flex items-center space-x-2 text-blue-500 font-bold text-xs">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span>Mini Workspace: Kelompok 2 - Socio Thinkers</span>
                  </div>
                  <p className="text-[11px] text-slate-600">
                    Anggota Kelompok: <span className="font-bold text-slate-800">Arya Pratama (Kamu), Bintang Ramadhan, Siti Rahmawati, Dewi Lestari</span>
                  </p>
                  <p className="text-[10px] text-blue-600 font-medium italic">
                    *Catatan Guru: Setiap unggahan dokumen dari perwakilan otomatis memperbarui status seluruh anggota kelompok.
                  </p>
                </div>
              )}
            </div>

            {/* Submission Status & Form */}
            {activeSubmission ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-slate-100/80 p-4 rounded-2xl border border-slate-300">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-100/80 text-blue-500 flex items-center justify-center font-bold">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-800">Status: {activeSubmission.status}</div>
                      <div className="text-[11px] text-slate-600">Diunggah oleh: {activeSubmission.submitted_by} • {activeSubmission.submitted_at}</div>
                    </div>
                  </div>

                  {activeSubmission.grade !== undefined && (
                    <div className="text-right">
                      <div className="text-[10px] text-slate-600 font-medium">Nilai Guru</div>
                      <div className="text-xl font-extrabold text-orange-600">{activeSubmission.grade} / 100</div>
                    </div>
                  )}
                </div>

                {/* Answer Preview */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                  <div className="text-xs font-bold text-slate-600">Respon Jawaban:</div>
                  <p className="text-xs text-slate-600 leading-relaxed italic">{activeSubmission.answer_text}</p>
                  {activeSubmission.file_name && (
                    <div className="mt-2 inline-flex items-center space-x-2 bg-slate-100 px-3 py-1.5 rounded-xl text-xs text-orange-500 border border-slate-300">
                      <FileText className="w-4 h-4 text-orange-600" />
                      <span>{activeSubmission.file_name}</span>
                    </div>
                  )}
                </div>

                {/* Teacher Feedback */}
                {activeSubmission.teacher_feedback && (
                  <div className="bg-orange-50/60 p-4 rounded-2xl border border-orange-300/80 space-y-1">
                    <div className="flex items-center space-x-2 text-xs font-bold text-orange-500">
                      <MessageSquare className="w-4 h-4" />
                      <span>Catatan & Umpan Balik Guru:</span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed pl-6">{activeSubmission.teacher_feedback}</p>
                  </div>
                )}
              </div>
            ) : (
              /* Submission Form */
              <form onSubmit={handleSubmitTask} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 block">
                    Respon & Jawaban Teks:
                  </label>
                  <textarea
                    rows={4}
                    value={answerText}
                    onChange={(e) => setAnswerText(e.target.value)}
                    placeholder="Tuliskan jawaban analisis atau ringkasan hasil diskusi di sini..."
                    className="w-full bg-slate-50 text-slate-800 p-3.5 rounded-2xl border border-slate-200 focus:border-amber-500 focus:outline-none text-xs leading-relaxed"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 block">
                    Unggah Berkas Laporan (PDF / Dokumen):
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="text"
                      value={fileName}
                      onChange={(e) => setFileName(e.target.value)}
                      placeholder="Nama berkas (misal: Laporan_Sosiologi_Arya.pdf)"
                      className="flex-1 bg-slate-50 text-slate-800 px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:border-amber-500 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setFileName(`Laporan_${activeTask.type}_Sosiologi.pdf`)}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs px-3 py-2.5 rounded-xl border border-slate-300 flex items-center space-x-1.5 cursor-pointer"
                    >
                      <Upload className="w-4 h-4 text-orange-600" />
                      <span>Simulasi Upload</span>
                    </button>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting || (!answerText && !fileName)}
                    className="w-full bg-gradient-to-r from-blue-600 to-orange-600 hover:from-blue-500 hover:to-orange-500 text-stone-950 font-extrabold py-3 rounded-2xl text-xs transition-all shadow-lg flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Mengunggah Jawaban...' : 'Kirim Jawaban Tugas'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Success Toast */}
      {showSuccessToast && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-6 right-6 bg-blue-100 border border-blue-400 text-emerald-100 px-5 py-3.5 rounded-2xl shadow-2xl z-50 flex items-center space-x-3"
        >
          <Sparkles className="w-5 h-5 text-orange-600 animate-spin" />
          <div>
            <div className="text-xs font-bold">Tugas Berhasil Dikumpulkan!</div>
            <div className="text-[11px] text-slate-600">Status anggota kelompok diperbarui otomatis.</div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
