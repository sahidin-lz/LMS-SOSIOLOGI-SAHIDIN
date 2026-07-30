import React, { useState } from 'react';
import { PlusCircle, FileSpreadsheet, Users, BookOpen, CheckCircle, BarChart3, Upload, Trash2, Edit3, Sparkles, MessageSquare, AlertCircle, FileText, Check } from 'lucide-react';
import { Course, Exam } from '../types';
import { INITIAL_SUBMISSIONS } from '../data/sociologyData';

interface TeacherDashboardProps {
  courses: Course[];
  exams: Exam[];
  onAddCourseLesson?: (courseId: string, lessonTitle: string, textBody: string) => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ courses, exams }) => {
  const [activeTab, setActiveTab] = useState<'soal' | 'materi' | 'penilaian' | 'nilai'>('penilaian');
  const [questionText, setQuestionText] = useState('');
  const [optionA, setOptionA] = useState('');
  const [optionB, setOptionB] = useState('');
  const [optionC, setOptionC] = useState('');
  const [optionD, setOptionD] = useState('');
  const [optionE, setOptionE] = useState('');
  const [correctOption, setCorrectOption] = useState<'A' | 'B' | 'C' | 'D' | 'E'>('A');
  const [explanation, setExplanation] = useState('');
  const [topic, setTopic] = useState('Struktur & Konflik Sosial');
  const [successMsg, setSuccessMsg] = useState('');

  // Grading state
  const [submissionsList, setSubmissionsList] = useState(INITIAL_SUBMISSIONS);
  const [selectedSubId, setSelectedSubId] = useState(INITIAL_SUBMISSIONS[1].id);
  const [inputGrade, setInputGrade] = useState('88');
  const [inputFeedback, setInputFeedback] = useState('Pemetaan konflik sosial menggunakan kerangka Dahrendorf sangat baik!');

  const activeSub = submissionsList.find((s) => s.id === selectedSubId) || submissionsList[0];

  const handleSaveGrade = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionsList((prev) =>
      prev.map((s) =>
        s.id === selectedSubId
          ? { ...s, grade: parseInt(inputGrade) || 85, teacher_feedback: inputFeedback, status: 'Sudah Dinilai' }
          : s
      )
    );
    setSuccessMsg('Penilaian dan umpan balik tugas berhasil disimpan!');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg('Soal Sosiologi berhasil ditambahkan ke Bank Soal Tryout TKA!');
    setQuestionText('');
    setOptionA('');
    setOptionB('');
    setOptionC('');
    setOptionD('');
    setOptionE('');
    setExplanation('');
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Teacher Welcome Header */}
      <div className="bg-gradient-to-r from-emerald-900 via-stone-900 to-amber-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-amber-800/40">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 bg-emerald-500/20 px-3 py-1 rounded-full text-xs font-semibold text-emerald-300 border border-emerald-400/30 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Super-Dashboard Guru & Supervisor LMS</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-100">Portal Pengajar Sosiologi Membumi</h1>
            <p className="text-stone-300 text-xs sm:text-sm mt-1">
              Pantau tontonan video siswa, koreksi tugas kelompok split-screen, dan input bank soal CBT TKA Sosiologi.
            </p>
          </div>

          <div className="flex items-center space-x-3 bg-stone-800/90 border border-stone-700 px-4 py-3 rounded-2xl">
            <Users className="w-6 h-6 text-amber-400" />
            <div>
              <p className="text-[10px] text-stone-400 uppercase font-bold">Total Siswa Bimbingan</p>
              <p className="text-base font-extrabold text-stone-100">128 Siswa Aktif</p>
            </div>
          </div>
        </div>
      </div>

      {/* Teacher Alerts Bar */}
      <div className="bg-amber-950/60 border border-amber-800/80 p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center space-x-2 text-amber-200 font-semibold">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>Notifikasi Guru: Kelompok 2 baru saja mengunggah Tugas Pemetaan Konflik. Membutuhkan Penilaian.</span>
        </div>
        <button
          onClick={() => setActiveTab('penilaian')}
          className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold px-3 py-1.5 rounded-xl text-xs cursor-pointer shrink-0"
        >
          Koreksi Sekarang
        </button>
      </div>

        {/* Action Navigation Tabs & Export Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-stone-800 gap-4 pb-2">
          <div className="flex space-x-4 overflow-x-auto text-xs font-bold">
            <button
              onClick={() => setActiveTab('penilaian')}
              className={`pb-3 border-b-2 flex items-center space-x-2 whitespace-nowrap ${
                activeTab === 'penilaian'
                  ? 'border-amber-500 text-amber-400'
                  : 'border-transparent text-stone-400 hover:text-stone-200'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Koreksi Tugas Split-Screen</span>
            </button>

            <button
              onClick={() => setActiveTab('soal')}
              className={`pb-3 border-b-2 flex items-center space-x-2 whitespace-nowrap ${
                activeTab === 'soal'
                  ? 'border-amber-500 text-amber-400'
                  : 'border-transparent text-stone-400 hover:text-stone-200'
              }`}
            >
              <PlusCircle className="w-4 h-4" />
              <span>Input Bank Soal CBT</span>
            </button>

            <button
              onClick={() => setActiveTab('materi')}
              className={`pb-3 border-b-2 flex items-center space-x-2 whitespace-nowrap ${
                activeTab === 'materi'
                  ? 'border-amber-500 text-amber-400'
                  : 'border-transparent text-stone-400 hover:text-stone-200'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Kelola Modul ({courses.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('nilai')}
              className={`pb-3 border-b-2 flex items-center space-x-2 whitespace-nowrap ${
                activeTab === 'nilai'
                  ? 'border-amber-500 text-amber-400'
                  : 'border-transparent text-stone-400 hover:text-stone-200'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Analitik & Rekap Nilai</span>
            </button>
          </div>

          <div className="flex items-center space-x-2 mb-2 sm:mb-0">
            <button
              onClick={() => {
                const csvHeader = "Topik,Teks_Soal,Opsi_A,Opsi_B,Opsi_C,Opsi_D,Opsi_E,Kunci_Jawaban,Penjelasan\n";
                const csvSample = "Interaksi Sosial,Sejarah Sosiologi lahir pada abad...,Option A,Option B,Option C,Option D,Option E,B,Penjelasan lengkap...\n";
                const blob = new Blob([csvHeader + csvSample], { type: 'text/csv;charset=utf-8;' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `Template_Import_Soal_CBT_Sosiologi.csv`);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold border border-stone-700 transition-all flex items-center space-x-1 cursor-pointer"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-amber-400" />
              <span>Download Template Soal</span>
            </button>

            <button
              onClick={() => {
                const csvContent = "Nama Siswa,Sekolah,Progres Video,Skor IRT TKA (Max 200),Akurasi Normal,Status\nArya Pratama,SMA Negeri 8 Jakarta,85%,165 / 200,80%,Lolos PTN Top 1\nSiti Rahmawati,SMA Negeri 3 Yogyakarta,100%,180 / 200,90%,Lolos PTN Top 1\nBintang Ramadhan,SMA Labschool Kebayoran,65%,145 / 200,70%,Passing Grade Aman\n";
                const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `Export_Rekap_Nilai_Analitik_Guru.csv`);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className="px-3 py-1.5 rounded-xl bg-amber-900/80 hover:bg-amber-800 text-amber-100 text-xs font-bold border border-amber-700 transition-all flex items-center space-x-1 cursor-pointer"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-amber-300" />
              <span>Export Rekap Nilai</span>
            </button>
          </div>
        </div>

      {/* Tab Split-Screen Assignment Review */}
      {activeTab === 'penilaian' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Submissions List */}
          <div className="lg:col-span-4 space-y-3">
            <h2 className="text-xs font-bold text-stone-300 uppercase">Daftar Pengumpulan Tugas Siswa</h2>
            {submissionsList.map((sub) => (
              <div
                key={sub.id}
                onClick={() => {
                  setSelectedSubId(sub.id);
                  setInputGrade(sub.grade ? String(sub.grade) : '85');
                  setInputFeedback(sub.teacher_feedback || '');
                }}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  sub.id === selectedSubId
                    ? 'bg-amber-950/80 border-amber-500 shadow-md ring-1 ring-amber-500/40'
                    : 'bg-stone-900 border-stone-800 hover:border-stone-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold text-amber-400">{sub.type}</span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      sub.status === 'Sudah Dinilai'
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        : 'bg-amber-950 text-amber-300 border border-amber-800'
                    }`}
                  >
                    {sub.status}
                  </span>
                </div>

                <h3 className="text-xs font-bold text-stone-100">{sub.task_title}</h3>
                <p className="text-[11px] text-stone-400 mt-1">Oleh: {sub.submitted_by}</p>
              </div>
            ))}
          </div>

          {/* Split Screen View */}
          <div className="lg:col-span-8 bg-stone-900 border border-stone-800 rounded-3xl p-6 space-y-6 shadow-xl">
            <div className="border-b border-stone-800 pb-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-amber-400 uppercase">
                  {activeSub.type === 'GROUP' ? activeSub.group_name : 'Tugas Mandiri'}
                </span>
                <h3 className="text-base font-extrabold text-stone-100">{activeSub.task_title}</h3>
                <p className="text-xs text-stone-400">Pengirim: {activeSub.submitted_by} • {activeSub.submitted_at}</p>
              </div>

              {activeSub.grade !== undefined && (
                <div className="text-right">
                  <span className="text-[10px] text-stone-400 font-bold block uppercase">Nilai Saat Ini</span>
                  <span className="text-2xl font-extrabold text-amber-400">{activeSub.grade} / 100</span>
                </div>
              )}
            </div>

            {/* Student PDF / Text Answer View Area */}
            <div className="bg-stone-950 p-5 rounded-2xl border border-stone-800 space-y-3">
              <div className="text-xs font-bold text-stone-200 flex items-center justify-between">
                <span>Berkas Laporan PDF / Jawaban Siswa:</span>
                <span className="text-amber-400 font-mono text-[11px]">{activeSub.file_name}</span>
              </div>
              <p className="text-xs text-stone-300 leading-relaxed italic bg-stone-900 p-4 rounded-xl border border-stone-800">
                "{activeSub.answer_text}"
              </p>
            </div>

            {/* Teacher Grading & Feedback Form */}
            <form onSubmit={handleSaveGrade} className="space-y-4 pt-2">
              {successMsg && (
                <div className="p-3 bg-emerald-950 border border-emerald-800 text-emerald-300 text-xs font-bold rounded-xl flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>{successMsg}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-1">
                  <label className="text-xs font-bold text-stone-200 block mb-1">Skor Angka (0-100):</label>
                  <input
                    type="number"
                    value={inputGrade}
                    onChange={(e) => setInputGrade(e.target.value)}
                    min={0}
                    max={100}
                    required
                    className="w-full bg-stone-950 text-amber-300 font-extrabold text-base px-3.5 py-2.5 rounded-xl border border-stone-800 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-stone-200 block mb-1">Catatan Evaluasi Guru:</label>
                  <input
                    type="text"
                    value={inputFeedback}
                    onChange={(e) => setInputFeedback(e.target.value)}
                    placeholder="Tulis umpan balik positif atau perbaikan..."
                    required
                    className="w-full bg-stone-950 text-stone-100 text-xs px-3.5 py-2.5 rounded-xl border border-stone-800 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-600 to-amber-600 hover:from-emerald-500 hover:to-amber-500 text-stone-950 font-extrabold py-3 rounded-2xl text-xs transition-all shadow-md cursor-pointer"
              >
                Simpan Penilaian & Kirim Feedback ke Siswa
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Tab 1: Input Soal Form */}
      {activeTab === 'soal' && (
        <div className="bg-stone-900 rounded-3xl p-6 border border-stone-800 shadow-md space-y-6 text-stone-100">
          <div className="flex items-center justify-between border-b border-stone-800 pb-4">
            <div>
              <h2 className="text-lg font-bold text-stone-100">Formulir Tambah Soal CBT Sosiologi</h2>
              <p className="text-xs text-stone-400">Soal akan langsung dimasukkan ke dalam Bank Soal Ujian CBT</p>
            </div>
            <span className="text-xs bg-amber-950 text-amber-300 border border-amber-800 font-semibold px-3 py-1 rounded-full">
              Format Standard UTBK SNBT
            </span>
          </div>

          {successMsg && (
            <div className="p-4 bg-emerald-950 border border-emerald-800 text-emerald-300 text-xs font-bold rounded-2xl flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleAddQuestion} className="space-y-4 text-xs sm:text-sm">
            <div>
              <label className="block font-bold text-stone-300 mb-1">Topik / Bab Sosiologi</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                required
                className="w-full bg-stone-950 px-3.5 py-2.5 rounded-xl border border-stone-800 focus:outline-none focus:border-amber-500 text-stone-100 font-medium"
              />
            </div>

            <div>
              <label className="block font-bold text-stone-300 mb-1">Teks Soal Studi Kasus Sosiologi</label>
              <textarea
                rows={3}
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                placeholder="Tuliskan narasi soal atau fenomena sosial yang akan dianalisis..."
                required
                className="w-full bg-stone-950 px-3.5 py-2.5 rounded-xl border border-stone-800 focus:outline-none focus:border-amber-500 text-stone-100"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-stone-400 mb-1">Pilihan A</label>
                <input
                  type="text"
                  value={optionA}
                  onChange={(e) => setOptionA(e.target.value)}
                  required
                  className="w-full bg-stone-950 px-3 py-2 rounded-xl border border-stone-800 focus:outline-none focus:border-amber-500 text-stone-100"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-400 mb-1">Pilihan B</label>
                <input
                  type="text"
                  value={optionB}
                  onChange={(e) => setOptionB(e.target.value)}
                  required
                  className="w-full bg-stone-950 px-3 py-2 rounded-xl border border-stone-800 focus:outline-none focus:border-amber-500 text-stone-100"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-400 mb-1">Pilihan C</label>
                <input
                  type="text"
                  value={optionC}
                  onChange={(e) => setOptionC(e.target.value)}
                  required
                  className="w-full bg-stone-950 px-3 py-2 rounded-xl border border-stone-800 focus:outline-none focus:border-amber-500 text-stone-100"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-400 mb-1">Pilihan D</label>
                <input
                  type="text"
                  value={optionD}
                  onChange={(e) => setOptionD(e.target.value)}
                  required
                  className="w-full bg-stone-950 px-3 py-2 rounded-xl border border-stone-800 focus:outline-none focus:border-amber-500 text-stone-100"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block font-semibold text-stone-400 mb-1">Pilihan E</label>
                <input
                  type="text"
                  value={optionE}
                  onChange={(e) => setOptionE(e.target.value)}
                  required
                  className="w-full bg-stone-950 px-3 py-2 rounded-xl border border-stone-800 focus:outline-none focus:border-amber-500 text-stone-100"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block font-bold text-stone-300 mb-1">Kunci Jawaban Benar</label>
                <select
                  value={correctOption}
                  onChange={(e) => setCorrectOption(e.target.value as any)}
                  className="w-full bg-stone-950 px-3 py-2.5 rounded-xl border border-stone-800 focus:outline-none focus:border-amber-500 font-bold text-amber-400"
                >
                  <option value="A">Opsi A</option>
                  <option value="B">Opsi B</option>
                  <option value="C">Opsi C</option>
                  <option value="D">Opsi D</option>
                  <option value="E">Opsi E</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-stone-300 mb-1">Penjelasan Pembahasan Komprehensif</label>
                <input
                  type="text"
                  value={explanation}
                  onChange={(e) => setExplanation(e.target.value)}
                  placeholder="Penjelasan latar belakang teori tokoh / argumen sosiologis..."
                  required
                  className="w-full bg-stone-950 px-3 py-2.5 rounded-xl border border-stone-800 focus:outline-none focus:border-amber-500 text-stone-100"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-2xl transition-all shadow-md cursor-pointer flex items-center justify-center space-x-2 text-sm"
            >
              <Upload className="w-4 h-4" />
              <span>Simpan Soal ke Bank Soal Tryout</span>
            </button>
          </form>
        </div>
      )}

      {/* Tab 2: Manage Courses */}
      {activeTab === 'materi' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="bg-stone-900 rounded-3xl p-5 border border-stone-800 shadow-sm space-y-3 text-stone-100">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-800">
                  Kelas {course.grade_level}
                </span>
                <span className="text-xs text-stone-400 font-medium">{course.lessons.length} Sub-Materi</span>
              </div>
              <h3 className="font-bold text-stone-100 text-sm">{course.title}</h3>
              <p className="text-xs text-stone-400 line-clamp-2">{course.description}</p>
              <div className="pt-2 border-t border-stone-800 flex items-center justify-between text-xs">
                <span className="text-amber-400 font-bold">{course.category}</span>
                <button className="text-emerald-400 hover:underline font-semibold flex items-center space-x-1 cursor-pointer">
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Modul</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Student Grades & Watching Analytics */}
      {activeTab === 'nilai' && (
        <div className="bg-stone-900 rounded-3xl p-6 border border-stone-800 shadow-md space-y-6 text-stone-100">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-extrabold text-stone-100">Analitik Progres Tontonan Video & Nilai Tryout UTBK</h2>
            <span className="text-xs text-amber-400 font-bold">128 Siswa Dipantau</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-stone-950 text-stone-400 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-3">Nama Siswa</th>
                  <th className="p-3">Sekolah</th>
                  <th className="p-3">Progres Tontonan Modul</th>
                  <th className="p-3">Skor IRT TKA (Max 200)</th>
                  <th className="p-3">Akurasi Normal</th>
                  <th className="p-3">Status UTBK</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800">
                <tr className="hover:bg-stone-800/50">
                  <td className="p-3 font-bold text-stone-100">Arya Pratama</td>
                  <td className="p-3 text-stone-400">SMA Negeri 8 Jakarta</td>
                  <td className="p-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-stone-800 h-2 rounded-full overflow-hidden">
                        <div className="bg-emerald-500 h-full w-[85%]"></div>
                      </div>
                      <span className="text-xs font-mono font-bold text-emerald-400">85%</span>
                    </div>
                  </td>
                  <td className="p-3 font-bold text-amber-400">85 / 100</td>
                  <td className="p-3 font-semibold text-emerald-400">80% (8/10)</td>
                  <td className="p-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                      Lolos PTN Top 1
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-stone-800/50">
                  <td className="p-3 font-bold text-stone-100">Siti Rahmawati</td>
                  <td className="p-3 text-stone-400">SMA Negeri 3 Yogyakarta</td>
                  <td className="p-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-stone-800 h-2 rounded-full overflow-hidden">
                        <div className="bg-emerald-500 h-full w-[100%]"></div>
                      </div>
                      <span className="text-xs font-mono font-bold text-emerald-400">100%</span>
                    </div>
                  </td>
                  <td className="p-3 font-bold text-amber-400">92 / 100</td>
                  <td className="p-3 font-semibold text-emerald-400">90% (9/10)</td>
                  <td className="p-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                      Lolos PTN Top 1
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-stone-800/50">
                  <td className="p-3 font-bold text-stone-100">Bintang Ramadhan</td>
                  <td className="p-3 text-stone-400">SMA Labschool Kebayoran</td>
                  <td className="p-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-stone-800 h-2 rounded-full overflow-hidden">
                        <div className="bg-amber-500 h-full w-[65%]"></div>
                      </div>
                      <span className="text-xs font-mono font-bold text-amber-400">65%</span>
                    </div>
                  </td>
                  <td className="p-3 font-bold text-amber-400">78 / 100</td>
                  <td className="p-3 font-semibold text-amber-400">70% (7/10)</td>
                  <td className="p-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-950 text-amber-300 border border-amber-800">
                      Passing Grade Aman
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

