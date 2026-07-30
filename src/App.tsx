import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { StudentDashboard } from './components/StudentDashboard';
import { TeacherDashboard } from './components/TeacherDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { LearningModules } from './components/LearningModules';
import { GamificationLeaderboard } from './components/GamificationLeaderboard';
import { CbtExamView } from './components/CbtExamView';
import { ExamDiscussionView } from './components/ExamDiscussionView';
import { LearningJourneyMap } from './components/LearningJourneyMap';
import { TasksWorkspace } from './components/TasksWorkspace';
import { ClassroomManagement } from './components/ClassroomManagement';
import { LoginPage } from './components/LoginPage';
import { 
  INITIAL_USER, COURSES_DATA, EXAMS_DATA, INITIAL_LEADERBOARD, 
  TRYOUT_ANALYTICS_DATA, INITIAL_ANNOUNCEMENTS 
} from './data/sociologyData';
import { Announcement, Course, Exam, Question, ExamSession, Role, User, UserAnswer, TryoutAnalytics } from './types';
import { testFirestoreConnection, subscribeToCollection, saveDocument } from './lib/firestoreService';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from './lib/firebase';
import { FileText, Zap, Award, Sparkles, ChevronRight, Clock } from 'lucide-react';

export default function App() {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('socioedu_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return !!localStorage.getItem('socioedu_user');
  });

  const [authLoading, setAuthLoading] = useState<boolean>(true);

  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem('socioedu_courses');
    return saved ? JSON.parse(saved) : COURSES_DATA;
  });

  const [exams, setExams] = useState<Exam[]>(() => {
    const saved = localStorage.getItem('socioedu_exams');
    return saved ? JSON.parse(saved) : EXAMS_DATA;
  });

  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    const saved = localStorage.getItem('socioedu_announcements');
    return saved ? JSON.parse(saved) : INITIAL_ANNOUNCEMENTS;
  });

  const [mainPillar, setMainPillar] = useState<'belajar' | 'tka'>('belajar');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'journey' | 'modules' | 'tasks' | 'classrooms' | 'leaderboard' | 'cbt' | 'exam_active' | 'exam_discussion'>('dashboard');
  const [selectedCourseId, setSelectedCourseId] = useState<string | undefined>(undefined);
  const [activeExam, setActiveExam] = useState<Exam | null>(null);
  const [examSession, setExamSession] = useState<ExamSession | null>(null);
  const [analytics, setAnalytics] = useState<TryoutAnalytics[]>(TRYOUT_ANALYTICS_DATA);

  // Firebase Auth Observer & Firestore Sync
  useEffect(() => {
    testFirestoreConnection();

    const unsubscribeAuth = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        let fetchedUser: User | null = null;
        try {
          // Sync with Firestore user document
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
            name: fbUser.displayName || fbUser.email?.split('@')[0] || 'Guru Super Admin',
            email: fbUser.email || '',
            role: 'admin',
            total_xp: 9990,
            levelTitle: 'Super Admin Utama / Guru Pengampu Sosiologi',
            avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(fbUser.email || 'user')}`,
            grade: 12,
            streakDays: 1,
            schoolName: 'SMA Negeri 1 Membumi',
            group_name: 'Super Admin',
          };
          saveDocument('users', fbUser.uid, fetchedUser);
        } else {
          // Firebase authenticated email account is Guru Superadmin with full control
          fetchedUser = {
            ...fetchedUser,
            role: 'admin',
            levelTitle: fetchedUser.levelTitle || 'Super Admin Utama / Guru Pengampu Sosiologi',
          };
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

    // Subscribe to exams from Firestore
    const unsubExams = subscribeToCollection<Exam>('exams', (fsExams) => {
      if (fsExams && fsExams.length > 0) {
        setExams(fsExams);
      }
    });

    return () => {
      unsubscribeAuth();
      unsubExams();
    };
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('socioedu_user', JSON.stringify(user));
      saveDocument('students', user.id || 'std_default', user);
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('socioedu_courses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('socioedu_exams', JSON.stringify(exams));
  }, [exams]);

  useEffect(() => {
    localStorage.setItem('socioedu_announcements', JSON.stringify(announcements));
  }, [announcements]);

  const handleRoleChange = (newRole: Role) => {
    if (!user) return;
    const updated = { ...user, role: newRole };
    setUser(updated);
    saveDocument('users', user.id, updated);
  };

  const handleGradeChange = (newGrade: number) => {
    if (!user) return;
    const updated = { ...user, grade: newGrade };
    setUser(updated);
    saveDocument('users', user.id, updated);
    if (updated.role === 'siswa' && newGrade !== 12 && mainPillar === 'tka') {
      setMainPillar('belajar');
      setActiveTab('dashboard');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error('Logout error:', err);
    }
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('socioedu_user');
  };

  const handlePurgeAllData = () => {
    localStorage.removeItem('socioedu_courses');
    localStorage.removeItem('socioedu_exams');
    localStorage.removeItem('socioedu_announcements');
    setCourses([]);
    setExams([]);
    setAnnouncements([]);
    setAnalytics([]);
  };

  const handleStartCourse = (courseId: string) => {
    setSelectedCourseId(courseId);
    setActiveTab('modules');
  };

  const handleStartExam = (examId: string) => {
    const found = exams.find((e) => e.id === examId) || exams[0];
    setActiveExam(found);
    setActiveTab('exam_active');
  };

  // CRUD Handlers for Admin CMS
  const handleAddCourse = (newCourse: Course) => {
    setCourses((prev) => [newCourse, ...prev]);
  };

  const handleDeleteCourse = (courseId: string) => {
    setCourses((prev) => prev.filter((c) => c.id !== courseId));
  };

  const handleAddExam = (newExam: Exam) => {
    setExams((prev) => [newExam, ...prev]);
  };

  const handleDeleteExam = (examId: string) => {
    setExams((prev) => prev.filter((e) => e.id !== examId));
  };

  const handleAddQuestion = (examId: string, newQuestion: Question) => {
    setExams((prev) =>
      prev.map((e) => {
        if (e.id === examId) {
          const updatedQs = [...e.questions, { ...newQuestion, number: e.questions.length + 1 }];
          return {
            ...e,
            questions: updatedQs,
            total_questions: updatedQs.length,
          };
        }
        return e;
      })
    );
  };

  const handleDeleteQuestion = (examId: string, questionId: string) => {
    setExams((prev) =>
      prev.map((e) => {
        if (e.id === examId) {
          const updatedQs = e.questions.filter((q) => q.id !== questionId);
          return {
            ...e,
            questions: updatedQs,
            total_questions: updatedQs.length,
          };
        }
        return e;
      })
    );
  };

  const handleAddAnnouncement = (newAnn: Announcement) => {
    setAnnouncements((prev) => [newAnn, ...prev]);
  };

  const handleDeleteAnnouncement = (annId: string) => {
    setAnnouncements((prev) => prev.filter((a) => a.id !== annId));
  };

  const handleCompleteLesson = (lessonId: string, xpReward: number) => {
    setUser((prev) => {
      const newXp = prev.total_xp + xpReward;
      let level = prev.levelTitle;
      if (newXp > 3000) level = 'Grandmaster Sosiologi';
      else if (newXp > 2000) level = 'Pakar Teori Kritis';
      else if (newXp > 1000) level = 'Analis Sosial Muda';
      return { ...prev, total_xp: newXp, levelTitle: level };
    });
  };

  const handleSubmitExam = async (
    answers: Record<string, UserAnswer>,
    durationSpentSeconds: number,
    tabSwitchCount: number
  ) => {
    if (!activeExam) return;

    try {
      // Call backend API endpoint to calculate score & exam session
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

        // Update User XP
        setUser((prev) => ({
          ...prev,
          total_xp: prev.total_xp + session.xp_earned,
        }));

        // Update Analytics Graph Data
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
      // Fallback client-side evaluation if server offline
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
        else if (ans === q.correct_answer) {
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
  };

  // Auth Loading Gatekeeper
  if (authLoading) {
    return (
      <div className="min-h-screen bg-stone-950 flex flex-col items-center justify-center space-y-4 text-stone-100 font-sans">
        <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xs text-stone-400 font-bold tracking-wider uppercase">Memuat Sesi Autentikasi LMS...</p>
      </div>
    );
  }

  // Unauthenticated -> Show Dedicated Full Page Login Screen
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
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans antialiased selection:bg-amber-500 selection:text-stone-950">
      {/* Hide main navbar when active CBT exam is running for full focus */}
      {activeTab !== 'exam_active' && (
        <Navbar
          user={user}
          mainPillar={mainPillar}
          setMainPillar={setMainPillar}
          activeTab={activeTab as any}
          setActiveTab={(tab) => setActiveTab(tab as any)}
          onRoleChange={handleRoleChange}
          onGradeChange={handleGradeChange}
          onLogout={handleLogout}
          notifications={announcements as any}
        />
      )}

      <main className={activeTab === 'exam_active' ? '' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6'}>
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
            onAddCourse={handleAddCourse}
            onDeleteCourse={handleDeleteCourse}
            onAddExam={handleAddExam}
            onDeleteExam={handleDeleteExam}
            onAddQuestion={handleAddQuestion}
            onDeleteQuestion={handleDeleteQuestion}
            onAddAnnouncement={handleAddAnnouncement}
            onDeleteAnnouncement={handleDeleteAnnouncement}
          />
        )}

        {/* Role: Siswa (Student Dashboard) */}
        {user.role === 'siswa' && activeTab === 'dashboard' && (
          <StudentDashboard
            user={user}
            courses={courses}
            exams={exams}
            announcements={announcements}
            analytics={analytics}
            onStartCourse={handleStartCourse}
            onStartExam={handleStartExam}
            setActiveTab={(tab) => setActiveTab(tab as any)}
          />
        )}

        {/* Learning Journey Map (Peta Belajar Visual) */}
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

        {/* Tasks & Smart Grouping Workspace */}
        {activeTab === 'tasks' && (
          <TasksWorkspace user={user} />
        )}

        {/* Classroom Rombel Management */}
        {activeTab === 'classrooms' && (
          <ClassroomManagement user={user} />
        )}

        {/* CBT Tryouts List Tab */}
        {activeTab === 'cbt' && (
          <div className="space-y-6 pb-12">
            <div className="bg-stone-900 rounded-3xl p-6 border border-stone-800 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center space-x-1.5 text-xs font-semibold text-amber-300 bg-amber-950 px-3 py-1 rounded-full mb-1 border border-amber-800">
                  <FileText className="w-3.5 h-3.5 text-amber-400" />
                  <span>Simulasi Ujian Computer Based Test</span>
                </div>
                <h1 className="text-2xl font-extrabold text-stone-100">
                  Bank Ujian CBT & Tryout TKA Sosiologi SMA
                </h1>
                <p className="text-xs text-stone-400">Pilih paket tryout TKA (Tes Kemampuan Akademik) untuk melatih kecepatan, penalaran, dan penguasaan materi Sosiologi</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {exams.map((exam) => (
                <div
                  key={exam.id}
                  className="bg-stone-900 rounded-3xl p-6 border border-stone-800 shadow-md hover:border-amber-500 transition-all space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold uppercase px-3 py-1 rounded-full bg-amber-950 text-amber-300 border border-amber-800">
                        {exam.category}
                      </span>
                      <div className="flex items-center space-x-1 text-stone-400 text-xs font-medium">
                        <Clock className="w-3.5 h-3.5 text-amber-400" />
                        <span>{exam.duration_minutes} Menit</span>
                      </div>
                    </div>

                    <h2 className="text-lg font-bold text-stone-100">{exam.title}</h2>
                    <p className="text-xs text-stone-400 leading-relaxed">{exam.description}</p>
                  </div>

                  <div className="pt-4 border-t border-stone-800 flex items-center justify-between">
                    <div className="flex items-center space-x-1 text-amber-400 text-xs font-bold">
                      <Award className="w-4 h-4" />
                      <span>+{exam.xp_reward} Socio-Points</span>
                    </div>

                    <button
                      onClick={() => handleStartExam(exam.id)}
                      className="bg-gradient-to-r from-emerald-600 to-amber-600 hover:from-emerald-500 hover:to-amber-500 text-stone-950 font-extrabold px-5 py-2.5 rounded-xl text-xs transition-all shadow-md cursor-pointer flex items-center space-x-1.5"
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
          <GamificationLeaderboard user={user} leaderboardData={INITIAL_LEADERBOARD} />
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
      </main>
    </div>
  );
}

