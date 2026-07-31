import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { 
  Shield, Users, Database, Activity, Award, Plus, Trash2, 
  BookOpen, FileText, Bell, CheckCircle, HelpCircle, Edit3, Sparkles,
  Upload, Download, FileSpreadsheet, Loader2, Link2, Paperclip, AlertCircle, Zap,
  Move, X, Save, ArrowRightLeft
} from 'lucide-react';
import { Announcement, Course, Exam, Lesson, Question, Role, User } from '../types';
import { TSV_STUDENTS_PRESET, TEACHER_USER, INITIAL_STUDENT_USERS } from '../data/studentsData';
import { uploadFileToStorage } from '../lib/storageService';
import { saveDocument, deleteDocument } from '../lib/firestoreService';

interface AdminDashboardProps {
  user: User;
  onRoleChange: (role: Role) => void;
  courses: Course[];
  exams: Exam[];
  announcements: Announcement[];
  usersList?: User[];
  hasMoreUsers?: boolean;
  onLoadMoreUsers?: () => void;
  loadingMoreUsers?: boolean;
  onAddCourse: (newCourse: Course) => void;
  onDeleteCourse: (courseId: string) => void;
  onAddExam: (newExam: Exam) => void;
  onDeleteExam: (examId: string) => void;
  onAddQuestion: (examId: string, newQuestion: Question) => void;
  onDeleteQuestion: (examId: string, questionId: string) => void;
  onAddAnnouncement: (announcement: Announcement) => void;
  onDeleteAnnouncement: (announcementId: string) => void;
  onAddUser?: (newUser: User) => void;
  onDeleteUser?: (userId: string) => void;
  onBulkAddUsers?: (users: User[]) => void;
  rombelFilter?: string;
  setRombelFilter?: (val: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  user,
  onRoleChange,
  courses,
  exams,
  announcements,
  usersList: initialUsersList,
  hasMoreUsers,
  onLoadMoreUsers,
  loadingMoreUsers,
  onAddCourse,
  onDeleteCourse,
  onAddExam,
  onDeleteExam,
  onAddQuestion,
  onDeleteQuestion,
  onAddAnnouncement,
  onDeleteAnnouncement,
  onAddUser,
  onDeleteUser,
  onBulkAddUsers,
  rombelFilter = 'Semua',
  setRombelFilter,
}) => {
  const [adminTab, setAdminTab] = useState<'users' | 'courses' | 'exams' | 'announcements'>('courses');
  const [filterRombel, setFilterRombel] = useState<string>('Semua');
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Global Uploading & Loading States
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  // Local User List state for Admin CMS
  const [usersList, setUsersList] = useState<User[]>(() => {
    if (initialUsersList && initialUsersList.length > 0) return initialUsersList;
    return [
      TEACHER_USER,
      ...INITIAL_STUDENT_USERS
    ];
  });

  // Keep local usersList in sync if parent passes updated array
  React.useEffect(() => {
    if (initialUsersList && initialUsersList.length > 0) {
      setUsersList(initialUsersList);
    }
  }, [initialUsersList]);

  // Form State: New User & CSV User Upload Mode
  const [userMode, setUserMode] = useState<'form' | 'csv'>('form');
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState<Role>('siswa');
  const [newUserGrade, setNewUserGrade] = useState<number>(12);
  const [newUserSchool, setNewUserSchool] = useState('');
  const [studentCsvText, setStudentCsvText] = useState<string>('');

  // Form State: New Course & Document Upload
  const [courseTargetPillar, setCourseTargetPillar] = useState<'kelas' | 'tka'>('kelas');
  const [courseInputMode, setCourseInputMode] = useState<'form' | 'template'>('form');
  const [courseTemplateText, setCourseTemplateText] = useState<string>('');
  const [courseTitle, setCourseTitle] = useState('');
  const [courseGrade, setCourseGrade] = useState<10 | 11 | 12>(12);
  const [courseChapterNum, setCourseChapterNum] = useState<number>(1);
  const [courseDesc, setCourseDesc] = useState('');
  const [lessonTitle, setLessonTitle] = useState('');
  const [lessonVideoUrl, setLessonVideoUrl] = useState('');
  const [lessonTextBody, setLessonTextBody] = useState('');
  const [lessonKeyPoints, setLessonKeyPoints] = useState('');
  const [lessonXp, setLessonXp] = useState<number>(100);

  // File Attachment State for Lesson Document (Firebase Storage)
  const [selectedDocumentFile, setSelectedDocumentFile] = useState<File | null>(null);

  // Form State: New Exam Package & Bank Soal Bulk
  const [examInputMode, setExamInputMode] = useState<'form' | 'template'>('form');
  const [examTemplateText, setExamTemplateText] = useState<string>('');
  const [examTitle, setExamTitle] = useState('');
  const [examGrade, setExamGrade] = useState<number>(12);
  const [examCategory, setExamCategory] = useState<string>('Tryout TKA');
  const [examDuration, setExamDuration] = useState<number>(25);
  const [examPassingScore, setExamPassingScore] = useState<number>(75);
  const [examDesc, setExamDesc] = useState('');

  // Form State: New Question
  const [selectedExamId, setSelectedExamId] = useState<string>('');
  const [qType, setQType] = useState<'pilihan_ganda' | 'kompleks' | 'sebab_akibat'>('pilihan_ganda');
  const [qText, setQText] = useState('');
  const [qPernyataan, setQPernyataan] = useState('');
  const [qAlasan, setQAlasan] = useState('');
  const [qStmt1, setQStmt1] = useState('');
  const [qStmt2, setQStmt2] = useState('');
  const [qStmt3, setQStmt3] = useState('');
  const [qStmt4, setQStmt4] = useState('');
  const [qOptA, setQOptA] = useState('');
  const [qOptB, setQOptB] = useState('');
  const [qOptC, setQOptC] = useState('');
  const [qOptD, setQOptD] = useState('');
  const [qOptE, setQOptE] = useState('');
  const [qCorrect, setQCorrect] = useState<'A' | 'B' | 'C' | 'D' | 'E'>('A');
  const [qExplanation, setQExplanation] = useState('');
  const [qTopic, setQTopic] = useState('');
  const [qDifficulty, setQDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Medium');

  // Form State: New Announcement
  const [annTitle, setAnnTitle] = useState('');
  const [annCategory, setAnnCategory] = useState<'Penting' | 'Informasi' | 'Jadwal Ujian' | 'Pembaruan Materi'>('Penting');
  const [annAuthor, setAnnAuthor] = useState('Sahidin, S.Pd., Gr.');
  const [annContent, setAnnContent] = useState('');

  // Edit & Move Modal States (Full CRUD & Item Transfer)
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [editingLesson, setEditingLesson] = useState<{ lesson: Lesson; sourceCourseId: string } | null>(null);
  const [targetCourseIdForMove, setTargetCourseIdForMove] = useState<string>('');

  const [editingExam, setEditingExam] = useState<Exam | null>(null);
  const [editingQuestion, setEditingQuestion] = useState<{ question: Question; sourceExamId: string } | null>(null);
  const [targetExamIdForMove, setTargetExamIdForMove] = useState<string>('');

  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);

  // Edit & Move Handlers
  const handleSaveEditedCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCourse) return;
    setIsUploading(true);
    try {
      await saveDocument('courses', editingCourse.id, editingCourse);
      onAddCourse(editingCourse);
      setEditingCourse(null);
      showNotification(`Modul "${editingCourse.title}" berhasil diperbarui!`);
    } catch (err) {
      showErrorNotification('Gagal memperbarui modul sosiologi.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSaveEditedLesson = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLesson) return;
    setIsUploading(true);

    const { lesson, sourceCourseId } = editingLesson;
    const destCourseId = targetCourseIdForMove || sourceCourseId;

    try {
      if (sourceCourseId !== destCourseId) {
        // Move lesson from sourceCourse to destCourse
        const sourceCourse = courses.find((c) => c.id === sourceCourseId);
        if (sourceCourse) {
          const updatedSourceLessons = sourceCourse.lessons.filter((l) => l.id !== lesson.id);
          const updatedSource = {
            ...sourceCourse,
            lessons: updatedSourceLessons,
            totalLessons: updatedSourceLessons.length,
          };
          await saveDocument('courses', sourceCourse.id, updatedSource);
          onAddCourse(updatedSource);
        }

        const destCourse = courses.find((c) => c.id === destCourseId);
        if (destCourse) {
          const updatedLessonObj = { ...lesson, course_id: destCourseId };
          const updatedDestLessons = [...destCourse.lessons.filter((l) => l.id !== lesson.id), updatedLessonObj];
          const updatedDest = {
            ...destCourse,
            lessons: updatedDestLessons,
            totalLessons: updatedDestLessons.length,
          };
          await saveDocument('courses', destCourse.id, updatedDest);
          onAddCourse(updatedDest);
        }
        showNotification(`Sub-materi "${lesson.title}" berhasil dipindahkan ke Bab / Modul lain!`);
      } else {
        // Update in place
        const currentCourse = courses.find((c) => c.id === sourceCourseId);
        if (currentCourse) {
          const updatedLessons = currentCourse.lessons.map((l) => (l.id === lesson.id ? lesson : l));
          const updatedCourse = { ...currentCourse, lessons: updatedLessons };
          await saveDocument('courses', currentCourse.id, updatedCourse);
          onAddCourse(updatedCourse);
        }
        showNotification(`Sub-materi "${lesson.title}" berhasil diperbarui!`);
      }
      setEditingLesson(null);
    } catch (err) {
      showErrorNotification('Gagal memperbarui sub-materi.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSaveEditedExam = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingExam) return;
    setIsUploading(true);
    try {
      await saveDocument('exams', editingExam.id, editingExam);
      onAddExam(editingExam);
      setEditingExam(null);
      showNotification(`Paket Tryout "${editingExam.title}" berhasil diperbarui!`);
    } catch (err) {
      showErrorNotification('Gagal memperbarui paket tryout.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSaveEditedQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingQuestion) return;
    setIsUploading(true);

    const { question, sourceExamId } = editingQuestion;
    const destExamId = targetExamIdForMove || sourceExamId;

    try {
      if (sourceExamId !== destExamId) {
        // Move question from sourceExam to destExam
        const sourceExam = exams.find((e) => e.id === sourceExamId);
        if (sourceExam) {
          const updatedSourceQs = sourceExam.questions.filter((q) => q.id !== question.id);
          const updatedSource = {
            ...sourceExam,
            questions: updatedSourceQs,
            total_questions: updatedSourceQs.length,
          };
          await saveDocument('exams', sourceExam.id, updatedSource);
          onAddExam(updatedSource);
        }

        const destExam = exams.find((e) => e.id === destExamId);
        if (destExam) {
          const updatedQuestionObj = { ...question, exam_id: destExamId };
          const updatedDestQs = [...destExam.questions.filter((q) => q.id !== question.id), updatedQuestionObj];
          const updatedDest = {
            ...destExam,
            questions: updatedDestQs,
            total_questions: updatedDestQs.length,
          };
          await saveDocument('exams', destExam.id, updatedDest);
          onAddExam(updatedDest);
        }
        showNotification(`Soal berhasil dipindahkan ke paket ujian target!`);
      } else {
        // Update in place
        const currentExam = exams.find((e) => e.id === sourceExamId);
        if (currentExam) {
          const updatedQs = currentExam.questions.map((q) => (q.id === question.id ? question : q));
          const updatedExam = { ...currentExam, questions: updatedQs };
          await saveDocument('exams', currentExam.id, updatedExam);
          onAddExam(updatedExam);
        }
        showNotification(`Soal berhasil diperbarui!`);
      }
      setEditingQuestion(null);
    } catch (err) {
      showErrorNotification('Gagal memperbarui soal.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSaveEditedUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    setIsUploading(true);
    try {
      await saveDocument('users', editingUser.id, editingUser);
      setUsersList((prev) => prev.map((u) => (u.id === editingUser.id ? editingUser : u)));
      if (onAddUser) onAddUser(editingUser);
      setEditingUser(null);
      showNotification(`Pengguna "${editingUser.name}" berhasil diperbarui!`);
    } catch (err) {
      showErrorNotification('Gagal memperbarui pengguna.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSaveEditedAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAnnouncement) return;
    setIsUploading(true);
    try {
      await saveDocument('announcements', editingAnnouncement.id, editingAnnouncement);
      onAddAnnouncement(editingAnnouncement);
      setEditingAnnouncement(null);
      showNotification(`Pengumuman "${editingAnnouncement.title}" berhasil diperbarui!`);
    } catch (err) {
      showErrorNotification('Gagal memperbarui pengumuman.');
    } finally {
      setIsUploading(false);
    }
  };

  const showNotification = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 5000);
  };

  const showErrorNotification = (msg: string) => {
    setErrorMsg(msg);
    setTimeout(() => setErrorMsg(null), 5000);
  };

  // CSV Template Exporter Helpers
  const downloadCourseTemplateCSV = () => {
    const csvData = `Judul Modul,Target Pilar (Kelas 10/11/12 / TKA),Nomor Bab,Judul Sub-Materi,YouTube ID,Ringkasan Teks Materi,Poin Kunci (pisahkan dengan semicolon ;)
Sosiologi Konflik & Akomodasi,TKA,1,Teori Konflik Ralf Dahrendorf,2Vv-BfVoq4g,Pembahasan mendalam struktur kekuasaan dan oposisi kelas untuk TKA UTBK.,Kekuasaan vs wewenang;Kelompok asosiasi;Akomodasi konsiliasi
Perubahan Sosial & Modernisasi,Kelas 12,2,Dampak Modernisasi Terhadap Kearifan Lokal,2Vv-BfVoq4g,Uraian perubahan sosial cepat dan lambat serta pergeseran tata nilai masyarakat.,Westernisasi;Sekularisasi;Konsumerisme
Sosiologi Sebagai Ilmu Masyarakat,Kelas 10,1,Objek Kajian dan Ciri-Ciri Sosiologi,2Vv-BfVoq4g,Penjelasan objek empiris sosiologi dan pemikiran Auguste Comte.,Empiris;Teoretis;Kumulatif;Nonetis`;
    
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'template_modul_materi_sosiologi.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadExamTemplateCSV = () => {
    const csvData = `Judul Paket Ujian,Teks Soal,Opsi A,Opsi B,Opsi C,Opsi D,Opsi E,Kunci Jawaban (A-E),Kesukaran (Easy/Medium/Hard),Topik,Pembahasan HOTS
Tryout TKA Sosiologi Paket 5,"Demonstrasi buruh menuntut kenaikan UMR menurut Dahrendorf dipicu oleh...",Perbedaan kekuasaan dan wewenang,Perebutan modal usaha,Niat buruk pengusaha,Campur tangan asing,Hambatan komunikasi,A,Hard,Konflik Sosial,"Dahrendorf menekankan bahwa konflik masyarakat industri modern dipicu oleh distribusi kekuasaan dan wewenang."`;

    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'template_bank_soal_tka_sosiologi.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadStudentTemplateCSV = () => {
    const csvData = `NISN,Nama_Lengkap,Password_Akun,Kelas,Status
0051234099,Budi Cahyono,Socio2026!Pass,12,Aktif
0051234100,Siti Aminah,Socio2026!Pass,12,Aktif
0051234101,Rizky Pratama,Socio2026!Pass,11,Aktif`;

    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'template_import_siswa_massal.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadStudentTemplateExcel = () => {
    const data = [
      {
        NISN: '0051234099',
        Nama_Lengkap: 'Budi Cahyono',
        Password_Akun: 'Socio2026!Pass',
        Kelas: 12,
        Status: 'Aktif'
      },
      {
        NISN: '0051234100',
        Nama_Lengkap: 'Siti Aminah',
        Password_Akun: 'Socio2026!Pass',
        Kelas: 12,
        Status: 'Aktif'
      },
      {
        NISN: '0051234101',
        Nama_Lengkap: 'Rizky Pratama',
        Password_Akun: 'Socio2026!Pass',
        Kelas: 11,
        Status: 'Aktif'
      }
    ];

    const worksheet = XLSX.utils.json_to_sheet(data);
    worksheet['!cols'] = [
      { wch: 15 },
      { wch: 28 },
      { wch: 18 },
      { wch: 10 },
      { wch: 12 }
    ];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data_Siswa_LMS');
    XLSX.writeFile(workbook, 'template_import_siswa_massal.xlsx');
  };

  const handleStudentExcelFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileName = file.name.toLowerCase();
    const reader = new FileReader();

    if (fileName.endsWith('.xlsx') || fileName.endsWith('.xls')) {
      reader.onload = (evt) => {
        try {
          const buffer = evt.target?.result;
          const workbook = XLSX.read(buffer, { type: 'array' });
          const firstSheetName = workbook.SheetNames[0];
          const firstSheet = workbook.Sheets[firstSheetName];
          const rawRows: any[] = XLSX.utils.sheet_to_json(firstSheet, { defval: '' });

          if (rawRows.length > 0) {
            const csvRows: string[] = ['NISN,Nama_Lengkap,Password_Akun,Kelas,Status'];
            rawRows.forEach((row) => {
              const nisn = row.NISN || row.nisn || row['No NISN'] || '';
              const nama = row.Nama_Lengkap || row.nama_lengkap || row.Nama || row.nama || '';
              const pass = row.Password_Akun || row.password_akun || row.Password || row.password || '';
              const kelas = row.Kelas || row.kelas || 12;
              const status = row.Status || row.status || 'Aktif';

              if (nama || nisn) {
                csvRows.push(`"${nisn}","${nama}","${pass}",${kelas},"${status}"`);
              }
            });

            setStudentCsvText(csvRows.join('\n'));
            showNotification(`File Excel "${file.name}" berhasil dibaca (${rawRows.length} data siswa terdeteksi)!`);
          } else {
            showErrorNotification('File Excel kosong atau tidak memiliki data siswa.');
          }
        } catch (err) {
          console.error('Excel parse error:', err);
          showErrorNotification('Gagal membaca file Excel.');
        }
      };
      reader.readAsArrayBuffer(file);
    } else {
      reader.onload = (evt) => {
        if (evt.target?.result) {
          setStudentCsvText(evt.target.result as string);
        }
      };
      reader.readAsText(file);
    }
  };

  // Bulk Importer Courses to Firebase
  const handleBulkUploadCoursesSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseTemplateText.trim()) return;

    setIsUploading(true);
    let imported = 0;

    try {
      // Try JSON
      if (courseTemplateText.trim().startsWith('[') || courseTemplateText.trim().startsWith('{')) {
        const parsed = JSON.parse(courseTemplateText);
        const items = Array.isArray(parsed) ? parsed : [parsed];

        for (let idx = 0; idx < items.length; idx++) {
          const item = items[idx];
          const courseId = `course_bulk_${Date.now()}_${idx}`;
          const newCourse: Course = {
            id: courseId,
            title: item.title || item.judul || `Modul Sosiologi ${idx + 1}`,
            description: item.description || item.deskripsi || 'Modul Sosiologi dari Template Data JSON',
            grade_level: Number(item.grade_level || item.kelas || 12) as any,
            category: item.category || item.kategori || 'Sosiologi SMA',
            thumbnail: item.thumbnail || 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=400',
            totalLessons: item.lessons ? item.lessons.length : 1,
            completedLessons: 0,
            lessons: item.lessons || [
              {
                id: `les_bulk_${Date.now()}_${idx}`,
                course_id: courseId,
                chapter_number: Number(item.chapter_number || 1),
                chapter_title: `BAB ${item.chapter_number || 1}`,
                title: item.lesson_title || item.title || 'Materi Sosiologi',
                content_type: 'video',
                youtube_id: item.youtube_id || '2Vv-BfVoq4g',
                text_body: item.text_body || 'Materi pembelajaran dari JSON.',
                key_takeaways: item.key_points || ['Poin utama sosiologi'],
                duration: '15 Menit',
                completed: false,
                xp_reward: 100,
              }
            ]
          };

          await saveDocument('courses', newCourse.id, newCourse);
          onAddCourse(newCourse);
          imported++;
        }

        showNotification(`Sukses! ${imported} Modul/Materi berhasil diimpor & tersimpan ke Firebase Firestore!`);
        setCourseTemplateText('');
        setIsUploading(false);
        return;
      }

      // CSV Parse
      const lines = courseTemplateText.split('\n').map(l => l.trim()).filter(l => l.length > 0);
      if (lines.length <= 1) {
        showErrorNotification('Teks template CSV Modul kosong.');
        setIsUploading(false);
        return;
      }

      const startIndex = lines[0].toLowerCase().includes('judul') ? 1 : 0;

      for (let i = startIndex; i < lines.length; i++) {
        const cols = lines[i].split(',').map(c => c.trim().replace(/^"|"$/g, ''));
        if (cols.length >= 4) {
          const title = cols[0] || 'Modul Sosiologi Template CSV';
          const targetStr = cols[1] || 'Kelas 12';
          const isTka = targetStr.toLowerCase().includes('tka');
          const gradeVal = targetStr.includes('10') ? 10 : targetStr.includes('11') ? 11 : 12;
          const chapterNum = Number(cols[2] || 1);
          const lessonTitle = cols[3] || 'Sub-materi Sosiologi';
          const ytId = cols[4] || '2Vv-BfVoq4g';
          const textBody = cols[5] || 'Penjelasan materi sosiologi dari template CSV.';
          const keyPoints = cols[6] ? cols[6].split(';').map(p => p.trim()) : ['Konsep utama sosiologi'];

          const courseId = `course_csv_${Date.now()}_${i}`;
          const newCourse: Course = {
            id: courseId,
            title,
            description: isTka ? 'Modul TKA Sosiologi UTBK / PTN' : `Modul Sosiologi Kelas ${gradeVal}`,
            grade_level: isTka ? 12 : gradeVal,
            category: isTka ? 'TKA Sosiologi (UTBK / Seleksi PTN)' : `Sosiologi SMA Kelas ${gradeVal}`,
            thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=400',
            totalLessons: 1,
            completedLessons: 0,
            lessons: [
              {
                id: `les_csv_${Date.now()}_${i}`,
                course_id: courseId,
                chapter_number: chapterNum,
                chapter_title: `BAB ${chapterNum}`,
                title: lessonTitle,
                content_type: 'video',
                youtube_id: ytId,
                text_body: textBody,
                key_takeaways: keyPoints,
                duration: '15 Menit',
                completed: false,
                xp_reward: 100,
              }
            ]
          };

          await saveDocument('courses', newCourse.id, newCourse);
          onAddCourse(newCourse);
          imported++;
        }
      }

      showNotification(`Sukses! ${imported} Modul/Materi diimpor & langsung tersimpan ke Firebase!`);
      setCourseTemplateText('');
    } catch (err) {
      console.error('Course Bulk Upload Error:', err);
      showErrorNotification('Gagal mengunggah modul bulk: ' + (err instanceof Error ? err.message : String(err)));
    } finally {
      setIsUploading(false);
    }
  };

  // Bulk Importer Exam/Questions Bank to Firebase
  const handleBulkUploadExamsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!examTemplateText.trim()) return;

    setIsUploading(true);
    let examCount = 0;
    let qCount = 0;

    try {
      // Try JSON
      if (examTemplateText.trim().startsWith('[') || examTemplateText.trim().startsWith('{')) {
        const parsed = JSON.parse(examTemplateText);
        const items = Array.isArray(parsed) ? parsed : [parsed];

        for (let idx = 0; idx < items.length; idx++) {
          const item = items[idx];
          const examId = `exam_bulk_${Date.now()}_${idx}`;
          const qList: Question[] = (item.questions || item.soal || []).map((q: any, qIdx: number) => ({
            id: `q_bulk_${Date.now()}_${idx}_${qIdx}`,
            exam_id: examId,
            number: qIdx + 1,
            text: q.text || q.soal || 'Pertanyaan Ujian Sosiologi',
            option_a: q.option_a || q.a || 'Opsi A',
            option_b: q.option_b || q.b || 'Opsi B',
            option_c: q.option_c || q.c || 'Opsi C',
            option_d: q.option_d || q.d || 'Opsi D',
            option_e: q.option_e || q.e || 'Opsi E',
            correct_answer: (q.correct_answer || q.kunci || 'A').toUpperCase() as any,
            explanation: q.explanation || q.pembahasan || 'Pembahasan HOTS Sosiologi.',
            topic: q.topic || q.topik || 'TKA Sosiologi',
            difficulty: q.difficulty || q.kesukaran || 'Medium',
          }));

          const newExam: Exam = {
            id: examId,
            title: item.title || item.judul || `Paket Tryout TKA ${idx + 1}`,
            grade_level: 12,
            category: 'Tryout TKA',
            duration_minutes: Number(item.duration_minutes || 25),
            total_questions: qList.length,
            description: item.description || 'Paket Ujian Tryout TKA Sosiologi dari Template JSON',
            xp_reward: 200,
            passing_score: Number(item.passing_score || 75),
            questions: qList,
          };

          await saveDocument('exams', newExam.id, newExam);
          onAddExam(newExam);
          examCount++;
          qCount += qList.length;
        }

        showNotification(`Sukses! ${examCount} Paket Ujian & ${qCount} Soal TKA tersimpan ke Firebase Firestore!`);
        setExamTemplateText('');
        setIsUploading(false);
        return;
      }

      // CSV Parse
      const lines = examTemplateText.split('\n').map(l => l.trim()).filter(l => l.length > 0);
      if (lines.length <= 1) {
        showErrorNotification('Teks template CSV Bank Soal kosong.');
        setIsUploading(false);
        return;
      }

      const startIndex = lines[0].toLowerCase().includes('judul') || lines[0].toLowerCase().includes('soal') ? 1 : 0;
      const examMap: { [title: string]: Question[] } = {};

      for (let i = startIndex; i < lines.length; i++) {
        const cols = lines[i].split(',').map(c => c.trim().replace(/^"|"$/g, ''));
        if (cols.length >= 7) {
          const examName = cols[0] || 'Tryout TKA Sosiologi Template CSV';
          const text = cols[1] || 'Soal Sosiologi TKA';
          const optA = cols[2] || 'Opsi A';
          const optB = cols[3] || 'Opsi B';
          const optC = cols[4] || 'Opsi C';
          const optD = cols[5] || 'Opsi D';
          const optE = cols[6] || 'Opsi E';
          const key = (cols[7] || 'A').toUpperCase() as any;
          const difficulty = (cols[8] || 'Medium') as any;
          const topic = cols[9] || 'TKA Sosiologi';
          const explanation = cols[10] || 'Pembahasan HOTS sosiologi.';

          if (!examMap[examName]) examMap[examName] = [];

          const qObj: Question = {
            id: `q_csv_${Date.now()}_${i}`,
            exam_id: '',
            number: examMap[examName].length + 1,
            text,
            option_a: optA,
            option_b: optB,
            option_c: optC,
            option_d: optD,
            option_e: optE,
            correct_answer: key,
            explanation,
            topic,
            difficulty,
          };

          examMap[examName].push(qObj);
        }
      }

      for (const [eTitle, qList] of Object.entries(examMap)) {
        const exId = `exam_csv_${Date.now()}_${examCount}`;
        qList.forEach(q => q.exam_id = exId);

        const newExam: Exam = {
          id: exId,
          title: eTitle,
          grade_level: 12,
          category: 'Tryout TKA',
          duration_minutes: 25,
          total_questions: qList.length,
          description: 'Paket Ujian Tryout TKA diimpor dari Template CSV',
          xp_reward: 200,
          passing_score: 75,
          questions: qList,
        };

        await saveDocument('exams', newExam.id, newExam);
        onAddExam(newExam);
        examCount++;
        qCount += qList.length;
      }

      showNotification(`Sukses! ${examCount} Paket Ujian & ${qCount} Soal TKA berhasil tersimpan ke Firebase!`);
      setExamTemplateText('');
    } catch (err) {
      console.error('Exam Bulk Upload Error:', err);
      showErrorNotification('Gagal mengunggah bank soal: ' + (err instanceof Error ? err.message : String(err)));
    } finally {
      setIsUploading(false);
    }
  };

  // Bulk Student CSV / Excel Importer to Firebase
  const handleBulkUploadStudentsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentCsvText.trim()) return;

    setIsUploading(true);
    let count = 0;

    try {
      const lines = studentCsvText.trim().split('\n');
      const newStudents: User[] = [];

      for (let idx = 0; idx < lines.length; idx++) {
        const line = lines[idx].trim();
        if (!line) continue;
        if (idx === 0 && (line.toLowerCase().startsWith('nisn') || line.toLowerCase().startsWith('nama'))) continue;

        // Support Tab (\t) from Excel copy-paste and Comma (,)
        const cols = (line.includes('\t') ? line.split('\t') : line.split(','))
          .map(c => c.trim().replace(/^"|"$/g, ''));

        if (cols.length >= 2) {
          const nisn = cols[0] || `1000000${Math.floor(1000 + Math.random() * 9000)}`;
          const name = cols[1] || 'Siswa Baru';
          const password = cols[2] || `socio${String(idx).padStart(3, '0')}`;
          const group_name = cols[3] || '12 SOSHUM PUTRA';
          const status = (cols[4] as any) || 'Aktif';
          const email = `${nisn}@siswa.lms`;

          const studentUser: User = {
            id: `usr_st_${nisn}`,
            name,
            email,
            role: 'siswa',
            total_xp: 500,
            levelTitle: 'Siswa Sosiologi',
            avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(nisn)}`,
            grade: 12,
            streakDays: 1,
            schoolName: 'SMAIT As-Syifa Boarding School Wanareja',
            group_name,
            nisn,
            status: status === 'Izin' || status === 'Alumni' ? status : 'Aktif',
          };

          newStudents.push(studentUser);
          count++;
        }
      }

      if (newStudents.length > 0) {
        // FAST PARALLEL FIRESTORE SAVE
        await Promise.all(
          newStudents.map((st) => saveDocument('users', st.id, st))
        );

        setUsersList(prev => {
          const map = new Map<string, User>();
          prev.forEach(u => map.set(u.id, u));
          newStudents.forEach(u => map.set(u.id, u));
          return Array.from(map.values());
        });

        if (onBulkAddUsers) onBulkAddUsers(newStudents);
        showNotification(`⚡ Sukses kilat! ${count} Data Siswa berhasil diimpor & tersimpan ke Firebase!`);
        setStudentCsvText('');
      } else {
        showErrorNotification('Format file/CSV tidak valid atau baris data tidak ditemukan.');
      }
    } catch (err) {
      console.error('Student Bulk Upload Error:', err);
      showErrorNotification('Gagal mengunggah data siswa: ' + (err instanceof Error ? err.message : String(err)));
    } finally {
      setIsUploading(false);
    }
  };

  // User Handlers (Firebase Integration)
  const handleAddUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName || !newUserEmail) return;

    setIsUploading(true);
    const userId = `usr_${Date.now()}`;
    const newUser: User = {
      id: userId,
      name: newUserName,
      email: newUserEmail,
      role: newUserRole,
      total_xp: 500,
      levelTitle: newUserRole === 'guru' ? 'Guru Pengampu' : newUserRole === 'admin' ? 'Super Admin' : 'Siswa Sosiologi',
      avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(newUserEmail)}`,
      grade: newUserGrade,
      streakDays: 1,
      schoolName: newUserSchool || 'SMAIT As-Syifa Boarding School Wanareja',
      status: 'Aktif',
    };

    try {
      await saveDocument('users', newUser.id, newUser);
      setUsersList([newUser, ...usersList]);
      if (onAddUser) onAddUser(newUser);

      setNewUserName('');
      setNewUserEmail('');
      setNewUserSchool('');
      showNotification(`Pengguna baru "${newUser.name}" berhasil ditambahkan & tersimpan di Firebase!`);
    } catch (err) {
      showErrorNotification('Gagal menyimpan user: ' + (err instanceof Error ? err.message : String(err)));
    } finally {
      setIsUploading(false);
    }
  };

  const uniqueRombels = React.useMemo(() => {
    const rombels = new Set<string>();
    usersList.forEach(u => {
      const rombel = String(u.kelas || u.grade || '').trim();
      if (rombel && rombel !== 'undefined' && rombel !== 'null') {
        rombels.add(rombel);
      }
    });
    return ['Semua', ...Array.from(rombels).sort()];
  }, [usersList]);

  const displayedUsers = React.useMemo(() => {
    if (filterRombel === 'Semua') return usersList;
    return usersList.filter(u => {
      const rombel = String(u.kelas || u.grade || '').trim();
      return rombel === filterRombel;
    });
  }, [usersList, filterRombel]);

  const getRombelBadgeColor = (rombel: string) => {
    const r = rombel.toLowerCase();
    if (r.includes('10')) return 'bg-blue-50 text-blue-700 border-blue-200';
    if (r.includes('11')) return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    if (r.includes('12')) return 'bg-purple-50 text-purple-700 border-purple-200';
    return 'bg-slate-50 text-slate-700 border-slate-200';
  };

  const handleToggleUserRole = async (id: string, newRole: Role) => {
    const targetUser = usersList.find(u => u.id === id);
    if (!targetUser) return;

    const updatedUser = { ...targetUser, role: newRole };
    setUsersList((prev) =>
      prev.map((u) => (u.id === id ? updatedUser : u))
    );

    try {
      await saveDocument('users', id, { role: newRole });
      showNotification(`Hak akses role ${targetUser.name} diperbarui menjadi ${newRole.toUpperCase()} di Firebase!`);
    } catch (err) {
      showErrorNotification('Gagal memperbarui role di Firebase.');
    }
  };

  const handleDeleteUser = async (id: string) => {
    setUsersList((prev) => prev.filter((u) => u.id !== id));
    if (onDeleteUser) onDeleteUser(id);

    try {
      await deleteDocument('users', id);
      showNotification(`User berhasil dihapus dari sistem Firebase.`);
    } catch (err) {
      showErrorNotification('Gagal menghapus user dari Firebase.');
    }
  };

  // Course Handlers (Firebase Integration with Storage Document Attachment)
  const handleAddCourseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseTitle || !lessonTitle) return;

    setIsUploading(true);
    setUploadProgress(0);

    let docUrl: string | undefined = undefined;
    let docName: string | undefined = undefined;

    try {
      // 1. Upload original document file (PDF, Word, PPT, Excel, Image) to Firebase Storage if selected
      if (selectedDocumentFile) {
        docUrl = await uploadFileToStorage(selectedDocumentFile, 'documents', (percent) => {
          setUploadProgress(percent);
        });
        docName = selectedDocumentFile.name;
      }

      const courseId = `course_${Date.now()}`;
      const lessonId = `les_${Date.now()}`;

      const pointsArr = lessonKeyPoints
        .split('\n')
        .map((p) => p.trim())
        .filter((p) => p.length > 0);

      const newLesson: Lesson = {
        id: lessonId,
        course_id: courseId,
        chapter_number: courseChapterNum,
        chapter_title: `BAB ${courseChapterNum}`,
        title: lessonTitle,
        content_type: lessonVideoUrl ? 'video' : 'text',
        youtube_id: lessonVideoUrl || '2Vv-BfVoq4g',
        text_body: lessonTextBody || 'Penjelasan mendalam materi Sosiologi untuk persiapan TKA dan pemahaman konsep dasar.',
        key_takeaways: pointsArr.length > 0 ? pointsArr : ['Memahami teori sosiologi', 'Dapat mengaitkan dengan kasus riil'],
        duration: '15 Menit',
        completed: false,
        xp_reward: lessonXp,
        document_url: docUrl,
        document_name: docName,
      };

      const isTkaPillar = courseTargetPillar === 'tka';
      const newCourseObj: Course = {
        id: courseId,
        title: courseTitle,
        description: courseDesc || (isTkaPillar ? 'Modul & Materi Khusus TKA Sosiologi UTBK / Seleksi PTN' : `Modul Pembelajaran Sosiologi Kelas ${courseGrade}`),
        grade_level: isTkaPillar ? 12 : courseGrade,
        category: isTkaPillar ? 'TKA Sosiologi (UTBK / Seleksi PTN)' : `Sosiologi SMA Kelas ${courseGrade}`,
        thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=400',
        totalLessons: 1,
        completedLessons: 0,
        lessons: [newLesson],
      };

      // 2. Save directly to Firebase Firestore
      await saveDocument('courses', newCourseObj.id, newCourseObj);
      onAddCourse(newCourseObj);

      setCourseTitle('');
      setCourseDesc('');
      setLessonTitle('');
      setLessonVideoUrl('');
      setLessonTextBody('');
      setLessonKeyPoints('');
      setSelectedDocumentFile(null);

      showNotification(`Modul & Dokumen "${newCourseObj.title}" berhasil diunggah & disimpan ke Firebase!`);
    } catch (err) {
      console.error('Error saving course/document to Firebase:', err);
      showErrorNotification('Gagal menyimpan modul: ' + (err instanceof Error ? err.message : String(err)));
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  // Exam Package Handler
  const handleAddExamSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!examTitle) return;

    setIsUploading(true);
    const newExamObj: Exam = {
      id: `exam_admin_${Date.now()}`,
      title: examTitle,
      grade_level: (Number(examGrade) as 0 | 10 | 11 | 12),
      category: 'Tryout TKA',
      duration_minutes: Number(examDuration),
      total_questions: 0,
      description: examDesc || 'Paket Ujian CBT TKA Sosiologi standar nasional.',
      xp_reward: 200,
      passing_score: Number(examPassingScore),
      questions: [],
    };

    try {
      await saveDocument('exams', newExamObj.id, newExamObj);
      onAddExam(newExamObj);
      setExamTitle('');
      setExamDesc('');
      showNotification(`Paket Tryout TKA "${newExamObj.title}" berhasil disimpan di Firebase! Silakan tambahkan butir soal.`);
    } catch (err) {
      showErrorNotification('Gagal menyimpan paket ujian di Firebase.');
    } finally {
      setIsUploading(false);
    }
  };

  // Question Handler
  const handleAddQuestionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedExamId || !qText) return;

    setIsUploading(true);
    const targetExam = exams.find(e => e.id === selectedExamId);

    const newQuestionObj: Question = {
      id: `q_admin_${Date.now()}`,
      exam_id: selectedExamId,
      number: (targetExam?.questions.length || 0) + 1,
      question_type: qType,
      text: qText,
      pernyataan: qPernyataan || undefined,
      alasan: qAlasan || undefined,
      statement_1: qStmt1 || undefined,
      statement_2: qStmt2 || undefined,
      statement_3: qStmt3 || undefined,
      statement_4: qStmt4 || undefined,
      option_a: qOptA || (qType === 'kompleks' ? '(1), (2), dan (3) benar' : qType === 'sebab_akibat' ? 'Pernyataan BENAR, alasan BENAR, dan berhubungan' : 'Opsi A'),
      option_b: qOptB || (qType === 'kompleks' ? '(1) dan (3) benar' : qType === 'sebab_akibat' ? 'Pernyataan BENAR, alasan BENAR, tidak berhubungan' : 'Opsi B'),
      option_c: qOptC || (qType === 'kompleks' ? '(2) dan (4) benar' : qType === 'sebab_akibat' ? 'Pernyataan BENAR dan alasan SALAH' : 'Opsi C'),
      option_d: qOptD || (qType === 'kompleks' ? 'Hanya (4) yang benar' : qType === 'sebab_akibat' ? 'Pernyataan SALAH dan alasan BENAR' : 'Opsi D'),
      option_e: qOptE || (qType === 'kompleks' ? 'Semua pernyataan benar' : qType === 'sebab_akibat' ? 'Pernyataan dan alasan, KEDUANYA SALAH' : 'Opsi E'),
      correct_answer: qCorrect,
      explanation: qExplanation || 'Pembahasan HOTS sosiologi berdasarkan fakta dan teori.',
      topic: qTopic || 'Umum Sosiologi',
      difficulty: qDifficulty,
    };

    try {
      if (targetExam) {
        const updatedQuestions = [...targetExam.questions, newQuestionObj];
        const updatedExam = { ...targetExam, questions: updatedQuestions, total_questions: updatedQuestions.length };
        await saveDocument('exams', selectedExamId, updatedExam);
      }
      onAddQuestion(selectedExamId, newQuestionObj);

      setQText('');
      setQPernyataan('');
      setQAlasan('');
      setQStmt1('');
      setQStmt2('');
      setQStmt3('');
      setQStmt4('');
      setQOptA('');
      setQOptB('');
      setQOptC('');
      setQOptD('');
      setQOptE('');
      setQExplanation('');
      showNotification(`Soal Sosiologi (${qType.toUpperCase()}) berhasil tersimpan ke Firebase!`);
    } catch (err) {
      showErrorNotification('Gagal menyimpan soal ke Firebase.');
    } finally {
      setIsUploading(false);
    }
  };

  // Announcement Handler
  const handleAddAnnouncementSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!annTitle || !annContent) return;

    setIsUploading(true);
    const newAnnObj: Announcement = {
      id: `ann_${Date.now()}`,
      title: annTitle,
      category: annCategory,
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      author: annAuthor || 'Admin LMS',
      content: annContent,
    };

    try {
      await saveDocument('announcements', newAnnObj.id, newAnnObj);
      onAddAnnouncement(newAnnObj);
      setAnnTitle('');
      setAnnContent('');
      showNotification(`Pengumuman "${newAnnObj.title}" berhasil diterbitkan ke Firebase & LMS Siswa!`);
    } catch (err) {
      showErrorNotification('Gagal menyimpan pengumuman ke Firebase.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Admin Banner Header */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center space-x-2 bg-purple-500/20 px-3 py-1 rounded-full text-xs font-semibold text-purple-200 border border-purple-400/30 mb-2">
              <Shield className="w-3.5 h-3.5 text-purple-300" />
              <span>Sistem Manajemen LMS Real-Time Firebase (Firestore & Storage)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold">Control Panel & CMS Admin</h1>
            <p className="text-purple-100 text-xs sm:text-sm mt-1 max-w-2xl">
              Pusat pengunggahan dan pengelolaan seluruh data: Modul & Dokumen (PDF/Word/PPT), Bank Soal CSV/JSON, Data Siswa Massal, dan Pengumuman.
            </p>
          </div>

          <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/15">
            <Activity className="w-6 h-6 text-blue-600 animate-pulse" />
            <div>
              <p className="text-xs text-purple-200">Status Database Firebase</p>
              <p className="text-sm font-bold text-blue-500">Firestore & Storage Online</p>
            </div>
          </div>
        </div>
      </div>

      {/* QUICK ACTIONS PANEL (AKSI CEPAT ADMIN) */}
      <div className="bg-white rounded-3xl p-5 border border-purple-100 shadow-sm border border-slate-200 space-y-3">
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-2">
          <button onClick={() => setAdminTab('courses')} className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${adminTab === 'courses' ? 'bg-indigo-600 text-white shadow-sm border border-slate-200' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'}`}>
            <BookOpen className="w-4 h-4" />
            <span>Input Modul & Dokumen ({courses.length})</span>
          </button>
          <button onClick={() => setAdminTab('exams')} className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${adminTab === 'exams' ? 'bg-amber-600 text-white shadow-sm border border-slate-200' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'}`}>
            <Award className="w-4 h-4" />
            <span>Input Tryout TKA & Soal ({exams.length})</span>
          </button>
          <button onClick={() => setAdminTab('users')} className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${adminTab === 'users' ? 'bg-purple-600 text-white shadow-sm border border-slate-200' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'}`}>
            <Users className="w-4 h-4" />
            <span>Kelola User & Role ({usersList.length})</span>
          </button>
          <button onClick={() => setAdminTab('announcements')} className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${adminTab === 'announcements' ? 'bg-blue-600 text-white shadow-sm border border-slate-200' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'}`}>
            <Bell className="w-4 h-4" />
            <span>Pengumuman LMS ({announcements.length})</span>
          </button>
        </div>
      </div>

      {adminTab === 'courses' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-5">
            <h2 className="text-sm font-bold text-slate-800">Form Input Modul & Dokumen</h2>
            <form onSubmit={handleAddCourseSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Target Pilar</label>
                <select value={courseTargetPillar} onChange={(e) => setCourseTargetPillar(e.target.value as any)} className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500">
                  <option value="kelas">Materi Kelas (10-12)</option>
                  <option value="tka">Materi TKA Sosiologi</option>
                </select>
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Judul Modul</label>
                <input required type="text" value={courseTitle} onChange={(e) => setCourseTitle(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Kelas</label>
                  <select value={courseGrade} onChange={(e) => setCourseGrade(Number(e.target.value) as any)} className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500">
                    <option value={10}>Kelas 10</option><option value={11}>Kelas 11</option><option value={12}>Kelas 12</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Bab</label>
                  <input type="number" value={courseChapterNum} onChange={(e) => setCourseChapterNum(Number(e.target.value))} className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500" />
                </div>
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Deskripsi</label>
                <textarea required value={courseDesc} onChange={(e) => setCourseDesc(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Judul Video / Sub-Materi</label>
                <input required type="text" value={lessonTitle} onChange={(e) => setLessonTitle(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">File Dokumen (Opsional)</label>
                <input type="file" onChange={(e) => setSelectedDocumentFile(e.target.files?.[0] || null)} className="w-full text-xs" />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">YouTube Video ID</label>
                <input type="text" value={lessonVideoUrl} onChange={(e) => setLessonVideoUrl(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Teks Materi</label>
                <textarea value={lessonTextBody} onChange={(e) => setLessonTextBody(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Poin Kunci (pisahkan dengan baris baru)</label>
                <textarea value={lessonKeyPoints} onChange={(e) => setLessonKeyPoints(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500" />
              </div>
              <button type="submit" disabled={isUploading} className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-sm">Simpan Modul</button>
            </form>
          </div>
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-base font-bold text-slate-800">Daftar Modul Pembelajaran ({courses.length})</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {courses.map(course => (
                <div key={course.id} className="p-4 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-2 hover:border-indigo-200 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-bold bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">{course.category} • KLS {course.grade_level}</span>
                      <h3 className="font-bold text-sm mt-2 text-slate-800">{course.title}</h3>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">{course.description}</p>
                    </div>
                    <div className="flex space-x-1">
                      <button onClick={() => setEditingCourse(course)} className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg"><Edit3 className="w-4 h-4" /></button>
                      <button onClick={() => onDeleteCourse(course.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {adminTab === 'exams' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-5">
            <h2 className="text-sm font-bold text-slate-800">Form Input Paket Tryout</h2>
            <form onSubmit={handleAddExamSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Judul Paket Ujian</label>
                <input required type="text" value={examTitle} onChange={(e) => setExamTitle(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Kategori</label>
                  <select value={examCategory} onChange={(e) => setExamCategory(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500">
                    <option value="Tryout TKA">Tryout TKA</option>
                    <option value="Ujian Akhir">Ujian Akhir</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Kelas</label>
                  <select value={examGrade} onChange={(e) => setExamGrade(Number(e.target.value))} className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500">
                    <option value={10}>10</option><option value={11}>11</option><option value={12}>12</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Durasi (Menit)</label>
                  <input required type="number" value={examDuration} onChange={(e) => setExamDuration(Number(e.target.value))} className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500" />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Passing Score</label>
                  <input required type="number" value={examPassingScore} onChange={(e) => setExamPassingScore(Number(e.target.value))} className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500" />
                </div>
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Deskripsi</label>
                <textarea required value={examDesc} onChange={(e) => setExamDesc(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500" />
              </div>
              <button type="submit" disabled={isUploading} className="w-full py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl transition-all shadow-sm">Simpan Paket Ujian</button>
            </form>
            
            <div className="border-t border-slate-200 pt-5 mt-5">
              <h2 className="text-sm font-bold text-slate-800 mb-3">Tambah Butir Soal</h2>
              <form onSubmit={handleAddQuestionSubmit} className="space-y-4 text-xs">
                 <div>
                   <label className="block font-bold text-slate-700 mb-1">Pilih Paket Ujian</label>
                   <select required value={selectedExamId} onChange={(e) => setSelectedExamId(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500">
                     <option value="">-- Pilih Paket --</option>
                     {exams.map(ex => <option key={ex.id} value={ex.id}>{ex.title}</option>)}
                   </select>
                 </div>
                 <div>
                   <label className="block font-bold text-slate-700 mb-1">Teks Pertanyaan</label>
                   <textarea required value={qText} onChange={(e) => setQText(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500" />
                 </div>
                 <div className="grid grid-cols-2 gap-2">
                   <div>
                     <label className="block font-bold text-slate-700 mb-1">Tipe Soal</label>
                     <select value={qType} onChange={(e) => setQType(e.target.value as any)} className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500">
                       <option value="pilihan_ganda">Pilihan Ganda</option>
                       <option value="sebab_akibat">Sebab Akibat</option>
                       <option value="kompleks">Kompleks</option>
                     </select>
                   </div>
                   <div>
                     <label className="block font-bold text-slate-700 mb-1">Jawaban Benar</label>
                     <select value={qCorrect} onChange={(e) => setQCorrect(e.target.value as any)} className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500">
                       <option value="A">A</option><option value="B">B</option><option value="C">C</option><option value="D">D</option><option value="E">E</option>
                     </select>
                   </div>
                 </div>
                 <button type="submit" disabled={isUploading} className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all shadow-sm">Simpan Soal</button>
              </form>
            </div>
          </div>
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-base font-bold text-slate-800">Daftar Paket Ujian ({exams.length})</h2>
            <div className="grid grid-cols-1 gap-4">
              {exams.map(exam => (
                <div key={exam.id} className="p-4 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-amber-200 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-bold bg-amber-100 text-amber-700 px-2 py-1 rounded-full">{exam.category} • {exam.duration_minutes} Menit</span>
                      <h3 className="font-bold text-sm mt-2 text-slate-800">{exam.title} ({exam.questions?.length || 0} Soal)</h3>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-1">{exam.description}</p>
                    </div>
                    <div className="flex space-x-1">
                      <button onClick={() => onDeleteExam(exam.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {adminTab === 'users' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center pb-4 border-b border-slate-100">
            <div className="flex flex-col">
              <h2 className="text-base font-bold text-slate-800">Data Seluruh Pengguna Sistem Firebase</h2>
              <span className="text-xs text-slate-500">Ubah role instan & tersimpan di Cloud</span>
            </div>
          </div>
          
          <div className="w-full flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-hide">
            <label className="text-[11px] font-bold text-slate-600 shrink-0">Filter Rombel:</label>
            {uniqueRombels.map(rombel => (
              <button
                key={rombel}
                onClick={() => setFilterRombel(rombel)}
                className={`px-3 py-1.5 rounded-full text-[10px] font-extrabold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  filterRombel === rombel
                    ? 'bg-purple-600 text-white shadow-sm border border-purple-600'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {rombel}
              </button>
            ))}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-bold uppercase text-[11px]">
                <tr>
                  <th className="p-3">Pengguna</th>
                  <th className="p-3">Kelas / Rombel</th>
                  <th className="p-3">Role Saat Ini</th>
                  <th className="p-3">XP Points</th>
                  <th className="p-3 text-right">Aksi Role Access</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {displayedUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50">
                    <td className="p-3">
                      <div className="font-bold text-slate-800">{u.name}</div>
                      <div className="text-[10px] text-slate-500">{u.email} • {u.schoolName || u.school}</div>
                    </td>
                    <td className="p-3">
                      <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] border ${getRombelBadgeColor(String(u.kelas || u.grade || ''))}`}>
                        {u.kelas || u.grade || '-'}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold capitalize ${
                        u.role === 'siswa' ? 'bg-indigo-100 text-indigo-800' : u.role === 'guru' ? 'bg-emerald-100 text-emerald-800' : 'bg-purple-100 text-purple-800'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="p-3 font-extrabold text-amber-600">{u.total_xp || u.xp || 500} XP</td>
                    <td className="p-3 text-right space-x-1">
                      <button onClick={() => handleToggleUserRole(u.id, 'siswa')} className={`px-2 py-1 rounded-lg text-[10px] font-bold ${u.role === 'siswa' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>Siswa</button>
                      <button onClick={() => handleToggleUserRole(u.id, 'guru')} className={`px-2 py-1 rounded-lg text-[10px] font-bold ${u.role === 'guru' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>Guru</button>
                      <button onClick={() => handleToggleUserRole(u.id, 'admin')} className={`px-2 py-1 rounded-lg text-[10px] font-bold ${u.role === 'admin' ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>Admin</button>
                      <button onClick={() => setEditingUser(u)} className="px-2 py-1 rounded-lg text-[10px] font-bold bg-amber-100 text-amber-800 mr-1">Edit</button>
                      <button onClick={() => handleDeleteUser(u.id)} className="p-1 text-red-500 hover:bg-red-50 rounded ml-1"><Trash2 className="w-3.5 h-3.5" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {hasMoreUsers && onLoadMoreUsers && (
            <div className="pt-4 border-t border-slate-100 flex justify-center">
              <button
                onClick={onLoadMoreUsers}
                disabled={loadingMoreUsers}
                className="px-5 py-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-extrabold text-xs flex items-center space-x-2 transition-all cursor-pointer border border-indigo-200"
              >
                {loadingMoreUsers ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
                    <span>Memuat Data Selanjutnya dari Firestore...</span>
                  </>
                ) : (
                  <span>📥 Muat Lebih Banyak Pengguna (Paginated Load More)</span>
                )}
              </button>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: PENGUMUMAN LMS */}
      {adminTab === 'announcements' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Input Pengumuman */}
          <div className="lg:col-span-1 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
              <Plus className="w-5 h-5 text-emerald-600" />
              <h2 className="text-base font-bold text-slate-800">Terbitkan Pengumuman</h2>
            </div>

            <form onSubmit={handleAddAnnouncementSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Judul Pengumuman *</label>
                <input
                  type="text"
                  required
                  placeholder="Misal: Jadwal Simulasi TKA Sosiologi"
                  value={annTitle}
                  onChange={(e) => setAnnTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Kategori Pengumuman</label>
                <select
                  value={annCategory}
                  onChange={(e) => setAnnCategory(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold"
                >
                  <option value="Penting">Penting</option>
                  <option value="Jadwal Ujian">Jadwal Ujian</option>
                  <option value="Informasi">Informasi</option>
                  <option value="Pembaruan Materi">Pembaruan Materi</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Penulis / Sumber</label>
                <input
                  type="text"
                  value={annAuthor}
                  onChange={(e) => setAnnAuthor(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Isi Pengumuman *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tuliskan pengumuman resmi..."
                  value={annContent}
                  onChange={(e) => setAnnContent(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isUploading}
                className="w-full bg-blue-600 hover:bg-emerald-700 text-white font-extrabold py-2.5 rounded-xl text-xs transition-all cursor-pointer shadow-sm border border-slate-200 disabled:opacity-50"
              >
                + Terbitkan Pengumuman ke Firebase
              </button>
            </form>
          </div>

          {/* List Pengumuman */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-base font-bold text-slate-800">Daftar Pengumuman Aktif di Dashboard Siswa</h2>
            <div className="space-y-3">
              {announcements.map((ann) => (
                <div key={ann.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                        {ann.category} • {ann.date}
                      </span>
                      <h3 className="text-sm font-extrabold text-slate-800 mt-1">{ann.title}</h3>
                      <p className="text-xs text-slate-600 mt-1">{ann.content}</p>
                      <p className="text-[10px] text-slate-400 mt-2 font-medium">Oleh: {ann.author}</p>
                    </div>

                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => setEditingAnnouncement(ann)}
                        className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                        title="Edit Pengumuman"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDeleteAnnouncement(ann.id)}
                        className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        title="Hapus Pengumuman dari Firebase"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ==================== EDIT & MOVE MODALS OVERLAY ==================== */}

      {/* 1. EDIT COURSE MODAL */}
      {editingCourse && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <Edit3 className="w-5 h-5 text-indigo-600" />
                <h3 className="font-extrabold text-slate-800 text-base">Edit & Atur Modul Sosiologi</h3>
              </div>
              <button
                onClick={() => setEditingCourse(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEditedCourse} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Judul Modul Pembelajaran *</label>
                <input
                  type="text"
                  required
                  value={editingCourse.title}
                  onChange={(e) => setEditingCourse({ ...editingCourse, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Deskripsi Ringkas *</label>
                <textarea
                  required
                  rows={3}
                  value={editingCourse.description}
                  onChange={(e) => setEditingCourse({ ...editingCourse, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tingkat Kelas</label>
                  <select
                    value={editingCourse.grade_level}
                    onChange={(e) => setEditingCourse({ ...editingCourse, grade_level: Number(e.target.value) as any })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold"
                  >
                    <option value={10}>Kelas 10 SMA</option>
                    <option value={11}>Kelas 11 SMA</option>
                    <option value={12}>Kelas 12 SMA</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Kategori Utama</label>
                  <select
                    value={editingCourse.category}
                    onChange={(e) => setEditingCourse({ ...editingCourse, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold"
                  >
                    <option value="Konsep Utama">Konsep Utama</option>
                    <option value="Teori Tokoh">Teori Tokoh</option>
                    <option value="Sosiologi Terapan">Sosiologi Terapan</option>
                    <option value="Kearifan Lokal">Kearifan Lokal</option>
                    <option value="Tryout TKA">Tryout TKA</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingCourse(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isUploading}
                  className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-extrabold flex items-center space-x-1 cursor-pointer hover:bg-indigo-700"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan Perubahan</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. EDIT & MOVE LESSON MODAL */}
      {editingLesson && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <ArrowRightLeft className="w-5 h-5 text-purple-600" />
                <h3 className="font-extrabold text-slate-800 text-base">Edit & Pindahkan Sub-Materi / Lesson</h3>
              </div>
              <button
                onClick={() => setEditingLesson(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEditedLesson} className="space-y-3 text-xs">
              {/* TARGET MODULE MOVE SELECTOR */}
              <div className="bg-purple-50 p-3.5 rounded-2xl border border-purple-200 space-y-1.5">
                <label className="block font-extrabold text-purple-900 flex items-center space-x-1">
                  <Move className="w-4 h-4 text-purple-700" />
                  <span>Pindahkan Sub-Materi ke Bab / Modul Lain:</span>
                </label>
                <select
                  value={targetCourseIdForMove}
                  onChange={(e) => setTargetCourseIdForMove(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-purple-300 bg-white font-bold text-slate-800"
                >
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>
                      Kelas {c.grade_level} SMA — {c.title}
                    </option>
                  ))}
                </select>
                <p className="text-[10px] text-purple-700">
                  Memilih modul berbeda akan memindahkan materi ini dari bab asal ke bab tujuan secara langsung di Firestore.
                </p>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Judul Sub-Materi *</label>
                <input
                  type="text"
                  required
                  value={editingLesson.lesson.title}
                  onChange={(e) =>
                    setEditingLesson({
                      ...editingLesson,
                      lesson: { ...editingLesson.lesson, title: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Ringkasan Teks & Rangkuman *</label>
                <textarea
                  required
                  rows={4}
                  value={editingLesson.lesson.text_body}
                  onChange={(e) =>
                    setEditingLesson({
                      ...editingLesson,
                      lesson: { ...editingLesson.lesson, text_body: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">YouTube Video ID / URL</label>
                <input
                  type="text"
                  placeholder="2Vv-BfVoq4g"
                  value={editingLesson.lesson.video_url || ''}
                  onChange={(e) =>
                    setEditingLesson({
                      ...editingLesson,
                      lesson: { ...editingLesson.lesson, video_url: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Reward Socio-Points (XP)</label>
                <input
                  type="number"
                  value={editingLesson.lesson.xp_reward || 100}
                  onChange={(e) =>
                    setEditingLesson({
                      ...editingLesson,
                      lesson: { ...editingLesson.lesson, xp_reward: Number(e.target.value) },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingLesson(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isUploading}
                  className="px-4 py-2 rounded-xl bg-purple-600 text-white font-extrabold flex items-center space-x-1 cursor-pointer hover:bg-purple-700"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan & Pindahkan</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. EDIT EXAM MODAL */}
      {editingExam && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <Edit3 className="w-5 h-5 text-amber-600" />
                <h3 className="font-extrabold text-slate-800 text-base">Edit Paket Tryout / Ujian</h3>
              </div>
              <button
                onClick={() => setEditingExam(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEditedExam} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Judul Paket Ujian *</label>
                <input
                  type="text"
                  required
                  value={editingExam.title}
                  onChange={(e) => setEditingExam({ ...editingExam, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Kategori Ujian</label>
                  <select
                    value={editingExam.category}
                    onChange={(e) => setEditingExam({ ...editingExam, category: e.target.value })}
                    className="w-full px-2 py-2 rounded-xl border border-slate-300 font-bold"
                  >
                    <option value="Tryout TKA">Tryout TKA</option>
                    <option value="Latihan Bab">Latihan Bab</option>
                    <option value="Ujian Sekolah">Ujian Sekolah</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Durasi (Menit)</label>
                  <input
                    type="number"
                    value={editingExam.duration_minutes}
                    onChange={(e) => setEditingExam({ ...editingExam, duration_minutes: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Passing Grade</label>
                  <input
                    type="number"
                    value={editingExam.passing_score}
                    onChange={(e) => setEditingExam({ ...editingExam, passing_score: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Deskripsi Paket Ujian</label>
                <textarea
                  rows={3}
                  value={editingExam.description || ''}
                  onChange={(e) => setEditingExam({ ...editingExam, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingExam(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isUploading}
                  className="px-4 py-2 rounded-xl bg-amber-600 text-white font-extrabold flex items-center space-x-1 cursor-pointer hover:bg-amber-700"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan Paket Ujian</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. EDIT & MOVE QUESTION MODAL */}
      {editingQuestion && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <ArrowRightLeft className="w-5 h-5 text-indigo-600" />
                <h3 className="font-extrabold text-slate-800 text-base">Edit & Pindahkan Butir Soal</h3>
              </div>
              <button
                onClick={() => setEditingQuestion(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEditedQuestion} className="space-y-3 text-xs">
              {/* TARGET EXAM MOVE SELECTOR */}
              <div className="bg-indigo-50 p-3.5 rounded-2xl border border-indigo-200 space-y-1.5">
                <label className="block font-extrabold text-indigo-900 flex items-center space-x-1">
                  <Move className="w-4 h-4 text-indigo-700" />
                  <span>Pindahkan Soal ke Paket Ujian Lain:</span>
                </label>
                <select
                  value={targetExamIdForMove}
                  onChange={(e) => setTargetExamIdForMove(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-indigo-300 bg-white font-bold text-slate-800"
                >
                  {exams.map((ex) => (
                    <option key={ex.id} value={ex.id}>
                      {ex.title} ({ex.category})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Teks / Narasi Soal Sosiologi *</label>
                <textarea
                  required
                  rows={3}
                  value={editingQuestion.question.text}
                  onChange={(e) =>
                    setEditingQuestion({
                      ...editingQuestion,
                      question: { ...editingQuestion.question, text: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Opsi A</label>
                  <input
                    type="text"
                    value={editingQuestion.question.option_a || ''}
                    onChange={(e) =>
                      setEditingQuestion({
                        ...editingQuestion,
                        question: { ...editingQuestion.question, option_a: e.target.value },
                      })
                    }
                    className="w-full px-2 py-1.5 rounded-lg border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Opsi B</label>
                  <input
                    type="text"
                    value={editingQuestion.question.option_b || ''}
                    onChange={(e) =>
                      setEditingQuestion({
                        ...editingQuestion,
                        question: { ...editingQuestion.question, option_b: e.target.value },
                      })
                    }
                    className="w-full px-2 py-1.5 rounded-lg border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Opsi C</label>
                  <input
                    type="text"
                    value={editingQuestion.question.option_c || ''}
                    onChange={(e) =>
                      setEditingQuestion({
                        ...editingQuestion,
                        question: { ...editingQuestion.question, option_c: e.target.value },
                      })
                    }
                    className="w-full px-2 py-1.5 rounded-lg border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Opsi D</label>
                  <input
                    type="text"
                    value={editingQuestion.question.option_d || ''}
                    onChange={(e) =>
                      setEditingQuestion({
                        ...editingQuestion,
                        question: { ...editingQuestion.question, option_d: e.target.value },
                      })
                    }
                    className="w-full px-2 py-1.5 rounded-lg border border-slate-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Kunci Jawaban Benar</label>
                  <select
                    value={editingQuestion.question.correct_answer}
                    onChange={(e) =>
                      setEditingQuestion({
                        ...editingQuestion,
                        question: { ...editingQuestion.question, correct_answer: e.target.value as any },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold text-emerald-700"
                  >
                    <option value="A">Opsi A</option>
                    <option value="B">Opsi B</option>
                    <option value="C">Opsi C</option>
                    <option value="D">Opsi D</option>
                    <option value="E">Opsi E</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Topik Pembahasan</label>
                  <input
                    type="text"
                    value={editingQuestion.question.topic || ''}
                    onChange={(e) =>
                      setEditingQuestion({
                        ...editingQuestion,
                        question: { ...editingQuestion.question, topic: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Pembahasan HOTS</label>
                <textarea
                  rows={2}
                  value={editingQuestion.question.explanation || ''}
                  onChange={(e) =>
                    setEditingQuestion({
                      ...editingQuestion,
                      question: { ...editingQuestion.question, explanation: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingQuestion(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isUploading}
                  className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-extrabold flex items-center space-x-1 cursor-pointer hover:bg-indigo-700"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan & Pindahkan</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. EDIT USER MODAL */}
      {editingUser && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <Edit3 className="w-5 h-5 text-purple-600" />
                <h3 className="font-extrabold text-slate-800 text-base">Edit Pengguna LMS</h3>
              </div>
              <button
                onClick={() => setEditingUser(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEditedUser} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nama Lengkap *</label>
                <input
                  type="text"
                  required
                  value={editingUser.name}
                  onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Email *</label>
                <input
                  type="email"
                  required
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Peran (Role)</label>
                  <select
                    value={editingUser.role}
                    onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value as Role })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold"
                  >
                    <option value="siswa">Siswa</option>
                    <option value="guru">Guru</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Kelas</label>
                  <select
                    value={editingUser.grade || 12}
                    onChange={(e) => setEditingUser({ ...editingUser, grade: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  >
                    <option value={10}>Kelas 10</option>
                    <option value={11}>Kelas 11</option>
                    <option value={12}>Kelas 12</option>
                    <option value={0}>Guru/Admin</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Nama Sekolah / Instansi</label>
                <input
                  type="text"
                  value={editingUser.schoolName || editingUser.school || ''}
                  onChange={(e) => setEditingUser({ ...editingUser, schoolName: e.target.value, school: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isUploading}
                  className="px-4 py-2 rounded-xl bg-purple-600 text-white font-extrabold flex items-center space-x-1 cursor-pointer hover:bg-purple-700"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan Pengguna</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. EDIT ANNOUNCEMENT MODAL */}
      {editingAnnouncement && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <Edit3 className="w-5 h-5 text-emerald-600" />
                <h3 className="font-extrabold text-slate-800 text-base">Edit Pengumuman LMS</h3>
              </div>
              <button
                onClick={() => setEditingAnnouncement(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEditedAnnouncement} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Judul Pengumuman *</label>
                <input
                  type="text"
                  required
                  value={editingAnnouncement.title}
                  onChange={(e) => setEditingAnnouncement({ ...editingAnnouncement, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Kategori</label>
                <select
                  value={editingAnnouncement.category}
                  onChange={(e) => setEditingAnnouncement({ ...editingAnnouncement, category: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold"
                >
                  <option value="Penting">Penting</option>
                  <option value="Jadwal Ujian">Jadwal Ujian</option>
                  <option value="Informasi">Informasi</option>
                  <option value="Pembaruan Materi">Pembaruan Materi</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Penulis</label>
                <input
                  type="text"
                  value={editingAnnouncement.author}
                  onChange={(e) => setEditingAnnouncement({ ...editingAnnouncement, author: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Isi Pengumuman *</label>
                <textarea
                  required
                  rows={4}
                  value={editingAnnouncement.content}
                  onChange={(e) => setEditingAnnouncement({ ...editingAnnouncement, content: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingAnnouncement(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isUploading}
                  className="px-4 py-2 rounded-xl bg-blue-600 text-white font-extrabold flex items-center space-x-1 cursor-pointer hover:bg-emerald-700"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan Pengumuman</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
