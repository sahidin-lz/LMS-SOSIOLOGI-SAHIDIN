import React, { useState } from 'react';
import { 
  BookOpen, Play, CheckCircle2, Bookmark, Award, Clock, ChevronRight, 
  Sparkles, FileText, Share2, Check, ArrowLeft, MessageSquare, ThumbsUp, Send, StickyNote, Plus, PlayCircle
} from 'lucide-react';
import { Course, Lesson, LessonComment, Role, User, VideoNote } from '../types';
import { INITIAL_COMMENTS } from '../data/sociologyData';

interface LearningModulesProps {
  user: User;
  courses: Course[];
  activeCourseId?: string;
  onCompleteLesson: (lessonId: string, xpReward: number) => void;
  onStartExam?: (examId: string) => void;
}

export const LearningModules: React.FC<LearningModulesProps> = ({
  user,
  courses,
  activeCourseId,
  onCompleteLesson,
  onStartExam,
}) => {
  const [selectedGrade, setSelectedGrade] = useState<10 | 11 | 12>(user.grade as any || 12);
  const filteredCourses = courses.filter((c) => c.grade_level === selectedGrade);
  
  const initialCourse = courses.find((c) => c.id === activeCourseId) || filteredCourses[0] || courses[0];
  const [currentCourse, setCurrentCourse] = useState<Course>(initialCourse);
  const [selectedLesson, setSelectedLesson] = useState<Lesson>(initialCourse.lessons[0]);
  
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

  const handleLessonChange = (lesson: Lesson) => {
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

  return (
    <div className="space-y-6 pb-12">
      {/* Header & Grade Selection */}
      <div className="bg-stone-900 rounded-3xl p-6 border border-stone-800 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-stone-100">
        <div>
          <div className="inline-flex items-center space-x-1.5 text-xs font-semibold text-emerald-400 bg-emerald-950 px-3 py-1 rounded-full mb-1 border border-emerald-800">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Learning Path Sosiologi Membumi</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-stone-100">
            Kurikulum Sosiologi Kelas {selectedGrade} SMA
          </h1>
          <p className="text-xs text-stone-400">Pilih jenjang kelas untuk menyesuaikan materi pembahasan</p>
        </div>

        {/* Grade Tabs */}
        <div className="flex bg-stone-800 p-1.5 rounded-2xl border border-stone-700 text-xs font-bold">
          <button
            onClick={() => {
              setSelectedGrade(10);
              const c = courses.find(course => course.grade_level === 10);
              if (c) {
                setCurrentCourse(c);
                setSelectedLesson(c.lessons[0]);
              }
            }}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              selectedGrade === 10
                ? 'bg-amber-500 text-stone-950 shadow-xs'
                : 'text-stone-300 hover:text-stone-100'
            }`}
          >
            Kelas 10
          </button>
          <button
            onClick={() => {
              setSelectedGrade(11);
              const c = courses.find(course => course.grade_level === 11);
              if (c) {
                setCurrentCourse(c);
                setSelectedLesson(c.lessons[0]);
              }
            }}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              selectedGrade === 11
                ? 'bg-amber-500 text-stone-950 shadow-xs'
                : 'text-stone-300 hover:text-stone-100'
            }`}
          >
            Kelas 11
          </button>
          <button
            onClick={() => {
              setSelectedGrade(12);
              const c = courses.find(course => course.grade_level === 12);
              if (c) {
                setCurrentCourse(c);
                setSelectedLesson(c.lessons[0]);
              }
            }}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              selectedGrade === 12
                ? 'bg-amber-500 text-stone-950 shadow-xs'
                : 'text-stone-300 hover:text-stone-100'
            }`}
          >
            Kelas 12
          </button>
        </div>
      </div>

      {/* Course & Lesson Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (1 col): Navigation Bab / Lessons List */}
        <div className="space-y-4">
          {filteredCourses.map((course) => (
            <div key={course.id} className="bg-stone-900 rounded-3xl p-5 border border-stone-800 shadow-sm space-y-4">
              <div className="border-b border-stone-800 pb-3">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-400 bg-amber-950 px-2.5 py-0.5 rounded-full border border-amber-800">
                  {course.category}
                </span>
                <h2 className="font-bold text-stone-100 text-sm mt-2">{course.title}</h2>
              </div>

              {/* Lesson Items list */}
              <div className="space-y-2">
                {course.lessons.map((lesson, idx) => {
                  const isSelected = selectedLesson?.id === lesson.id;
                  const isDone = completedLessons.has(lesson.id);

                  return (
                    <button
                      key={lesson.id}
                      onClick={() => {
                        setCurrentCourse(course);
                        handleLessonChange(lesson);
                      }}
                      className={`w-full text-left p-3 rounded-2xl transition-all cursor-pointer flex items-center justify-between group ${
                        isSelected
                          ? 'bg-amber-950 text-amber-200 border border-amber-600/60 shadow-md'
                          : 'bg-stone-800/80 hover:bg-stone-800 text-stone-300 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center space-x-3 pr-2">
                        <div
                          className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 font-extrabold text-xs ${
                            isSelected
                              ? 'bg-amber-500 text-stone-950'
                              : isDone
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                              : 'bg-stone-700 text-stone-300'
                          }`}
                        >
                          {isDone ? <Check className="w-4 h-4 stroke-[3]" /> : idx + 1}
                        </div>

                        <div>
                          <p
                            className={`text-xs font-bold line-clamp-1 ${
                              isSelected ? 'text-amber-200' : 'text-stone-100'
                            }`}
                          >
                            {lesson.title}
                          </p>
                          <p
                            className={`text-[10px] ${
                              isSelected ? 'text-amber-400' : 'text-stone-400'
                            }`}
                          >
                            Bab {lesson.chapter_number} • {lesson.duration}
                          </p>
                        </div>
                      </div>

                      {lesson.content_type === 'video' ? (
                        <Play className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-amber-400 fill-amber-400' : 'text-stone-400'}`} />
                      ) : (
                        <FileText className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-amber-300' : 'text-stone-400'}`} />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Right Column (2 cols): Main Lesson View (Video Player + Notes + Comments) */}
        <div className="lg:col-span-2 space-y-6">
          {selectedLesson ? (
            <div className="bg-stone-900 rounded-3xl p-6 sm:p-8 border border-stone-800 shadow-md space-y-6 text-stone-100">
              {/* Top lesson info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-800 pb-4">
                <div>
                  <div className="flex items-center space-x-2 text-xs font-semibold text-stone-400 mb-1">
                    <span>Bab {selectedLesson.chapter_number}: {selectedLesson.chapter_title}</span>
                    <span>•</span>
                    <span className="flex items-center space-x-1 text-amber-400 font-bold">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{selectedLesson.duration}</span>
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-stone-100 tracking-tight">
                    {selectedLesson.title}
                  </h2>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setBookmarked(!bookmarked)}
                    className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                      bookmarked
                        ? 'bg-amber-950 text-amber-300 border-amber-600'
                        : 'bg-stone-800 text-stone-400 border-stone-700 hover:bg-stone-700'
                    }`}
                    title="Simpan Bookmark"
                  >
                    <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
                  </button>

                  <button
                    onClick={handleToggleComplete}
                    className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center space-x-2 transition-all cursor-pointer shadow-xs ${
                      completedLessons.has(selectedLesson.id)
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                        : 'bg-gradient-to-r from-emerald-600 to-amber-600 text-stone-950 font-extrabold shadow-md'
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
                  <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-stone-950 shadow-md border border-stone-800">
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube-nocookie.com/embed/${selectedLesson.youtube_id || 'L321K6G4dps'}?autoplay=0&rel=0`}
                      title={selectedLesson.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>

                  {/* Player controls bar */}
                  <div className="flex items-center justify-between bg-stone-800/80 px-4 py-2.5 rounded-2xl border border-stone-700 text-xs">
                    <span className="text-stone-300 font-medium text-[11px]">Kecepatan Putar Video:</span>
                    <div className="flex items-center space-x-1">
                      {['1x', '1.25x', '1.5x', '2x'].map((spd) => (
                        <button
                          key={spd}
                          onClick={() => setPlaybackSpeed(spd)}
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                            playbackSpeed === spd
                              ? 'bg-amber-500 text-stone-950 font-extrabold'
                              : 'bg-stone-900 text-stone-300 hover:bg-stone-700'
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
              <div className="bg-stone-950 p-5 rounded-2xl border border-stone-800 space-y-4">
                <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                  <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs">
                    <StickyNote className="w-4 h-4" />
                    <span>Catatan Berbasis Waktu (Time-Stamped Notes)</span>
                  </div>
                  <span className="text-[10px] text-stone-400">Otomatis Tersimpan saat Menonton</span>
                </div>

                {/* Form to add note */}
                <form onSubmit={handleAddNote} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={newNoteTime}
                    onChange={(e) => setNewNoteTime(e.target.value)}
                    placeholder="01:30"
                    className="w-20 bg-stone-900 border border-stone-700 rounded-xl px-2.5 py-2 text-xs font-mono text-amber-300 focus:outline-none"
                  />
                  <input
                    type="text"
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                    placeholder="Tulis catatan penting pada menit ini..."
                    className="flex-1 bg-stone-900 border border-stone-700 rounded-xl px-3 py-2 text-xs text-stone-200 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold px-3 py-2 rounded-xl text-xs flex items-center space-x-1 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span className="hidden sm:inline">Tambah</span>
                  </button>
                </form>

                {/* Notes List */}
                <div className="space-y-2 pt-1">
                  {notes.filter(n => n.lesson_id === selectedLesson.id || true).map((note) => (
                    <div key={note.id} className="bg-stone-900/80 p-3 rounded-xl border border-stone-800 flex items-start justify-between text-xs gap-3">
                      <div className="flex items-start space-x-2.5">
                        <span className="bg-amber-950 text-amber-300 font-mono font-bold text-[10px] px-2 py-0.5 rounded-lg border border-amber-800 shrink-0">
                          [{note.timestamp_formatted}]
                        </span>
                        <p className="text-stone-300 text-[11px] leading-relaxed">{note.text}</p>
                      </div>
                      <span className="text-[10px] text-stone-500 shrink-0">{note.created_at}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Takeaways Box */}
              {selectedLesson.key_takeaways && selectedLesson.key_takeaways.length > 0 && (
                <div className="bg-gradient-to-r from-emerald-950/80 to-amber-950/80 p-5 rounded-2xl border border-amber-800/60 space-y-3">
                  <div className="flex items-center space-x-2 text-amber-300 font-bold text-xs">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Poin Kunci Sosiologi (Ringkasan Cepat)</span>
                  </div>
                  <ul className="space-y-2 text-xs text-stone-200 font-medium">
                    {selectedLesson.key_takeaways.map((point, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0"></span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Detailed Text Body */}
              <div className="prose prose-invert max-w-none text-xs sm:text-sm text-stone-300 leading-relaxed whitespace-pre-line bg-stone-950 p-5 rounded-2xl border border-stone-800">
                <h3 className="text-sm font-bold text-amber-300 mb-2">Ringkasan Konsep Lengkap</h3>
                {selectedLesson.text_body}
              </div>

              {/* Latihan Bab & Ulangan Harian Trigger */}
              <div className="bg-gradient-to-br from-amber-950/60 via-stone-900 to-emerald-950/60 p-6 rounded-2xl border border-amber-600/40 space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-400 bg-amber-950/80 px-2.5 py-0.5 rounded-full border border-amber-800">
                      Evaluasi Akhir Pembelajaran
                    </span>
                    <h3 className="text-base font-bold text-stone-100 mt-1">
                      Latihan Soal & Ulangan Harian Bab {selectedLesson.chapter_number}
                    </h3>
                    <p className="text-xs text-stone-400">
                      Selesaikan Latihan Bab & Ulangan Harian untuk menguji pemahaman konsep sosiologimu
                    </p>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0">
                    <button
                      onClick={() => onStartExam && onStartExam('exam_10_1')}
                      className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-extrabold px-4 py-2.5 rounded-xl text-xs flex items-center space-x-1.5 transition-all shadow-md cursor-pointer"
                    >
                      <PlayCircle className="w-4 h-4" />
                      <span>Kerjakan Latihan Bab</span>
                    </button>
                    <button
                      onClick={() => onStartExam && onStartExam('exam_12_1')}
                      className="bg-emerald-600 hover:bg-emerald-500 text-stone-950 font-extrabold px-4 py-2.5 rounded-xl text-xs flex items-center space-x-1.5 transition-all shadow-md cursor-pointer"
                    >
                      <Award className="w-4 h-4" />
                      <span>Ulangan Harian</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Threaded Discussion Forum */}
              <div className="bg-stone-950 p-5 sm:p-6 rounded-2xl border border-stone-800 space-y-6">
                <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                  <div className="flex items-center space-x-2 text-amber-300 font-bold text-xs">
                    <MessageSquare className="w-4 h-4 text-amber-400" />
                    <span>Forum Diskusi Berantai (Threaded Discussion)</span>
                  </div>
                  <span className="text-[10px] text-stone-400">{comments.length} Diskusi Aktif</span>
                </div>

                {/* Add New Parent Comment */}
                <form onSubmit={handleAddComment} className="flex items-center space-x-2">
                  <img src={user.avatarUrl} alt={user.name} className="w-8 h-8 rounded-full object-cover shrink-0" />
                  <input
                    type="text"
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    placeholder="Tanyakan atau tanggapi materi ini..."
                    className="flex-1 bg-stone-900 border border-stone-700 rounded-xl px-3.5 py-2.5 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                  />
                  <button
                    type="submit"
                    className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center space-x-1 cursor-pointer shrink-0"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Kirim</span>
                  </button>
                </form>

                {/* Comments List */}
                <div className="space-y-4 pt-2">
                  {comments.map((cmt) => (
                    <div key={cmt.id} className="bg-stone-900/80 p-4 rounded-2xl border border-stone-800 space-y-3 text-xs">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2.5">
                          <img src={cmt.avatar} alt={cmt.user_name} className="w-7 h-7 rounded-full object-cover" />
                          <div>
                            <span className="font-bold text-stone-100">{cmt.user_name}</span>
                            <span className="text-[10px] text-amber-400 ml-2 capitalize font-semibold bg-stone-800 px-2 py-0.5 rounded-md">
                              {cmt.user_role}
                            </span>
                          </div>
                        </div>
                        <span className="text-[10px] text-stone-500">{cmt.created_at}</span>
                      </div>

                      <p className="text-stone-300 leading-relaxed text-[11px] pl-9">{cmt.text}</p>

                      <div className="pl-9 flex items-center space-x-4 text-[10px] text-stone-400 font-semibold">
                        <button className="flex items-center space-x-1 hover:text-amber-300">
                          <ThumbsUp className="w-3 h-3" />
                          <span>{cmt.likes} Suka</span>
                        </button>
                        <button
                          onClick={() => setReplyParentId(replyParentId === cmt.id ? null : cmt.id)}
                          className="hover:text-amber-300"
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
                            className="flex-1 bg-stone-950 border border-stone-700 rounded-xl px-3 py-1.5 text-xs text-stone-200 focus:outline-none"
                          />
                          <button
                            onClick={() => handleAddReply(cmt.id)}
                            className="bg-emerald-600 hover:bg-emerald-500 text-stone-950 font-bold px-3 py-1.5 rounded-xl text-xs cursor-pointer"
                          >
                            Kirim
                          </button>
                        </div>
                      )}

                      {/* Nested Replies */}
                      {cmt.replies && cmt.replies.length > 0 && (
                        <div className="pl-9 pt-2 space-y-2 border-l-2 border-stone-800 ml-4">
                          {cmt.replies.map((reply) => (
                            <div key={reply.id} className="bg-stone-950/60 p-3 rounded-xl border border-stone-800 space-y-1">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  <img src={reply.avatar} alt={reply.user_name} className="w-6 h-6 rounded-full object-cover" />
                                  <span className="font-bold text-stone-200 text-[11px]">{reply.user_name}</span>
                                  <span className="text-[9px] text-emerald-400 capitalize bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-800">
                                    {reply.user_role}
                                  </span>
                                </div>
                                <span className="text-[9px] text-stone-500">{reply.created_at}</span>
                              </div>
                              <p className="text-stone-300 text-[11px] leading-relaxed pl-8">{reply.text}</p>
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
            <div className="bg-stone-900 rounded-3xl p-12 text-center text-stone-500 border border-stone-800">
              Pilih salah satu materi di sebelah kiri untuk mulai membaca.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

