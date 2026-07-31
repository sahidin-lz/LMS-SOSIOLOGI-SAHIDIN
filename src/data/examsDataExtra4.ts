import { Exam } from '../types';

export const TKA_EXAMS_MISSING: Exam[] = [
  {
    id: 'exam_latihan_bab_1',
    title: 'Latihan Bab 1: Sosiologi Sebagai Ilmu (20 Soal CBT)',
    grade_level: 12,
    category: 'Latihan Bab',
    duration_minutes: 40,
    total_questions: 20,
    description: 'Simulasi CBT Latihan Bab 1 Sosiologi: Hakikat, ciri-ciri, dan objek kajian sosiologi.',
    xp_reward: 300,
    passing_score: 75,
    questions: [
      {
        id: 'q_bab1_1',
        exam_id: 'exam_latihan_bab_1',
        number: 1,
        text: 'Sosiologi didasarkan pada hasil observasi, tidak spekulatif, dan menggunakan akal sehat. Hal ini menunjukkan bahwa sosiologi bersifat...',
        option_a: 'Empiris',
        option_b: 'Teoritis',
        option_c: 'Kumulatif',
        option_d: 'Non etis',
        option_e: 'Praktis',
        correct_answer: 'A',
        topic: 'Ciri-ciri Sosiologi',
        explanation: 'Empiris berarti didasarkan pada observasi (kenyataan akal sehat).'
      }
    ]
  },
  {
    id: 'exam_tka_2025_resmi',
    title: 'Tryout TKA Sosiologi SMA Tahun 2025',
    grade_level: 12,
    category: 'Tryout TKA',
    duration_minutes: 45,
    total_questions: 30,
    description: 'Simulasi Resmi Ujian Tes Kemampuan Akademik (TKA) Sosiologi SMA/MA/SMK Tahun 2025.',
    xp_reward: 400,
    passing_score: 75,
    questions: [
      {
        id: 'q_tka_1',
        exam_id: 'exam_tka_2025_resmi',
        number: 1,
        text: 'Manakah dari pernyataan berikut yang merupakan contoh perubahan sosial yang bersifat evolusi?',
        option_a: 'Peralihan masyarakat dari berburu ke agraris',
        option_b: 'Revolusi industri di Inggris',
        option_c: 'Reformasi politik',
        option_d: 'Pemberontakan massa',
        option_e: 'Kudeta militer',
        correct_answer: 'A',
        topic: 'Perubahan Sosial',
        explanation: 'Evolusi adalah perubahan lambat dan bertahap.'
      }
    ]
  }
];
