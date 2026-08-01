import React, { useState } from 'react';
import { 
  Users, Download, Upload, Plus, Search, FileSpreadsheet, 
  CheckCircle2, GraduationCap, Award, Shield, AlertCircle, Trash2, Key, Eye, EyeOff, BookOpen, Layers
} from 'lucide-react';
import { ClassRoom, ClassStudent, SyllabusItem, User } from '../types';
import { INITIAL_CLASSROOMS, INITIAL_SYLLABUS } from '../data/sociologyData';
import { INITIAL_CLASSROOM_STUDENTS, TSV_STUDENTS_PRESET } from '../data/studentsData';

const DEFAULT_SOSHUM_CLASSES: ClassRoom[] = [
  {
    id: 'class_12_soshum_putra',
    name: '12 SOSHUM PUTRA',
    grade_level: 12,
    academic_year: '2026/2027',
    teacher_name: 'Sahidin, S.Pd., Gr.',
    total_students: 26,
    description: 'Rombongan Belajar 12 SOSHUM PUTRA (26 Siswa)',
    students: INITIAL_CLASSROOM_STUDENTS.filter(s => s.classroom_name === '12 SOSHUM PUTRA')
  },
  {
    id: 'class_12_soshum_putri',
    name: '12 SOSHUM PUTRI',
    grade_level: 12,
    academic_year: '2026/2027',
    teacher_name: 'Sahidin, S.Pd., Gr.',
    total_students: 25,
    description: 'Rombongan Belajar 12 SOSHUM PUTRI (25 Siswa)',
    students: INITIAL_CLASSROOM_STUDENTS.filter(s => s.classroom_name === '12 SOSHUM PUTRI')
  }
];

interface ClassroomManagementProps {
  user: User;
}

