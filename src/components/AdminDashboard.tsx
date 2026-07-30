import React, { useState } from 'react';
import { 
  Shield, Users, Database, Activity, Award, Plus, Trash2, 
  BookOpen, FileText, Bell, CheckCircle, HelpCircle, Edit3, Sparkles 
} from 'lucide-react';
import { Announcement, Course, Exam, Lesson, Question, Role, User } from '../types';

interface AdminDashboardProps {
  user: User;
  onRoleChange: (role: Role) => void;
  courses: Course[];
  exams: Exam[];
  announcements: Announcement[];
  onAddCourse: (newCourse: Course) => void;
  onDeleteCourse: (courseId: string) => void;
  onAddExam: (newExam: Exam) => void;
  onDeleteExam: (examId: string) => void;
  onAddQuestion: (examId: string, newQuestion: Question) => void;
  onDeleteQuestion: (examId: string, questionId: string) => void;
  onAddAnnouncement: (announcement: Announcement) => void;
  onDeleteAnnouncement: (announcementId: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  user,
  onRoleChange,
  courses,
  exams,
  announcements,
  onAddCourse,
  onDeleteCourse,
  onAddExam,
  onDeleteExam,
  onAddQuestion,
  onDeleteQuestion,
  onAddAnnouncement,
  onDeleteAnnouncement,
}) => {
  const [adminTab, setAdminTab] = useState<'users' | 'courses' | 'exams' | 'announcements'>('courses');
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Local User List state for Admin CMS
  const [usersList, setUsersList] = useState([
    { id: 'usr_1', name: 'Arya Pratama', email: 'arya.pratama@sosiologi.edu', role: 'siswa' as Role, xp: 1450, grade: 12, school: 'SMA Negeri 8 Jakarta' },
    { id: 'usr_2', name: 'Drs. Supriyadi, M.Pd.', email: 'supriyadi@sosiologi.edu', role: 'guru' as Role, xp: 4500, grade: 0, school: 'SMA Negeri 3 Yogyakarta' },
    { id: 'usr_3', name: 'Siti Rahmawati', email: 'siti.rahma@sosiologi.edu', role: 'siswa' as Role, xp: 3820, grade: 12, school: 'SMA Negeri 3 Yogyakarta' },
    { id: 'usr_4', name: 'Admin Master', email: 'admin@sosiologi.edu', role: 'admin' as Role, xp: 9999, grade: 0, school: 'Pusat Kurikulum Sosiologi' },
  ]);

  // Form State: New User
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState<Role>('siswa');
  const [newUserGrade, setNewUserGrade] = useState<number>(12);
  const [newUserSchool, setNewUserSchool] = useState('');

  // Form State: New Course
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

  // Form State: New Exam Package & Bank Soal Bulk
  const [examInputMode, setExamInputMode] = useState<'form' | 'template'>('form');
  const [examTemplateText, setExamTemplateText] = useState<string>('');
  const [examTitle, setExamTitle] = useState('');
  const [examGrade, setExamGrade] = useState<number>(12);
  const [examCategory, setExamCategory] = useState<string>('Tryout TKA');
  const [examDuration, setExamDuration] = useState<number>(25);
  const [examPassingScore, setExamPassingScore] = useState<number>(75);
  const [examDesc, setExamDesc] = useState('');

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
Tryout TKA Sosiologi Paket 5,"Demonstrasi buruh menuntut kenaikan UMR menurut Dahrendorf dipicu oleh...",Perbedaan kekuasaan dan wewenang,Perebutan modal usaha,Niat buruk pengusaha,Campur tangan asing,Hambatan komunikasi,A,Hard,Konflik Sosial,"Dahrendorf menekankan bahwa konflik masyarakat industri modern dipicu oleh distribusi kekuasaan dan wewenang."
Tryout TKA Sosiologi Paket 5,"Peneliti mengamati perilaku geng motor tanpa memberikan penilaian moral. Ini mencerminkan ciri sosiologi...",Nonetis,Empiris,Teoretis,Kumulatif,Spekulatif,A,Medium,Hakikat Sosiologi,"Nonetis berarti sosiologi tidak menilai baik atau buruknya suatu fakta sosial."`;

    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'template_bank_soal_tka_sosiologi.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Bulk Importer Course/Module
  const handleBulkUploadCoursesSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseTemplateText.trim()) return;

    // Check JSON format
    try {
      if (courseTemplateText.trim().startsWith('[') || courseTemplateText.trim().startsWith('{')) {
        const parsed = JSON.parse(courseTemplateText);
        const items = Array.isArray(parsed) ? parsed : [parsed];
        let count = 0;
        items.forEach((item, idx) => {
          const cId = `course_bulk_${Date.now()}_${idx}`;
          const isTka = item.isTka || item.target === 'TKA' || (item.category && item.category.includes('TKA'));
          const newCourse: Course = {
            id: cId,
            title: item.title || item.Judul || `Modul Sosiologi ${idx + 1}`,
            description: item.description || item.Deskripsi || (isTka ? 'Modul Khusus TKA Sosiologi UTBK' : 'Modul Pembelajaran Sosiologi'),
            grade_level: isTka ? 12 : Number(item.grade_level || item.Grade || 12) as 10 | 11 | 12,
            category: isTka ? 'TKA Sosiologi (UTBK / Seleksi PTN)' : `Sosiologi SMA Kelas ${item.grade_level || 12}`,
            thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=400',
            totalLessons: 1,
            completedLessons: 0,
            lessons: [
              {
                id: `les_bulk_${Date.now()}_${idx}`,
                course_id: cId,
                chapter_number: Number(item.chapter_number || item.Bab || 1),
                chapter_title: `BAB ${item.chapter_number || item.Bab || 1}`,
                title: item.lesson_title || item.JudulLesson || item.title || 'Materi Pembelajaran 1',
                content_type: 'video',
                youtube_id: item.youtube_id || item.YouTubeID || '2Vv-BfVoq4g',
                text_body: item.text_body || item.Materi || 'Uraian materi sosiologi dari template JSON.',
                key_takeaways: Array.isArray(item.key_takeaways) ? item.key_takeaways : (item.PoinKunci ? item.PoinKunci.split(';') : ['Konsep Dasar Sosiologi']),
                duration: '15 Menit',
                completed: false,
                xp_reward: 100,
              }
            ]
          };
          onAddCourse(newCourse);
          count++;
        });
        showNotification(`Sukses! ${count} Modul & Materi Sosiologi berhasil diimpor dari template JSON!`);
        setCourseTemplateText('');
        return;
      }
    } catch (err) {
      // Fallthrough to CSV parsing
    }

    // CSV Parsing
    const lines = courseTemplateText.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    if (lines.length <= 1) {
      showNotification('Teks template CSV kosong atau tidak memiliki baris data.');
      return;
    }

    const startIndex = lines[0].toLowerCase().includes('judul') ? 1 : 0;
    let imported = 0;

    for (let i = startIndex; i < lines.length; i++) {
      const cols = lines[i].split(',').map(c => c.trim().replace(/^"|"$/g, ''));
      if (cols.length >= 2) {
        const title = cols[0] || `Modul Sosiologi ${i}`;
        const pilar = cols[1] || 'Kelas 12';
        const isTka = pilar.toLowerCase().includes('tka');
        const chapterNum = Number(cols[2]) || 1;
        const lessonTitle = cols[3] || title;
        const ytId = cols[4] || '2Vv-BfVoq4g';
        const textBody = cols[5] || 'Penjelasan materi sosiologi diimpor via template CSV.';
        const keyPoints = cols[6] ? cols[6].split(';').map(p => p.trim()) : ['Pemahaman Teori Sosiologi', 'Aplikasi Kasus Realistis'];

        const cId = `course_csv_${Date.now()}_${i}`;
        const newCourse: Course = {
          id: cId,
          title: title,
          description: isTka ? 'Modul & Materi Khusus TKA Sosiologi UTBK / Seleksi PTN' : `Modul Sosiologi SMA ${pilar}`,
          grade_level: isTka ? 12 : (pilar.includes('10') ? 10 : pilar.includes('11') ? 11 : 12),
          category: isTka ? 'TKA Sosiologi (UTBK / Seleksi PTN)' : `Sosiologi SMA ${pilar}`,
          thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=400',
          totalLessons: 1,
          completedLessons: 0,
          lessons: [
            {
              id: `les_csv_${Date.now()}_${i}`,
              course_id: cId,
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
        onAddCourse(newCourse);
        imported++;
      }
    }

    showNotification(`Sukses! ${imported} Modul/Materi (Kelas & TKA) berhasil diimpor dari Template CSV!`);
    setCourseTemplateText('');
  };

  // Bulk Importer Exam/Questions Bank
  const handleBulkUploadExamsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!examTemplateText.trim()) return;

    // Try JSON
    try {
      if (examTemplateText.trim().startsWith('[') || examTemplateText.trim().startsWith('{')) {
        const parsed = JSON.parse(examTemplateText);
        const items = Array.isArray(parsed) ? parsed : [parsed];
        let examCount = 0;
        let qCount = 0;

        items.forEach((item, idx) => {
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

          onAddExam(newExam);
          examCount++;
          qCount += qList.length;
        });

        showNotification(`Sukses! ${examCount} Paket Ujian & ${qCount} Soal TKA diimpor dari Template JSON!`);
        setExamTemplateText('');
        return;
      }
    } catch (err) {
      // Fallthrough to CSV
    }

    // CSV Parse
    const lines = examTemplateText.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    if (lines.length <= 1) {
      showNotification('Teks template CSV Bank Soal kosong.');
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

    let eCount = 0;
    let qTotal = 0;

    Object.entries(examMap).forEach(([eTitle, qList], eIdx) => {
      const exId = `exam_csv_${Date.now()}_${eIdx}`;
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

      onAddExam(newExam);
      eCount++;
      qTotal += qList.length;
    });

    showNotification(`Sukses! ${eCount} Paket Ujian & ${qTotal} Soal TKA berhasil diimpor dari Template CSV!`);
    setExamTemplateText('');
  };

  // Form State: New Question
  const [selectedExamId, setSelectedExamId] = useState<string>('');
  const [qText, setQText] = useState('');
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
  const [annAuthor, setAnnAuthor] = useState('Admin Kurikulum LMS');
  const [annContent, setAnnContent] = useState('');

  const showNotification = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 4000);
  };

  // User Handlers
  const handleAddUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName || !newUserEmail) return;
    const newUser = {
      id: `usr_${Date.now()}`,
      name: newUserName,
      email: newUserEmail,
      role: newUserRole,
      xp: 500,
      grade: newUserGrade,
      school: newUserSchool || 'SMA Sosiologi Indonesia',
    };
    setUsersList([newUser, ...usersList]);
    setNewUserName('');
    setNewUserEmail('');
    setNewUserSchool('');
    showNotification(`Pengguna baru "${newUser.name}" berhasil ditambahkan ke database!`);
  };

  const handleToggleUserRole = (id: string, newRole: Role) => {
    setUsersList((prev) =>
      prev.map((u) => (u.id === id ? { ...u, role: newRole } : u))
    );
    showNotification(`Hak akses role user diperbarui menjadi ${newRole.toUpperCase()}`);
  };

  const handleDeleteUser = (id: string) => {
    setUsersList((prev) => prev.filter((u) => u.id !== id));
    showNotification(`User berhasil dihapus dari sistem.`);
  };

  // Course Handlers
  const handleAddCourseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseTitle || !lessonTitle) return;

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

    onAddCourse(newCourseObj);
    setCourseTitle('');
    setCourseDesc('');
    setLessonTitle('');
    setLessonVideoUrl('');
    setLessonTextBody('');
    setLessonKeyPoints('');
    showNotification(`Modul & Materi "${newCourseObj.title}" berhasil diinput ke LMS Siswa!`);
  };

  // Exam Package Handler
  const handleAddExamSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!examTitle) return;

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

    onAddExam(newExamObj);
    setExamTitle('');
    setExamDesc('');
    showNotification(`Paket Tryout TKA "${newExamObj.title}" berhasil dibuat! Silakan tambahkan butir soal.`);
  };

  // Question Handler
  const handleAddQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedExamId || !qText || !qOptA || !qOptB) return;

    const newQuestionObj: Question = {
      id: `q_admin_${Date.now()}`,
      exam_id: selectedExamId,
      number: 1,
      text: qText,
      option_a: qOptA,
      option_b: qOptB,
      option_c: qOptC || 'Opsi C',
      option_d: qOptD || 'Opsi D',
      option_e: qOptE || 'Opsi E',
      correct_answer: qCorrect,
      explanation: qExplanation || 'Pembahasan HOTS sosiologi berdasarkan fakta dan teori.',
      topic: qTopic || 'Umum Sosiologi',
      difficulty: qDifficulty,
    };

    onAddQuestion(selectedExamId, newQuestionObj);
    setQText('');
    setQOptA('');
    setQOptB('');
    setQOptC('');
    setQOptD('');
    setQOptE('');
    setQExplanation('');
    showNotification(`Soal Sosiologi berhasil ditambahkan ke Paket Ujian terpilih!`);
  };

  // Announcement Handler
  const handleAddAnnouncementSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!annTitle || !annContent) return;

    const newAnnObj: Announcement = {
      id: `ann_${Date.now()}`,
      title: annTitle,
      category: annCategory,
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      author: annAuthor || 'Admin LMS',
      content: annContent,
    };

    onAddAnnouncement(newAnnObj);
    setAnnTitle('');
    setAnnContent('');
    showNotification(`Pengumuman "${newAnnObj.title}" berhasil diterbitkan ke Dashboard Siswa!`);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Admin Banner Header */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center space-x-2 bg-purple-500/20 px-3 py-1 rounded-full text-xs font-semibold text-purple-200 border border-purple-400/30 mb-2">
              <Shield className="w-3.5 h-3.5 text-purple-300" />
              <span>Sistem Manajemen Input Data LMS Sosiologi</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold">Control Panel & CMS Admin</h1>
            <p className="text-purple-100 text-xs sm:text-sm mt-1 max-w-2xl">
              Pusat pengelolaan seluruh data sistem: Input Modul Pembelajaran, Bank Soal Tryout TKA Sosiologi, Data Pengguna, serta Pengumuman Sekolah.
            </p>
          </div>

          <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/15">
            <Activity className="w-6 h-6 text-emerald-400 animate-pulse" />
            <div>
              <p className="text-xs text-purple-200">Status Database CBT</p>
              <p className="text-sm font-bold text-emerald-300">Siap Input Data Real-Time</p>
            </div>
          </div>
        </div>
      </div>

      {/* Success Notification Alert */}
      {successMsg && (
        <div className="bg-emerald-900/80 border border-emerald-500 text-emerald-100 px-4 py-3 rounded-2xl flex items-center justify-between shadow-lg text-xs font-bold animate-bounce">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-emerald-300" />
            <span>{successMsg}</span>
          </div>
          <span className="text-[10px] bg-emerald-800 px-2 py-0.5 rounded-md">Sukses Ditambahkan</span>
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
          <span>Input Modul Pembelajaran ({courses.length})</span>
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

      {/* TAB 1: INPUT MODUL & MATERI PEMBELAJARAN (BERLAKU KELAS & TKA) */}
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
                    <h2 className="text-sm font-bold text-slate-800">Form Input Modul (Kelas & TKA)</h2>
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
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold py-2.5 rounded-xl text-xs transition-all cursor-pointer shadow-md"
                  >
                    + Tambahkan Modul Baru ke LMS
                  </button>
                </form>
              </div>
            ) : (
              /* Bulk Upload Template Section */
              <div className="space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <h2 className="text-sm font-bold text-slate-800">Upload Massal Modul dari Template</h2>
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
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold py-2.5 rounded-xl text-xs transition-all cursor-pointer shadow-md"
                  >
                    📥 Proses Upload Template Modul & Materi
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* List Modul Aktif */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-base font-bold text-slate-800">Daftar Modul Pembelajaran Aktif di LMS</h2>
            <div className="space-y-3">
              {courses.map((c) => (
                <div key={c.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 border border-indigo-200">
                        Kelas {c.grade_level} SMA • BAB {c.chapter_number}
                      </span>
                      <h3 className="text-sm font-extrabold text-slate-800 mt-1">{c.title}</h3>
                      <p className="text-xs text-slate-500">{c.description}</p>
                    </div>
                    <button
                      onClick={() => onDeleteCourse(c.id)}
                      className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                      title="Hapus Modul"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="border-t border-slate-100 pt-3 space-y-2">
                    <span className="text-[11px] font-bold text-slate-600">Sub-materi / Lessons ({c.lessons.length}):</span>
                    {c.lessons.map((les) => (
                      <div key={les.id} className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs flex items-center justify-between">
                        <div>
                          <div className="font-bold text-slate-800">{les.title}</div>
                          <div className="text-[10px] text-slate-500 truncate max-w-md">{les.text_body}</div>
                        </div>
                        <span className="text-[10px] font-extrabold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-md">
                          +{les.xp_reward} XP
                        </span>
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
                      className="w-full bg-amber-600 hover:bg-amber-700 text-white font-extrabold py-2.5 rounded-xl text-xs transition-all cursor-pointer shadow-md"
                    >
                      + Buat Paket Tryout TKA
                    </button>
                  </form>
                </div>

                {/* Form 2: Input Soal ke Paket */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
                    <Plus className="w-5 h-5 text-indigo-600" />
                    <h2 className="text-base font-bold text-slate-800">2. Input Soal ke Paket Tryout</h2>
                  </div>

                  <form onSubmit={handleAddQuestionSubmit} className="space-y-3 text-xs">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Pilih Paket Ujian Tujuan *</label>
                      <select
                        required
                        value={selectedExamId}
                        onChange={(e) => setSelectedExamId(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      >
                        <option value="">-- Pilih Paket Ujian --</option>
                        {exams.map((ex) => (
                          <option key={ex.id} value={ex.id}>
                            {ex.title} ({ex.questions.length} Soal)
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Teks Soal / Studi Kasus *</label>
                      <textarea
                        required
                        rows={3}
                        placeholder="Tuliskan kasus/pertanyaan sosiologi..."
                        value={qText}
                        onChange={(e) => setQText(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block font-bold text-slate-700">Opsi Jawaban A - E *</label>
                      <input
                        type="text"
                        required
                        placeholder="Opsi A"
                        value={qOptA}
                        onChange={(e) => setQOptA(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-300"
                      />
                      <input
                        type="text"
                        required
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

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Kunci Jawaban</label>
                        <select
                          value={qCorrect}
                          onChange={(e) => setQCorrect(e.target.value as any)}
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
                        <label className="block font-bold text-slate-700 mb-1">Tingkat Kesukaran IRT</label>
                        <select
                          value={qDifficulty}
                          onChange={(e) => setQDifficulty(e.target.value as any)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300"
                        >
                          <option value="Easy">Easy (Mudah)</option>
                          <option value="Medium">Medium (Sedang)</option>
                          <option value="Hard">Hard (Sukar HOTS)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Topik Sosiologi</label>
                      <input
                        type="text"
                        placeholder="Misal: Konflik & Akomodasi Sosial"
                        value={qTopic}
                        onChange={(e) => setQTopic(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Pembahasan HOTS</label>
                      <textarea
                        rows={2}
                        placeholder="Penjelasan teoritis sosiologis..."
                        value={qExplanation}
                        onChange={(e) => setQExplanation(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold py-2.5 rounded-xl text-xs transition-all cursor-pointer shadow-md"
                    >
                      + Tambahkan Soal ke Paket
                    </button>
                  </form>
                </div>
              </>
            ) : (
              /* Bulk Upload Soal TKA via Template CSV/JSON */
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <h2 className="text-sm font-bold text-slate-800">Upload Massal Soal TKA dari Template</h2>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Upload file CSV/Excel atau tempel teks hasil template bank soal TKA Sosiologi.
                  </p>
                </div>

                <div className="bg-amber-50 p-3.5 rounded-2xl border border-amber-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-900">🎯 Format Template CSV Bank Soal TKA</span>
                    <button
                      type="button"
                      onClick={downloadExamTemplateCSV}
                      className="text-[11px] bg-amber-600 hover:bg-amber-700 text-white font-bold px-2.5 py-1 rounded-lg transition-all cursor-pointer shadow-xs"
                    >
                      Unduh Template CSV
                    </button>
                  </div>
                  <p className="text-[10px] text-amber-800 leading-relaxed">
                    Format Kolom: <code className="bg-amber-100 px-1 py-0.5 rounded text-amber-950 font-mono">Judul Ujian, Teks Soal, Opsi A, Opsi B, Opsi C, Opsi D, Opsi E, Kunci Jawaban (A-E), Kesukaran, Topik, Pembahasan HOTS</code>
                  </p>
                </div>

                <form onSubmit={handleBulkUploadExamsSubmit} className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Tempelkan Teks CSV / JSON Soal *</label>
                    <textarea
                      required
                      rows={8}
                      placeholder={`Judul Ujian,Teks Soal,Opsi A,Opsi B,Opsi C,Opsi D,Opsi E,Kunci,Kesukaran,Topik,Pembahasan\nTryout TKA Paket 5,"Demonstrasi buruh...",Perbedaan wewenang,Perebutan modal,Niat buruk,Campur tangan,Komunikasi,A,Hard,Konflik Sosial,"Dahrendorf..."`}
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
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white font-extrabold py-2.5 rounded-xl text-xs transition-all cursor-pointer shadow-md"
                  >
                    📥 Proses Upload Bank Soal TKA
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

                    <button
                      onClick={() => onDeleteExam(ex.id)}
                      className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                      title="Hapus Paket Ujian"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
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

      {/* TAB 3: KELOLA PENGGUNA & ROLE */}
      {adminTab === 'users' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Tambah User */}
          <div className="lg:col-span-1 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
              <Plus className="w-5 h-5 text-purple-600" />
              <h2 className="text-base font-bold text-slate-800">Input Pengguna Baru</h2>
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
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-extrabold py-2.5 rounded-xl text-xs transition-all cursor-pointer shadow-md"
              >
                + Tambahkan Pengguna
              </button>
            </form>
          </div>

          {/* User Table */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h2 className="text-base font-bold text-slate-800">Data Seluruh Pengguna Sistem</h2>
              <span className="text-xs text-slate-500">Ganti role instan untuk pengujian</span>
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
                        <div className="text-[10px] text-slate-500">{u.email} • {u.school}</div>
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
                      <td className="p-3 font-extrabold text-amber-600">{u.xp} XP</td>
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
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-2.5 rounded-xl text-xs transition-all cursor-pointer shadow-md"
              >
                + Terbitkan Pengumuman
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

                    <button
                      onClick={() => onDeleteAnnouncement(ann.id)}
                      className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                      title="Hapus Pengumuman"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
