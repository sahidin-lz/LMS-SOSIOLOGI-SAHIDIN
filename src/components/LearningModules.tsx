import React, { useState, useMemo } from 'react';
import { 
  BookOpen, Play, CheckCircle2, Bookmark, Award, Clock, ChevronRight, ChevronDown,
  Sparkles, FileText, Share2, Check, ArrowLeft, ArrowRight, MessageSquare, ThumbsUp, Send, StickyNote, Plus, PlayCircle,
  Target, Layers, GitCompare, HelpCircle, ShieldAlert, Search, Filter, ListOrdered, LayoutGrid, GraduationCap, Lightbulb, Info, BookMarked
} from 'lucide-react';
import { Course, Lesson, LessonComment, Role, User, VideoNote } from '../types';
import { INITIAL_COMMENTS } from '../data/sociologyData';

interface LearningModulesProps {
  user: User;
  courses: Course[];
  activeCourseId?: string;
  onCompleteLesson: (lessonId: string, xpReward: number) => void;
  onStartExam?: (examId: string) => void;
  tkaSubTab?: 'materi' | 'latihan_bab' | 'try_out_tka';
  onSelectTkaSubTab?: (subTab: 'materi' | 'latihan_bab' | 'try_out_tka') => void;
}

// Helper to highlight key sociological terms in text
const highlightKeyTerms = (text: string) => {
  if (!text) return text;
  
  // If line is in "Term: Explanation" format
  const colonIndex = text.indexOf(': ');
  if (colonIndex > 0 && colonIndex < 45 && !text.startsWith('http')) {
    const term = text.substring(0, colonIndex);
    const rest = text.substring(colonIndex + 2);
    return (
      <span>
        <strong className="text-orange-500 font-extrabold">{term}:</strong> {rest}
      </span>
    );
  }
  return text;
};

