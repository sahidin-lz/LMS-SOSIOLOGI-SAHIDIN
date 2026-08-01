import React, { useState, useEffect, useCallback, useMemo, Suspense, lazy } from 'react';
import { Navbar } from './components/Navbar';
import { LoginPage } from './components/LoginPage';
import { useOptimizedCourses } from './hooks/useOptimizedCourses';
import { useOptimizedExams } from './hooks/useOptimizedExams';
import { useOptimizedUsers } from './hooks/useOptimizedUsers';
import { useOptimizedAnnouncements } from './hooks/useOptimizedAnnouncements';
import { useOptimizedLeaderboard } from './hooks/useOptimizedLeaderboard';
import { TRYOUT_ANALYTICS_DATA, EXAM_HISTORY_DATA } from './data/sociologyData';
import { Announcement, Course, Exam, Question, ExamSession, Role, User, UserAnswer, TryoutAnalytics } from './types';
import { testFirestoreConnection, saveDocument, deleteDocument } from './lib/firestoreService';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from './lib/firebase';
import { FileText, Award, ChevronRight, Clock, Loader2 } from 'lucide-react';

// Lazy loading komponen besar untuk meminimalisir bundle size awal & memuat cepat di client
const StudentDashboard = lazy(() => import('./components/StudentDashboard').then(m => ({ default: m.StudentDashboard })));
const TeacherDashboard = lazy(() => import('./components/TeacherDashboard').then(m => ({ default: m.TeacherDashboard })));
const AdminDashboard = lazy(() => import('./components/AdminDashboard').then(m => ({ default: m.AdminDashboard })));
const LearningModules = lazy(() => import('./components/LearningModules').then(m => ({ default: m.LearningModules })));
const GamificationLeaderboard = lazy(() => import('./components/GamificationLeaderboard').then(m => ({ default: m.GamificationLeaderboard })));
const CbtExamView = lazy(() => import('./components/CbtExamView').then(m => ({ default: m.CbtExamView })));
const ExamDiscussionView = lazy(() => import('./components/ExamDiscussionView').then(m => ({ default: m.ExamDiscussionView })));
const LearningJourneyMap = lazy(() => import('./components/LearningJourneyMap').then(m => ({ default: m.LearningJourneyMap })));
const TasksWorkspace = lazy(() => import('./components/TasksWorkspace').then(m => ({ default: m.TasksWorkspace })));
const ClassroomManagement = lazy(() => import('./components/ClassroomManagement').then(m => ({ default: m.ClassroomManagement })));
const ClassroomChatView = lazy(() => import('./components/ClassroomChat').then(m => ({ default: m.ClassroomChat })));

// Loading Component Fallback saat me-load tab secara lazy
const ViewLoadingFallback = () => (
  <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-3 text-slate-600">
    <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
    <p className="text-xs font-bold text-slate-600 tracking-wider">Memuat Fitur LMS Sosiologi...</p>
  </div>
);