export const ClassroomManagement: React.FC<ClassroomManagementProps> = ({ user }) => {
  const [classrooms, setClassrooms] = useState<ClassRoom[]>(DEFAULT_SOSHUM_CLASSES);
  const [syllabi, setSyllabi] = useState<SyllabusItem[]>(INITIAL_SYLLABUS);
  const [selectedClassId, setSelectedClassId] = useState<string>('class_12_soshum_putra');
  const [activeAdminSubTab, setActiveAdminSubTab] = useState<'roster' | 'syllabus'>('roster');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showImportModal, setShowImportModal] = useState<boolean>(false);
  const [showSyllabusModal, setShowSyllabusModal] = useState<boolean>(false);
  const [showAddClassModal, setShowAddClassModal] = useState<boolean>(false);
  const [showPasswords, setShowPasswords] = useState<boolean>(false);
  const [selectedStudentRapor, setSelectedStudentRapor] = useState<ClassStudent | null>(null);
  
  const [importCsvText, setImportCsvText] = useState<string>('');
  const [syllabusCsvText, setSyllabusCsvText] = useState<string>('');
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // New Class Form State
  const [newClassName, setNewClassName] = useState<string>('');
  const [newClassGrade, setNewClassGrade] = useState<10 | 11 | 12>(12);
  const [newClassTeacher, setNewClassTeacher] = useState<string>(user.name || 'Sahidin, S.Pd., Gr.');
  const [newClassDesc, setNewClassDesc] = useState<string>('');

  const currentClassroom = classrooms.find(c => c.id === selectedClassId) || classrooms[0];

  const filteredStudents = currentClassroom.students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.nisn.includes(searchTerm) ||
    s.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Download Format Template Excel/CSV with Password
  const handleDownloadTemplate = () => {
    const templateHeader = "NISN,Nama_Lengkap,Email_Siswa,Password_Akun,Status\n";
    const sampleRows = "0051234099,Contoh Siswa Baru,siswa.baru@sosiologi.edu,Socio2026!Pass,Aktif\n0051234100,Budi Cahyono,budi.c@sosiologi.edu,Socio2026!Pass,Aktif\n";
    const blob = new Blob([templateHeader + sampleRows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Template_Import_Siswa_Password_${currentClassroom.name}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setNotification({
      type: 'success',
      message: `Template Format Excel/CSV + Password (${currentClassroom.name}) berhasil diunduh!`
    });
    setTimeout(() => setNotification(null), 4000);
  };

  // Download Silabus Template
  const handleDownloadSyllabusTemplate = () => {
    const templateHeader = "Tingkat_Kelas,Semester,Kode_Bab,Topik_Materi,Kompetensi_Dasar,Tujuan_Pembelajaran,Jumlah_Pertemuan,Ada_Ulangan_Harian\n";
    const sampleRows = "10,1,BAB-03,Metodologi Penelitian Sosial Sederhana,Memahami teknik penelitian kuantitatif dan kualitatif,Siswa mampu menyusun rancangan penelitian sosial,6,Ya\n";
    const blob = new Blob([templateHeader + sampleRows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Template_Mapping_Silabus_Sosiologi.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setNotification({
      type: 'success',
      message: `Template Pemetaan Silabus Excel/CSV berhasil diunduh!`
    });
    setTimeout(() => setNotification(null), 4000);
  };

  // Export Class Roster & Credentials to CSV
  const handleExportData = () => {
    let csvContent = "NISN,Nama Siswa,Email,Password,Kelas,Socio XP,Misi Selesai,Rata-rata CBT,Status\n";
    currentClassroom.students.forEach(s => {
      csvContent += `"${s.nisn}","${s.name}","${s.email}","${s.password || 'Socio2026!Default'}","${s.classroom_name}",${s.total_xp},${s.mission_completed_count},${s.avg_cbt_score},"${s.status}"\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Data_User_Siswa_Password_Kelas_${currentClassroom.name}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setNotification({
      type: 'success',
      message: `Data user & password akun siswa kelas ${currentClassroom.name} berhasil diekspor!`
    });
    setTimeout(() => setNotification(null), 4000);
  };

  // Process CSV Import
  const handleProcessImport = () => {
    if (!importCsvText.trim()) {
      setNotification({ type: 'error', message: 'Teks CSV/Excel tidak boleh kosong!' });
      return;
    }

    const lines = importCsvText.trim().split('\n');
    let importedCount = 0;
    const newStudents: ClassStudent[] = [];

    lines.forEach((line, idx) => {
      if (idx === 0 && line.toLowerCase().startsWith('nisn')) return;

      const cols = (line.includes('\t') ? line.split('\t') : line.split(','))
        .map(c => c.trim().replace(/^"|"$/g, ''));
      if (cols.length >= 2) {
        const nisn = cols[0] || `1000000${Math.floor(1000 + Math.random() * 9000)}`;
        const name = cols[1] || 'Siswa Tanpa Nama';
        const password = cols[2] || `socio${String(idx).padStart(3, '0')}`;
        const classroom_name = cols[3] || currentClassroom.name;
        const status = (cols[4] as any) || 'Aktif';
        const email = `${nisn}@siswa.lms`;

        newStudents.push({
          id: `st_imported_${nisn}`,
          nisn,
          name,
          email,
          password,
          classroom_name,
          total_xp: 500,
          mission_completed_count: 2,
          avg_cbt_score: 85,
          status: status === 'Izin' || status === 'Alumni' ? status : 'Aktif',
        });
        importedCount++;
      }
    });

    if (newStudents.length > 0) {
      setClassrooms(prev => prev.map(c => {
        if (c.id === currentClassroom.id) {
          return {
            ...c,
            total_students: c.students.length + newStudents.length,
            students: [...c.students, ...newStudents]
          };
        }
        return c;
      }));

      setShowImportModal(false);
      setImportCsvText('');
      setNotification({
        type: 'success',
        message: `Berhasil mengimpor ${importedCount} akun siswa beserta password ke kelas ${currentClassroom.name}!`
      });
      setTimeout(() => setNotification(null), 4000);
    } else {
      setNotification({ type: 'error', message: 'Format data tidak valid. Gunakan format CSV/Excel sesuai template!' });
    }
  };

  // Process Syllabus Upload
  const handleProcessSyllabus = () => {
    if (!syllabusCsvText.trim()) {
      setNotification({ type: 'error', message: 'Teks CSV silabus tidak boleh kosong!' });
      return;
    }

    const lines = syllabusCsvText.trim().split('\n');
    let importedCount = 0;
    const newSyllabi: SyllabusItem[] = [];

    lines.forEach((line, idx) => {
      if (idx === 0 && line.toLowerCase().includes('tingkat')) return;

      const cols = line.split(',').map(c => c.trim().replace(/^"|"$/g, ''));
      if (cols.length >= 4) {
        newSyllabi.push({
          id: `syl_custom_${Date.now()}_${idx}`,
          grade_level: (Number(cols[0]) as any) || 10,
          semester: (Number(cols[1]) as any) || 1,
          chapter_code: cols[2] || 'BAB-NEW',
          topic_name: cols[3] || 'Materi Sosiologi Terpetakan',
          basic_competency: cols[4] || 'Memahami Capaian Pembelajaran Kurikulum Merdeka.',
          learning_objective: cols[5] || 'Siswa mampu menganalisis fenomena sosial.',
          meeting_count: Number(cols[6]) || 4,
          has_daily_test: cols[7]?.toLowerCase() === 'ya' || true,
          file_source: 'Upload_Silabus_Excel_Admin.xlsx'
        });
        importedCount++;
      }
    });

    if (newSyllabi.length > 0) {
      setSyllabi(prev => [...prev, ...newSyllabi]);
      setShowSyllabusModal(false);
      setSyllabusCsvText('');
      setNotification({
        type: 'success',
        message: `Pemetaan Silabus Excel berhasil! ${importedCount} Bab/Topik baru ditambahkan.`
      });
      setTimeout(() => setNotification(null), 4000);
    } else {
      setNotification({ type: 'error', message: 'Format silabus tidak valid!' });
    }
  };

  // Create New Classroom
  const handleCreateClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClassName) return;

    const newClass: ClassRoom = {
      id: `class_${Date.now()}`,
      name: newClassName,
      grade_level: newClassGrade,
      academic_year: '2026/2027',
      teacher_name: newClassTeacher,
      total_students: 0,
      description: newClassDesc || `Kelas Rombel Sosiologi ${newClassName}`,
      students: [],
    };

    setClassrooms(prev => [...prev, newClass]);
    setSelectedClassId(newClass.id);
    setShowAddClassModal(false);
    setNewClassName('');
    setNewClassDesc('');

    setNotification({
      type: 'success',
      message: `Ruang Kelas baru ${newClassName} berhasil dibuat!`
    });
    setTimeout(() => setNotification(null), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Notification Banner */}
      {notification && (
        <div className={`p-4 rounded-2xl border flex items-center justify-between text-xs font-semibold animate-fade-in ${
          notification.type === 'success' 
            ? 'bg-blue-50/90 text-blue-700 border-blue-300' 
            : 'bg-red-950/90 text-red-200 border-red-800'
        }`}>
          <div className="flex items-center space-x-2">
            {notification.type === 'success' ? <CheckCircle2 className="w-5 h-5 text-blue-600" /> : <AlertCircle className="w-5 h-5 text-red-400" />}
            <span>{notification.message}</span>
          </div>
        </div>
      )}

      {/* Main Title & Action Buttons Bar */}
      <div className="bg-white/90 rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 text-xs font-semibold text-blue-500 bg-blue-50 px-3.5 py-1 rounded-full border border-blue-300">
            <GraduationCap className="w-4 h-4 text-blue-600" />
            <span>Sistem Administrasi Rombel & Pemetaan Silabus Sekolah</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
            Menu Admin: Ruang Kelas, User & Silabus
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
            Kelola data siswa beserta password akun, upload silabus Excel/CSV untuk memetakan bab & latihan ulangan harian, serta ekspor rekapitulasi data lengkap.
          </p>
        </div>

        {/* Global Action Toolbar */}
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <button
            onClick={() => setShowSyllabusModal(true)}
            className="flex-1 sm:flex-none inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-2xl bg-orange-50/90 hover:bg-amber-900 text-orange-700 text-xs font-bold border border-orange-300 transition-all cursor-pointer shadow-sm"
          >
            <BookOpen className="w-4 h-4 text-orange-600" />
            <span>Upload Silabus Excel</span>
          </button>

          <button
            onClick={handleDownloadTemplate}
            className="flex-1 sm:flex-none inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold border border-slate-300 transition-all cursor-pointer shadow-sm"
            title="Unduh format file Excel/CSV siswa + password"
          >
            <Download className="w-4 h-4 text-orange-600" />
            <span>Template User & Password</span>
          </button>

          <button
            onClick={() => setShowImportModal(true)}
            className="flex-1 sm:flex-none inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-2xl bg-blue-100/80 hover:bg-blue-100 text-blue-700 text-xs font-bold border border-emerald-700 transition-all cursor-pointer shadow-sm"
          >
            <Upload className="w-4 h-4 text-blue-500" />
            <span>Upload Data Siswa</span>
          </button>

          <button
            onClick={handleExportData}
            className="flex-1 sm:flex-none inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold border border-slate-300 transition-all cursor-pointer shadow-sm"
          >
            <FileSpreadsheet className="w-4 h-4 text-blue-600" />
            <span>Export User & Password</span>
          </button>

          {(user.role === 'guru' || user.role === 'admin') && (
            <button
              onClick={() => setShowAddClassModal(true)}
              className="flex-1 sm:flex-none inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-blue-600 to-orange-600 hover:from-blue-500 hover:to-orange-500 text-stone-950 font-extrabold text-xs transition-all shadow-sm border border-slate-200 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Rombel</span>
            </button>
          )}
        </div>
      </div>

      {/* Sub-tab Switcher: Roster vs Silabus Mapping */}
      <div className="flex items-center space-x-4 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveAdminSubTab('roster')}
          className={`flex items-center space-x-2 pb-2 text-xs font-extrabold border-b-2 transition-all ${
            activeAdminSubTab === 'roster'
              ? 'border-blue-400 text-blue-500'
              : 'border-transparent text-slate-600 hover:text-slate-700'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Rombel & Data Akun Siswa</span>
        </button>

        <button
          onClick={() => setActiveAdminSubTab('syllabus')}
          className={`flex items-center space-x-2 pb-2 text-xs font-extrabold border-b-2 transition-all ${
            activeAdminSubTab === 'syllabus'
              ? 'border-amber-500 text-orange-500'
              : 'border-transparent text-slate-600 hover:text-slate-700'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Hasil Pemetaan Silabus ({syllabi.length} Bab Terpetakan)</span>
        </button>
      </div>

      {activeAdminSubTab === 'syllabus' ? (
        /* Silabus Mapping View */
        <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-extrabold text-slate-800 flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-orange-600" />
                <span>Peta Kurikulum & Silabus Terstruktur Sosiologi</span>
              </h2>
              <p className="text-xs text-slate-600">Silabus ini diunggah dalam bentuk Excel/CSV dan dipetakan otomatis ke dalam modul pembelajaran, latihan bab, serta ulangan harian.</p>
            </div>
            <button
              onClick={handleDownloadSyllabusTemplate}
              className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold border border-slate-300 hover:bg-slate-200 flex items-center space-x-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-orange-600" />
              <span>Format Template Silabus</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {syllabi.map((syl) => (
              <div key={syl.id} className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3 hover:border-amber-500/50 transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-500 border border-blue-300">
                    Kelas {syl.grade_level} SMA · Semester {syl.semester}
                  </span>
                  <span className="text-xs font-mono font-bold text-orange-600">{syl.chapter_code}</span>
                </div>
                <h3 className="text-sm font-bold text-slate-800">{syl.topic_name}</h3>
                <div className="text-xs text-slate-600 space-y-1">
                  <p><strong>Kompetensi Dasar:</strong> {syl.basic_competency}</p>
                  <p><strong>Tujuan Pembelajaran:</strong> {syl.learning_objective}</p>
                </div>
                <div className="pt-2 border-t border-stone-900 flex items-center justify-between text-[11px] text-slate-400">
                  <span>{syl.meeting_count} Kali Pertemuan Tatap Muka</span>
                  <span className="text-blue-600 font-bold">✓ Ulangan Harian Terintegrasi</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Student Roster & User Credentials View */
        <>
          {/* Classroom Selection Tabs */}
          <div className="flex items-center space-x-3 overflow-x-auto pb-2 scrollbar-none">
            {classrooms.map((cls) => {
              const isSelected = cls.id === selectedClassId;
              return (
                <button
                  key={cls.id}
                  onClick={() => setSelectedClassId(cls.id)}
                  className={`flex items-center space-x-3 px-5 py-3 rounded-2xl text-xs font-extrabold transition-all border whitespace-nowrap cursor-pointer shrink-0 ${
                    isSelected
                      ? 'bg-blue-100/80 text-orange-700 border-emerald-600 shadow-sm border border-slate-200 ring-2 ring-emerald-500/30'
                      : 'bg-white/70 text-slate-600 hover:text-orange-700 hover:bg-slate-100 border-slate-200'
                  }`}
                >
                  <Users className={`w-4 h-4 ${isSelected ? 'text-orange-600' : 'text-slate-600'}`} />
                  <div className="text-left">
                    <div className="font-extrabold">{cls.name}</div>
                    <div className="text-[10px] text-slate-600 font-normal">{cls.students.length} Siswa · K-{cls.grade_level}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Classroom Banner Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm border border-slate-200 grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-1 md:col-span-2">
              <div className="text-xs font-semibold text-orange-600 uppercase tracking-wider">Informasi Kelas Rombel</div>
              <h2 className="text-xl font-extrabold text-slate-800 flex items-center space-x-2">
                <span>Kelas {currentClassroom.name}</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-500 border border-blue-300 font-bold">
                  Tahun Ajaran {currentClassroom.academic_year}
                </span>
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">{currentClassroom.description}</p>
            </div>

            <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-200 flex flex-col justify-center space-y-1">
              <span className="text-[10px] text-slate-600 font-bold uppercase">Guru Pengampu Sosiologi</span>
              <span className="text-sm font-bold text-slate-700 flex items-center space-x-1.5">
                <GraduationCap className="w-4 h-4 text-orange-600" />
                <span>{currentClassroom.teacher_name}</span>
              </span>
            </div>

            <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-200 flex flex-col justify-center space-y-1">
              <span className="text-[10px] text-slate-600 font-bold uppercase">Total Terdaftar</span>
              <span className="text-xl font-extrabold text-blue-600 flex items-center space-x-1.5">
                <Users className="w-5 h-5 text-blue-600" />
                <span>{currentClassroom.students.length} Siswa</span>
              </span>
            </div>
          </div>

          {/* Roster Controls: Search, Password Toggle & Table */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden space-y-4 p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Cari NISN, Nama Siswa, atau Email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 placeholder-stone-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowPasswords(!showPasswords)}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-orange-500 text-xs font-bold border border-slate-300 transition-all flex items-center space-x-1.5 cursor-pointer"
                >
                  {showPasswords ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  <span>{showPasswords ? 'Sembunyikan Password' : 'Lihat Password Akun'}</span>
                </button>

                <div className="text-xs font-semibold text-slate-600">
                  <span>Siswa: <strong className="text-orange-600">{filteredStudents.length}</strong></span>
                </div>
              </div>
            </div>

            {/* Student Table */}
            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-orange-500 text-slate-600 uppercase font-bold text-[10px] border-b border-slate-200">
                  <tr>
                    <th className="py-3.5 px-4">No</th>
                    <th className="py-3.5 px-4">NISN</th>
                    <th className="py-3.5 px-4">Nama Lengkap Siswa</th>
                    <th className="py-3.5 px-4">Password Akun</th>
                    <th className="py-3.5 px-4">Socio-XP</th>
                    <th className="py-3.5 px-4 text-center">Misi</th>
                    <th className="py-3.5 px-4 text-center">Rata-Rata TKA</th>
                    <th className="py-3.5 px-4 text-center">Status</th>
                    <th className="py-3.5 px-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-800/60 bg-white/50">
                  {filteredStudents.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="py-8 text-center text-slate-400 italic">
                        Tidak ada data siswa yang cocok dengan pencarian "{searchTerm}".
                      </td>
                    </tr>
                  ) : (
                    filteredStudents.map((st, index) => (
                      <tr key={st.id} className="hover:bg-slate-100 transition-colors">
                        <td className="py-3.5 px-4 font-mono text-slate-400">{index + 1}</td>
                        <td className="py-3.5 px-4 font-mono text-slate-600 font-bold">{st.nisn}</td>
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-slate-800">{st.name}</div>
                          <div className="text-[10px] text-slate-600">{st.email}</div>
                        </td>
                        <td className="py-3.5 px-4 font-mono text-xs">
                          {showPasswords ? (
                            <span className="text-orange-500 bg-orange-50/80 px-2 py-0.5 rounded border border-orange-300/80 font-bold">
                              {st.password || 'Socio2026!Pass'}
                            </span>
                          ) : (
                            <span className="text-slate-400 flex items-center space-x-1">
                              <Key className="w-3 h-3 text-stone-600" />
                              <span>••••••••</span>
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="inline-flex items-center space-x-1 text-orange-600 font-bold">
                            <Award className="w-3.5 h-3.5" />
                            <span>{st.total_xp} XP</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-center font-semibold text-blue-600">
                          {st.mission_completed_count}
                        </td>
                        <td className="py-3.5 px-4 text-center font-mono font-extrabold text-orange-500">
                          {st.avg_cbt_score > 0 ? `${st.avg_cbt_score} / 100` : 'Belum TKA'}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                            st.status === 'Aktif'
                              ? 'bg-blue-50 text-blue-500 border-blue-300'
                              : 'bg-slate-100 text-slate-600 border-slate-300'
                          }`}>
                            {st.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <button
                              onClick={() => setSelectedStudentRapor(st)}
                              className="px-2.5 py-1 bg-orange-50/80 hover:bg-amber-900 text-orange-500 border border-amber-700/60 rounded-lg text-[11px] font-bold flex items-center space-x-1 cursor-pointer transition-all"
                              title="Cetak E-Rapor Sosiologi"
                            >
                              <FileSpreadsheet className="w-3.5 h-3.5 text-orange-600" />
                              <span>E-Rapor</span>
                            </button>

                            <button 
                              onClick={() => {
                                setClassrooms(prev => prev.map(c => {
                                  if (c.id === currentClassroom.id) {
                                    return {
                                      ...c,
                                      students: c.students.filter(s => s.id !== st.id),
                                      total_students: c.students.length - 1
                                    };
                                  }
                                  return c;
                                }));
                              }}
                              className="p-1.5 hover:bg-slate-100 text-slate-400 hover:text-red-400 rounded-lg transition-colors cursor-pointer"
                              title="Hapus dari Rombel"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Modal Upload Silabus Excel */}
      {showSyllabusModal && (
        <div className="fixed inset-0 z-50 bg-slate-800/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div className="flex items-center space-x-2 text-slate-800">
                <BookOpen className="w-5 h-5 text-orange-600" />
                <h3 className="font-extrabold text-lg">Upload Silabus Excel & Peta Kurikulum</h3>
              </div>
              <button 
                onClick={() => setShowSyllabusModal(false)}
                className="text-slate-600 hover:text-slate-700 text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <p className="text-xs text-slate-600 leading-relaxed">
                Tempelkan baris data CSV/Excel Silabus di bawah ini. Format kolom: <code>Tingkat_Kelas, Semester, Kode_Bab, Topik_Materi, Kompetensi_Dasar, Tujuan_Pembelajaran, Jumlah_Pertemuan, Ada_Ulangan_Harian</code>.
              </p>

              <textarea
                rows={6}
                value={syllabusCsvText}
                onChange={(e) => setSyllabusCsvText(e.target.value)}
                placeholder={`10,1,BAB-03,Metodologi Penelitian Sosial,Memahami teknik kualitatif,Siswa mampu menyusun sampel,6,Ya`}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 font-mono text-xs text-slate-700 placeholder-stone-600 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={handleDownloadSyllabusTemplate}
                className="text-xs font-bold text-orange-600 hover:underline flex items-center space-x-1 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Unduh Format Template CSV Silabus</span>
              </button>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setShowSyllabusModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 text-xs font-bold hover:bg-slate-200 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  onClick={handleProcessSyllabus}
                  className="px-5 py-2 rounded-xl bg-orange-500 hover:bg-amber-400 text-stone-950 text-xs font-extrabold cursor-pointer transition-all"
                >
                  Proses & Petakan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Import CSV/Excel User & Password */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 bg-slate-800/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div className="flex items-center space-x-2 text-slate-800">
                <Upload className="w-5 h-5 text-blue-600" />
                <h3 className="font-extrabold text-lg">Upload Data Siswa & Password ({currentClassroom.name})</h3>
              </div>
              <button 
                onClick={() => setShowImportModal(false)}
                className="text-slate-600 hover:text-slate-700 text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <p className="text-xs text-slate-600 leading-relaxed">
                Unduh terlebih dahulu <strong>Format Template CSV/Excel + Password</strong> jika belum memilikinya. Format baris: <code>NISN, Nama_Siswa, Email, Password_Akun, Status</code>.
              </p>

              <textarea
                rows={6}
                value={importCsvText}
                onChange={(e) => setImportCsvText(e.target.value)}
                placeholder={`NISN,Nama_Lengkap,Email_Siswa,Password_Akun,Status\n0051234099,Siti Aminah,siti.a@sosiologi.edu,Socio2026!Pass,Aktif\n0051234100,Rudi Hermawan,rudi.h@sosiologi.edu,Socio2026!Pass,Aktif`}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 font-mono text-xs text-slate-700 placeholder-stone-600 focus:outline-none focus:border-blue-400"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={handleDownloadTemplate}
                className="text-xs font-bold text-orange-600 hover:underline flex items-center space-x-1 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Unduh File Format CSV + Password</span>
              </button>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setShowImportModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 text-xs font-bold hover:bg-slate-200 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  onClick={handleProcessImport}
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-stone-950 text-xs font-extrabold cursor-pointer transition-all"
                >
                  Proses & Simpan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Add New Classroom */}
      {showAddClassModal && (
        <div className="fixed inset-0 z-50 bg-slate-800/60 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleCreateClass} className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div className="flex items-center space-x-2 text-slate-800">
                <Plus className="w-5 h-5 text-orange-600" />
                <h3 className="font-extrabold text-lg">Tambah Ruang Kelas (Rombel) Baru</h3>
              </div>
              <button 
                type="button"
                onClick={() => setShowAddClassModal(false)}
                className="text-slate-600 hover:text-slate-700 text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-600 font-bold mb-1">Nama Rombel / Kelas (Misal: 10-IPS-2)</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: 10-IPS-2"
                  value={newClassName}
                  onChange={(e) => setNewClassName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-700 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-bold mb-1">Tingkat Kelas</label>
                <select
                  value={newClassGrade}
                  onChange={(e) => setNewClassGrade(Number(e.target.value) as any)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-700 focus:outline-none focus:border-amber-500"
                >
                  <option value={10}>Kelas 10 SMA</option>
                  <option value={11}>Kelas 11 SMA</option>
                  <option value={12}>Kelas 12 SMA</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-600 font-bold mb-1">Nama Guru Pengampu</label>
                <input
                  type="text"
                  value={newClassTeacher}
                  onChange={(e) => setNewClassTeacher(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-700 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-bold mb-1">Deskripsi / Catatan Kelas</label>
                <textarea
                  rows={3}
                  value={newClassDesc}
                  onChange={(e) => setNewClassDesc(e.target.value)}
                  placeholder="Catatan rombel, fokus materi, atau laboratorium sosial..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-700 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-2 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setShowAddClassModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 text-xs font-bold hover:bg-slate-200 cursor-pointer"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-orange-600 hover:from-blue-500 hover:to-orange-500 text-stone-950 text-xs font-extrabold cursor-pointer transition-all"
              >
                Buat Ruang Kelas
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Printable E-Rapor Sosiologi Modal */}
      {selectedStudentRapor && (
        <div className="fixed inset-0 z-50 bg-slate-50/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white text-slate-900 rounded-3xl p-6 sm:p-10 max-w-2xl w-full shadow-2xl space-y-6 my-8 border border-slate-200">
            {/* Header Sekolah & E-Rapor */}
            <div className="text-center border-b-2 border-slate-900 pb-4 space-y-1">
              <h2 className="text-lg font-black uppercase tracking-wider text-emerald-900">PEMERINTAH PROVINSI DKI JAKARTA</h2>
              <h1 className="text-xl font-extrabold text-slate-900">SMAIT AS-SYIFA BOARDING SCHOOL WANAREJA</h1>
              <p className="text-xs text-slate-600">Jalan Edukasi Humanis No. 10, Jakarta Selatan | Telp: (021) 7891020</p>
              <div className="pt-2">
                <span className="bg-amber-100 text-amber-900 px-4 py-1 rounded-full font-black text-xs uppercase tracking-widest border border-amber-300">
                  E-RAPOR EVALUASI CAPAIAN SOSIOLOGI
                </span>
              </div>
            </div>

            {/* Biodata Siswa */}
            <div className="grid grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div>
                <p className="text-slate-600">Nama Siswa:</p>
                <p className="font-extrabold text-sm text-slate-900">{selectedStudentRapor.name}</p>
              </div>
              <div>
                <p className="text-slate-600">NISN / ID Akun:</p>
                <p className="font-bold text-slate-800 font-mono">{selectedStudentRapor.nisn}</p>
              </div>
              <div>
                <p className="text-slate-600">Rombongan Belajar (Rombel):</p>
                <p className="font-bold text-emerald-800">{selectedStudentRapor.classroom_name || currentClassroom.name}</p>
              </div>
              <div>
                <p className="text-slate-600">Tahun Ajaran / Semester:</p>
                <p className="font-bold text-slate-800">2026/2027 (Ganjil)</p>
              </div>
            </div>

            {/* Tabel Capaian & Penilaian IRT vs Normal */}
            <div className="space-y-3">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-700">Rincian Capaian Akademik & CBT TKA</h3>
              <div className="overflow-x-auto rounded-xl border border-slate-300 text-xs">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-300">
                    <tr>
                      <th className="p-3">Mata Pelajaran</th>
                      <th className="p-3 text-center">Skor CBT IRT (0-100)</th>
                      <th className="p-3 text-center">Skor Normal / Raw (%)</th>
                      <th className="p-3 text-center">Misi Selesai</th>
                      <th className="p-3 text-center">Predikat</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="p-3 font-extrabold text-slate-900">Sosiologi Humanis & TKA</td>
                      <td className="p-3 text-center font-mono font-black text-indigo-700">
                        {selectedStudentRapor.avg_cbt_score > 0 ? selectedStudentRapor.avg_cbt_score : 85}
                      </td>
                      <td className="p-3 text-center font-mono font-bold text-emerald-700">
                        {selectedStudentRapor.avg_cbt_score > 0 ? Math.round(selectedStudentRapor.avg_cbt_score * 0.95) : 82}%
                      </td>
                      <td className="p-3 text-center font-bold text-slate-700">{selectedStudentRapor.mission_completed_count} Misi</td>
                      <td className="p-3 text-center font-bold text-emerald-800">A (Sangat Baik)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Catatan & Rekomendasi Guru */}
            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs space-y-1">
              <p className="font-extrabold text-amber-900">Catatan & Rekomendasi Guru Pengampu Sosiologi:</p>
              <p className="text-slate-700 leading-relaxed">
                Siswa menunjukkan daya penalaran sosiologis yang sangat kuat pada konsep struktur sosial dan interaksi.
                Sangat siap menghadapi Simulasi CBT TKA Sosiologi tingkat nasional.
              </p>
            </div>

            {/* Tanda Tangan Official */}
            <div className="pt-6 border-t border-slate-200 grid grid-cols-2 text-center text-xs text-slate-700">
              <div className="space-y-12">
                <p>Orang Tua / Wali Siswa,</p>
                <p className="font-bold border-b border-slate-400 inline-block px-8">( .................................... )</p>
              </div>
              <div className="space-y-12">
                <p>Jakarta, 30 Juli 2026<br/>Guru Pengampu Sosiologi,</p>
                <p className="font-extrabold text-slate-900">{currentClassroom.teacher_name}</p>
              </div>
            </div>

            {/* Action Toolbar Modal */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <button
                onClick={() => setSelectedStudentRapor(null)}
                className="px-5 py-2.5 bg-slate-200 hover:bg-slate-300 font-bold rounded-xl text-xs text-slate-800 transition-all cursor-pointer"
              >
                Tutup Preview
              </button>
              <button
                onClick={() => window.print()}
                className="px-6 py-2.5 bg-emerald-700 hover:bg-blue-600 font-extrabold rounded-xl text-xs text-white transition-all shadow-sm border border-slate-200 cursor-pointer flex items-center space-x-2"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>Cetak PDF / Print Rapor</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
