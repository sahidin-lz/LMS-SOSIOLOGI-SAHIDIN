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
}) => {
  const [adminTab, setAdminTab] = useState<'users' | 'courses' | 'exams' | 'announcements'>('courses');
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
            schoolName: 'SMA Negeri Sosiologi',
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
      schoolName: newUserSchool || 'SMA Sosiologi Indonesia',
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
            <Activity className="w-6 h-6 text-emerald-400 animate-pulse" />
            <div>
              <p className="text-xs text-purple-200">Status Database Firebase</p>
              <p className="text-sm font-bold text-emerald-300">Firestore & Storage Online</p>
            </div>
          </div>
        </div>
      </div>

      {/* QUICK ACTIONS PANEL (AKSI CEPAT ADMIN) */}
      <div className="bg-white rounded-3xl p-5 border border-purple-100 shadow-md space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-amber-500" />
            <h2 className="text-sm font-extrabold text-slate-800">Aksi Cepat Admin (Quick Uploads ke Firebase)</h2>
          </div>
          <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
            Direct Cloud Persistence
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Action 1: Upload Dokumen/Modul */}
          <button
            onClick={() => {
              setAdminTab('courses');
              setCourseInputMode('form');
            }}
            className="flex items-center space-x-3 p-3.5 bg-indigo-50 hover:bg-indigo-100/80 border border-indigo-200 rounded-2xl transition-all cursor-pointer text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-indigo-900">Upload Dokumen/Modul</h3>
              <p className="text-[10px] text-indigo-700">Unggah PDF, Word, PPT, Excel ke Cloud</p>
            </div>
          </button>

          {/* Action 2: Upload Bank Soal CSV */}
          <button
            onClick={() => {
              setAdminTab('exams');
              setExamInputMode('template');
            }}
            className="flex items-center space-x-3 p-3.5 bg-amber-50 hover:bg-amber-100/80 border border-amber-200 rounded-2xl transition-all cursor-pointer text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-amber-900">Upload Bank Soal (CSV)</h3>
              <p className="text-[10px] text-amber-700">Impor Paket Tryout & Soal HOTS</p>
            </div>
          </button>

          {/* Action 3: Upload Data Siswa Massal */}
          <button
            onClick={() => {
              setAdminTab('users');
              setUserMode('csv');
            }}
            className="flex items-center space-x-3 p-3.5 bg-purple-50 hover:bg-purple-100/80 border border-purple-200 rounded-2xl transition-all cursor-pointer text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-purple-900">Upload Data Siswa (Massal)</h3>
              <p className="text-[10px] text-purple-700">Impor Roster Siswa via CSV / Excel</p>
            </div>
          </button>
        </div>
      </div>

      {/* Uploading Loading Banner */}
      {isUploading && (
        <div className="bg-indigo-900 text-white px-5 py-3.5 rounded-2xl flex items-center justify-between shadow-xl animate-pulse">
          <div className="flex items-center space-x-3">
            <Loader2 className="w-5 h-5 animate-spin text-indigo-300" />
            <div>
              <p className="text-xs font-bold">Proses Unggah & Sinkronisasi Firestore / Storage Sedang Berjalan...</p>
              {uploadProgress > 0 && (
                <p className="text-[10px] text-indigo-200">Progress upload file: {uploadProgress}%</p>
              )}
            </div>
          </div>
          <div className="w-32 bg-indigo-950 rounded-full h-2 overflow-hidden border border-indigo-700">
            <div 
              className="bg-emerald-400 h-full transition-all duration-300" 
              style={{ width: `${uploadProgress > 0 ? uploadProgress : 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Success Notification Alert */}
      {successMsg && (
        <div className="bg-emerald-900/90 border border-emerald-500 text-emerald-100 px-4 py-3 rounded-2xl flex items-center justify-between shadow-lg text-xs font-bold">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-emerald-300" />
            <span>{successMsg}</span>
          </div>
          <span className="text-[10px] bg-emerald-800 px-2 py-0.5 rounded-md">Firebase Synced</span>
        </div>
      )}

      {/* Error Notification Alert */}
      {errorMsg && (
        <div className="bg-red-900/90 border border-red-500 text-red-100 px-4 py-3 rounded-2xl flex items-center justify-between shadow-lg text-xs font-bold">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-red-300" />
            <span>{errorMsg}</span>
          </div>
          <span className="text-[10px] bg-red-800 px-2 py-0.5 rounded-md">Error</span>
        </div>
      )}

      {/* Metrics Counter Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-medium text-slate-500">Materi / Modul</p>
            <p className="text-lg font-extrabold text-slate-800">{courses.length} Modul</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-medium text-slate-500">Paket Tryout TKA</p>
            <p className="text-lg font-extrabold text-slate-800">{exams.length} Ujian</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-medium text-slate-500">Total Pengguna</p>
            <p className="text-lg font-extrabold text-slate-800">{usersList.length} User</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-medium text-slate-500">Pengumuman</p>
            <p className="text-lg font-extrabold text-slate-800">{announcements.length} Berita</p>
          </div>
        </div>
      </div>

      {/* Main Admin Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setAdminTab('courses')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
            adminTab === 'courses'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Input Modul & Dokumen ({courses.length})</span>
        </button>

        <button
          onClick={() => setAdminTab('exams')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
            adminTab === 'exams'
              ? 'bg-amber-600 text-white shadow-md'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Input Tryout TKA & Soal ({exams.length})</span>
        </button>

        <button
          onClick={() => setAdminTab('users')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
            adminTab === 'users'
              ? 'bg-purple-600 text-white shadow-md'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Kelola User & Role ({usersList.length})</span>
        </button>

        <button
          onClick={() => setAdminTab('announcements')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
            adminTab === 'announcements'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Bell className="w-4 h-4" />
          <span>Pengumuman LMS ({announcements.length})</span>
        </button>
      </div>

      {/* TAB 1: INPUT MODUL & DOKUMEN PEMBELAJARAN (BERLAKU KELAS & TKA) */}
      {adminTab === 'courses' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Input Modul & Template Bulk */}
          <div className="lg:col-span-1 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-5">
            {/* Mode Switcher */}
            <div className="flex bg-slate-100 p-1 rounded-2xl text-xs font-bold">
              <button
                type="button"
                onClick={() => setCourseInputMode('form')}
                className={`flex-1 py-2 rounded-xl transition-all cursor-pointer ${
                  courseInputMode === 'form' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                📝 Form Input Manual
              </button>
              <button
                type="button"
                onClick={() => setCourseInputMode('template')}
                className={`flex-1 py-2 rounded-xl transition-all cursor-pointer ${
                  courseInputMode === 'template' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                📄 Upload Template CSV
              </button>
            </div>

            {courseInputMode === 'form' ? (
              <div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                  <div className="flex items-center space-x-2">
                    <Plus className="w-5 h-5 text-indigo-600" />
                    <h2 className="text-sm font-bold text-slate-800">Form Input Modul & Document Upload</h2>
                  </div>
                </div>

                <form onSubmit={handleAddCourseSubmit} className="space-y-3.5 text-xs">
                  {/* Pillar Selector: Kelas vs TKA */}
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Target Pilar Materi *</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setCourseTargetPillar('kelas')}
                        className={`py-2 px-3 rounded-xl border text-center font-bold transition-all cursor-pointer ${
                          courseTargetPillar === 'kelas'
                            ? 'bg-indigo-50 border-indigo-500 text-indigo-700 ring-2 ring-indigo-200'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        📚 Materi Kelas (10-12)
                      </button>
                      <button
                        type="button"
                        onClick={() => setCourseTargetPillar('tka')}
                        className={`py-2 px-3 rounded-xl border text-center font-bold transition-all cursor-pointer ${
                          courseTargetPillar === 'tka'
                            ? 'bg-amber-50 border-amber-500 text-amber-800 ring-2 ring-amber-200'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        🎯 Materi TKA Sosiologi
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Judul Modul Sosiologi *</label>
                    <input
                      type="text"
                      required
                      placeholder={courseTargetPillar === 'tka' ? "Misal: Modul HOTS TKA Sosiologi - Teori Konflik Modern" : "Misal: Sosiologi Perubahan Sosial & Globalisasi"}
                      value={courseTitle}
                      onChange={(e) => setCourseTitle(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        {courseTargetPillar === 'tka' ? 'Kategori Pilar' : 'Tingkat Kelas'}
                      </label>
                      {courseTargetPillar === 'tka' ? (
                        <input
                          type="text"
                          disabled
                          value="TKA Sosiologi (UTBK)"
                          className="w-full px-3 py-2 rounded-xl border border-amber-300 bg-amber-50 font-bold text-amber-900"
                        />
                      ) : (
                        <select
                          value={courseGrade}
                          onChange={(e) => setCourseGrade(Number(e.target.value) as any)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        >
                          <option value={10}>Kelas 10 SMA</option>
                          <option value={11}>Kelas 11 SMA</option>
                          <option value={12}>Kelas 12 SMA</option>
                        </select>
                      )}
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Nomor Bab</label>
                      <input
                        type="number"
                        value={courseChapterNum}
                        onChange={(e) => setCourseChapterNum(Number(e.target.value))}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Judul Sub-Materi / Video Lesson *</label>
                    <input
                      type="text"
                      required
                      placeholder="Misal: Dampak Modernisasi Terhadap Kearifan Lokal"
                      value={lessonTitle}
                      onChange={(e) => setLessonTitle(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>

                  {/* FILE ATTACHMENT TO FIREBASE STORAGE */}
                  <div className="p-3 bg-purple-50/70 rounded-2xl border border-purple-200 space-y-2">
                    <label className="block font-bold text-purple-900 flex items-center space-x-1.5">
                      <Paperclip className="w-4 h-4 text-purple-600" />
                      <span>Upload Dokumen Asli ke Firebase Storage</span>
                    </label>
                    <p className="text-[10px] text-purple-700">
                      Lampirkan file PDF, Word, PPT, Excel, atau Gambar materi pembelajaran asli. File akan langsung diunggah ke Firebase Storage.
                    </p>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.png,.jpg,.jpeg"
                      onChange={(e) => setSelectedDocumentFile(e.target.files?.[0] || null)}
                      className="w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-purple-600 file:text-white hover:file:bg-purple-700 cursor-pointer"
                    />
                    {selectedDocumentFile && (
                      <p className="text-[11px] font-bold text-emerald-700 flex items-center space-x-1">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>File terpilih: {selectedDocumentFile.name} ({(selectedDocumentFile.size / 1024 / 1024).toFixed(2)} MB)</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">YouTube Video ID / URL Embed</label>
                    <input
                      type="text"
                      placeholder="2Vv-BfVoq4g atau ID YouTube"
                      value={lessonVideoUrl}
                      onChange={(e) => setLessonVideoUrl(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Rangkuman / Rincian Teks Materi</label>
                    <textarea
                      rows={3}
                      placeholder="Isi rincian uraian materi sosiologi..."
                      value={lessonTextBody}
                      onChange={(e) => setLessonTextBody(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Poin-poin Kunci (Satu per baris)</label>
                    <textarea
                      rows={2}
                      placeholder="Poin 1&#10;Poin 2"
                      value={lessonKeyPoints}
                      onChange={(e) => setLessonKeyPoints(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isUploading}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold py-2.5 rounded-xl text-xs transition-all cursor-pointer shadow-md flex items-center justify-center space-x-2 disabled:opacity-50"
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Mengunggah ke Firebase Storage...</span>
                      </>
                    ) : (
                      <span>+ Tambahkan Modul & Dokumen ke Firebase</span>
                    )}
                  </button>
                </form>
              </div>
            ) : (
              /* Bulk Upload Template Section */
              <div className="space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <h2 className="text-sm font-bold text-slate-800">Upload Massal Modul ke Firebase</h2>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Upload file CSV/Excel atau tempel teks hasil template data modul (berlaku untuk Materi Kelas 10, 11, 12 dan TKA Sosiologi).
                  </p>
                </div>

                <div className="bg-indigo-50 p-3.5 rounded-2xl border border-indigo-100 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-900">📄 Format Template CSV / Excel</span>
                    <button
                      type="button"
                      onClick={downloadCourseTemplateCSV}
                      className="text-[11px] bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-2.5 py-1 rounded-lg transition-all cursor-pointer"
                    >
                      Unduh Template CSV
                    </button>
                  </div>
                  <p className="text-[10px] text-indigo-700 leading-relaxed">
                    Format Kolom: <code className="bg-indigo-100 px-1 py-0.5 rounded text-indigo-900 font-mono">Judul Modul, Target (Kelas 10/11/12/TKA), Nomor Bab, Judul Sub-Materi, YouTube ID, Ringkasan Materi, Poin Kunci</code>
                  </p>
                </div>

                <form onSubmit={handleBulkUploadCoursesSubmit} className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Tempelkan Teks CSV / JSON Template *</label>
                    <textarea
                      required
                      rows={7}
                      placeholder={`Judul Modul,Target Pilar,Nomor Bab,Judul Sub-Materi,YouTube ID,Ringkasan,Poin Kunci\nSosiologi Konflik,TKA,1,Teori Dahrendorf,2Vv-BfVoq4g,Pembahasan konflik sosial TKA.,Kekuasaan;Wewenang\nPerubahan Sosial,Kelas 12,2,Modernisasi & Kebudayaan,2Vv-BfVoq4g,Materi perubahan sosial.,Westernisasi;Sekularisasi`}
                      value={courseTemplateText}
                      onChange={(e) => setCourseTemplateText(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono text-[11px] focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Atau Pilih File CSV / Text dari Perangkat</label>
                    <input
                      type="file"
                      accept=".csv,.txt,.json"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (evt) => {
                            if (evt.target?.result) {
                              setCourseTemplateText(evt.target.result as string);
                            }
                          };
                          reader.readAsText(file);
                        }
                      }}
                      className="w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200 cursor-pointer"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isUploading}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold py-2.5 rounded-xl text-xs transition-all cursor-pointer shadow-md flex items-center justify-center space-x-2 disabled:opacity-50"
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Proses Simpan ke Firebase...</span>
                      </>
                    ) : (
                      <span>📥 Proses Upload Template Modul ke Firestore</span>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* List Modul Aktif */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-base font-bold text-slate-800">Daftar Modul Pembelajaran Aktif di LMS Firebase</h2>
            <div className="space-y-3">
              {courses.map((c) => (
                <div key={c.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 border border-indigo-200">
                        Kelas {c.grade_level} SMA • BAB {c.lessons[0]?.chapter_number || 1}
                      </span>
                      <h3 className="text-sm font-extrabold text-slate-800 mt-1">{c.title}</h3>
                      <p className="text-xs text-slate-500">{c.description}</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => setEditingCourse(c)}
                        className="px-2.5 py-1 text-xs bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold rounded-lg transition-colors flex items-center space-x-1 cursor-pointer"
                        title="Edit Modul Pembelajaran"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => onDeleteCourse(c.id)}
                        className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        title="Hapus Modul dari Firebase"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="border-t border-slate-100 pt-3 space-y-2">
                    <span className="text-[11px] font-bold text-slate-600">Sub-materi / Lessons ({c.lessons.length}):</span>
                    {c.lessons.map((les) => (
                      <div key={les.id} className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <div className="font-bold text-slate-800 flex items-center space-x-2">
                            <span>{les.title}</span>
                            {les.document_url && (
                              <a
                                href={les.document_url}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center space-x-1 text-[10px] bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded-md hover:bg-purple-200 border border-purple-200"
                              >
                                <Paperclip className="w-3 h-3" />
                                <span>{les.document_name || 'Dokumen File'}</span>
                              </a>
                            )}
                          </div>
                          <div className="text-[10px] text-slate-500 truncate max-w-md">{les.text_body}</div>
                        </div>
                        <div className="flex items-center space-x-2 shrink-0">
                          <span className="text-[10px] font-extrabold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-md">
                            +{les.xp_reward} XP
                          </span>
                          <button
                            onClick={() => {
                              setEditingLesson({ lesson: les, sourceCourseId: c.id });
                              setTargetCourseIdForMove(c.id);
                            }}
                            className="px-2 py-1 text-[11px] bg-purple-100 hover:bg-purple-200 text-purple-800 font-bold rounded-lg transition-colors flex items-center space-x-1 cursor-pointer"
                            title="Edit & Pindahkan ke Bab/Modul Lain"
                          >
                            <ArrowRightLeft className="w-3 h-3" />
                            <span>Edit / Pindahkan</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: INPUT TRYOUT TKA & SOAL SOSIOLOGI */}
      {adminTab === 'exams' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel: Manual Form or Bulk Template Upload */}
          <div className="lg:col-span-1 space-y-6">
            {/* Mode Switcher */}
            <div className="flex bg-slate-100 p-1 rounded-2xl text-xs font-bold">
              <button
                type="button"
                onClick={() => setExamInputMode('form')}
                className={`flex-1 py-2 rounded-xl transition-all cursor-pointer ${
                  examInputMode === 'form' ? 'bg-amber-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                📝 Form Input Manual
              </button>
              <button
                type="button"
                onClick={() => setExamInputMode('template')}
                className={`flex-1 py-2 rounded-xl transition-all cursor-pointer ${
                  examInputMode === 'template' ? 'bg-amber-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                📄 Upload Template CSV
              </button>
            </div>

            {examInputMode === 'form' ? (
              <>
                {/* Form 1: Buat Paket Tryout */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
                    <Plus className="w-5 h-5 text-amber-600" />
                    <h2 className="text-base font-bold text-slate-800">1. Buat Paket Tryout TKA Baru</h2>
                  </div>

                  <form onSubmit={handleAddExamSubmit} className="space-y-3 text-xs">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Judul Paket Ujian TKA *</label>
                      <input
                        type="text"
                        required
                        placeholder="Misal: Tryout TKA Sosiologi Paket 4 - Teori Kritis"
                        value={examTitle}
                        onChange={(e) => setExamTitle(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Durasi (Menit)</label>
                        <input
                          type="number"
                          value={examDuration}
                          onChange={(e) => setExamDuration(Number(e.target.value))}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Passing Score (0-100)</label>
                        <input
                          type="number"
                          value={examPassingScore}
                          onChange={(e) => setExamPassingScore(Number(e.target.value))}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isUploading}
                      className="w-full bg-amber-600 hover:bg-amber-700 text-white font-extrabold py-2.5 rounded-xl text-xs transition-all cursor-pointer shadow-md disabled:opacity-50"
                    >
                      + Buat Paket Tryout TKA ke Firebase
                    </button>
                  </form>
                </div>

                {/* Form 2: Input Soal ke Paket */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
                    <Plus className="w-5 h-5 text-amber-600" />
                    <h2 className="text-base font-bold text-slate-800">2. Input Butir Soal Sosiologi</h2>
                  </div>

                  <form onSubmit={handleAddQuestionSubmit} className="space-y-3 text-xs">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Pilih Paket Ujian *</label>
                      <select
                        required
                        value={selectedExamId}
                        onChange={(e) => setSelectedExamId(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold focus:ring-2 focus:ring-amber-500"
                      >
                        <option value="">-- Pilih Paket Tryout --</option>
                        {exams.map((ex) => (
                          <option key={ex.id} value={ex.id}>
                            {ex.title} ({ex.questions.length} Soal)
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Tipe Soal Sosiologi</label>
                      <select
                        value={qType}
                        onChange={(e) => setQType(e.target.value as any)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold"
                      >
                        <option value="pilihan_ganda">Pilihan Ganda A-E Standard</option>
                        <option value="kompleks">Pilihan Ganda Kompleks (1,2,3,4)</option>
                        <option value="sebab_akibat">Sebab-Akibat (Pernyataan & Alasan)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Teks / Narasi Soal Sosiologi *</label>
                      <textarea
                        required
                        rows={3}
                        placeholder="Tuliskan soal sosiologi..."
                        value={qText}
                        onChange={(e) => setQText(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      />
                    </div>

                    {qType === 'pilihan_ganda' && (
                      <div className="space-y-2">
                        <label className="block font-bold text-slate-700">Opsi Jawaban (A - E)</label>
                        <input
                          type="text"
                          placeholder="Opsi A"
                          value={qOptA}
                          onChange={(e) => setQOptA(e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg border border-slate-300"
                        />
                        <input
                          type="text"
                          placeholder="Opsi B"
                          value={qOptB}
                          onChange={(e) => setQOptB(e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg border border-slate-300"
                        />
                        <input
                          type="text"
                          placeholder="Opsi C"
                          value={qOptC}
                          onChange={(e) => setQOptC(e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg border border-slate-300"
                        />
                        <input
                          type="text"
                          placeholder="Opsi D"
                          value={qOptD}
                          onChange={(e) => setQOptD(e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg border border-slate-300"
                        />
                        <input
                          type="text"
                          placeholder="Opsi E"
                          value={qOptE}
                          onChange={(e) => setQOptE(e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg border border-slate-300"
                        />
                      </div>
                    )}

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Kunci Jawaban Benar *</label>
                      <select
                        value={qCorrect}
                        onChange={(e) => setQCorrect(e.target.value as any)}
                        className="w-full px-3 py-2 rounded-xl border border-emerald-500 bg-emerald-50 font-bold text-emerald-900"
                      >
                        <option value="A">Kunci Jawaban A</option>
                        <option value="B">Kunci Jawaban B</option>
                        <option value="C">Kunci Jawaban C</option>
                        <option value="D">Kunci Jawaban D</option>
                        <option value="E">Kunci Jawaban E</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Pembahasan HOTS Sosiologi</label>
                      <textarea
                        rows={2}
                        placeholder="Pembahasan lengkap berdasarkan konsep/teori sosiologi..."
                        value={qExplanation}
                        onChange={(e) => setQExplanation(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isUploading}
                      className="w-full bg-amber-600 hover:bg-amber-700 text-white font-extrabold py-2.5 rounded-xl text-xs transition-all cursor-pointer shadow-md disabled:opacity-50"
                    >
                      + Tambahkan Soal ke Firebase
                    </button>
                  </form>
                </div>
              </>
            ) : (
              /* Bulk Bank Soal Template Section */
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <h2 className="text-sm font-bold text-slate-800">Upload Bulk Bank Soal dari Template</h2>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Upload file CSV/Excel atau tempel teks hasil template data bank soal TKA Sosiologi.
                  </p>
                </div>

                <div className="bg-amber-50 p-3.5 rounded-2xl border border-amber-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-900">📄 Format Template CSV Bank Soal</span>
                    <button
                      type="button"
                      onClick={downloadExamTemplateCSV}
                      className="text-[11px] bg-amber-600 hover:bg-amber-700 text-white font-bold px-2.5 py-1 rounded-lg transition-all cursor-pointer"
                    >
                      Unduh Template CSV
                    </button>
                  </div>
                  <p className="text-[10px] text-amber-800 leading-relaxed">
                    Format Kolom: <code className="bg-amber-100 px-1 py-0.5 rounded text-amber-900 font-mono">Judul Paket, Teks Soal, Opsi A, Opsi B, Opsi C, Opsi D, Opsi E, Kunci, Kesukaran, Topik, Pembahasan</code>
                  </p>
                </div>

                <form onSubmit={handleBulkUploadExamsSubmit} className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Tempelkan Teks CSV / JSON Bank Soal *</label>
                    <textarea
                      required
                      rows={8}
                      placeholder={`Judul Paket,Teks Soal,Opsi A,Opsi B,Opsi C,Opsi D,Opsi E,Kunci,Kesukaran,Topik,Pembahasan\nTryout TKA Paket 1,"Manakah Teori Konflik?",Dahrendorf,Comte,Durkheim,Weber,Marx,A,Medium,Konflik,"Teori dialektika konflik oleh Dahrendorf."`}
                      value={examTemplateText}
                      onChange={(e) => setExamTemplateText(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono text-[11px] focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Atau Pilih File CSV / Text dari Perangkat</label>
                    <input
                      type="file"
                      accept=".csv,.txt,.json"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (evt) => {
                            if (evt.target?.result) {
                              setExamTemplateText(evt.target.result as string);
                            }
                          };
                          reader.readAsText(file);
                        }
                      }}
                      className="w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-amber-100 file:text-amber-800 hover:file:bg-amber-200 cursor-pointer"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isUploading}
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white font-extrabold py-2.5 rounded-xl text-xs transition-all cursor-pointer shadow-md flex items-center justify-center space-x-2 disabled:opacity-50"
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Menyimpan ke Firestore...</span>
                      </>
                    ) : (
                      <span>📥 Proses Upload Bank Soal TKA ke Firebase</span>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* List Paket Tryout & Butir Soal */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-base font-bold text-slate-800">Bank Paket Ujian & Butir Soal TKA Sosiologi</h2>
            <div className="space-y-4">
              {exams.map((ex) => (
                <div key={ex.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                  <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                        {ex.category} • {ex.duration_minutes} Menit • Passing {ex.passing_score}
                      </span>
                      <h3 className="text-sm font-extrabold text-slate-800 mt-1">{ex.title}</h3>
                      <p className="text-xs text-slate-500">{ex.description}</p>
                    </div>

                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => setEditingExam(ex)}
                        className="px-2.5 py-1 text-xs bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold rounded-lg transition-colors flex items-center space-x-1 cursor-pointer"
                        title="Edit Paket Ujian"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => onDeleteExam(ex.id)}
                        className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        title="Hapus Paket Ujian dari Firebase"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Questions list inside exam */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700">
                        Butir Soal ({ex.questions.length} Soal):
                      </span>
                      <span className="text-[10px] text-indigo-600 font-semibold">IRT Weight Calculated</span>
                    </div>

                    {ex.questions.length === 0 ? (
                      <div className="text-xs text-slate-400 italic p-3 bg-slate-50 rounded-xl text-center">
                        Belum ada soal pada paket ini. Gunakan form di samping untuk menginput soal.
                      </div>
                    ) : (
                      ex.questions.map((q, idx) => (
                        <div key={q.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
                          <div className="flex items-start justify-between">
                            <span className="font-bold text-indigo-900">
                              {idx + 1}. {q.text}
                            </span>
                            <div className="flex items-center space-x-1 shrink-0 ml-2">
                              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                                Kunci: {q.correct_answer}
                              </span>
                              <button
                                onClick={() => {
                                  setEditingQuestion({ question: q, sourceExamId: ex.id });
                                  setTargetExamIdForMove(ex.id);
                                }}
                                className="px-2 py-0.5 text-[10px] bg-indigo-100 hover:bg-indigo-200 text-indigo-800 font-bold rounded-md transition-colors flex items-center space-x-1 cursor-pointer"
                                title="Edit & Pindahkan Soal ke Ujian Lain"
                              >
                                <ArrowRightLeft className="w-3 h-3" />
                                <span>Edit / Pindahkan</span>
                              </button>
                              <button
                                onClick={() => onDeleteQuestion(ex.id, q.id)}
                                className="p-1 text-red-500 hover:bg-red-100 rounded cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-1 text-[11px] text-slate-600 pl-2">
                            <div>A. {q.option_a}</div>
                            <div>B. {q.option_b}</div>
                            <div>C. {q.option_c}</div>
                            <div>D. {q.option_d}</div>
                          </div>

                          <div className="text-[10px] text-slate-500 bg-white p-2 rounded-lg border border-slate-200">
                            <strong>Topik:</strong> {q.topic || 'Umum'} | <strong>Pembahasan:</strong> {q.explanation}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: KELOLA PENGGUNA & ROLE (DENGAN FIREBASE & UPLOAD CSV MASSAL) */}
      {adminTab === 'users' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Input User / Mass CSV */}
          <div className="lg:col-span-1 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            {/* Mode Switcher */}
            <div className="flex bg-slate-100 p-1 rounded-2xl text-xs font-bold">
              <button
                type="button"
                onClick={() => setUserMode('form')}
                className={`flex-1 py-2 rounded-xl transition-all cursor-pointer ${
                  userMode === 'form' ? 'bg-purple-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                📝 Input Manual
              </button>
              <button
                type="button"
                onClick={() => setUserMode('csv')}
                className={`flex-1 py-2 rounded-xl transition-all cursor-pointer ${
                  userMode === 'csv' ? 'bg-purple-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                📄 Upload CSV Siswa
              </button>
            </div>

            {userMode === 'form' ? (
              <>
                <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
                  <Plus className="w-5 h-5 text-purple-600" />
                  <h2 className="text-base font-bold text-slate-800">Input Pengguna Baru ke Firebase</h2>
                </div>

                <form onSubmit={handleAddUserSubmit} className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Nama Lengkap *</label>
                    <input
                      type="text"
                      required
                      placeholder="Misal: Ahmad Zaky"
                      value={newUserName}
                      onChange={(e) => setNewUserName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Email Sekolah / Pribadi *</label>
                    <input
                      type="email"
                      required
                      placeholder="ahmad@sosiologi.edu"
                      value={newUserEmail}
                      onChange={(e) => setNewUserEmail(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Peran (Role)</label>
                      <select
                        value={newUserRole}
                        onChange={(e) => setNewUserRole(e.target.value as Role)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold"
                      >
                        <option value="siswa">Siswa</option>
                        <option value="guru">Guru</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Kelas (jika Siswa)</label>
                      <select
                        value={newUserGrade}
                        onChange={(e) => setNewUserGrade(Number(e.target.value))}
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
                      placeholder="SMA Negeri 8 Jakarta"
                      value={newUserSchool}
                      onChange={(e) => setNewUserSchool(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isUploading}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-extrabold py-2.5 rounded-xl text-xs transition-all cursor-pointer shadow-md disabled:opacity-50"
                  >
                    + Tambahkan Pengguna ke Firebase
                  </button>
                </form>
              </>
            ) : (
              /* Excel / CSV Student Upload Panel */
              <div className="space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <h2 className="text-sm font-bold text-slate-800 flex items-center space-x-2">
                    <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                    <span>Upload Data Siswa Massal (Format Excel / CSV)</span>
                  </h2>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                    Impor seluruh roster siswa dari file Excel (.xlsx / .xls) sekaligus dan simpan langsung ke database Firebase Firestore.
                  </p>
                </div>

                <div className="bg-emerald-50/80 p-3.5 rounded-2xl border border-emerald-200 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-bold text-emerald-900 flex items-center space-x-1.5">
                      <FileSpreadsheet className="w-4 h-4 text-emerald-700" />
                      <span>📊 Template Excel Data Siswa</span>
                    </span>
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={downloadStudentTemplateExcel}
                        className="text-[11px] bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-3 py-1.5 rounded-xl shadow-xs transition-all cursor-pointer flex items-center space-x-1"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Unduh Template Excel (.xlsx)</span>
                      </button>
                      <button
                        type="button"
                        onClick={downloadStudentTemplateCSV}
                        className="text-[10px] bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold px-2 py-1.5 rounded-xl transition-all cursor-pointer"
                      >
                        CSV
                      </button>
                    </div>
                  </div>
                  <p className="text-[10px] text-emerald-800 leading-relaxed">
                    Format Kolom Excel: <code className="bg-emerald-100/90 px-1 py-0.5 rounded text-emerald-900 font-mono font-bold">NISN | Nama_Lengkap | Password_Akun | Kelas | Status</code>
                  </p>
                </div>

                <form onSubmit={handleBulkUploadStudentsSubmit} className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Pilih File Excel (.xlsx / .xls) atau CSV dari Perangkat *
                    </label>
                    <input
                      type="file"
                      accept=".xlsx,.xls,.csv,.txt"
                      onChange={handleStudentExcelFileUpload}
                      className="w-full text-xs text-slate-500 file:mr-3 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-extrabold file:bg-emerald-100 file:text-emerald-900 hover:file:bg-emerald-200 cursor-pointer border border-slate-200 rounded-xl p-1 bg-slate-50"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block font-bold text-slate-700">Pratinjau Data Siswa (Teks / Hasil Parser File)</label>
                      <button
                        type="button"
                        onClick={() => setStudentCsvText(TSV_STUDENTS_PRESET)}
                        className="text-[10px] bg-amber-500 hover:bg-amber-600 text-stone-950 font-black px-2.5 py-1 rounded-lg transition-all cursor-pointer shadow-xs flex items-center space-x-1"
                      >
                        <Sparkles className="w-3 h-3 text-stone-950" />
                        <span>✨ Isi 51 Data Siswa SOSHUM (Preset)</span>
                      </button>
                    </div>
                    <textarea
                      required
                      rows={6}
                      placeholder={`NISN,Nama_Lengkap,Password_Akun,Kelas,Status\n0051234099,Budi Cahyono,Socio2026!Pass,12,Aktif\n0051234100,Siti Aminah,Socio2026!Pass,12,Aktif`}
                      value={studentCsvText}
                      onChange={(e) => setStudentCsvText(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono text-[11px] focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isUploading || !studentCsvText.trim()}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-2.5 rounded-xl text-xs transition-all cursor-pointer shadow-md flex items-center justify-center space-x-2 disabled:opacity-50"
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Mengunggah Data ke Firestore...</span>
                      </>
                    ) : (
                      <span>📥 Simpan Data Siswa dari Excel ke Firebase</span>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* User Table */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h2 className="text-base font-bold text-slate-800">Data Seluruh Pengguna Sistem Firebase</h2>
              <span className="text-xs text-slate-500">Ubah role instan & tersimpan di Cloud</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 font-bold uppercase text-[11px]">
                  <tr>
                    <th className="p-3">Pengguna</th>
                    <th className="p-3">Role Saat Ini</th>
                    <th className="p-3">XP Points</th>
                    <th className="p-3 text-right">Aksi Role Access</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {usersList.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-50">
                      <td className="p-3">
                        <div className="font-bold text-slate-800">{u.name}</div>
                        <div className="text-[10px] text-slate-500">{u.email} • {u.schoolName || u.school}</div>
                      </td>
                      <td className="p-3">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold capitalize ${
                            u.role === 'siswa'
                              ? 'bg-indigo-100 text-indigo-800'
                              : u.role === 'guru'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-purple-100 text-purple-800'
                          }`}
                        >
                          {u.role}
                        </span>
                      </td>
                      <td className="p-3 font-extrabold text-amber-600">{u.total_xp || u.xp || 500} XP</td>
                      <td className="p-3 text-right space-x-1">
                        <button
                          onClick={() => handleToggleUserRole(u.id, 'siswa')}
                          className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                            u.role === 'siswa' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          Siswa
                        </button>
                        <button
                          onClick={() => handleToggleUserRole(u.id, 'guru')}
                          className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                            u.role === 'guru' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          Guru
                        </button>
                        <button
                          onClick={() => handleToggleUserRole(u.id, 'admin')}
                          className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                            u.role === 'admin' ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          Admin
                        </button>
                        <button
                          onClick={() => setEditingUser(u)}
                          className="px-2 py-1 rounded-lg text-[10px] font-bold bg-amber-100 text-amber-800 hover:bg-amber-200 transition-all cursor-pointer mr-1"
                          title="Edit Pengguna"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteUser(u.id)}
                          className="p-1 text-red-500 hover:bg-red-50 rounded cursor-pointer ml-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
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
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-2.5 rounded-xl text-xs transition-all cursor-pointer shadow-md disabled:opacity-50"
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
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-extrabold flex items-center space-x-1 cursor-pointer hover:bg-emerald-700"
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
