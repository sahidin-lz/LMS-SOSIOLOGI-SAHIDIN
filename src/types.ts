export interface ClassStudent {
  id: string;
  nisn: string;
  name: string;
  email: string;
  password?: string;
  classroom_name: string;
  total_xp: number;
  mission_completed_count: number;
  avg_cbt_score: number;
  status: 'Aktif' | 'Izin' | 'Alumni';
}

export interface SyllabusItem {
  id: string;
  grade_level: 10 | 11 | 12;
  semester: 1 | 2;
  chapter_code: string; // e.g. "BAB-1"
  topic_name: string;
  basic_competency: string; // Kompetensi Dasar / Capaian Pembelajaran
  learning_objective: string;
  meeting_count: number;
  has_daily_test: boolean;
  file_source?: string;
}

export interface StudentCompetencyAnalysis {
  topic_name: string;
  total_questions_attempted: number;
  correct_count: number;
  mastery_percentage: number; // 0 - 100%
  status: 'Sangat Paham' | 'Cukup Paham' | 'Perlu Remedial';
  recommendation: string;
}

export type Competency = StudentCompetencyAnalysis;

export interface ClassRoom {
  id: string;
  name: string; // e.g. "10-IPS-1"
  grade_level: 10 | 11 | 12;
  academic_year: string;
  teacher_name: string;
  total_students: number;
  description: string;
  students: ClassStudent[];
}

export type Role = 'siswa' | 'guru' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  total_xp: number;
  levelTitle: string;
  avatarUrl: string;
  grade: number; // 10, 11, or 12
  streakDays: number;
  schoolName: string;
  group_id?: string;
  group_name?: string;
  nisn?: string;
  password?: string;
  status?: 'Aktif' | 'Izin' | 'Alumni';
}

export interface VideoNote {
  id: string;
  lesson_id: string;
  timestamp_seconds: number;
  timestamp_formatted: string;
  text: string;
  created_at: string;
}

export interface LessonComment {
  id: string;
  lesson_id: string;
  user_name: string;
  user_role: Role;
  avatar: string;
  text: string;
  created_at: string;
  parent_id?: string;
  likes: number;
  replies?: LessonComment[];
}

export interface TaskItem {
  id: string;
  course_id: string;
  chapter_title: string;
  title: string;
  description: string;
  type: 'INDIVIDUAL' | 'GROUP';
  deadline: string;
  max_score: number;
}

export interface TaskSubmission {
  id: string;
  task_id: string;
  task_title: string;
  type: 'INDIVIDUAL' | 'GROUP';
  group_name?: string;
  group_members?: string[];
  submitted_by: string;
  submitted_at: string;
  answer_text: string;
  file_name?: string;
  grade?: number;
  teacher_feedback?: string;
  status: 'Menunggu Penilaian' | 'Sudah Dinilai' | 'Belum Dikumpulkan';
}

export interface Lesson {
  id: string;
  course_id: string;
  chapter_number: number;
  chapter_title: string;
  title: string;
  content_type: 'video' | 'text';
  content_url?: string;
  youtube_id?: string;
  text_body: string;
  key_takeaways: string[];
  duration: string;
  completed?: boolean;
  bookmarked?: boolean;
  xp_reward: number;
  document_url?: string;
  document_name?: string;
  exam_id_target?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  grade_level: 10 | 11 | 12;
  category: string;
  thumbnail: string;
  totalLessons: number;
  completedLessons: number;
  lessons: Lesson[];
}

export interface Question {
  id: string;
  exam_id: string;
  number: number;
  question_type?: 'pilihan_ganda' | 'kompleks' | 'sebab_akibat';
  text: string;
  pernyataan?: string; // For sebab_akibat questions
  alasan?: string; // For sebab_akibat questions
  statement_1?: string; // For kompleks questions (1)
  statement_2?: string; // For kompleks questions (2)
  statement_3?: string; // For kompleks questions (3)
  statement_4?: string; // For kompleks questions (4)
  image_url?: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  option_e: string;
  correct_answer: string;
  explanation: string;
  topic: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
}

export interface Exam {
  id: string;
  title: string;
  grade_level: 10 | 11 | 12 | 0; // 0 for All Grades / TKA General
  category: 'TKA Sosiologi' | 'Ulangan Harian' | 'Latihan Bab' | 'Tryout TKA' | 'UTBK SNBT' | 'Penilaian Harian' | 'Tryout Nasional' | 'Olimpiade Sosiologi';
  duration_minutes: number;
  total_questions: number;
  description: string;
  xp_reward: number;
  passing_score: number;
  questions: Question[];
}

export interface UserAnswer {
  selected_option: 'A' | 'B' | 'C' | 'D' | 'E' | null;
  is_doubtful: boolean;
}

export interface ExamSession {
  id: string;
  user_id: string;
  exam_id: string;
  exam_title: string;
  category: string;
  start_time: string;
  end_time?: string;
  duration_spent_seconds: number;
  total_questions: number;
  score: number; // IRT Score (0 - 100)
  normal_score: number; // Skor Normal / Raw percentage (0 - 100)
  irt_score: number; // Skor IRT Skala 100
  is_completed: boolean;
  total_correct: number;
  total_incorrect: number;
  total_unanswered: number;
  xp_earned: number;
  tab_switch_count: number;
  answers: Record<string, UserAnswer>; // key is question_id
}

export interface LeaderboardUser {
  id: string;
  rank: number;
  name: string;
  school: string;
  grade: number;
  xp: number;
  badgeTitle: string;
  avatar: string;
  change: 'up' | 'down' | 'same';
}

export interface Announcement {
  id: string;
  title: string;
  category: 'Penting' | 'Informasi' | 'Jadwal Ujian' | 'Pembaruan Materi';
  date: string;
  author: string;
  content: string;
}

export interface TryoutAnalytics {
  exam_title: string;
  score: number;
  date: string;
  target_score: number;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'cbt' | 'task' | 'announcement' | 'discussion';
  date: string;
  isRead: boolean;
  linkTab?: 'cbt' | 'tasks' | 'modules' | 'dashboard';
}

export interface ChatMessage {
  id: string;
  classroom_name: string;
  user_id: string;
  user_name: string;
  user_avatar: string;
  user_role: Role;
  text: string;
  timestamp: string;
}
