const fs = require('fs');

const examsHook = `import { useState, useEffect, useCallback, useMemo } from 'react';
import { Exam } from '../types';
import { EXAMS_DATA } from '../data/sociologyData';
import { saveDocument } from '../lib/firestoreService';
import { collection, getDocsFromCache, getDocsFromServer } from 'firebase/firestore';
import { db } from '../lib/firebase';

export function useOptimizedExams() {
  const [exams, setExams] = useState<Exam[]>(EXAMS_DATA);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadExams = useCallback(async () => {
    setLoading(true);
    setError(null);
    const examsRef = collection(db, 'exams');

    // 1. Get from Cache first
    try {
      const cacheSnapshot = await getDocsFromCache(examsRef);
      if (!cacheSnapshot.empty) {
        const cachedItems = cacheSnapshot.docs.map(d => ({ id: d.id, ...d.data() } as Exam));
        const examMap = new Map<string, Exam>();
        EXAMS_DATA.forEach((e) => examMap.set(e.id, e));
        cachedItems.forEach((e) => examMap.set(e.id, e));
        setExams(Array.from(examMap.values()));
        setLoading(false);
      }
    } catch (err) {
      console.warn('[useOptimizedExams] Cache miss:', err);
    }

    // 2. Revalidate from Server in background
    try {
      const serverSnapshot = await getDocsFromServer(examsRef);
      if (!serverSnapshot.empty) {
        const serverItems = serverSnapshot.docs.map(d => ({ id: d.id, ...d.data() } as Exam));
        const examMap = new Map<string, Exam>();
        EXAMS_DATA.forEach((e) => examMap.set(e.id, e));
        serverItems.forEach((e) => examMap.set(e.id, e));
        setExams(Array.from(examMap.values()));
      } else {
        for (const e of EXAMS_DATA) {
          await saveDocument('exams', e.id, e);
        }
        setExams(EXAMS_DATA);
      }
    } catch (err: any) {
      console.error('[useOptimizedExams Error]', err);
      if (exams.length === EXAMS_DATA.length) {
         setError('Gagal memuat paket ujian');
      }
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
`;
fs.writeFileSync('src/hooks/useOptimizedExams.ts', examsHook, 'utf8');
