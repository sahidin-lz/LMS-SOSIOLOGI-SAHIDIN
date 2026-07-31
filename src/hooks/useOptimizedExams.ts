import { useState, useEffect, useCallback, useMemo } from 'react';
import { Exam } from '../types';
import { EXAMS_DATA } from '../data/sociologyData';
import { fetchCollection, saveDocument } from '../lib/firestoreService';

/**
 * Custom Hook: useOptimizedExams
 * One-time fetch paket ujian & latihan bab sosiologi dengan caching lokal untuk performa maksimal.
 */
export function useOptimizedExams() {
  const [exams, setExams] = useState<Exam[]>(EXAMS_DATA);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadExams = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const fsExams = await fetchCollection<Exam>('exams');
      if (fsExams && fsExams.length > 0) {
        // Merge EXAMS_DATA default 10 bab exams with any custom Firestore exams
        const examMap = new Map<string, Exam>();
        EXAMS_DATA.forEach((e) => examMap.set(e.id, e));
        fsExams.forEach((e) => examMap.set(e.id, e));
        setExams(Array.from(examMap.values()));
      } else {
        // Seed initial data ke Firestore jika belum ada
        for (const e of EXAMS_DATA) {
          await saveDocument('exams', e.id, e);
        }
        setExams(EXAMS_DATA);
      }
    } catch (err: any) {
      console.error('[useOptimizedExams Error]', err);
      setError('Gagal memuat paket ujian dari cache/Firestore');
      setExams(EXAMS_DATA);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadExams();
  }, [loadExams]);

  const updateExamLocally = useCallback((updatedExam: Exam) => {
    setExams((prev) => {
      const exists = prev.some((e) => e.id === updatedExam.id);
      if (exists) {
        return prev.map((e) => (e.id === updatedExam.id ? updatedExam : e));
      }
      return [updatedExam, ...prev];
    });
  }, []);

  const removeExamLocally = useCallback((examId: string) => {
    setExams((prev) => prev.filter((e) => e.id !== examId));
  }, []);

  const memoizedValue = useMemo(() => ({
    exams,
    loading,
    error,
    refreshExams: loadExams,
    updateExamLocally,
    removeExamLocally,
    setExams,
  }), [exams, loading, error, loadExams, updateExamLocally, removeExamLocally]);

  return memoizedValue;
}
