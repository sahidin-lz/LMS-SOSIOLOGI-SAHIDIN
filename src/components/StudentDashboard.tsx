import React, { useMemo } from 'react';
// Pisahkan komponen-komponen besar ke file/fungsi terpisah agar rapi
import { WelcomeBanner } from './WelcomeBanner';
import { AnalyticsChart } from './AnalyticsChart';
import { CompetencyAnalysis } from './CompetencyAnalysis';
import { CourseList } from './CourseList';
import { AnnouncementWidget } from './AnnouncementWidget';
import { ActiveTryoutWidget } from './ActiveTryoutWidget';
import { StudyTipsWidget } from './StudyTipsWidget';
import { ExamHistoryWidget } from './ExamHistoryWidget';

// Pastikan tipe data mencakup Competency
import { Course, Exam, TryoutAnalytics, User, Announcement, Competency, ExamSession } from '../types';

interface StudentDashboardProps {
  user: User;
  courses: Course[];
  exams: Exam[];
  announcements?: Announcement[];
  analytics?: TryoutAnalytics[];
  competencies?: Competency[];
  examHistory?: ExamSession[];
  onStartCourse: (courseId: string) => void;
  onStartExam: (examId: string) => void;
  setActiveTab: (tab: 'dashboard' | 'modules' | 'leaderboard' | 'cbt') => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  user,
  courses = [],
  exams = [],
  announcements = [],
  analytics = [],
  competencies = [],
  examHistory = [],
  onStartCourse,
  onStartExam,
  setActiveTab,
}) => {
  // LOGIKA AMAN: Gunakan useMemo untuk kalkulasi data agar tidak re-render terus menerus
  const latestTryout = useMemo(() => {
    return analytics.length > 0 ? analytics[analytics.length - 1] : null;
  }, [analytics]);

  return (
    <div className="space-y-8 pb-12">
      {/* 1. Welcome Banner Component */}
      <WelcomeBanner 
        user={user} 
        onNavigate={setActiveTab} 
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Kolom Kiri: Analytics & Courses */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* 2. Analytics Chart */}
          <AnalyticsChart 
            analytics={analytics} 
            latestScore={latestTryout?.score ?? 0} 
          />

          {/* 3. Competency Analysis */}
          <CompetencyAnalysis 
            competencies={competencies} 
          />

          {/* 4. Course List */}
          <CourseList 
            courses={courses} 
            onStartCourse={onStartCourse} 
            onNavigate={() => setActiveTab('modules')} 
          />

        </div>

        {/* Kolom Kanan: Widgets */}
        <div className="space-y-8">
          
          {/* 5. Announcements */}
          {announcements.length > 0 && (
            <AnnouncementWidget announcements={announcements} />
          )}

          {/* 6. Active Exams */}
          {exams.length > 0 && (
            <ActiveTryoutWidget 
              exams={exams} 
              onStartExam={onStartExam} 
            />
          )}

          {/* 7. Exam History */}
          <ExamHistoryWidget history={examHistory} />

          {/* 8. Tips */}
          <StudyTipsWidget />
          
        </div>
      </div>
    </div>
  );
};