// Formatted material renderer component for text lessons
const FormattedMaterialBody: React.FC<{
  lesson: Lesson;
  onStartExam?: (examId: string) => void;
}> = ({ lesson, onStartExam }) => {
  const isCbtLesson = 
    lesson.exam_id_target || 
    lesson.id === 'les_tka_1_i' || 
    lesson.title.toLowerCase().includes('20 soal cbt') ||
    lesson.text_body.includes('SISTEM CBT');

  const examTargetId = lesson.exam_id_target || 
    (lesson.id === 'les_tka_1_i' ? 'exam_latihan_bab_1' : `exam_latihan_bab_${lesson.chapter_number}`);

  const paragraphs = lesson.text_body ? lesson.text_body.split('\n\n').filter(p => p.trim().length > 0) : [];

  return (
    <div className="space-y-6">
      {/* Key Takeaways Section */}
      {lesson.key_takeaways && lesson.key_takeaways.length > 0 && (
        <div className="bg-gradient-to-r from-amber-950/80 via-stone-900 to-emerald-950/70 p-5 sm:p-6 rounded-2xl border border-amber-500/40 space-y-3.5 shadow-lg">
          <div className="flex items-center space-x-2 text-orange-500 font-extrabold text-xs uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-orange-600 shrink-0" />
            <span>Poin Kunci & Ringkasan Konsep Utama</span>
          </div>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
            {lesson.key_takeaways.map((point, i) => (
              <li key={i} className="flex items-start space-x-3">
                <span className="w-5 h-5 rounded-lg bg-orange-500/20 border border-amber-500/40 text-orange-600 font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                  ✓
                </span>
                <span className="leading-relaxed">{highlightKeyTerms(point)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* CBT Mode Launcher if applicable */}
      {isCbtLesson ? (
        <div className="bg-gradient-to-br from-amber-950 via-stone-950 to-emerald-950/90 p-6 sm:p-7 rounded-2xl border border-amber-500/60 shadow-xl space-y-6">
          <div className="flex items-start space-x-3.5 text-orange-600">
            <ShieldAlert className="w-7 h-7 shrink-0 mt-0.5 text-orange-600" />
            <div className="space-y-1.5">
              <div className="flex items-center space-x-2">
                <span className="bg-orange-500 text-white font-black text-[10px] px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                  Mode Ujian CBT Aktif
                </span>
                <span className="text-xs text-white0 font-medium">20 Soal TKA Sosiologi</span>
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-800">
                Simulasi CBT: {lesson.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Siswa mengerjakan 20 soal terlebih dahulu di Sistem CBT secara mandiri. Kunci jawaban, analisis statistik IRT, serta pembahasan terinci terbuka otomatis setelah dikumpulkan!
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white/90 p-3.5 rounded-xl border border-slate-200 text-center">
              <span className="block text-[10px] uppercase font-bold text-white0">Jumlah Soal</span>
              <span className="text-sm sm:text-base font-extrabold text-orange-600">20 Soal CBT</span>
            </div>
            <div className="bg-white/90 p-3.5 rounded-xl border border-slate-200 text-center">
              <span className="block text-[10px] uppercase font-bold text-white0">Durasi Pengerjaan</span>
              <span className="text-sm sm:text-base font-extrabold text-slate-700">40 Menit</span>
            </div>
            <div className="bg-white/90 p-3.5 rounded-xl border border-slate-200 text-center">
              <span className="block text-[10px] uppercase font-bold text-white0">Format Soal</span>
              <span className="text-sm sm:text-base font-extrabold text-indigo-400">3 Model TKA</span>
            </div>
            <div className="bg-white/90 p-3.5 rounded-xl border border-slate-200 text-center">
              <span className="block text-[10px] uppercase font-bold text-white0">Reward Hadiah</span>
              <span className="text-sm sm:text-base font-extrabold text-blue-600">+300 XP</span>
            </div>
          </div>

          <div className="bg-white/60 p-4 rounded-xl border border-amber-500/30 text-center space-y-3">
            <p className="text-xs text-slate-600 font-medium">
              Format Soal: Pilihan Ganda Biasa, PGK Kategori (Sesuai/Tidak Sesuai), dan PGK Multi-Jawaban (MCMA).
            </p>
            <button
              onClick={() => onStartExam && onStartExam(examTargetId)}
              className="w-full sm:w-auto bg-gradient-to-r from-orange-500 via-orange-400 to-blue-500 hover:from-orange-400 hover:to-emerald-400 text-stone-950 font-black text-xs sm:text-sm px-8 py-3.5 rounded-xl shadow-xl hover:shadow-amber-500/20 transition-all inline-flex items-center justify-center space-x-2 cursor-pointer transform hover:scale-[1.01]"
            >
              <PlayCircle className="w-5 h-5 fill-stone-950" />
              <span>MULAI KERJAKAN 20 SOAL DI SISTEM CBT</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {paragraphs.map((para, idx) => {
            const lines = para.split('\n');
            const firstLine = lines[0].trim();
            const lowerFirst = firstLine.toLowerCase();
            
            const isTips = lowerFirst.includes('cara mudah membaca') || lowerFirst.includes('tips:') || lowerFirst.includes('trik:');
            const isCaseStudy = lowerFirst.includes('studi kasus') || lowerFirst.includes('contoh kasus');
            const isTimeline = lowerFirst.includes('timeline') || lowerFirst.includes('kronologi');
            const isExercise = lowerFirst.includes('tugas:') || lowerFirst.includes('latihan:');
            const isConcept = lowerFirst.includes('definisi:') || lowerFirst.includes('konsep penting:');
            
            // Check if paragraph header is a main title (ALL CAPS or numbered like "1. HAKIKAT GEJALA SOSIAL")
            const isMainSection = 
              /^[0-9I|V|X]+\.\s+[A-Z\s,&\(\)\/\-\:]+$/.test(firstLine) ||
              (firstLine.length < 55 && firstLine === firstLine.toUpperCase() && !firstLine.includes('HTTP'));
            
            // Check if paragraph is sub-heading (like "1. Tindakan sosial instrumental" or "a. Kontak Sosial:")
            const isSubSection = /^[0-9a-z]\.\s+/i.test(firstLine) || /^[0-9a-z]\)\s+/i.test(firstLine);


            let headerText = firstLine;
            let bodyText = lines.slice(1);

            if (isTips || isCaseStudy || isTimeline || isExercise || isConcept) {
              const colonIndex = firstLine.indexOf(':');
              if (colonIndex !== -1 && colonIndex < 40 && lines.length === 1) {
                 headerText = firstLine.substring(0, colonIndex + 1);
                 bodyText = [firstLine.substring(colonIndex + 1).trim()];
              } else if (colonIndex !== -1 && colonIndex < 40 && lines.length > 1) {
                 const partAfterColon = firstLine.substring(colonIndex + 1).trim();
                 headerText = firstLine.substring(0, colonIndex + 1);
                 if (partAfterColon) {
                    bodyText = [partAfterColon, ...lines.slice(1)];
                 } else {
                    bodyText = lines.slice(1);
                 }
              }
            }

            const renderLines = (linesArr: string[]) => linesArr.map((l, lIdx) => (
               <p key={lIdx}>{highlightKeyTerms(l)}</p>
            ));


            if (isTips) {
              return (
                <div key={idx} className="bg-gradient-to-br from-emerald-950/80 to-teal-900/60 border border-blue-400/50 rounded-2xl p-5 space-y-3 shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl transform translate-x-10 -translate-y-10"></div>
                  <div className="flex items-center space-x-2.5 border-b border-blue-400/30 pb-3 relative z-10">
                    <Lightbulb className="w-5 h-5 text-blue-600 shrink-0" />
                    <h3 className="text-sm sm:text-base font-extrabold text-blue-500 tracking-wide">{headerText}</h3>
                  </div>
                  {bodyText.length > 0 && (
                    <div className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed pt-1 relative z-10">
                      {renderLines(bodyText)}
                    </div>
                  )}
                </div>
              );
            }

            if (isCaseStudy) {
              return (
                <div key={idx} className="bg-gradient-to-br from-blue-950/80 to-indigo-900/60 border border-blue-500/50 rounded-2xl p-5 space-y-3 shadow-lg relative overflow-hidden">
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl transform translate-x-10 translate-y-10"></div>
                  <div className="flex items-center space-x-2.5 border-b border-blue-500/30 pb-3 relative z-10">
                    <Search className="w-5 h-5 text-blue-400 shrink-0" />
                    <h3 className="text-sm sm:text-base font-extrabold text-blue-300 tracking-wide">{headerText}</h3>
                  </div>
                  {bodyText.length > 0 && (
                    <div className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed pt-1 relative z-10">
                      {renderLines(bodyText)}
                    </div>
                  )}
                </div>
              );
            }

            if (isTimeline || isConcept) {
              return (
                <div key={idx} className="bg-gradient-to-br from-purple-950/80 to-fuchsia-900/60 border border-purple-500/50 rounded-2xl p-5 space-y-3 shadow-lg relative overflow-hidden">
                   <div className="flex items-center space-x-2.5 border-b border-purple-500/30 pb-3 relative z-10">
                    {isTimeline ? <Clock className="w-5 h-5 text-purple-400 shrink-0" /> : <BookMarked className="w-5 h-5 text-purple-400 shrink-0" />}
                    <h3 className="text-sm sm:text-base font-extrabold text-purple-300 tracking-wide">{headerText}</h3>
                  </div>
                  {bodyText.length > 0 && (
                    <div className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed pt-1 relative z-10">
                      {renderLines(bodyText)}
                    </div>
                  )}
                </div>
              );
            }

            if (isExercise) {
              return (
                <div key={idx} className="bg-gradient-to-br from-rose-950/80 to-orange-900/60 border border-rose-500/50 rounded-2xl p-5 space-y-3 shadow-lg relative overflow-hidden">
                  <div className="flex items-center space-x-2.5 border-b border-rose-500/30 pb-3 relative z-10">
                    <Target className="w-5 h-5 text-rose-400 shrink-0" />
                    <h3 className="text-sm sm:text-base font-extrabold text-rose-300 tracking-wide">{headerText}</h3>
                  </div>
                  {bodyText.length > 0 && (
                    <div className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed pt-1 relative z-10">
                      {renderLines(bodyText)}
                    </div>
                  )}
                </div>
              );
            }

            if (isMainSection) {
              return (
                <div key={idx} className="bg-gradient-to-br from-stone-950 to-stone-900 border border-amber-500/40 rounded-2xl p-5 space-y-3 shadow-sm border border-slate-200">
                  <div className="flex items-center space-x-2.5 border-b border-slate-200 pb-3">
                    <Layers className="w-5 h-5 text-orange-600 shrink-0" />
                    <h3 className="text-sm sm:text-base font-black text-orange-600 tracking-wide uppercase">
                      {headerText}
                    </h3>
                  </div>
                  {bodyText.length > 0 && (
                    <div className="space-y-2 text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                      {renderLines(bodyText)}
                    </div>
                  )}
                </div>
              );
            }

            if (isSubSection) {
              return (
                <div key={idx} className="bg-white/60 border-l-4 border-amber-500 p-4 rounded-r-2xl border-y border-r border-slate-200/80 space-y-2 shadow-sm">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-800 flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400 inline-block shadow-[0_0_8px_rgba(251,191,36,0.8)]"></span>
                    <span>{headerText}</span>
                  </h4>
                  {bodyText.length > 0 && (
                    <div className="space-y-1.5 text-xs text-slate-600 leading-relaxed pl-4">
                      {renderLines(bodyText)}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <div key={idx} className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200/60 space-y-2 text-xs sm:text-sm text-slate-600 leading-relaxed shadow-sm hover:border-slate-300 transition-colors">
                {renderLines(lines)}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export const LearningModules: React.FC<LearningModulesProps> = ({
  user,
  courses,
  activeCourseId,
  onCompleteLesson,
  onStartExam,
  tkaSubTab: externalTkaSubTab,
  onSelectTkaSubTab,
}) => {
  const [internalTkaSubTab, setInternalTkaSubTab] = useState<'materi' | 'latihan_bab' | 'try_out_tka'>('materi');
  const activeTkaSubTab = externalTkaSubTab || internalTkaSubTab;

  const handleSubTabChange = (sub: 'materi' | 'latihan_bab' | 'try_out_tka') => {
    setInternalTkaSubTab(sub);
    if (onSelectTkaSubTab) {
      onSelectTkaSubTab(sub);
    }
  };

  const [selectedCategoryTab, setSelectedCategoryTab] = useState<'10' | '11' | '12' | 'tka'>(
    user.grade === 12 ? '12' : (user.grade === 11 ? '11' : '10')
  );

  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = useMemo(() => {
    const list = courses.filter((c) => {
      const isTkaCourse = c.category?.toLowerCase().includes('tka') || c.title?.toLowerCase().includes('tka');
      
      let matchesTab = false;
      if (selectedCategoryTab === 'tka') {
        matchesTab = isTkaCourse;
      } else {
        if (isTkaCourse) matchesTab = false;
        else matchesTab = c.grade_level === Number(selectedCategoryTab);
      }

      if (!matchesTab) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      const matchCourse = c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q);
      const matchLesson = c.lessons.some(l => 
        l.title.toLowerCase().includes(q) || 
        l.text_body.toLowerCase().includes(q) ||
        (l.key_takeaways && l.key_takeaways.some(kt => kt.toLowerCase().includes(q)))
      );

      return matchCourse || matchLesson;
    });

    if (selectedCategoryTab === 'tka') {
      return [...list].sort((a, b) => {
        const getUnitNum = (title: string) => {
          const match = title.match(/Unit\s+(\d+)([A-Z]?)/i);
          if (match) {
            const num = parseInt(match[1]);
            const sub = match[2] ? 0.5 : 0;
            return num + sub;
          }
          return 99;
        };
        return getUnitNum(a.title) - getUnitNum(b.title);
      });
    }

    return list;
  }, [courses, selectedCategoryTab, searchQuery]);

  const initialCourse = courses.find((c) => c.id === activeCourseId) || filteredCourses[0] || courses[0];
  const [currentCourse, setCurrentCourse] = useState<Course>(initialCourse);
  const [selectedLesson, setSelectedLesson] = useState<Lesson>(initialCourse.lessons[0]);
  const [activeDetailCourse, setActiveDetailCourse] = useState<Course | null>(() => {
    if (activeCourseId) {
      return courses.find((c) => c.id === activeCourseId) || null;
    }
    return null;
  });

  const openDetailCourse = (course: Course) => {
    setActiveDetailCourse(course);
    setCurrentCourse(course);
    if (course.lessons && course.lessons.length > 0) {
      setSelectedLesson(course.lessons[0]);
      setBookmarked(course.lessons[0].bookmarked || false);
    }
  };

  const backToGrid = () => {
    setActiveDetailCourse(null);
  };

  // Track expanded accordion states for course cards
  const [expandedCourseIds, setExpandedCourseIds] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    courses.forEach(c => {
      initial[c.id] = c.id === initialCourse.id;
    });
    return initial;
  });

  const toggleCourseExpand = (courseId: string) => {
    setExpandedCourseIds(prev => ({
      ...prev,
      [courseId]: !prev[courseId]
    }));
  };

  React.useEffect(() => {
    if (activeCourseId) {
      const found = courses.find((c) => c.id === activeCourseId);
      if (found) {
        const isTka = found.category?.toLowerCase().includes('tka') || found.title?.toLowerCase().includes('tka');
        if (isTka) {
          setSelectedCategoryTab('tka');
        } else {
          setSelectedCategoryTab(String(found.grade_level) as any);
        }
        setCurrentCourse(found);
        if (found.lessons && found.lessons.length > 0) {
          setSelectedLesson(found.lessons[0]);
        }
        setExpandedCourseIds(prev => ({ ...prev, [found.id]: true }));
      }
    }
  }, [activeCourseId, courses]);

  // Also auto expand first course when category tab changes
  React.useEffect(() => {
    if (filteredCourses.length > 0) {
      const first = filteredCourses[0];
      setExpandedCourseIds(prev => ({ ...prev, [first.id]: true }));
    }
  }, [selectedCategoryTab]);
  
  const [bookmarked, setBookmarked] = useState<boolean>(selectedLesson?.bookmarked || false);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(
    new Set(courses.flatMap(c => c.lessons).filter(l => l.completed).map(l => l.id))
  );

  // Speed state
  const [playbackSpeed, setPlaybackSpeed] = useState<string>('1x');

  // Time-stamped notes state
  const [notes, setNotes] = useState<VideoNote[]>([
    {
      id: 'note_1',
      lesson_id: 'les_10_1',
      timestamp_seconds: 145,
      timestamp_formatted: '02:25',
      text: 'Catatan: Auguste Comte membagi tahap positivis sebagai puncak pemikiran rasional berbasis data empiris.',
      created_at: '2 hari lalu',
    }
  ]);
  const [newNoteText, setNewNoteText] = useState('');
  const [newNoteTime, setNewNoteTime] = useState('01:30');

  // Threaded Comments state
  const [comments, setComments] = useState<LessonComment[]>(INITIAL_COMMENTS);
  const [newCommentText, setNewCommentText] = useState('');
  const [replyParentId, setReplyParentId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  const handleLessonChange = (lesson: Lesson, course: Course) => {
    setCurrentCourse(course);
    setSelectedLesson(lesson);
    setBookmarked(lesson.bookmarked || false);
  };

  const handleToggleComplete = () => {
    if (!selectedLesson) return;
    const isCompleted = completedLessons.has(selectedLesson.id);
    const newSet = new Set(completedLessons);

    if (isCompleted) {
      newSet.delete(selectedLesson.id);
    } else {
      newSet.add(selectedLesson.id);
      onCompleteLesson(selectedLesson.id, selectedLesson.xp_reward);
    }

    setCompletedLessons(newSet);
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;

    const parts = newNoteTime.split(':');
    const seconds = parts.length === 2 ? parseInt(parts[0]) * 60 + parseInt(parts[1]) : 90;

    const noteObj: VideoNote = {
      id: `note_${Date.now()}`,
      lesson_id: selectedLesson.id,
      timestamp_seconds: seconds,
      timestamp_formatted: newNoteTime || '01:30',
      text: newNoteText,
      created_at: 'Baru saja',
    };

    setNotes((prev) => [noteObj, ...prev]);
    setNewNoteText('');
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const commentObj: LessonComment = {
      id: `cmt_${Date.now()}`,
      lesson_id: selectedLesson.id,
      user_name: user.name,
      user_role: user.role,
      avatar: user.avatarUrl,
      text: newCommentText,
      created_at: 'Baru saja',
      likes: 0,
      replies: [],
    };

    setComments((prev) => [commentObj, ...prev]);
    setNewCommentText('');
  };

  const handleAddReply = (parentId: string) => {
    if (!replyText.trim()) return;

    const replyObj: LessonComment = {
      id: `reply_${Date.now()}`,
      lesson_id: selectedLesson.id,
      user_name: user.name,
      user_role: user.role,
      avatar: user.avatarUrl,
      text: replyText,
      created_at: 'Baru saja',
      likes: 0,
    };

    setComments((prev) =>
      prev.map((c) => {
        if (c.id === parentId) {
          return {
            ...c,
            replies: [...(c.replies || []), replyObj],
          };
        }
        return c;
      })
    );

    setReplyText('');
    setReplyParentId(null);
  };

  // Find next and previous lessons for navigation
  const allLessonsFlat = useMemo(() => {
    return filteredCourses.flatMap(c => c.lessons.map(l => ({ lesson: l, course: c })));
  }, [filteredCourses]);

  const currentIndex = allLessonsFlat.findIndex(item => item.lesson.id === selectedLesson?.id);
  const prevLessonItem = currentIndex > 0 ? allLessonsFlat[currentIndex - 1] : null;
  const nextLessonItem = currentIndex >= 0 && currentIndex < allLessonsFlat.length - 1 ? allLessonsFlat[currentIndex + 1] : null;

  return (
    <div className="space-y-6 pb-12">
      {/* Header & Grade Selection */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-slate-800">
        <div>
          <div className="inline-flex items-center space-x-1.5 text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full mb-1.5 border border-blue-300">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Learning Path Sosiologi Membumi</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-800">
            {selectedCategoryTab === 'tka' ? 'Modul & Materi TKA Sosiologi (UTBK / PTN)' : `Kurikulum Sosiologi Kelas ${selectedCategoryTab} SMA`}
          </h1>
          <p className="text-xs text-white0">Pilih jenjang kelas atau pilar TKA untuk mengeksplorasi bab dan materi lengkap</p>
        </div>

        {/* Grade & TKA Tabs */}
        <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-300 text-xs font-bold gap-1 flex-wrap shrink-0">
          <button
            onClick={() => {
              setSelectedCategoryTab('10');
              setActiveDetailCourse(null);
              const c = courses.find(course => course.grade_level === 10);
              if (c) {
                setCurrentCourse(c);
                setSelectedLesson(c.lessons[0]);
              }
            }}
            className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
              selectedCategoryTab === '10'
                ? 'bg-orange-500 text-white shadow-sm border border-slate-200 font-extrabold'
                : 'text-slate-600 hover:text-slate-800'
            }`}
          >
            Kelas 10 (3 Bab)
          </button>
          <button
            onClick={() => {
              setSelectedCategoryTab('11');
              setActiveDetailCourse(null);
              const c = courses.find(course => course.grade_level === 11);
              if (c) {
                setCurrentCourse(c);
                setSelectedLesson(c.lessons[0]);
              }
            }}
            className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
              selectedCategoryTab === '11'
                ? 'bg-orange-500 text-white shadow-sm border border-slate-200 font-extrabold'
                : 'text-slate-600 hover:text-slate-800'
            }`}
          >
            Kelas 11 (3 Bab)
          </button>
          <button
            onClick={() => {
              setSelectedCategoryTab('12');
              setActiveDetailCourse(null);
              const c = courses.find(course => course.grade_level === 12 && !course.category?.includes('TKA'));
              if (c) {
                setCurrentCourse(c);
                setSelectedLesson(c.lessons[0]);
              }
            }}
            className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
              selectedCategoryTab === '12'
                ? 'bg-orange-500 text-white shadow-sm border border-slate-200 font-extrabold'
                : 'text-slate-600 hover:text-slate-800'
            }`}
          >
            Kelas 12 (3 Bab)
          </button>
          <button
            onClick={() => {
              setSelectedCategoryTab('tka');
              setActiveDetailCourse(null);
              const c = courses.find(course => course.category?.toLowerCase().includes('tka'));
              if (c) {
                setCurrentCourse(c);
                setSelectedLesson(c.lessons[0]);
              }
            }}
            className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
              selectedCategoryTab === 'tka'
                ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-stone-950 shadow-sm border border-slate-200 font-black'
                : 'text-orange-600 hover:text-orange-500'
            }`}
          >
            🎯 TKA Sosiologi (10 Unit)
          </button>
        </div>
      </div>

      {/* MAIN VIEW: Overview Grid or Kegiatan Belajar Detail View */}
      {!activeDetailCourse ? (
        /* GRID VIEW OF CHAPTERS ("KOTAK-KOTAK") */
        <div className="space-y-6">
          {/* TKA Subtab Selector Bar */}
          {selectedCategoryTab === 'tka' && (
            <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm border border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center space-x-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-200">
                <button
                  onClick={() => handleSubTabChange('materi')}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold flex items-center space-x-2 transition-all cursor-pointer ${
                    activeTkaSubTab === 'materi'
                      ? 'bg-orange-500 text-white shadow-sm border border-slate-200 border border-amber-300'
                      : 'text-slate-600 hover:text-orange-500 hover:bg-white'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span className="capitalize">materi</span>
                </button>

                <button
                  onClick={() => handleSubTabChange('latihan_bab')}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold flex items-center space-x-2 transition-all cursor-pointer ${
                    activeTkaSubTab === 'latihan_bab'
                      ? 'bg-orange-500 text-white shadow-sm border border-slate-200 border border-amber-300'
                      : 'text-slate-600 hover:text-orange-500 hover:bg-white'
                  }`}
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span className="capitalize">latihan bab</span>
                </button>

                <button
                  onClick={() => handleSubTabChange('try_out_tka')}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold flex items-center space-x-2 transition-all cursor-pointer ${
                    activeTkaSubTab === 'try_out_tka'
                      ? 'bg-orange-500 text-white shadow-sm border border-slate-200 border border-amber-300'
                      : 'text-slate-600 hover:text-orange-500 hover:bg-white'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Try out TKA</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                </button>
              </div>

              <div className="text-xs font-semibold text-white0">
                {activeTkaSubTab === 'materi' && '📖 Mode Pembahasan & Rangkuman 10 Unit TKA'}
                {activeTkaSubTab === 'latihan_bab' && '📝 Mode Latihan Soal CBT per Bab (20 Soal)'}
                {activeTkaSubTab === 'try_out_tka' && '🎯 Mode Simulasi Ujian Tryout TKA Standar Nasional 2025'}
              </div>
            </div>
          )}

          {/* Grid Header & Search Bar */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2 text-xs font-extrabold text-orange-600 mb-1">
                <LayoutGrid className="w-4 h-4" />
                <span>
                  {selectedCategoryTab === 'tka'
                    ? (activeTkaSubTab === 'try_out_tka' ? 'Paket Tryout TKA Resmi 2025' : (activeTkaSubTab === 'latihan_bab' ? 'Paket Latihan Soal CBT 10 Unit TKA' : 'Daftar 10 Unit Materi TKA Kotak-Kotak'))
                    : 'Daftar Bab Tersusun Kotak-Kotak'}
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-800">
                {selectedCategoryTab === 'tka' && activeTkaSubTab === 'try_out_tka'
                  ? 'Try Out TKA Sosiologi Standar Nasional'
                  : `Pilih Bab / Unit Pembelajaran (${filteredCourses.length} Bab Tersedia)`}
              </h2>
              <p className="text-xs text-white0">
                {selectedCategoryTab === 'tka' && activeTkaSubTab === 'latihan_bab'
                  ? 'Klik tombol "Kerjakan Latihan CBT" pada kotak bab untuk langsung memulai latihan 20 soal CBT per unit.'
                  : 'Klik pada salah satu kotak bab di bawah untuk masuk ke Kegiatan Belajar lengkap dengan Sub-bab dan Latihan Soal CBT.'}
              </p>
            </div>

            <div className="relative min-w-[260px]">
              <Search className="w-4 h-4 text-white0 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari materi sosiologi..."
                className="w-full bg-slate-50 border border-slate-300 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-slate-700 focus:outline-none focus:border-amber-500 placeholder-stone-500 shadow-sm"
              />
            </div>
          </div>

          {/* Special view for Try out TKA subtab */}
          {selectedCategoryTab === 'tka' && activeTkaSubTab === 'try_out_tka' ? (
            <div className="space-y-6">
              {/* Featured 2025 Official Tryout Card */}
              <div className="bg-gradient-to-br from-amber-950/80 via-stone-900 to-stone-900 rounded-3xl p-6 border-2 border-amber-500/80 shadow-xl relative overflow-hidden space-y-4">
                <div className="absolute top-0 right-0 bg-orange-500 text-white text-[10px] font-black uppercase px-4 py-1 rounded-bl-2xl shadow-sm border border-slate-200">
                  ★ Paket Utama TKA Resmi 2025
                </div>

                <div className="space-y-2 max-w-3xl">
                  <div className="flex items-center space-x-2 text-xs font-bold text-orange-500">
                    <Sparkles className="w-4 h-4 text-orange-600" />
                    <span>Tryout Tes Kemampuan Akademik (TKA) Standar Nasional</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-800 leading-snug">
                    Tryout TKA Sosiologi SMA Tahun 2025 - 30 Soal Standar Nasional
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Simulasi Resmi Ujian Tes Kemampuan Akademik (TKA) Sosiologi SMA/MA/SMK Tahun 2025. Mencakup 30 Indikator Soal standar nasional dengan 3 model soal resmi (Pilihan Ganda Biasa, Pilihan Ganda Kompleks/Benar-Salah, dan Soal Uji Kasus/Infografis/Grafik).
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200">
                  <div className="flex items-center space-x-4 text-xs font-semibold text-slate-600">
                    <span className="bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 flex items-center space-x-1.5">
                      <Clock className="w-3.5 h-3.5 text-orange-600" />
                      <span>45 Menit</span>
                    </span>
                    <span className="bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 flex items-center space-x-1.5">
                      <FileText className="w-3.5 h-3.5 text-orange-600" />
                      <span>30 Soal HOTS</span>
                    </span>
                    <span className="bg-orange-50 text-orange-500 px-3 py-1.5 rounded-xl border border-orange-300 flex items-center space-x-1.5">
                      <Award className="w-3.5 h-3.5 text-orange-600" />
                      <span>+400 Socio-Points</span>
                    </span>
                  </div>

                  <button
                    onClick={() => onStartExam && onStartExam('exam_tka_2025_resmi')}
                    className="px-6 py-3 rounded-2xl bg-orange-500 hover:bg-amber-400 text-stone-950 font-black text-xs transition-all shadow-lg hover:shadow-amber-500/20 cursor-pointer flex items-center space-x-2 transform hover:scale-105"
                  >
                    <Play className="w-4 h-4 fill-stone-950" />
                    <span>Mulai Kerjakan Ujian TKA 2025</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Course Cards Grid */
            filteredCourses.length === 0 ? (
              <div className="bg-white rounded-3xl p-10 text-center text-xs text-white0 border border-slate-200">
                Tidak ada materi yang sesuai dengan pencarian "{searchQuery}".
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => {
                  const completedCount = course.lessons.filter(l => completedLessons.has(l.id)).length;
                  const progressPct = Math.round((completedCount / course.lessons.length) * 100);
                  const examTargetId = `exam_latihan_bab_${course.chapter_number}`;

                  return (
                    <div
                      key={course.id}
                      onClick={() => openDetailCourse(course)}
                      className="group bg-white hover:bg-stone-850 rounded-3xl border border-slate-200 hover:border-amber-500/60 p-6 shadow-sm border border-slate-200 hover:shadow-amber-500/10 transition-all cursor-pointer flex flex-col justify-between space-y-5 relative overflow-hidden transform hover:-translate-y-1 select-none"
                    >
                      {/* Top Card Info */}
                      <div className="space-y-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="space-y-3">
                            <span className="inline-block text-[10px] font-black uppercase tracking-wider text-orange-600 bg-orange-50 px-3 py-1 rounded-full border border-orange-300 shadow-xs">
                              {course.category}
                            </span>
                            <h3 className="text-base sm:text-lg font-extrabold text-slate-800 group-hover:text-orange-500 transition-colors leading-snug">
                              {course.title}
                            </h3>
                          </div>
                          
                          {/* Circular Progress Indicator */}
                          <div className="relative w-12 h-12 flex items-center justify-center shrink-0 bg-slate-50 rounded-full border border-slate-200 shadow-sm">
                            <svg className="w-10 h-10 transform -rotate-90" viewBox="0 0 36 36">
                              <path
                                className="text-stone-800"
                                strokeWidth="3.5"
                                stroke="currentColor"
                                fill="none"
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              />
                              <path
                                className={`${progressPct === 100 ? 'text-blue-600' : 'text-amber-500'} transition-all duration-1000 ease-out`}
                                strokeWidth="3.5"
                                strokeDasharray={`${progressPct}, 100`}
                                strokeLinecap="round"
                                stroke="currentColor"
                                fill="none"
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center flex-col">
                              <span className="text-[10px] font-bold text-slate-600">{progressPct}%</span>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-xs text-white0 line-clamp-2 leading-relaxed">
                          {course.description}
                        </p>
                      </div>

                      {/* Sub-Bab Preview List */}
                      <div className="space-y-2 bg-slate-800/60 p-3.5 rounded-2xl border border-slate-200/80 text-xs">
                        <div className="flex items-center justify-between text-[10px] uppercase font-bold text-white0 mb-1">
                          <span>Sub-Bab & Kegiatan Belajar</span>
                          <span className="text-orange-600">{course.lessons.length} Sub-Bab</span>
                        </div>
                        <ul className="space-y-1.5">
                          {course.lessons.slice(0, 3).map((l, lIdx) => {
                            const isDone = completedLessons.has(l.id);
                            return (
                              <li key={l.id} className="flex items-center space-x-2 text-slate-600 text-[11px] truncate">
                                <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0 ${
                                  isDone ? 'bg-blue-500 text-stone-950' : 'bg-slate-100 text-white0'
                                }`}>
                                  {isDone ? '✓' : lIdx + 1}
                                </span>
                                <span className="truncate">{l.title}</span>
                              </li>
                            );
                          })}
                          {course.lessons.length > 3 && (
                            <li className="text-[10px] text-orange-600 font-bold pl-6 pt-0.5">
                              +{course.lessons.length - 3} Sub-Bab Tambahan & Latihan CBT
                            </li>
                          )}
                        </ul>
                      </div>

                      {/* Progress & CTA Button */}
                      <div className="pt-3 border-t border-slate-200/80 space-y-3">
                        <div className="space-y-1">
                          <div className="flex justify-between text-[10px] font-bold text-white0">
                            <span>Progres Unit</span>
                            <span className="text-orange-600">{progressPct}%</span>
                          </div>
                          <div className="w-full bg-slate-50 rounded-full h-1.5 overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-orange-500 to-blue-500 h-full transition-all duration-300"
                              style={{ width: `${progressPct}%` }}
                            />
                          </div>
                        </div>

                        {selectedCategoryTab === 'tka' && activeTkaSubTab === 'latihan_bab' ? (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (onStartExam) onStartExam(examTargetId);
                            }}
                            className="w-full py-2.5 rounded-xl bg-orange-500 hover:bg-amber-400 text-stone-950 font-black text-xs transition-all shadow-sm border border-slate-200 flex items-center justify-center space-x-2 cursor-pointer"
                          >
                            <FileText className="w-4 h-4" />
                            <span>Mulai Latihan CBT (20 Soal)</span>
                          </button>
                        ) : (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openDetailCourse(course);
                            }}
                            className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-orange-500 hover:text-stone-950 text-slate-700 font-bold text-xs transition-all flex items-center justify-center space-x-2 cursor-pointer"
                          >
                            <BookOpen className="w-3.5 h-3.5" />
                            <span>Buka Materi Unit</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )
          )}
        </div>
      ) : (
        /* KEGIATAN BELAJAR DETAIL VIEW */
        <div className="space-y-6">
          {/* Header Navigation Bar */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-slate-800">
            <div className="flex items-center space-x-3">
              <button
                onClick={backToGrid}
                className="bg-slate-100 hover:bg-orange-500 hover:text-stone-950 text-slate-700 font-extrabold text-xs px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 border border-slate-300 cursor-pointer shadow-sm shrink-0"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>← Kembali ke Daftar Bab (Grid)</span>
              </button>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-orange-600 bg-orange-50 px-2.5 py-0.5 rounded-md border border-orange-300">
                  {activeDetailCourse.category}
                </span>
                <h2 className="text-base sm:text-lg font-extrabold text-slate-800 truncate max-w-md mt-0.5">
                  Kegiatan Belajar: {activeDetailCourse.title}
                </h2>
              </div>
            </div>

            <div className="flex items-center space-x-4 text-xs text-slate-600 bg-slate-50 px-5 py-3 rounded-2xl border border-slate-200 shrink-0 shadow-sm">
              <div className="flex flex-col items-end">
                <span className="font-bold text-slate-700">
                  {activeDetailCourse.lessons.filter(l => completedLessons.has(l.id)).length} / {activeDetailCourse.lessons.length} Sub-Bab
                </span>
                <span className="text-[10px] text-slate-400">Telah Diselesaikan</span>
              </div>
              
              {(() => {
                 const comp = activeDetailCourse.lessons.filter(l => completedLessons.has(l.id)).length;
                 const tot = activeDetailCourse.lessons.length;
                 const pct = Math.round((comp / tot) * 100);
                 return (
                   <div className="relative w-10 h-10 flex items-center justify-center shrink-0">
                     <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                       <path
                         className="text-stone-800"
                         strokeWidth="3.5"
                         stroke="currentColor"
                         fill="none"
                         d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                       />
                       <path
                         className={`${pct === 100 ? 'text-blue-600' : 'text-amber-500'} transition-all duration-1000 ease-out`}
                         strokeWidth="3.5"
                         strokeDasharray={`${pct}, 100`}
                         strokeLinecap="round"
                         stroke="currentColor"
                         fill="none"
                         d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                       />
                     </svg>
                     <div className="absolute inset-0 flex items-center justify-center flex-col">
                       <span className="text-[10px] font-bold text-slate-600">{pct}%</span>
                     </div>
                   </div>
                 );
              })()}
            </div>
          </div>

          {/* Detail View 2-column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column: Sub-Bab Navigator */}
            <div className="space-y-4">
              <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm border border-slate-200 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <span className="font-bold text-xs text-orange-600 flex items-center space-x-1.5">
                    <ListOrdered className="w-4 h-4" />
                    <span>Sub-Bab & Latihan CBT</span>
                  </span>
                  <span className="text-[11px] text-white0">
                    {activeDetailCourse.lessons.length} Sub-Bab
                  </span>
                </div>

                {/* Sub-bab list buttons */}
                <div className="space-y-2">
                  {activeDetailCourse.lessons.map((lesson, idx) => {
                    const isSelected = selectedLesson?.id === lesson.id;
                    const isDone = completedLessons.has(lesson.id);
                    const isCbt = lesson.exam_id_target || lesson.id === 'les_tka_1_i' || lesson.title.toLowerCase().includes('20 soal cbt');

                    return (
                      <button
                        key={lesson.id}
                        onClick={() => handleLessonChange(lesson, activeDetailCourse)}
                        className={`w-full text-left p-3.5 rounded-2xl transition-all cursor-pointer flex items-center justify-between group ${
                          isSelected
                            ? 'bg-orange-50/90 text-orange-700 border border-amber-500/70 shadow-sm border border-slate-200 ring-1 ring-amber-500/30'
                            : 'bg-slate-100/70 hover:bg-slate-100 text-slate-600 border border-slate-300/50'
                        }`}
                      >
                        <div className="flex items-center space-x-3 pr-2 min-w-0">
                          <div
                            className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 font-extrabold text-xs transition-all ${
                              isSelected
                                ? 'bg-orange-500 text-white shadow-sm'
                                : isDone
                                ? 'bg-blue-50 text-blue-600 border border-blue-300'
                                : 'bg-slate-200 text-slate-600'
                            }`}
                          >
                            {isDone ? <Check className="w-4 h-4 stroke-[3]" /> : idx + 1}
                          </div>

                          <div className="min-w-0">
                            <p
                              className={`text-xs font-bold truncate ${
                                isSelected ? 'text-orange-700' : 'text-slate-800'
                              }`}
                            >
                              {lesson.title}
                            </p>
                            <div className="flex items-center space-x-2 text-[10px] mt-0.5">
                              <span className={isSelected ? 'text-orange-600 font-medium' : 'text-white0'}>
                                {lesson.duration}
                              </span>
                              {isCbt && (
                                <span className="bg-orange-500/20 text-orange-500 px-1.5 py-0.2 rounded text-[9px] font-bold border border-amber-500/40">
                                  20 Soal CBT
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {lesson.content_type === 'video' ? (
                          <Play className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-orange-600 fill-amber-400' : 'text-white0'}`} />
                        ) : isCbt ? (
                          <ShieldAlert className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-orange-600' : 'text-amber-500/70'}`} />
                        ) : (
                          <FileText className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-orange-500' : 'text-white0'}`} />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Pindah Bab Quick Switcher */}
              <div className="bg-white rounded-3xl p-4 border border-slate-200 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-white0 block">
                  Pindah Ke Bab Lain ({filteredCourses.length} Bab)
                </span>
                <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
                  {filteredCourses.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => openDetailCourse(c)}
                      className={`w-full text-left p-2 rounded-xl text-xs font-medium transition-all cursor-pointer truncate ${
                        c.id === activeDetailCourse.id
                          ? 'bg-orange-500/20 text-orange-500 font-bold border border-amber-500/40'
                          : 'text-white0 hover:text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      • {c.title}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column (2 cols): Main Lesson View */}
            <div className="lg:col-span-2 space-y-6">
              {selectedLesson ? (
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm border border-slate-200 space-y-6 text-slate-800">
              {/* Top lesson info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
                <div>
                  <div className="flex items-center space-x-2 text-xs font-semibold text-white0 mb-1 flex-wrap gap-y-1">
                    <span className="bg-slate-100 text-orange-500 px-2.5 py-0.5 rounded-md font-bold">
                      Bab {selectedLesson.chapter_number}: {selectedLesson.chapter_title}
                    </span>
                    <span>•</span>
                    <span className="flex items-center space-x-1 text-orange-600 font-bold">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{selectedLesson.duration}</span>
                    </span>
                    <span>•</span>
                    <span className="text-blue-600 font-bold">+{selectedLesson.xp_reward} XP</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-800 tracking-tight mt-1">
                    {selectedLesson.title}
                  </h2>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  <button
                    onClick={() => setBookmarked(!bookmarked)}
                    className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                      bookmarked
                        ? 'bg-orange-50 text-orange-500 border-amber-600'
                        : 'bg-slate-100 text-white0 border-slate-300 hover:bg-slate-200'
                    }`}
                    title="Simpan Bookmark"
                  >
                    <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
                  </button>

                  <button
                    onClick={handleToggleComplete}
                    className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center space-x-2 transition-all cursor-pointer shadow-xs ${
                      completedLessons.has(selectedLesson.id)
                        ? 'bg-blue-50 text-blue-500 border border-emerald-700'
                        : 'bg-gradient-to-r from-blue-600 to-orange-600 text-stone-950 font-extrabold shadow-sm border border-slate-200'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>
                      {completedLessons.has(selectedLesson.id)
                        ? 'Selesai Dibaca (+50 XP)'
                        : 'Tandai Selesai (+50 XP)'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Video Player Section if lesson is video */}
              {selectedLesson.content_type === 'video' && (
                <div className="space-y-3">
                  <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-50 shadow-sm border border-slate-200 border border-slate-200">
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube-nocookie.com/embed/${selectedLesson.youtube_id || 'L321K6G4dps'}?autoplay=0&rel=0`}
                      title={selectedLesson.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>

                  {/* Player controls bar */}
                  <div className="flex items-center justify-between bg-slate-100/80 px-4 py-2.5 rounded-2xl border border-slate-300 text-xs">
                    <span className="text-slate-600 font-medium text-[11px]">Kecepatan Putar Video:</span>
                    <div className="flex items-center space-x-1">
                      {['1x', '1.25x', '1.5x', '2x'].map((spd) => (
                        <button
                          key={spd}
                          onClick={() => setPlaybackSpeed(spd)}
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                            playbackSpeed === spd
                              ? 'bg-orange-500 text-white font-extrabold'
                              : 'bg-white text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {spd}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Time-Stamped Notes Feature */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div className="flex items-center space-x-2 text-orange-600 font-bold text-xs">
                    <StickyNote className="w-4 h-4" />
                    <span>Catatan Berbasis Waktu (Time-Stamped Notes)</span>
                  </div>
                  <span className="text-[10px] text-white0">Otomatis Tersimpan</span>
                </div>

                {/* Form to add note */}
                <form onSubmit={handleAddNote} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={newNoteTime}
                    onChange={(e) => setNewNoteTime(e.target.value)}
                    placeholder="01:30"
                    className="w-20 bg-white border border-slate-300 rounded-xl px-2.5 py-2 text-xs font-mono text-orange-500 focus:outline-none"
                  />
                  <input
                    type="text"
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                    placeholder="Tulis catatan penting pada menit ini..."
                    className="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-700 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-orange-500 hover:bg-amber-400 text-stone-950 font-bold px-3 py-2 rounded-xl text-xs flex items-center space-x-1 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span className="hidden sm:inline">Tambah</span>
                  </button>
                </form>

                {/* Notes List */}
                <div className="space-y-2 pt-1">
                  {notes.filter(n => n.lesson_id === selectedLesson.id || true).map((note) => (
                    <div key={note.id} className="bg-white/80 p-3 rounded-xl border border-slate-200 flex items-start justify-between text-xs gap-3">
                      <div className="flex items-start space-x-2.5">
                        <span className="bg-orange-50 text-orange-500 font-mono font-bold text-[10px] px-2 py-0.5 rounded-lg border border-orange-300 shrink-0">
                          [{note.timestamp_formatted}]
                        </span>
                        <p className="text-slate-600 text-[11px] leading-relaxed">{note.text}</p>
                      </div>
                      <span className="text-[10px] text-slate-400 shrink-0">{note.created_at}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Formatted Material Body */}
              <FormattedMaterialBody lesson={selectedLesson} onStartExam={onStartExam} />

              {/* Prev / Next Lesson Navigation Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-200 gap-3">
                {prevLessonItem ? (
                  <button
                    onClick={() => handleLessonChange(prevLessonItem.lesson, prevLessonItem.course)}
                    className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="hidden sm:inline truncate max-w-[160px]">{prevLessonItem.lesson.title}</span>
                    <span className="sm:hidden">Sebelumnya</span>
                  </button>
                ) : <div></div>}

                {nextLessonItem ? (
                  <button
                    onClick={() => handleLessonChange(nextLessonItem.lesson, nextLessonItem.course)}
                    className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-amber-400 text-stone-950 text-xs font-extrabold transition-all cursor-pointer shadow-sm border border-slate-200"
                  >
                    <span className="hidden sm:inline truncate max-w-[160px]">{nextLessonItem.lesson.title}</span>
                    <span className="sm:hidden">Selanjutnya</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => onStartExam && onStartExam(selectedLesson.exam_id_target || 'exam_latihan_bab_1')}
                    className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-blue-500 hover:bg-emerald-400 text-stone-950 text-xs font-black transition-all cursor-pointer shadow-sm border border-slate-200"
                  >
                    <span>Latihan Soal Bab</span>
                    <PlayCircle className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Latihan Bab & Ulangan Harian Trigger */}
              <div className="bg-gradient-to-br from-amber-950/60 via-stone-900 to-emerald-950/60 p-6 rounded-2xl border border-amber-600/40 space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-orange-600 bg-orange-50/80 px-2.5 py-0.5 rounded-full border border-orange-300">
                      Evaluasi Akhir Pembelajaran
                    </span>
                    <h3 className="text-base font-bold text-slate-800 mt-1">
                      Latihan Soal & Ulangan Harian Bab {selectedLesson.chapter_number}
                    </h3>
                    <p className="text-xs text-white0">
                      Selesaikan Latihan Bab & Ulangan Harian untuk menguji pemahaman konsep sosiologimu
                    </p>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0">
                    <button
                      onClick={() => {
                        const targetId = selectedLesson.exam_id_target || 
                          (selectedLesson.id === 'les_tka_1_i' ? 'exam_latihan_bab_1' : `exam_latihan_bab_${selectedLesson.chapter_number}`);
                        onStartExam && onStartExam(targetId);
                      }}
                      className="bg-orange-500 hover:bg-amber-400 text-stone-950 font-extrabold px-4 py-2.5 rounded-xl text-xs flex items-center space-x-1.5 transition-all shadow-sm border border-slate-200 cursor-pointer"
                    >
                      <PlayCircle className="w-4 h-4" />
                      <span>Kerjakan Latihan Bab (20 Soal CBT)</span>
                    </button>
                    <button
                      onClick={() => onStartExam && onStartExam('exam_12_1')}
                      className="bg-blue-600 hover:bg-blue-500 text-stone-950 font-extrabold px-4 py-2.5 rounded-xl text-xs flex items-center space-x-1.5 transition-all shadow-sm border border-slate-200 cursor-pointer"
                    >
                      <Award className="w-4 h-4" />
                      <span>Ulangan Harian</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Threaded Discussion Forum */}
              <div className="bg-slate-50 p-5 sm:p-6 rounded-2xl border border-slate-200 space-y-6">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div className="flex items-center space-x-2 text-orange-500 font-bold text-xs">
                    <MessageSquare className="w-4 h-4 text-orange-600" />
                    <span>Forum Diskusi Berantai (Threaded Discussion)</span>
                  </div>
                  <span className="text-[10px] text-white0">{comments.length} Diskusi Aktif</span>
                </div>

                {/* Add New Parent Comment */}
                <form onSubmit={handleAddComment} className="flex items-center space-x-2">
                  <img src={user.avatarUrl} alt={user.name} className="w-8 h-8 rounded-full object-cover shrink-0" />
                  <input
                    type="text"
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    placeholder="Tanyakan atau tanggapi materi ini..."
                    className="flex-1 bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-700 focus:outline-none focus:border-amber-500"
                  />
                  <button
                    type="submit"
                    className="bg-orange-500 hover:bg-amber-400 text-stone-950 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center space-x-1 cursor-pointer shrink-0"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Kirim</span>
                  </button>
                </form>

                {/* Comments List */}
                <div className="space-y-4 pt-2">
                  {comments.map((cmt) => (
                    <div key={cmt.id} className="bg-white/80 p-4 rounded-2xl border border-slate-200 space-y-3 text-xs">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2.5">
                          <img src={cmt.avatar} alt={cmt.user_name} className="w-7 h-7 rounded-full object-cover" />
                          <div>
                            <span className="font-bold text-slate-800">{cmt.user_name}</span>
                            <span className="text-[10px] text-orange-600 ml-2 capitalize font-semibold bg-slate-100 px-2 py-0.5 rounded-md">
                              {cmt.user_role}
                            </span>
                          </div>
                        </div>
                        <span className="text-[10px] text-slate-400">{cmt.created_at}</span>
                      </div>

                      <p className="text-slate-600 leading-relaxed text-[11px] pl-9">{cmt.text}</p>

                      <div className="pl-9 flex items-center space-x-4 text-[10px] text-white0 font-semibold">
                        <button className="flex items-center space-x-1 hover:text-orange-500">
                          <ThumbsUp className="w-3 h-3" />
                          <span>{cmt.likes} Suka</span>
                        </button>
                        <button
                          onClick={() => setReplyParentId(replyParentId === cmt.id ? null : cmt.id)}
                          className="hover:text-orange-500"
                        >
                          Balas
                        </button>
                      </div>

                      {/* Reply Input Form */}
                      {replyParentId === cmt.id && (
                        <div className="pl-9 pt-2 flex items-center space-x-2">
                          <input
                            type="text"
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder="Tulis balasan..."
                            className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-700 focus:outline-none"
                          />
                          <button
                            onClick={() => handleAddReply(cmt.id)}
                            className="bg-blue-600 hover:bg-blue-500 text-stone-950 font-bold px-3 py-1.5 rounded-xl text-xs cursor-pointer"
                          >
                            Kirim
                          </button>
                        </div>
                      )}

                      {/* Nested Replies */}
                      {cmt.replies && cmt.replies.length > 0 && (
                        <div className="pl-9 pt-2 space-y-2 border-l-2 border-slate-200 ml-4">
                          {cmt.replies.map((reply) => (
                            <div key={reply.id} className="bg-slate-100 p-3 rounded-xl border border-slate-200 space-y-1">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  <img src={reply.avatar} alt={reply.user_name} className="w-6 h-6 rounded-full object-cover" />
                                  <span className="font-bold text-slate-700 text-[11px]">{reply.user_name}</span>
                                  <span className="text-[9px] text-blue-600 capitalize bg-blue-50 px-1.5 py-0.5 rounded border border-blue-300">
                                    {reply.user_role}
                                  </span>
                                </div>
                                <span className="text-[9px] text-slate-400">{reply.created_at}</span>
                              </div>
                              <p className="text-slate-600 text-[11px] leading-relaxed pl-8">{reply.text}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center text-slate-400 border border-slate-200">
              Pilih salah satu materi di sebelah kiri untuk mulai membaca.
            </div>
          )}
        </div>
      </div>
    </div>
  )}
</div>
);
};

