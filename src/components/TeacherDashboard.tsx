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
      <div className="bg-gradient-to-r from-emerald-900 via-stone-900 to-amber-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-orange-300/40">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 bg-blue-500/20 px-3 py-1 rounded-full text-xs font-semibold text-blue-500 border border-blue-300/30 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-orange-600" />
              <span>Super-Dashboard Guru & Supervisor LMS</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800">Portal Pengajar Sosiologi Membumi</h1>
            <p className="text-slate-600 text-xs sm:text-sm mt-1">
              Pantau tontonan video siswa, koreksi tugas kelompok split-screen, dan input bank soal CBT TKA Sosiologi.
            </p>
          </div>

          <div className="flex items-center space-x-3 bg-slate-100/90 border border-slate-300 px-4 py-3 rounded-2xl">
            <Users className="w-6 h-6 text-orange-600" />
            <div>
              <p className="text-[10px] text-slate-600 uppercase font-bold">Total Siswa Bimbingan</p>
              <p className="text-base font-extrabold text-slate-800">128 Siswa Aktif</p>
            </div>
          </div>
        </div>
      </div>

      {/* Teacher Alerts Bar */}
      <div className="bg-orange-50/60 border border-orange-300/80 p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center space-x-2 text-orange-700 font-semibold">
          <AlertCircle className="w-4 h-4 text-orange-600 shrink-0" />
          <span>Notifikasi Guru: Kelompok 2 baru saja mengunggah Tugas Pemetaan Konflik. Membutuhkan Penilaian.</span>
        </div>
        <button
          onClick={() => setActiveTab('penilaian')}
          className="bg-orange-500 hover:bg-amber-400 text-stone-950 font-bold px-3 py-1.5 rounded-xl text-xs cursor-pointer shrink-0"
        >
          Koreksi Sekarang
        </button>
      </div>

        {/* Action Navigation Tabs & Export Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-200 gap-4 pb-2">
          <div className="flex space-x-4 overflow-x-auto text-xs font-bold">
            <button
              onClick={() => setActiveTab('penilaian')}
              className={`pb-3 border-b-2 flex items-center space-x-2 whitespace-nowrap ${
                activeTab === 'penilaian'
                  ? 'border-amber-500 text-orange-600'
                  : 'border-transparent text-slate-600 hover:text-slate-700'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Koreksi Tugas Split-Screen</span>
            </button>

            <button
              onClick={() => setActiveTab('soal')}
              className={`pb-3 border-b-2 flex items-center space-x-2 whitespace-nowrap ${
                activeTab === 'soal'
                  ? 'border-amber-500 text-orange-600'
                  : 'border-transparent text-slate-600 hover:text-slate-700'
              }`}
            >
              <PlusCircle className="w-4 h-4" />
              <span>Input Bank Soal CBT</span>
            </button>

            <button
              onClick={() => setActiveTab('materi')}
              className={`pb-3 border-b-2 flex items-center space-x-2 whitespace-nowrap ${
                activeTab === 'materi'
                  ? 'border-amber-500 text-orange-600'
                  : 'border-transparent text-slate-600 hover:text-slate-700'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Kelola Modul ({courses.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('nilai')}
              className={`pb-3 border-b-2 flex items-center space-x-2 whitespace-nowrap ${
                activeTab === 'nilai'
                  ? 'border-amber-500 text-orange-600'
                  : 'border-transparent text-slate-600 hover:text-slate-700'
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
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold border border-slate-300 transition-all flex items-center space-x-1 cursor-pointer"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-orange-600" />
              <span>Download Template Soal</span>
            </button>

            <button
              onClick={() => {
                const csvContent = "Nama Siswa,Sekolah,Progres Video,Skor IRT TKA (Max 200),Akurasi Normal,Status\nArya Pratama,SMAIT As-Syifa Boarding School Wanareja,85%,165 / 200,80%,Lolos PTN Top 1\nSiti Rahmawati,SMAIT As-Syifa Boarding School Wanareja,100%,180 / 200,90%,Lolos PTN Top 1\nBintang Ramadhan,SMAIT As-Syifa Boarding School Wanareja,65%,145 / 200,70%,Passing Grade Aman\n";
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
              <FileSpreadsheet className="w-3.5 h-3.5 text-orange-500" />
              <span>Export Rekap Nilai</span>
            </button>
          </div>
        </div>

      {/* Tab Split-Screen Assignment Review */}
      {activeTab === 'penilaian' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Submissions List */}
          <div className="lg:col-span-4 space-y-3">
            <h2 className="text-xs font-bold text-slate-600 uppercase">Daftar Pengumpulan Tugas Siswa</h2>
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
                    ? 'bg-orange-50/80 border-amber-500 shadow-sm border border-slate-200 ring-1 ring-amber-500/40'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold text-orange-600">{sub.type}</span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      sub.status === 'Sudah Dinilai'
                        ? 'bg-blue-50 text-blue-600 border border-blue-300'
                        : 'bg-orange-50 text-orange-500 border border-orange-300'
                    }`}
                  >
                    {sub.status}
                  </span>
                </div>

                <h3 className="text-xs font-bold text-slate-800">{sub.task_title}</h3>
                <p className="text-[11px] text-slate-600 mt-1">Oleh: {sub.submitted_by}</p>
              </div>
            ))}
          </div>

          {/* Split Screen View */}
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-3xl p-6 space-y-6 shadow-xl">
            <div className="border-b border-slate-200 pb-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-orange-600 uppercase">
                  {activeSub.type === 'GROUP' ? activeSub.group_name : 'Tugas Mandiri'}
                </span>
                <h3 className="text-base font-extrabold text-slate-800">{activeSub.task_title}</h3>
                <p className="text-xs text-slate-600">Pengirim: {activeSub.submitted_by} • {activeSub.submitted_at}</p>
              </div>

              {activeSub.grade !== undefined && (
                <div className="text-right">
                  <span className="text-[10px] text-slate-600 font-bold block uppercase">Nilai Saat Ini</span>
                  <span className="text-2xl font-extrabold text-orange-600">{activeSub.grade} / 100</span>
                </div>
              )}
            </div>

            {/* Student PDF / Text Answer View Area */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
              <div className="text-xs font-bold text-slate-700 flex items-center justify-between">
                <span>Berkas Laporan PDF / Jawaban Siswa:</span>
                <span className="text-orange-600 font-mono text-[11px]">{activeSub.file_name}</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed italic bg-white p-4 rounded-xl border border-slate-200">
                "{activeSub.answer_text}"
              </p>
            </div>

            {/* Teacher Grading & Feedback Form */}
            <form onSubmit={handleSaveGrade} className="space-y-4 pt-2">
              {successMsg && (
                <div className="p-3 bg-blue-50 border border-blue-300 text-blue-500 text-xs font-bold rounded-xl flex items-center space-x-2">
                  <Check className="w-4 h-4 text-blue-600" />
                  <span>{successMsg}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-1">
                  <label className="text-xs font-bold text-slate-700 block mb-1">Skor Angka (0-100):</label>
                  <input
                    type="number"
                    value={inputGrade}
                    onChange={(e) => setInputGrade(e.target.value)}
                    min={0}
                    max={100}
                    required
                    className="w-full bg-slate-50 text-orange-500 font-extrabold text-base px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-slate-700 block mb-1">Catatan Evaluasi Guru:</label>
                  <input
                    type="text"
                    value={inputFeedback}
                    onChange={(e) => setInputFeedback(e.target.value)}
                    placeholder="Tulis umpan balik positif atau perbaikan..."
                    required
                    className="w-full bg-slate-50 text-slate-800 text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-orange-600 hover:from-blue-500 hover:to-orange-500 text-stone-950 font-extrabold py-3 rounded-2xl text-xs transition-all shadow-sm border border-slate-200 cursor-pointer"
              >
                Simpan Penilaian & Kirim Feedback ke Siswa
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Tab 1: Input Soal Form */}
      {activeTab === 'soal' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm border border-slate-200 space-y-6 text-slate-800">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-800">Formulir Tambah Soal CBT Sosiologi</h2>
              <p className="text-xs text-slate-600">Soal akan langsung dimasukkan ke dalam Bank Soal Ujian CBT</p>
            </div>
            <span className="text-xs bg-orange-50 text-orange-500 border border-orange-300 font-semibold px-3 py-1 rounded-full">
              Format Standard UTBK SNBT
            </span>
          </div>

          {successMsg && (
            <div className="p-4 bg-blue-50 border border-blue-300 text-blue-500 text-xs font-bold rounded-2xl flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-blue-600" />
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleAddQuestion} className="space-y-4 text-xs sm:text-sm">
            <div>
              <label className="block font-bold text-slate-600 mb-1">Topik / Bab Sosiologi</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                required
                className="w-full bg-slate-50 px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 text-slate-800 font-medium"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-600 mb-1">Teks Soal Studi Kasus Sosiologi</label>
              <textarea
                rows={3}
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                placeholder="Tuliskan narasi soal atau fenomena sosial yang akan dianalisis..."
                required
                className="w-full bg-slate-50 px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 text-slate-800"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-600 mb-1">Pilihan A</label>
                <input
                  type="text"
                  value={optionA}
                  onChange={(e) => setOptionA(e.target.value)}
                  required
                  className="w-full bg-slate-50 px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 text-slate-800"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-600 mb-1">Pilihan B</label>
                <input
                  type="text"
                  value={optionB}
                  onChange={(e) => setOptionB(e.target.value)}
                  required
                  className="w-full bg-slate-50 px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 text-slate-800"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-600 mb-1">Pilihan C</label>
                <input
                  type="text"
                  value={optionC}
                  onChange={(e) => setOptionC(e.target.value)}
                  required
                  className="w-full bg-slate-50 px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 text-slate-800"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-600 mb-1">Pilihan D</label>
                <input
                  type="text"
                  value={optionD}
                  onChange={(e) => setOptionD(e.target.value)}
                  required
                  className="w-full bg-slate-50 px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 text-slate-800"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block font-semibold text-slate-600 mb-1">Pilihan E</label>
                <input
                  type="text"
                  value={optionE}
                  onChange={(e) => setOptionE(e.target.value)}
                  required
                  className="w-full bg-slate-50 px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 text-slate-800"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block font-bold text-slate-600 mb-1">Kunci Jawaban Benar</label>
                <select
                  value={correctOption}
                  onChange={(e) => setCorrectOption(e.target.value as any)}
                  className="w-full bg-slate-50 px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 font-bold text-orange-600"
                >
                  <option value="A">Opsi A</option>
                  <option value="B">Opsi B</option>
                  <option value="C">Opsi C</option>
                  <option value="D">Opsi D</option>
                  <option value="E">Opsi E</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-600 mb-1">Penjelasan Pembahasan Komprehensif</label>
                <input
                  type="text"
                  value={explanation}
                  onChange={(e) => setExplanation(e.target.value)}
                  placeholder="Penjelasan latar belakang teori tokoh / argumen sosiologis..."
                  required
                  className="w-full bg-slate-50 px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 text-slate-800"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-orange-500 hover:bg-amber-400 text-stone-950 font-bold rounded-2xl transition-all shadow-sm border border-slate-200 cursor-pointer flex items-center justify-center space-x-2 text-sm"
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
            <div key={course.id} className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-3 text-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-orange-50 text-orange-500 border border-orange-300">
                  Kelas {course.grade_level}
                </span>
                <span className="text-xs text-slate-600 font-medium">{course.lessons.length} Sub-Materi</span>
              </div>
              <h3 className="font-bold text-slate-800 text-sm">{course.title}</h3>
              <p className="text-xs text-slate-600 line-clamp-2">{course.description}</p>
              <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs">
                <span className="text-orange-600 font-bold">{course.category}</span>
                <button className="text-blue-600 hover:underline font-semibold flex items-center space-x-1 cursor-pointer">
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
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm border border-slate-200 space-y-6 text-slate-800">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-extrabold text-slate-800">Analitik Progres Tontonan Video & Nilai Tryout UTBK</h2>
            <span className="text-xs text-orange-600 font-bold">128 Siswa Dipantau</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-orange-500 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
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
                <tr className="hover:bg-slate-100">
                  <td className="p-3 font-bold text-slate-800">Arya Pratama</td>
                  <td className="p-3 text-slate-600">SMAIT As-Syifa Boarding School Wanareja</td>
                  <td className="p-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-blue-500 h-full w-[85%]"></div>
                      </div>
                      <span className="text-xs font-mono font-bold text-blue-600">85%</span>
                    </div>
                  </td>
                  <td className="p-3 font-bold text-orange-600">85 / 100</td>
                  <td className="p-3 font-semibold text-blue-600">80% (8/10)</td>
                  <td className="p-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-50 text-blue-500 border border-blue-300">
                      Lolos PTN Top 1
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-slate-100">
                  <td className="p-3 font-bold text-slate-800">Siti Rahmawati</td>
                  <td className="p-3 text-slate-600">SMAIT As-Syifa Boarding School Wanareja</td>
                  <td className="p-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-blue-500 h-full w-[100%]"></div>
                      </div>
                      <span className="text-xs font-mono font-bold text-blue-600">100%</span>
                    </div>
                  </td>
                  <td className="p-3 font-bold text-orange-600">92 / 100</td>
                  <td className="p-3 font-semibold text-blue-600">90% (9/10)</td>
                  <td className="p-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-50 text-blue-500 border border-blue-300">
                      Lolos PTN Top 1
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-slate-100">
                  <td className="p-3 font-bold text-slate-800">Bintang Ramadhan</td>
                  <td className="p-3 text-slate-600">SMAIT As-Syifa Boarding School Wanareja</td>
                  <td className="p-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-orange-500 h-full w-[65%]"></div>
                      </div>
                      <span className="text-xs font-mono font-bold text-orange-600">65%</span>
                    </div>
                  </td>
                  <td className="p-3 font-bold text-orange-600">78 / 100</td>
                  <td className="p-3 font-semibold text-orange-600">70% (7/10)</td>
                  <td className="p-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-orange-50 text-orange-500 border border-orange-300">
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