export default function App() {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('socioedu_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return !!localStorage.getItem('socioedu_user');
  });

  const [authLoading, setAuthLoading] = useState<boolean>(true);

  // Custom Hooks Data Fetching (Teroptimasi Caching & Pagination)
  const { courses, updateCourseLocally, removeCourseLocally, setCourses } = useOptimizedCourses();
  const { exams, updateExamLocally, removeExamLocally, setExams } = useOptimizedExams();
  const { usersList, hasMore: hasMoreUsers, loadMore: loadMoreUsers, loadingMore: loadingMoreUsers, setUsersList } = useOptimizedUsers(20);
  const { announcements, setAnnouncements } = useOptimizedAnnouncements();
  const { leaderboard } = useOptimizedLeaderboard();

    const [mainPillar, setMainPillar] = useState<'belajar' | 'tka'>('belajar');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'journey' | 'modules' | 'tasks' | 'classrooms' | 'leaderboard' | 'cbt' | 'exam_active' | 'exam_discussion'>('dashboard');
  const [cbtFilter, setCbtFilter] = useState<'semua' | 'tryout' | 'latihan'>('semua');
  const [selectedCourseId, setSelectedCourseId] = useState<string | undefined>(undefined);
  const [activeExam, setActiveExam] = useState<Exam | null>(null);
  const [examSession, setExamSession] = useState<ExamSession | null>(null);
  const [analytics, setAnalytics] = useState<TryoutAnalytics[]>(TRYOUT_ANALYTICS_DATA);

  const displayedExams = useMemo(() => {
    let list = [...exams];
    if (cbtFilter === 'tryout') {
      list = list.filter((e) => e.category?.toLowerCase().includes('tryout') || e.id.includes('tka_2025'));
    } else if (cbtFilter === 'latihan') {
      list = list.filter((e) => e.category?.toLowerCase().includes('latihan') || e.id.includes('latihan_bab'));
    }
    return list.sort((a, b) => {
      if (a.id.includes('tka_2025')) return -1;
      if (b.id.includes('tka_2025')) return 1;
      const numA = parseInt(a.id.replace(/\D/g, '') || '0', 10);
      const numB = parseInt(b.id.replace(/\D/g, '') || '0', 10);
      return numA - numB;
    });
  }, [exams, cbtFilter]);

  // Firebase Auth Observer
  useEffect(() => {
    testFirestoreConnection();

    const unsubscribeAuth = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        let fetchedUser: User | null = null;
        try {
          const userDocRef = doc(db, 'users', fbUser.uid);
          const docSnap = await getDoc(userDocRef);

          if (docSnap.exists()) {
            fetchedUser = docSnap.data() as User;
          }
        } catch (err) {
          console.warn('Firestore offline or user profile fetch warning:', err);
        }

        if (!fetchedUser) {
          fetchedUser = {
            id: fbUser.uid,
            name: fbUser.displayName || fbUser.email?.split('@')[0] || 'Siswa Baru',
            email: fbUser.email || '',
            role: 'siswa',
            total_xp: 0,
            levelTitle: 'Sosiolog Muda',
            avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${fbUser.uid}`,
            grade: 10,
            streakDays: 1,
            schoolName: 'SMAIT As-Syifa Boarding School Wanareja',
            group_name: 'Siswa Baru',
          };
          saveDocument('users', fbUser.uid, fetchedUser);
        }

        setUser(fetchedUser);
        localStorage.setItem('socioedu_user', JSON.stringify(fetchedUser));
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem('socioedu_user');
      }
      setAuthLoading(false);
    });

    return () => {
      unsubscribeAuth();
    };
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('socioedu_user', JSON.stringify(user));
      saveDocument('users', user.id || 'std_default', user);
    }
  }, [user]);

  const handleRoleChange = useCallback((newRole: Role) => {
    if (!user) return;
    const updated = { ...user, role: newRole };
    setUser(updated);
    saveDocument('users', user.id, updated);
  }, [user]);

  const handleGradeChange = useCallback((newGrade: number) => {
    if (!user) return;
    const updated = { ...user, grade: newGrade };
    setUser(updated);
    saveDocument('users', user.id, updated);
    if (updated.role === 'siswa' && newGrade !== 12 && activeTab === 'cbt') {
      
      setActiveTab('dashboard');
    }
  }, [user, activeTab]);

  const handleLogout = useCallback(async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error('Logout error:', err);
    }
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('socioedu_user');
  }, []);

  const handleStartCourse = useCallback((courseId: string) => {
    setSelectedCourseId(courseId);
    setActiveTab('modules');
  }, []);

  const handleStartExam = useCallback((examId: string) => {
    const found = exams.find((e) => e.id === examId) || exams[0];
    setActiveExam(found);
    setActiveTab('exam_active');
  }, [exams]);

  // CRUD Handlers for Admin CMS (Firebase Firestore Synced + Local Cache Update)
  const handleAddCourse = useCallback((newCourse: Course) => {
    updateCourseLocally(newCourse);
    saveDocument('courses', newCourse.id, newCourse);
  }, [updateCourseLocally]);

  const handleDeleteCourse = useCallback((courseId: string) => {
    removeCourseLocally(courseId);
    deleteDocument('courses', courseId);
  }, [removeCourseLocally]);

  const handleAddExam = useCallback((newExam: Exam) => {
    updateExamLocally(newExam);
    saveDocument('exams', newExam.id, newExam);
  }, [updateExamLocally]);

  const handleDeleteExam = useCallback((examId: string) => {
    removeExamLocally(examId);
    deleteDocument('exams', examId);
  }, [removeExamLocally]);

  const handleAddQuestion = useCallback((examId: string, newQuestion: Question) => {
    setExams((prev) =>
      prev.map((e) => {
        if (e.id === examId) {
          const updatedQs = [...e.questions, { ...newQuestion, number: e.questions.length + 1 }];
          const updatedExam = {
            ...e,
            questions: updatedQs,
            total_questions: updatedQs.length,
          };
          saveDocument('exams', examId, updatedExam);
          return updatedExam;
        }
        return e;
      })
    );
  }, [setExams]);

  const handleDeleteQuestion = useCallback((examId: string, questionId: string) => {
    setExams((prev) =>
      prev.map((e) => {
        if (e.id === examId) {
          const updatedQs = e.questions.filter((q) => q.id !== questionId);
          const updatedExam = {
            ...e,
            questions: updatedQs,
            total_questions: updatedQs.length,
          };
          saveDocument('exams', examId, updatedExam);
          return updatedExam;
        }
        return e;
      })
    );
  }, [setExams]);

  const handleAddAnnouncement = useCallback((newAnn: Announcement) => {
    setAnnouncements((prev) => [newAnn, ...prev.filter(a => a.id !== newAnn.id)]);
    saveDocument('announcements', newAnn.id, newAnn);
  }, [setAnnouncements]);

  const handleDeleteAnnouncement = useCallback((annId: string) => {
    setAnnouncements((prev) => prev.filter((a) => a.id !== annId));
    deleteDocument('announcements', annId);
  }, [setAnnouncements]);

  const handleAddUser = useCallback((newUser: User) => {
    setUsersList((prev) => [newUser, ...prev.filter(u => u.id !== newUser.id)]);
    saveDocument('users', newUser.id, newUser);
  }, [setUsersList]);

  const handleDeleteUser = useCallback((userId: string) => {
    setUsersList((prev) => prev.filter((u) => u.id !== userId));
    deleteDocument('users', userId);
  }, [setUsersList]);

  const handleBulkAddUsers = useCallback((newUsers: User[]) => {
    setUsersList((prev) => [...newUsers, ...prev]);
    newUsers.forEach((u) => saveDocument('users', u.id, u));
  }, [setUsersList]);

  const handleCompleteLesson = useCallback((lessonId: string, xpReward: number) => {
    setUser((prev) => {
      if (!prev) return prev;
      const newXp = prev.total_xp + xpReward;
      let level = prev.levelTitle;
      if (newXp > 3000) level = 'Grandmaster Sosiologi';
      else if (newXp > 2000) level = 'Pakar Teori Kritis';
      else if (newXp > 1000) level = 'Analis Sosial Muda';
      return { ...prev, total_xp: newXp, levelTitle: level };
    });
  }, []);

  const handleSubmitExam = useCallback(async (
    answers: Record<string, UserAnswer>,
    durationSpentSeconds: number,
    tabSwitchCount: number
  ) => {
    if (!activeExam || !user) return;

    try {
      const res = await fetch('/api/exam/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: user.id,
          exam_id: activeExam.id,
          answers,
          duration_spent_seconds: durationSpentSeconds,
          tab_switch_count: tabSwitchCount,
        }),
      });

      const data = await res.json();
      if (data.success && data.session) {
        const session: ExamSession = data.session;
        setExamSession(session);

        setUser((prev) => prev ? ({
          ...prev,
          total_xp: prev.total_xp + session.xp_earned,
        }) : prev);

        setAnalytics((prev) => [
          ...prev,
          {
            exam_title: `Tryout ${prev.length + 1}`,
            score: session.score,
            date: 'Hari ini',
            target_score: 150,
          },
        ]);

        setActiveTab('exam_discussion');
      }
    } catch (err) {
      console.error('Error submitting exam:', err);
      let total_correct = 0;
      let total_incorrect = 0;
      let total_unanswered = 0;

      let weighted_earned = 0;
      let weighted_total = 0;

      activeExam.questions.forEach((q) => {
        let weight = 1.0;
        if (q.difficulty === 'Hard' || q.text.length > 250 || q.explanation.length > 100) weight = 1.6;
        else if (q.difficulty === 'Medium' || q.text.length > 150) weight = 1.3;
        weighted_total += weight;

        const ans = answers[q.id]?.selected_option;
        if (!ans) total_unanswered++;
        else if (ans === q.correct_answer || (q.correct_answer && q.correct_answer.includes(ans))) {
          total_correct++;
          weighted_earned += weight;
        }
        else total_incorrect++;
      });

      const normalScore = Math.round((total_correct / activeExam.total_questions) * 100);
      const irtRatio = weighted_total > 0 ? (weighted_earned / weighted_total) : 0;
      const irtScore = Math.min(100, Math.round(irtRatio * 100));

      const fallbackSession: ExamSession = {
        id: `sess_${Date.now()}`,
        user_id: user.id,
        exam_id: activeExam.id,
        exam_title: activeExam.title,
        category: activeExam.category,
        start_time: new Date().toISOString(),
        duration_spent_seconds: durationSpentSeconds,
        total_questions: activeExam.total_questions,
        score: irtScore,
        normal_score: normalScore,
        irt_score: irtScore,
        is_completed: true,
        total_correct,
        total_incorrect,
        total_unanswered,
        xp_earned: activeExam.xp_reward,
        tab_switch_count: tabSwitchCount,
        answers,
      };

      setExamSession(fallbackSession);
      setActiveTab('exam_discussion');
    }
  }, [activeExam, user]);

  // Auth Loading Screen
  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center space-y-4 text-slate-900 font-sans">
        <Loader2 className="w-10 h-10 text-amber-500 animate-spin" />
        <p className="text-xs text-slate-600 font-bold tracking-wider uppercase">Memuat Sesi Autentikasi LMS...</p>
      </div>
    );
  }

  // Unauthenticated Screen
  if (!isAuthenticated || !user) {
    return (
      <LoginPage
        onLoginSuccess={(loggedUser) => {
          setUser(loggedUser);
          setIsAuthenticated(true);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-orange-500 selection:text-stone-950">
      {activeTab !== 'exam_active' && (
        <Navbar
          user={user}
          mainPillar={mainPillar}
          setMainPillar={setMainPillar}
          activeTab={activeTab as any}
          setActiveTab={(tab) => setActiveTab(tab as any)}
          cbtFilter={cbtFilter}
          setCbtFilter={setCbtFilter}
          onRoleChange={handleRoleChange}
          onGradeChange={handleGradeChange}
          onLogout={handleLogout}
          notifications={announcements as any}
        />
      )}

      <main className={activeTab === 'exam_active' ? '' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6'}>
        <Suspense fallback={<ViewLoadingFallback />}>
          {(user.role === 'admin' || user.role === 'guru') ? (
            <>
              {/* Role: Guru (Teacher) Workspace */}
              {user.role === 'guru' && activeTab === 'dashboard' && (
                <TeacherDashboard courses={courses} exams={exams} />
              )}

              {/* Role: Admin Workspace */}
              {user.role === 'admin' && activeTab === 'dashboard' && (
                <AdminDashboard
                  user={user}
                  onRoleChange={handleRoleChange}
                  courses={courses}
                  exams={exams}
                  announcements={announcements}
                  usersList={usersList}
                  hasMoreUsers={hasMoreUsers}
                  onLoadMoreUsers={loadMoreUsers}
                  loadingMoreUsers={loadingMoreUsers}
                  onAddCourse={handleAddCourse}
                  onDeleteCourse={handleDeleteCourse}
                  onAddExam={handleAddExam}
                  onDeleteExam={handleDeleteExam}
                  onAddQuestion={handleAddQuestion}
                  onDeleteQuestion={handleDeleteQuestion}
                  onAddAnnouncement={handleAddAnnouncement}
                  onDeleteAnnouncement={handleDeleteAnnouncement}
                  onAddUser={handleAddUser}
                  onDeleteUser={handleDeleteUser}
                  onBulkAddUsers={handleBulkAddUsers}
                />
              )}

              {/* Classroom Rombel Management */}
              {activeTab === 'classrooms' && (
                <ClassroomManagement user={user} />
              )}

              {/* Learning Path Modules */}
              {activeTab === 'modules' && (
                <LearningModules
                  user={user}
                  courses={courses}
                  activeCourseId={selectedCourseId}
                  onCompleteLesson={handleCompleteLesson}
                  onStartExam={handleStartExam}
                />
              )}
            </>
          ) : (
            <>
              {/* Role: Siswa (Student Dashboard) */}
              {activeTab === 'dashboard' && (
                <StudentDashboard
                  user={user}
                  courses={courses}
                  exams={exams}
                  announcements={announcements}
                  analytics={analytics}
                  examHistory={EXAM_HISTORY_DATA}
                  onStartCourse={handleStartCourse}
                  onStartExam={handleStartExam}
                  setActiveTab={(tab) => setActiveTab(tab as any)}
                />
              )}

              {/* Learning Journey Map */}
              {activeTab === 'journey' && (
                <LearningJourneyMap
                  user={user}
                  courses={courses}
                  onSelectLesson={(courseId) => {
                    setSelectedCourseId(courseId);
                    setActiveTab('modules');
                  }}
                />
              )}

              {/* Learning Path Modules */}
              {activeTab === 'modules' && (
                <LearningModules
                  user={user}
                  courses={courses}
                  activeCourseId={selectedCourseId}
                  onCompleteLesson={handleCompleteLesson}
                  onStartExam={handleStartExam}
                />
              )}

              {/* Tasks Workspace */}
              {activeTab === 'tasks' && (
                <TasksWorkspace user={user} />
              )}

              {/* Classroom Chat View */}
              {activeTab === 'classroom_chat' && (
                <ClassroomChatView user={user} />
              )}

              {/* CBT Tryouts List Tab */}
              {activeTab === 'cbt' && (
                <div className="space-y-6 pb-12">
                  <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div>
                      <div className="inline-flex items-center space-x-1.5 text-xs font-semibold text-orange-500 bg-orange-50 px-3 py-1 rounded-full mb-1 border border-orange-300">
                        <FileText className="w-3.5 h-3.5 text-orange-600" />
                        <span>Simulasi Ujian Computer Based Test</span>
                      </div>
                      <h1 className="text-2xl font-extrabold text-slate-900">
                        Bank Ujian CBT & Tryout TKA Sosiologi SMA
                      </h1>
                      <p className="text-xs text-slate-600">Pilih paket tryout TKA atau Latihan Soal CBT 10 Bab Sosiologi SMA (Lengkap Bab 1 s.d. 10)</p>
                    </div>


                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {displayedExams.map((exam) => (
                      <div
                        key={exam.id}
                        className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm border border-slate-200 hover:border-amber-500 transition-all space-y-4 flex flex-col justify-between"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-extrabold uppercase px-3 py-1 rounded-full bg-orange-50 text-orange-500 border border-orange-300">
                              {exam.category}
                            </span>
                            <div className="flex items-center space-x-1 text-slate-600 text-xs font-medium">
                              <Clock className="w-3.5 h-3.5 text-orange-600" />
                              <span>{exam.duration_minutes} Menit</span>
                            </div>
                          </div>

                          <h2 className="text-lg font-bold text-slate-900">{exam.title}</h2>
                          <p className="text-xs text-slate-600 leading-relaxed">{exam.description}</p>
                        </div>

                        <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                          <div className="flex items-center space-x-1 text-orange-600 text-xs font-bold">
                            <Award className="w-4 h-4" />
                            <span>+{exam.xp_reward} Socio-Points</span>
                          </div>

                          <button
                            onClick={() => handleStartExam(exam.id)}
                            className="bg-gradient-to-r from-blue-600 to-orange-600 hover:from-blue-500 hover:to-orange-500 text-stone-950 font-extrabold px-5 py-2.5 rounded-xl text-xs transition-all shadow-sm border border-slate-200 cursor-pointer flex items-center space-x-1.5"
                          >
                            <span>Mulai Kerjakan Ujian</span>
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Gamification & Leaderboard Tab */}
              {activeTab === 'leaderboard' && (
                <GamificationLeaderboard user={user} leaderboardData={leaderboard} />
              )}

              {/* Active CBT Exam Engine View */}
              {activeTab === 'exam_active' && activeExam && (
                <CbtExamView
                  exam={activeExam}
                  userId={user.id}
                  onSubmitExam={handleSubmitExam}
                  onCancelExam={() => setActiveTab('dashboard')}
                />
              )}

              {/* Exam Discussion View */}
              {activeTab === 'exam_discussion' && examSession && activeExam && (
                <ExamDiscussionView
                  session={examSession}
                  exam={activeExam}
                  onBackToDashboard={() => setActiveTab('dashboard')}
                  onRetakeExam={() => setActiveTab('exam_active')}
                />
              )}
            </>
          )}
        </Suspense>
      </main>
    </div>
  );
}
